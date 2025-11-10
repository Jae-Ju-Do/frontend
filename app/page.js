"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import Dropzone from "../components/Dropzone";
import { UploadAPI } from "../function/UploadAPI";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

async function GetJobStatus(jobId) {
  const res = await fetch(`${SERVER_URL}/api/analysis/status/${jobId}`);
  const data = await res.json();
  return res.ok ? { success: true, result: data } : { success: false, error: data.message };
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  async function handleUpload() {
    if (!selectedFile) return alert("파일을 선택하세요.");
    setMessage("📤 업로드 중...");
    setAnalyzing(true);

    try {
      const token = isLoggedIn ? localStorage.getItem("accessToken") : null;
      const res = await UploadAPI(selectedFile, token);
      if (!res.success) throw new Error(res.error);

      const { jobId, message: msg } = res.result;
      setMessage(`${msg} (Job ID: ${jobId})`);
      pollJobStatus(jobId);
    } catch (err) {
      console.error("업로드 실패:", err);
      setMessage("❌ 업로드 실패: " + err.message);
      setAnalyzing(false);
    }
  }

  async function pollJobStatus(jobId) {
    const interval = setInterval(async () => {
      const res = await GetJobStatus(jobId);
      if (!res.success) {
        setMessage("❌ 상태 조회 실패");
        clearInterval(interval);
        setAnalyzing(false);
        return;
      }

      const { status, message: msg, downloadUrl, errorMessage } = res.result;
      setMessage(msg);

      if (status === "COMPLETED") {
        setDownloadUrl(downloadUrl);
        setMessage("✅ 분석 완료 — 보고서 확인 가능");
        setAnalyzing(false);
        clearInterval(interval);
      } else if (status === "FAILED") {
        setMessage(`❌ 분석 실패: ${errorMessage}`);
        setAnalyzing(false);
        clearInterval(interval);
      }
    }, 4000);
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.logo}>jaejudo</h1>
        <p className={styles.subtitle}>Malware Analysis Platform</p>

        <Dropzone
          onFileSelect={setSelectedFile}
          analyzing={analyzing}
          message={message}
          downloadUrl={downloadUrl}
        />

        <div className={styles.ctaRow}>
          <button
            onClick={handleUpload}
            className={styles.btnGhost}
            disabled={!selectedFile || analyzing}
          >
            {analyzing ? "분석 중..." : isLoggedIn ? "Upload" : "Guest Upload"}
          </button>

          {!isLoggedIn && (
            <Link href="/signin" className={styles.btnPrimary}>
              Sign in for history
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
