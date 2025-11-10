"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./dropzone.module.css";

export default function Dropzone({ onFileSelect, analyzing = false, message = "", downloadUrl = null }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (file) onFileSelect(file);
  }, [file]);

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

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.box} ${isOver ? styles.over : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          const dropped = e.dataTransfer.files?.[0];
          handleFile(dropped || null);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />

        {downloadUrl ? (
          <div className={styles.reportBox}>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
              <Image
                src="/pdf.png"
                alt="PDF Report"
                width={120}
                height={120}
                className={styles.pdfIcon}
              />
            </a>
            <div className={styles.progressText}>📄 분석 완료 — 클릭하여 보고서 다운로드</div>
          </div>
        ) : analyzing ? (
          <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : !file ? (
          <>
            <div className={styles.dropText}>Drop PE file here or click to browse</div>
            <div className={styles.types}>Supports only .exe, .dll, .sys, .ocx</div>
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
            <div className={styles.fileName}>{file.name}</div>
          </div>
        )}
      </div>

    </div>
  );
}
