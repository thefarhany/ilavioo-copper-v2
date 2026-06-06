import { apiClient } from "./axios";
import type { ApiResponse } from "@/types";

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

export const contactApi = {
  sendContact: async (contactData: ContactData) => {
    const { data } = await apiClient.post<ApiResponse<unknown>>("/contact", contactData);
    return data;
  },
};
