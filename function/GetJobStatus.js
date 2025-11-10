// frontend/function/GetJobStatus.js
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function GetJobStatus(jobId) {
  try {
    const response = await fetch(`${SERVER_URL}/api/analysis/status/${jobId}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, result: data };
    } else {
      return { success: false, error: data.message || "상태 조회 실패" };
    }
  } catch (err) {
    console.error("GetJobStatus Error:", err);
    return { success: false, error: err.message };
  }
}
