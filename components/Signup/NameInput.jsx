import styles from "../SignupModal.module.css";

export default function NameInput({ value, onChange }) {
  return (
    <label className={styles.label}>
      Name
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
