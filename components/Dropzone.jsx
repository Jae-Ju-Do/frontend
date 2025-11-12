"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./dropzone.module.css";

export default function Dropzone({
  onFileSelect,
  analyzing = false,
  message = "",
  downloadUrl = null,
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (file) onFileSelect && onFileSelect(file);
  }, [file, onFileSelect]);

  function handleFile(selected) {
    if (!selected) return;
    if (!/\.(exe|dll|sys|ocx)$/i.test(selected.name)) {
      alert("지원되지 않는 파일 형식입니다. (.exe, .dll, .sys, .ocx)");
      return;
    }
    setFile(selected);
  }

  function getIconByExt(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "exe": return "/exe_white.png";
      case "dll": return "/dll_white.png";
      case "sys": return "/sys_white.png";
      case "ocx": return "/ocx_white.png";
      default: return "/file_white.png";
    }
  }

  function handlePrimaryClick() {
    // 보고서가 있으면 클릭 시 다운로드/열기
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("download", "");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    // 보고서가 없고 분석 중이 아니면 파일 선택
    if (!analyzing) inputRef.current?.click();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!analyzing) handlePrimaryClick();
    }
  }

  const isDisabled = !!analyzing; // 분석 중이면 클릭/키보드 비활성

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.box} ${isOver ? styles.over : ""} ${isDisabled ? styles.disabled : ""}`}
        role={isDisabled ? undefined : "button"}
        tabIndex={isDisabled ? -1 : 0}
        aria-busy={analyzing ? "true" : "false"}
        aria-disabled={isDisabled ? "true" : "false"}
        aria-label={
          downloadUrl
            ? "분석 보고서 다운로드"
            : analyzing
            ? "분석 중 (클릭 불가)"
            : "파일 드롭 또는 클릭하여 선택"
        }
        onClick={isDisabled ? undefined : handlePrimaryClick}
        onKeyDown={isDisabled ? undefined : handleKeyDown}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          const dropped = e.dataTransfer.files?.[0] || null;
          handleFile(dropped);
        }}
        title={isDisabled ? "분석 중에는 클릭할 수 없습니다" : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />

        {downloadUrl ? (
          <div className={styles.reportBox}>
            <Image
              src="/pdf.png"
              alt="PDF Report"
              width={120}
              height={120}
              className={styles.pdfIcon}
            />
            <div className={`${styles.progressText} ${styles.noWrapKo}`}>
              📄 분석 완료 — 클릭하여 보고서 다운로드
            </div>
          </div>
        ) : analyzing ? (
          <div
            className={styles.loaderContainer}
            aria-busy="true"
            aria-live="polite"
            lang="ko"
            title={message || "Ghidra 디컴파일 중"}
          >
            <div className={styles.spinner} role="progressbar"></div>
            <div className={`${styles.progressText} ${styles.noWrapKo}`}>
              {message || "Ghidra 디컴파일 중..."}
            </div>
          </div>
        ) : !file ? (
          <>
            <div className={`${styles.dropText} ${styles.noWrapKo}`}>
              Drop PE file here or click to browse
            </div>
            <div className={`${styles.types} ${styles.noWrapKo}`}>
              Supports only .exe, .dll, .sys, .ocx
            </div>
          </>
        ) : (
          <div className={styles.selectedBox}>
            <Image
              src={getIconByExt(file.name)}
              alt={`${file.name} icon`}
              width={100}
              height={100}
              className={styles.fileIcon}
            />
            <div className={`${styles.fileName} ${styles.ellipsisOneLine} ${styles.noWrapKo}`}>
              {file.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
