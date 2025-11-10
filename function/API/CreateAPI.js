const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function CreateAPI(accessToken, name, validDate) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/key/generate`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        validDate,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return { success: true, result: data };
    }

    if (response.status === 409){
      return { success: true, error: "중복되는 api" };
    }

    return { success: false, error: "서버 오류" };

  } catch (err) {
    return { success: false, error: err };
  }
}
