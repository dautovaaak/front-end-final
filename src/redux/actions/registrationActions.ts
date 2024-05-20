interface UserData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export const registerUser = (userData: UserData) => ({
    type: 'REGISTER_USER',
    payload: userData,
});
