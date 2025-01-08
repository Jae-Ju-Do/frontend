import styles from "../../../../styles/app/login/login_link/login_link.module.css";
import { CustomLoginLink } from "../../../global/link/custom_login_link";

export function LoginLink() {
  return (
    <div className={styles.links}>
      <CustomLoginLink href="home" label="아이디 찾기" />
      <span className={styles.separator}>|</span>
      <CustomLoginLink href={"home"} label="비밀번호 찾기" />
      <span className={styles.separator}>|</span>
      <CustomLoginLink href={"register"} label="회원가입" />
    </div>
  );
}
