"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../SignupModal.module.css";
import NameInput from "./NameInput";
import EmailVerification from "./EmailVerification";
import PasswordInput from "./PasswdInput";
import ConfirmPasswordInput from "./ConfirmPasswdInput";
import FormActions from "./FormActions";
import OAuthButtons from "./OAuthButtons";

import { SendVerificationCodeHandler } from "../../function/Signup/SendVerificationCodeHandler";
import { VerifyCodeHandler } from "../../../function/Signup/VerifyCodeHandler";
import { SignupHandler } from "../../function/Signup/SignupHandler";

export default function SignupModal({ open, onClose, onSwitchToSignin }) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 타이머
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  useEffect(() => {
    if (timer <= 0) {
      setIsTimerRunning(false);
      return;
    }
    const id = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  if (!open || !mounted) return null;

  const sendVerificationCode = () => {
    SendVerificationCodeHandler(
      email, setError, setCodeSent, setStatus, setTimer, setIsTimerRunning
    );
  };

  const handleVerifyCode = () => {
    VerifyCodeHandler(email, setEmailVerified, setError, setStatus, inputCode);
  };

  const handleSignUp = (e) => {
    SignupHandler(
      e, name, email, password, confirmPassword, emailVerified, setError, onClose
    );
  };


  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Sign Up</h3>

        <form className={styles.form} onSubmit={handleSignUp}>
          <NameInput value={name} onChange={(e) => setName(e.target.value)} />

          <EmailVerification
            email={email}
            onEmailChange={(e) => setEmail(e.target.value)}
            codeSent={codeSent}
            onSendCode={sendVerificationCode}
            inputCode={inputCode}
            onCodeChange={(e) => setInputCode(e.target.value)}
            onVerify={handleVerifyCode}
            timer={timer}
            isTimerRunning={isTimerRunning}
            emailVerified={emailVerified}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            show={showPassword}
            toggle={() => setShowPassword((p) => !p)}
          />

          <ConfirmPasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword((p) => !p)}
          />

          {error && <p className={styles.error}>{error}</p>}
          <FormActions onCancel={onClose} />
        </form>

        <div className={styles.sep}><span>or</span></div>
        <OAuthButtons />

        <p className={styles.footer}>
          Already have an account?{" "}
          <button type="button" className={styles.linkLike} onClick={onSwitchToSignin}>
            Sign In
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
