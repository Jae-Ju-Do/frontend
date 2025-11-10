import styles from "../SignupModal.module.css";

export default function EmailVerification({
  email, onEmailChange,
  codeSent, onSendCode,
  inputCode, onCodeChange, onVerify,
  timer, isTimerRunning, emailVerified
}) {
  return (
    <label className={styles.label}>
      Email
      <div className={styles.inline}>
        <input
          className={`${styles.input} ${styles.inputGrow}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          required
          disabled={emailVerified}
        />
        <button
          type="button"
          className={styles.btnGhost}
          onClick={onSendCode}
        >
          {codeSent ? "Resend" : "Send Code"}
        </button>
      </div>

      {codeSent && !emailVerified && (
        <div className={styles.inline}>
            <div>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={inputCode}
                    onChange={onCodeChange}
                    disabled={!isTimerRunning}
                />
                <button
                    type="button"
                    className={styles.btnGhost}
                    onClick={onVerify}
                    disabled={!isTimerRunning}
                >
                    Verify
                </button>
            </div>
            {isTimerRunning ? (
                <span className={styles.timer}>
                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                </span>
            ) : (
                <span className={styles.error}>시간 초과 ⏰ 다시 시도해주세요.</span>
            )}
        </div>
      )}
    </label>
  );
}
