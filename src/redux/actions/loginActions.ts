interface UserData {
  username: string;
  password: string;
}

export const loginUser = (userData: UserData) => ({
  type: 'LOGIN_USER',
  payload: userData,
});
