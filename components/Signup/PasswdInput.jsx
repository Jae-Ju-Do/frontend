import { Eye, EyeOff } from "lucide-react";
import styles from "../SignupModal.module.css";

export default function PasswordInput({ value, onChange, show, toggle }) {
  return (
    <label className={styles.label}>
      Password
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${styles.inputLg}`}
          type={show ? "text" : "password"}
          placeholder="Create a password"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          className={styles.iconBtnInside}
          onClick={toggle}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </label>
  );
}
