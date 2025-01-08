import styles from "../../../../styles/global/button/ai_fill_eye_button/ai_fill_eye_button.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface AiFillEyeButtonProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AiFillEyeButton({
  showPassword,
  setShowPassword,
}: AiFillEyeButtonProps) {
  return (
    <button
      type="button"
      className={styles.eyeButton}
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? (
        <AiFillEyeInvisible size={20} color="#718096" />
      ) : (
        <AiFillEye size={20} color="#718096" />
      )}
    </button>
  );
}
