import styles from "../SignupModal.module.css";

export default function FormActions({ onCancel }) {
  return (
    <div className={styles.formActions}>
      <button type="button" className={styles.btnGhost} onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className={styles.btnPrimary}>
        Sign Up
      </button>
    </div>
  );
}
