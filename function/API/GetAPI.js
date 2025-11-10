const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function GetAPI(accessToken) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/key/getKeys`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    console.log("response : " + response);
    if (response.status === 200) {
      const data = await response.json();
      return { success: true, result: data };
    }

    return { success: false, error: "서버 오류" };

  } catch (err) {
    return { success: false, error: err };
  }
}