"use client";

import { useRef, useState } from "react";
import styles from "./dropzone.module.css";

export default function Dropzone() {
  const inputRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [info, setInfo] = useState("Supports PE, ELF, Mach-O, Office, PDF, and more");

  function onClick() {
    inputRef.current?.click();
  }

  function onDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    setInfo(`${files.length} file(s) selected`);
  }

  return (
    <div
      className={`${styles.box} ${isOver ? styles.over : ""}`}
      onClick={onClick}
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          setInfo(files.length ? `${files.length} file(s) selected` : "Supports PE, ELF, Mach-O, Office, PDF, and more");
        }}
      />
      <div className={styles.folderIcon} aria-hidden />
      <div className={styles.dropText}>Drop files here or click to browse</div>
      <div className={styles.types}>{info}</div>
    </div>
  );
}
