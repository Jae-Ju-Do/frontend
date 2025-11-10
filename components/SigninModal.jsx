"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SigninModal.module.css";
import { Signin } from "../function/Signin";

export default function SigninModal({ open, onClose, onSwitchToSignup }) {
  const [mounted, setMounted] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const HandleLogin = (e) => {
    e.preventDefault();
    setError("");

    Signin(userId, password).then((res) => {
      if(res.success) {
        alert("로그인 성공 ✅");
        onClose();
        window.location.href = "/";
      } else {
        console.log(res.error);
        setError(res.error?.message || "Login failed. Please try again.");
      }
    });

  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={stop}>
        <h3 id="auth-title" className={styles.title}>Sign In</h3>
        <form className={styles.form} onSubmit={HandleLogin}>
          <label className={styles.label}>
            ID
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary}>Sign In</button>
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
          Don’t have an account?{" "}
          <button type="button" className={styles.linkLike} onClick={() => onSwitchToSignup?.()}>
            Sign Up
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
