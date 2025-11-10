const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function VerifyEmail(email, key) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/email/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, key }),
    });

    if (response.ok) {
      return { success: true };
    }

    if (response.status === 401) {
      return { success: false, error: "인증 실패" };
    }

    if (response.status === 500) {
      return { success: false, error: "서버 오류"};
    }

    return { success: false, error: "알 수 없는 오류" };
  } catch (err) {
    return { success: false, error: err };
  }
}
