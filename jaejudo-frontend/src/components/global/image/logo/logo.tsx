import styles from "../../../../styles/global/image/logo/logo.module.css";
import Image from "next/image";
import Link from "next/link";
import routes from "../../../../constants/routes";

export function Logo() {
  return (
    <header className={styles.header}>
      <Link href={routes.home}>
        <Image
          src="/logo.png"
          alt="JaeJuDo Logo"
          width={300}
          height={60}
        ></Image>
      </Link>
    </header>
  );
}
