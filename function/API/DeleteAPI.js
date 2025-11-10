const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function DeleteAPI(accessToken, name) {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/key/delete`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        name,
      }),
    });

    if (response.status === 200) {
      return { success: true };
    }

    return { success: false, error: "서버 오류" };

  } catch (err) {
    return { success: false, error: err };
  }
}
