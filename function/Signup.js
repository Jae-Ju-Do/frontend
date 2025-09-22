const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function Signup(name, email, password) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    }

    if (response.status === 400) {
      return { success: false, message: response.errors.message || "입력값을 확인해주세요." };
    }

    if (response.status === 401) {
      return {
        success: false,
        message: "동일 이메일이 존재합니다.",
      };
    }

    return { success: false, message: "서버 오류" };
  } catch (err) {
    console.error("❌ 회원가입 요청 오류:", err);
    return { success: false, message: "네트워크 오류" };
  }
}
