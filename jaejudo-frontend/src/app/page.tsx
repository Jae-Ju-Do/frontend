import Link from "next/link";
import routes from "@/constants/routes";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        <Link href={routes.home} style={{ marginRight: "1rem" }}>
          초기화면
        </Link>
        <Link href={routes.login} style={{ marginRight: "1rem" }}>
          로그인
        </Link>
        <Link href={routes.register}>회원가입</Link>
      </nav>
      <h1>초기화면</h1>
      <p>Next.js로 만든 초기화면입니다.</p>
    </div>
  );
}
