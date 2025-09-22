const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function Signout() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return { success: false, message: "로그인 상태 X" };
  }

  try {
    const response = await fetch(`${SERVER_URL}/api/auth/logout`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      return { success: true };
    }

    if (response.status === 401) {
        return { success: false, message: "JWT 오류" };
    }

    return { success: false, message: "알 수 없는 오류" };
  } catch (err) {
    return { success: false, message: "네트워크 오류" };
  }
}
