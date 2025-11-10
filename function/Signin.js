// const SERVER_URL = ProcessingInstruction.env.SERVER_URL || ""
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// const SERVER_URL = ""

export async function Signin(username, password){
    try {
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/JSON"},
        body: JSON.stringify({username, password}),
      });
      
      const data = await response.json();
      if(response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("로그인 성공 ✅");
        return { success: true };
      }

      if(data.code === "USERNAME_NOT_FOUND" || data.code === "WRONG_PASSWORD") {
        return { success: false, error: "이메일 또는 비밀번호가 올바르지 않습니다."}
      }

      if(data.code === "INTERNAL_ERROR") {
        return { success: false, error: data.message }
      }

      return { success: false, error: "알수 없는 오류가 발생했습니다."}
    } catch(err){
      console.error("login error", err);
      return {success: false, error: err};
    }
}