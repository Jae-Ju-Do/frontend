"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./dropzone.module.css";

export default function Dropzone() {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  function onClick() {
    inputRef.current?.click();
  }

  function handleFiles(newFiles) {
    const peFiles = newFiles.filter((file) =>
      /\.(exe|dll|sys|ocx)$/i.test(file.name)
    );
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      const uniqueNew = peFiles.filter((f) => !names.has(f.name));
      return [...prev, ...uniqueNew];
    });
  }

  function onDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length) handleFiles(dropped);
  }

  function getIconByExt(name) {
    const ext = name.split(".").pop().toLowerCase();
    switch (ext) {
      case "exe": return "/exe_white.png";
      case "dll": return "/dll_white.png";
      case "sys": return "/sys_white.png";
      case "ocx": return "/ocx_white.png";
    }
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
          const selected = Array.from(e.target.files || []);
          handleFiles(selected);
        }}
      />

      {files.length === 0 ? (
        <>
          <div className={styles.folderIcon} aria-hidden />
          <div className={styles.dropText}>Drop PE files here or click to browse</div>
          <div className={styles.types}>Supports only Windows PE files (.exe, .dll, .sys, .ocx)</div>
        </>
      ) : (
        <>
          <div className={styles.dropText}>PE Files selected:</div>
          <ul ref={listRef} className={styles.fileList}>
            {files.map((f, idx) => (
              <li key={idx} className={styles.fileItem}>
                <Image
                  src={getIconByExt(f.name)}
                  alt={`${f.name} icon`}
                  width={128}
                  height={128}
                  className={styles.fileIcon}
                />
                <span>
                {(() => {
                  const parts = f.name.split(".");
                  const ext = parts.pop();
                  const base = parts.join(".");

                  const displayName = base.length > 13 ? base.slice(0, 13) + "..." : base;

                  return (
                    <>
                      {displayName}.{ext}
                    </>
                  );
                })()}
              </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
