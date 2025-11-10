import { VerifyEmail } from "./VerifyEmail";

export async function VerifyCodeHandler(
  email,
  setEmailVerified,
  setError,
  setStatus,
  key
) {
  const res = await VerifyEmail(email, key);
  if (res.success) {
    setEmailVerified(true);
    setError("");
    setStatus(res.message);
  } else {
    setEmailVerified(false);
    setError(res.error);
  }
}
