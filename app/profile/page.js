"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // 🔹 유저 상태
  const [user, setUser] = useState({ email: "test", password: "1234" }); // 데모
  const [avatar, setAvatar] = useState("/nomal.png");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // 🔹 비밀번호 확인
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // 🔹 API Key 관리 상태
  const [apiKeys, setApiKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newApiName, setNewApiName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [expiryOption, setExpiryOption] = useState("30");
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    setApiKeys([
      {
        name: "Default Key",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }, []);

  // 🔹 프로필 저장
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, avatar_url: avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    if (password) {
      console.log("새 비밀번호 저장됨 (데모)", password);
    }

    alert("프로필이 업데이트되었습니다 ✅");
    setPassword("");
  };

  // 🔹 아바타 변경
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // 🔹 비밀번호 확인
  const handleAuthCheck = (e) => {
    e.preventDefault();
    if (enteredPassword === user.password) {
      setAuthenticated(true);
    } else {
      alert("비밀번호가 올바르지 않습니다 ❌");
    }
  };

  // 🔹 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthenticated(false);
    setEnteredPassword("");
    alert("로그아웃 되었습니다 ✅");
    router.push("/"); // 홈으로 리다이렉트
  };

  // 🔹 API Key 생성
  const handleOpenModal = () => {
    setNewApiName("");
    setGeneratedKey("");
    setExpiryOption("30");

    const today = new Date();
    today.setDate(today.getDate() + 30);
    setCustomDate(today.toISOString().split("T")[0]);

    setShowModal(true);
  };

  const handleCreateApiKey = () => {
    if (!newApiName.trim()) {
      alert("API 이름을 입력해주세요.");
      return;
    }

    let expiresAt;
    if (expiryOption === "custom") {
      if (!customDate) {
        alert("만료일을 선택해주세요.");
        return;
      }
      expiresAt = new Date(customDate).toISOString();
    } else {
      const days = parseInt(expiryOption, 10);
      const today = new Date();
      today.setDate(today.getDate() + days);
      expiresAt = today.toISOString();
    }

    const newKey = "key_" + Math.random().toString(36).substring(2, 12);
    setGeneratedKey(newKey);

    setApiKeys((prev) => [
      ...prev,
      { name: newApiName, createdAt: new Date().toISOString(), expiresAt },
    ]);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>

        {/* ✅ 인증 여부에 따라 상단 버튼 다르게 */}
        <div className={styles.tabHeader}>
          <div className={styles.tabBar}>
            {authenticated && (
              <>
                <button
                  className={`${styles.tabBtn} ${activeTab === "profile" ? styles.active : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Settings
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === "apikeys" ? styles.active : ""}`}
                  onClick={() => setActiveTab("apikeys")}
                >
                  API Keys
                </button>
              </>
            )}
          </div>

          <div className={styles.tabActions}>
            <button onClick={toggleTheme} className={styles.btnSecondary}>
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button onClick={handleLogout} className={styles.btnDanger}>
              Logout
            </button>
          </div>
        </div>


        {/* 🔹 메인 컨텐츠 */}
        {!authenticated ? (
          <form onSubmit={handleAuthCheck} className={styles.authBox}>
            <h2 className={styles.authTitle}>비밀번호 확인</h2>
            <p className={styles.authDesc}>보안을 위해 현재 비밀번호를 입력해주세요.</p>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter current password"
            />
            <div className={styles.saveRow}>
              <button type="submit" className={styles.btnPrimary}>
                확인
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Profile Settings</h2>
                <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                  <div className={styles.profileRow}>
                    <div className={styles.avatarBox}>
                      <img src={avatar} alt="avatar" className={styles.avatarImg} />
                      <label className={styles.changeBtn}>
                        Change Avatar
                        <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                      </label>
                    </div>

                    <div className={styles.fieldBox}>
                      <label>Email</label>
                      <input className={styles.input} type="email" value={user?.email || ""} disabled />
                      <label>Name</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label>New Password</label>
                      <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.saveRow}>
                    <button type="submit" className={styles.btnPrimary}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* API Keys */}
            {activeTab === "apikeys" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>API Keys</h2>
                <button onClick={handleOpenModal} className={styles.btnPrimary}>
                  Generate New Key
                </button>
                <ul className={styles.apiList}>
                  {apiKeys.map((item, i) => {
                    const isExpired = new Date(item.expiresAt) < new Date();
                    return (
                      <li key={i} className={styles.apiItem}>
                        <div className={styles.apiInfo}>
                          <span
                            className={`${styles.statusBadge} ${
                              isExpired ? styles.expired : styles.active
                            }`}
                          >
                            {isExpired ? "Expired" : "Active"}
                          </span>
                          <span className={styles.keyName}>{item.name}</span>
                        </div>
                        <div className={styles.apiMeta}>
                          <small>Created: {new Date(item.createdAt).toLocaleDateString("en-CA")}</small>
                          <small>Expires: {new Date(item.expiresAt).toLocaleDateString("en-CA")}</small>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              {!generatedKey ? (
                <>
                  <h3 className={styles.modalTitle}>Create API Key</h3>
                  <input
                    type="text"
                    placeholder="Enter API key name"
                    value={newApiName}
                    onChange={(e) => setNewApiName(e.target.value)}
                    className={styles.inputCentered}
                  />
                  <div className={styles.expiryOptionsCentered}>
                    {["30", "60", "90"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`${styles.expiryBtn} ${expiryOption === d ? styles.active : ""}`}
                        onClick={() => {
                          setExpiryOption(d);
                          const today = new Date();
                          today.setDate(today.getDate() + parseInt(d, 10));
                          setCustomDate(today.toISOString().split("T")[0]);
                        }}
                      >
                        {d}일
                      </button>
                    ))}
                  </div>
                  <div className={styles.dateWrapperCentered}>
                    <label>Expiration Date</label>
                    <input
                      type="date"
                      className={styles.inputCentered}
                      min={new Date().toISOString().split("T")[0]}
                      max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]}
                      value={customDate}
                      onChange={(e) => {
                        setCustomDate(e.target.value);
                        setExpiryOption("custom");
                      }}
                    />
                  </div>
                  <div className={styles.modalActionsCentered}>
                    <button onClick={handleCreateApiKey} className={styles.btnPrimary}>
                      Create
                    </button>
                    <button onClick={() => setShowModal(false)} className={styles.btnGhost}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className={styles.modalTitle}>API Key Generated</h3>
                  <div className={styles.keyBox}>
                    <code>{generatedKey}</code>
                  </div>
                  <p className={styles.warningBox}>
                    ⚠️ You will only see this key once. Please save it securely.
                  </p>
                  <div className={styles.modalActionsCentered}>
                    <button onClick={() => setShowModal(false)} className={styles.btnPrimary}>
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
