import styles from "../../../../styles/app/login/login_bar/login_bar.module.css";
import { LoginBarBtn } from "../../../global/button/login_bar_button/login_bar_button";

interface LoginBarProps {
  loginMethod: "nomal" | "simple";
  setLoginMethod: React.Dispatch<React.SetStateAction<"nomal" | "simple">>;
}

export function LoginBar({ loginMethod, setLoginMethod }: LoginBarProps) {
  return (
    <div className={styles.loginBar}>
      {/* 일반 로그인 버튼 */}
      <LoginBarBtn
        className="일반 로그인"
        loginMethod="nomal"
        curLoginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
      />

      {/* 간편 로그인 버튼 */}
      <LoginBarBtn
        className="간편 로그인"
        loginMethod="simple"
        curLoginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
      />
    </div>
  );
}
