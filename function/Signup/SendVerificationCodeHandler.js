import { SendEmail } from "./SendEmail";

export async function SendVerificationCodeHandler(
  email,
  setError,
  setCodeSent,
  setStatus,
  setTimer,
  setIsTimerRunning
) {
  const result = await SendEmail(email);
  if (result.success) {
    setCodeSent(true);
    setStatus(result.message);
    setTimer(180);
    setIsTimerRunning(true);
  } else {
    setError(result.error);
  }
}
