import styles from "../SignupModal.module.css";

export default function OAuthButtons() {
  return (
    <div className={styles.stack}>
      <button className={`${styles.oauth} ${styles.google}`}>Google</button>
      <button className={`${styles.oauth} ${styles.naver}`}>NAVER</button>
    </div>
  );
}
