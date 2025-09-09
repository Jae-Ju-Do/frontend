"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SignupModal.module.css";

export default function SignupModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);

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

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: 회원가입 API 로직
    console.log("회원가입 시도 ✅");
    onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={stop}>
        <h3 id="auth-title" className={styles.title}>Sign Up</h3>

        <div className={styles.stack}>
          <button className={`${styles.oauth} ${styles.google}`}>
            <span className={styles.icon}>🌐</span> Continue with Google
          </button>
          <button className={`${styles.oauth} ${styles.naver}`}>
            <span className={styles.icon}>N</span> Continue with Naver
          </button>
        </div>

        <div className={styles.sep}><span>or</span></div>

        <form className={styles.form} onSubmit={handleSignUp}>
          <label className={styles.label}>
            Name
            <input className={styles.input} type="text" placeholder="Enter your name" required />
          </label>
          <label className={styles.label}>
            Email
            <input className={styles.input} type="email" placeholder="Enter your email" required />
          </label>
          <label className={styles.label}>
            Password
            <input className={styles.input} type="password" placeholder="Create a password" required />
          </label>
          <div className={styles.formActions}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary}>Sign Up</button>
          </div>
        </form>

        <p className={styles.footer}>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>,
    document.body
  );
}
