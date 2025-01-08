interface UserData {
  ID?: string;
  PW?: string;
  email?: string;
  phone?: string;
  name?: string;
}

// 로그인 변수 변경
export const changeUserData = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
) => {
  const { name, value } = e.target;
  setUserData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
