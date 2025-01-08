import styles from "@/styles/global/input/pw_input/pw_input.module.css";
import { changeUserData } from "@/services/app/login/change_user_data";
import { NomalInput } from "@/components/global/input/nomal_input/nomal_input";
import { AiFillEyeButton } from "@/components/global/button/ai_fill_eye/ai_fill_eye_button";
import { UserData } from "@/constants/userdata";

interface PwInput {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export function PwInput({
  showPassword,
  setShowPassword,
  setUserData,
}: PwInput) {
  return (
    <div className={styles.passwordContainer}>
      {/* 패스워드 */}
      <NomalInput
        type={showPassword ? "text" : "password"}
        name="PW"
        placeholder="PW"
        onChange={(e) => {
          e.preventDefault();
          changeUserData(e, setUserData);
        }}
      />
      {/* 패스워드 숨기기 아이콘 */}
      <AiFillEyeButton
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
}
