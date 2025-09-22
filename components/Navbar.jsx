"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import AuthModals from "./AuthModals";

export default function Navbar() {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userStr = localStorage.getItem("user");

        if (token) {
          let isValid = true;
          try {
            const { exp } = jwtDecode<{ exp }>(token);
            const now = Math.floor(Date.now() / 1000);
            if (exp && exp <= now) isValid = false; // 만료됨
          } catch {
            isValid = false; // 토큰 파싱 실패 시도 → 재발급 분기
          }

          if (isValid) {
            if (!cancelled) {
              setIsLoggedIn(true);
              setUser(userStr ? JSON.parse(userStr) : user);
            }
            return; // 유효하면 더 진행할 필요 없음
          }
        }

        if (!sessionStorage.getItem("autologinChecked")) {
          sessionStorage.setItem("autologinChecked", "1");

          const res = await fetch("/api/auth/autologin?json=1", {
            credentials: "include", // 쿠키 포함
          });

          if (res.ok) {
            const { access, user: u } = await res.json();

            if (access) localStorage.setItem("accessToken", access);
            if (u) localStorage.setItem("user", JSON.stringify(u));

            if (!cancelled) {
              setIsLoggedIn(true);

              if (u) {
                setUser(u);
              } else {
                try {
                  const { sub } = jwtDecode<{ sub }>(access);
                  setUser(sub ? { email: sub } : null);
                } catch {
                  setUser(null);
                }
              }
            }
            return;
          }
        }

        if (!cancelled) {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        if (!cancelled) {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);


  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <Link href="/">
            <Image src="/jaejudo-logo.png" alt="jaejudo logo" width={170} height={50} />
          </Link>
        </div>

        <div className={styles.tabs}>
          <Link href="/" className={styles.tab}>Home</Link>
          <Link href="/document" className={styles.tab}>Document</Link>
          <Link href="/analysis" className={styles.tab}>Analysis</Link>
        </div>

        <div className={styles.actions}>
          {isLoggedIn ? (
            <Link href="/profile" className={styles.profileBtn}>
              <span className={styles.avatar}>
                {user?.email?.[0].toUpperCase() || "U"}
              </span>
            </Link>
          ) : (
            <>
              <button className={styles.btnSignin} onClick={() => auth?.openSignin()}>Sign In</button>
              <button className={styles.btnSignup} onClick={() => auth?.openSignup()}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      <AuthModals trigger={setAuth} />
    </header>
  );
}