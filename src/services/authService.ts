import { axiosInstance } from '@/lib/axios';

export const authService = {
    async getAccountActive(token: string) {
        const response = await axiosInstance.get(`/auth/account-active/activation/${token}`);
        return { response: response, data: response.data };
    },
};
