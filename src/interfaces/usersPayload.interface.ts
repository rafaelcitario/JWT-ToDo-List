export interface UsersPayload {
  username: string,
  name: string,
  password: string,
};

export interface UsersRequiredPayload extends Pick<UsersPayload, 'username' | 'name'> {
  password_hash: string;
}

