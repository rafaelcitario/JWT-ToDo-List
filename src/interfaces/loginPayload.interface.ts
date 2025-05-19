export interface LoginPayload {
  username: string,
  password: string;
}

export interface LoginRequiredPayload extends Pick<LoginPayload, 'username'> {
  password_hash: string;
}