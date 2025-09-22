"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SignupModal.module.css";
import { Eye, EyeOff } from "lucide-react";
import { SendEmail } from "../function/SendEmail";
import { VerifyEmail } from "../function/VerifyEmail";
import { Signup } from "../function/Signup";

export default function SignupModal({ open, onClose, onSwitchToSignin }) {
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  // const [verificationCode, setVerificationCode] = useState(""); // 데모용
  const [inputCode, setInputCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const stop = (e) => e.stopPropagation();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

   const sendVerificationCode = async () => {
    if (!validateEmail(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setError("");
    const result = await SendEmail(email);

    if (resumePluginState.success) {
      setCodeSent(true)
      setStatus(result.message);
    }
    else{
      setError(result.error);
    }


    // 데모용
    // const code = "123456"; // 데모용 고정 코드
    // setVerificationCode(code);
    // setCodeSent(true);
    // setEmailVerified(false);

    // console.log("메일로 전송된 인증코드:", code);
    // alert("인증 코드가 입력하신 메일로 전송되었습니다. (데모)");
  };

  const handleVerifyCode = async () => {
    await VerifyEmail(email, inputCode).then((res) => {
      if (res.success) {
        setEmailVerified(true);
        setError("");
        setStatus(res.message);
      } else {
        setEmailVerified(false);
        setError(res.error);
      }
    })
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);          // ✅ 입력한 이메일 값은 그대로 저장
    setEmailVerified(false);     // ✅ 인증 상태 초기화
    setCodeSent(false);          // ✅ "Send Code" 버튼 다시 나오게
    setInputCode("");            // ✅ 입력 중이던 코드 초기화
    setStatus("");               // ✅ 상태 메시지도 초기화
    setError("");                // ✅ 에러 메시지 초기화
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!emailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    await Signup(name, email, password).then((res) => {
      if (res.success) {
        alert("회원가입 성공 ✅");
        onClose();
      }
      else{
        if (res.errors && res.errors.length > 0) {
          setError(res.errors.map((e) => `${e.field}: ${e.message}`).join(", "));
        } else {
          setError(res.message);
        }
      }
    })
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={stop}>
        <h3 id="auth-title" className={styles.title}>Sign Up</h3>

        <form className={styles.form} onSubmit={handleSignUp}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Email
            <div className={styles.inline}>
              <input
                className={`${styles.input} ${styles.inputGrow}`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={emailVerified}
              />
              <button
                type="button"
                className={styles.btnGhost}
                onClick={sendVerificationCode}
              >
                {codeSent ? "Resend" : "Send Code"}
              </button>
            </div>
          </label>

          {codeSent && !emailVerified && (
            <div className={styles.inline}>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter 6-digit code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <button
                type="button"
                className={styles.btnGhost}
                onClick={handleVerifyCode}
              >
                Verify
              </button>
            </div>
          )}

          {emailVerified && (
            <p className={styles.success}>이메일 인증 완료 ✅</p>
          )}

          <label className={styles.label}>
            Password
            <div className={styles.inputWrapper}>
              <input
                className={`${styles.input} ${styles.inputLg}`}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.iconBtnInside}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>

          <label className={styles.label}>
            Confirm Password
            <div className={styles.inputWrapper}>
              <input
                className={`${styles.input} ${styles.inputLg}`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.iconBtnInside}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>


          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary}>Sign Up</button>
          </div>
        </form>

        <div className={styles.sep}><span>or</span></div>

        <div className={styles.stack}>
          <button className={`${styles.oauth} ${styles.google}`}>
            Google
          </button>
          <button className={`${styles.oauth} ${styles.naver}`}>
            NAVER
          </button>
        </div>

        <p className={styles.footer}>
          Already have an account? 
          <button type="button" className={styles.linkLike} onClick={() => onSwitchToSignin?.()}>
            Sign In
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
