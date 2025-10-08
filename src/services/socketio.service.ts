import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

class SocketIOService {
    socket: Socket;

    constructor() {
        this.socket = io(SOCKET_URL, {
            autoConnect: true,
        });
    }

    connect() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    validatedLogin(fieldValues: any) {
        this.socket.emit("validatedLogin", fieldValues);
    }

    validateLogin(fieldValues: any) {
        this.socket.emit("validateLogin", fieldValues);
    }

    onValidationdLogin(fn: (data: any) => void) {
        this.socket.on("validationdLogin", fn);
    }

    onValidationLogin(fn: (data: any) => void) {
        this.socket.on("validationLogin", fn);
    }

    offValidationdLogin(fn: (data: any) => void) {
        this.socket.off("validationdLogin", fn);
    }

    offValidationLogin(fn: (data: any) => void) {
        this.socket.off("validationLogin", fn);
    }
}

export const socketService = new SocketIOService();
export const socket = socketService.socket;
