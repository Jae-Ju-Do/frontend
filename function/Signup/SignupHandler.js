import { Signup } from "./Signup";

export async function SignupHandler(
  e,
  name,
  email,
  password,
  confirmPassword,
  emailVerified,
  setError,
  onClose
) {
  e.preventDefault();

  if (!emailVerified) {
    setError("이메일 인증을 완료해주세요.");
    return;
  }
  if (password !== confirmPassword) {
    setError("비밀번호가 일치하지 않습니다.");
    return;
  }

  const res = await Signup(name, email, password);
  if (res.success) {
    alert("회원가입 성공 ✅");
    onClose();
  } else {
    setError(res.message);
  }
}
