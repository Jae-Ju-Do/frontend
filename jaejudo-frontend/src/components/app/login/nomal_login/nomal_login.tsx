import styles from "@/styles/app/login/nomal_login/nomal_login.module.css";
import { useState } from "react";
import { loginSubmit } from "@/services/app/login/login_submit";
import { changeUserData } from "@/services/app/login/change_user_data";
import { LoginLink } from "@/components/app/login/login_link/login_link";
import { NomalInput } from "@/components/global/input/nomal_input/nomal_input";
import { UserData } from "@/constants/userdata";
import { PwInput } from "@/components/global/input/pw_input/pw_input";

export function NomalLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    ID: "",
    PW: "",
  });

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          loginSubmit(e, userData, setError, setLoading);
        }}
      >
        <div>
          {/* 아이디 */}
          <NomalInput
            type="text"
            name="ID"
            placeholder="ID"
            onChange={(e) => {
              e.preventDefault();
              changeUserData(e, setUserData);
            }}
          />
          {/* 패스워드 */}
          <PwInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setUserData={setUserData}
          />
          {/* 로그인 시도 확인 */}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>
        {/* 에러 코드 확인 */}
        {error && <p className={styles.error}>{error}</p>}

        {/* 링크 이동 페이지 */}
        <LoginLink />
      </form>
    </div>
  );
}
