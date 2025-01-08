import styles from "../../../styles/global/link/custom_login_link.module.css";
import Link from "next/link";
import routes from "../../../constants/routes";

interface LinkProps {
  href: keyof typeof routes;
  label: string;
}

export function CustomLoginLink({ href, label }: LinkProps) {
  return (
    <Link href={routes[href]} className={styles.link}>
      {`${label}`}
    </Link>
  );
}
