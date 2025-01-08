import styles from "../../../../styles/global/button/login_bar_button/login_bar_button.module.css";

interface LoginBarBtnProps {
  className: string;
  loginMethod: "nomal" | "simple";
  curLoginMethod: "nomal" | "simple";
  setLoginMethod: React.Dispatch<React.SetStateAction<"nomal" | "simple">>;
}

export function LoginBarBtn({
  className,
  loginMethod,
  curLoginMethod,
  setLoginMethod,
}: LoginBarBtnProps) {
  return (
    <button
      className={`${styles.tabButton} ${
        loginMethod === curLoginMethod ? styles.activeTab : ""
      }`}
      onClick={() => setLoginMethod(loginMethod)}
    >
      {`${className}`}
    </button>
  );
}
