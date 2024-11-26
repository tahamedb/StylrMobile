import { apiClientWrapper } from "../api/client";
import { User } from "@/types/api.types";


export const profileServices = {
    async getUser(userId: number): Promise<User> {
        return apiClientWrapper.get<User>(`/users/${userId}`);
    },

};