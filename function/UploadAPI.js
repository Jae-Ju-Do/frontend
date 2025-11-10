// frontend/function/UploadAPI.js
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function UploadAPI(file, accessToken = null) {
  try {
    const formData = new FormData();
    formData.append("file", file); // ✅ 서버 요구사항: key = 'file'

    // ✅ 헤더는 동적으로 구성
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${SERVER_URL}/api/analysis/upload`, {
      method: "POST",
      headers, // ❌ Content-Type 지정 금지 (FormData 자동 처리)
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, result: data };
    } else {
      console.error("서버 응답:", data);
      return { success: false, error: data.message || "업로드 실패" };
    }
  } catch (err) {
    console.error("UploadAPI Error:", err);
    return { success: false, error: err.message || err };
  }
}
