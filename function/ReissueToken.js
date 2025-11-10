const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function ReissueToken() {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/jwt/reissue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);

      console.log("토큰 재발급 성공", data);
      return { success: true };
    }

    const errorData = await response.json();
    if (response.status === 401) {
      return { success: false, message: "JWT 오류" };
    }
    if (response.status === 500) {
      return { success: false, message: "서버 오류" };
    }

    return { success: false, message: "알 수 없는 오류" };
  } catch (err) {
    return { success: false, message: err };
  }
}
