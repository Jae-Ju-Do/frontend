"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Dropzone from "../components/Dropzone";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.logo}>jaejudo</h1>
          <p className={styles.subtitle}>Malware Analysis Platform</p>
          <p className={styles.note}>
            Upload with or without login — <span className={styles.em}>sign in</span> to keep your report history.
          </p>

          <Dropzone />

          <div className={styles.ctaRow}>
            <button className={styles.btnGhost}>Guest Upload</button>
            <Link href="/signin" className={styles.btnPrimary}>Sign in for history</Link>
          </div>
        </section>

        <section className={styles.features}>
          <FeatureCard
            icon={<MagnifierIcon />}
            title="Static & Dynamic Analysis"
            desc="Comprehensive malware analysis with both static signatures and dynamic behavior detection."
          />
          <FeatureCard
            icon={<ShieldIcon />}
            title="Threat Intel (VT, YARA)"
            desc="Integration with VirusTotal, YARA rules, and global threat intelligence feeds."
          />
          <FeatureCard
            icon={<DocIcon />}
            title="Report Export (PDF/Word)"
            desc="Export detailed analysis reports in PDF or Word format for sharing and documentation."
          />
        </section>
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} jaejudo</span>
      </footer>
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{desc}</div>
    </div>
  );
}

/* --- Simple inline SVG icons --- */
function MagnifierIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14m0-2a9 9 0 0 0-7.03 14.72L2.3 20.4a1 1 0 1 0 1.4 1.42l1.66-1.66A9 9 0 1 0 11 2z"/>
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 2l7 4v6c0 4.97-3.05 9.24-7 10c-3.95-.76-7-5.03-7-10V6z"/>
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path fill="currentColor" d="M14 2v6h6"/>
    </svg>
  );
}
