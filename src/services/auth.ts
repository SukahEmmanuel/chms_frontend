import axiosInstance from './axios';
import { API_BASE_URL } from '@/lib/constants';
import { AuthTokens, LoginCredentials, RegisterData, User } from '@/types';
import axios from 'axios';

/** Login — returns JWT tokens */
export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
  const { data } = await axios.post<AuthTokens>(
    `${API_BASE_URL}/auth/login/`,
    credentials
  );
  return data;
}

/** Register new user */
export async function register(payload: RegisterData): Promise<User> {
  const { data } = await axios.post<User>(
    `${API_BASE_URL}/auth/register/`,
    payload
  );
  return data;
}

/** Fetch current authenticated user */
export async function getCurrentUser(): Promise<User> {
  const { data } = await axiosInstance.get<User>('/auth/me/');
  return data;
}

/** Logout — invalidate refresh token on the server */
export async function logoutServer(refreshToken: string): Promise<void> {
  await axiosInstance.post('/auth/logout/', { refresh: refreshToken });
}

/** Request a password reset email */
export async function requestPasswordReset(email: string): Promise<void> {
  await axios.post(`${API_BASE_URL}/auth/password-reset/`, { email });
}

/** Confirm password reset with token */
export async function confirmPasswordReset(payload: {
  token: string;
  password: string;
}): Promise<void> {
  await axios.post(`${API_BASE_URL}/auth/password-reset/confirm/`, payload);
}
