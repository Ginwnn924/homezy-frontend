export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
      id: string;
      fullName: string;
      email: string;
      accessToken: string;
  };
}

import i18n from '../../../i18n/i18n';

const BASE_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    console.log(response)
    return response.json();
  },
};
