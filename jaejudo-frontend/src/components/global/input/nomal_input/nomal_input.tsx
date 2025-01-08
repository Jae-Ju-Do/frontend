import styles from "@/styles/global/input/nomal_input/nomal_input.module.css";

interface NomalInputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NomalInput({
  type,
  name,
  placeholder,
  onChange,
}: NomalInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
    />
  );
}
