import React from "react";
import routes from "@/constants/routes";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "@/constants/userdata";
import { HttpApi } from "@/services/global/api/http_api";

// 아이디, 패스워드 제출
export const loginSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  userData: UserData,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  console.log(userData);

  try {
    const response = await HttpApi({
      path: `${process.env.backend_path}${process.env.login_path}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userId: userData.ID,
        password: userData.PW,
      },
    });

    if (response.status === 200) {
      window.location.href = routes.home;
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("알 수 없는 오류가 발생했습니다.");
    }
  } finally {
    setLoading(false);
  }
};
