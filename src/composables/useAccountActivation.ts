import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Socket, io } from "socket.io-client";
import { useRoute, useRouter } from "vue-router";
import { toast } from 'vue-sonner'

export function useAccountActivation() {
    const route = useRoute();
    const router = useRouter();

    const token = ref<string>((route.query.token as string) || "");
    const remaining = ref<number | null>(null);

    let socket: Socket | null = null;

    function connectSocket() {
        if (!token.value) return;
        socket = io(`${import.meta.env.VITE_API_URL}/account-activation`, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Connected to account-activation socket");
            socket?.emit("join", { token: token.value });
        });

        socket.on("countdown", (data: { remaining: number }) => {
            remaining.value = data.remaining;
        });

        socket.on("expired", (data: { message?: string }) => {
            remaining.value = 0;
            toast.error(data.message || "token expired");
            router.push("/login");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }

    function disconnectSocket() {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    }

    onMounted(() => {
        connectSocket();
    });

    onBeforeUnmount(() => {
        disconnectSocket();
    });

    watch(
        () => route.query.token,
        (newToken) => {
            token.value = (newToken as string) || "";
            disconnectSocket();
            connectSocket();
        }
    );

    return {
        remaining,
        token,
    };
}
