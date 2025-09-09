"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

export default function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <Link href="/">
            <Image src="/jaejudo-logo.png" alt="jaejudo logo" width={170} height={50} />
          </Link>
        </div>

        <div className={styles.tabs}>
          <NavTab href="/" label="Home" active />
          <NavTab href="/docs" label="Documentation" />
          <NavTab href="/analysis" label="Analysis" />
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSignin} onClick={() => setOpenAuth(true)}>Sign In</button>
          <button className={styles.btnSignup} onClick={() => setOpenAuth(true)}>Sign Up</button>
        </div>
      </nav>

      <SigninModal open={openAuth} onClose={() => setOpenAuth(false)} />
      <SignupModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </header>
  );
}

function NavTab({ href, label, active }) {
  return (
    <Link href={href} className={`${styles.navtab} ${active ? styles.activeTab : ""}`}>
      {label}
    </Link>
  );
}
