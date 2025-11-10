"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import AuthModals from "./AuthModals";
import { ReissueToken } from "../function/ReissueToken"
import { DecodeAccessToken } from "../function/DecodeAccessToken"

export default function Navbar() {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
    };
    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  useEffect(() => {
    setIsLoggedIn(false);
    (async () => {
      const token = localStorage.getItem("accessToken");
      let isValid = true;
      if(token != null){
        try {
          const result = DecodeAccessToken(token)
          setUser(result.sub);
          const now = Math.floor(Date.now() / 1000);
          if (result.exp && result.exp < now + 30) isValid = false;
        } catch {
          isValid = false;
        }
      }
      else {
        setIsLoggedIn(false)
        return;
      }


      if (isValid) {
        setIsLoggedIn(true);
        return;
      }

      const reissueRes = await ReissueToken();
      if (reissueRes.success) {
        setIsLoggedIn(true);
        return;
      }
      
    })();
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