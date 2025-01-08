"use client";
import styles from "./register.module.css";
import routes from "../../constants/routes";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import { Logo } from "../../components/global/image/logo/logo";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    ID: "",
    PW: "",
    checkPW: "",
    name: "",
    phoneNum: "",
    email: "",
  });

  const changeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNum") {
      setUserData((prev) => ({
        ...prev,
        [name]: formatPhoneNum(value),
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [hideData, setHideData] = useState({
    showPW: false,
    showCheckPW: false,
  });

  const changeHideData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name as keyof typeof hideData;
    setHideData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const submit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (userData.PW !== userData.checkPW) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/members/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData,
        }),
      });

      if (response.status == 200) {
        window.location.href = routes.home;
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  /* 핸드폰 데이터 처리*/
  const formatPhoneNum = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
        7,
        11
      )}`;
    }
  };

  /* 비밀번호 강도 표시 */
  const evaluatePasswordStrength = (
    password: string
  ): { level: number; message: string } => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-zA-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const levels = [
      { level: 0, message: "Too Weak" },
      { level: 1, message: "Weak" },
      { level: 2, message: "Fair" },
      { level: 3, message: "Good" },
      { level: 4, message: "Strong" },
    ];

    return levels[score];
  };

  const [passwordStrength, setPasswordStrength] = useState({
    level: 0,
    message: "Too Weak",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUserData((prev) => ({
      ...prev,
      PW: newPassword,
    }));
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  return (
    <div className={styles.container}>
      <Logo />
      <form className={styles.form} /*onSubmit={handleSubmit}*/>
        <div>
          <div className={styles.idContainer}>
            <input
              type="text"
              placeholder="ID"
              name="ID"
              value={userData.ID}
              onChange={changeUserData}
              className={styles.input}
            />
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={hideData.showPW ? "text" : "password"}
              placeholder="PW"
              name="PW"
              value={userData.PW}
              onChange={handlePasswordChange}
              className={styles.input}
            />
            <button
              type="button"
              name="showPW"
              className={styles.eyeButton}
              onClick={changeHideData}
            >
              {hideData.showPW ? (
                <AiFillEyeInvisible size={20} color="#718096" />
              ) : (
                <AiFillEye size={20} color="#718096" />
              )}
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                height: "8px",
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(passwordStrength.level / 4) * 100}%`,
                  backgroundColor:
                    passwordStrength.level === 1
                      ? "red"
                      : passwordStrength.level === 2
                      ? "orange"
                      : passwordStrength.level === 3
                      ? "yellowgreen"
                      : "green",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {passwordStrength.message}
            </span>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={hideData.showCheckPW ? "text" : "password"}
              placeholder="check PW"
              name="checkPW"
              value={userData.checkPW}
              onChange={changeUserData}
              className={styles.input}
            />
            <button
              type="button"
              name="showCheckPW"
              className={styles.eyeButton}
              onClick={changeHideData}
            >
              {hideData.showCheckPW ? (
                <AiFillEyeInvisible size={20} color="#718096" />
              ) : (
                <AiFillEye size={20} color="#718096" />
              )}
            </button>
          </div>

          <input
            type="text"
            placeholder="name"
            name="name"
            value={userData.name}
            onChange={changeUserData}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Phone number (000-0000-0000)"
            name="phoneNum"
            value={userData.phoneNum}
            onChange={changeUserData}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={userData.email}
            onChange={changeUserData}
            className={styles.input}
          />

          <button type="submit" onChange={submit} className={styles.button}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
