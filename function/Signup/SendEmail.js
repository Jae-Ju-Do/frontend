const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function SendEmail(email) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    }

    return { success: false, message: "서버 오류" };
  } catch (err) {
    return { success: false, message: err };
  }
}
