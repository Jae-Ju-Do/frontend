"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";

export default function DocumentPage() {
  const sectionRefs = {
    intro: useRef(null),
    upload: useRef(null),
    analysis: useRef(null),
    api: useRef(null),
    report: useRef(null),
  };

  const scrollTo = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul>
            <li onClick={() => scrollTo("intro")}>1. 시작하기</li>
            <li onClick={() => scrollTo("upload")}>2. 파일 업로드</li>
            <li onClick={() => scrollTo("analysis")}>3. 분석 결과</li>
            <li onClick={() => scrollTo("api")}>4. API 이용</li>
            <li onClick={() => scrollTo("report")}>5. 리포트 관리</li>
          </ul>
        </aside>
        <main className={styles.content}>
          <section ref={sectionRefs.intro} className={styles.section}>
            <h2>1. 시작하기</h2>
            <p>
              <strong>jaejudo</strong>는 의심스러운 실행 파일과 문서를 안전한 환경에서 분석할 수 있는
              악성코드 분석 플랫폼입니다.
            </p>
            <p>이 문서는 회원/비회원 모두 사용할 수 있는 주요 기능과 사용 방법을 안내합니다.</p>
            <ul>
              <li>🔹 로그인 없이 빠르게 파일 업로드 및 분석</li>
              <li>🔹 계정 생성 시 업로드 이력 보관 및 API 키 발급 가능</li>
              <li>🔹 위협 인텔리전스를 기반으로 상세한 결과 확인</li>
            </ul>
          </section>

          <section ref={sectionRefs.upload} className={styles.section}>
            <h2>2. 파일 업로드</h2>
            <p>
              jaejudo는 Windows PE 파일(<code>.exe</code>, <code>.dll</code>, <code>.sys</code>, 
              <code>.ocx</code>)과 일부 문서 형식(<code>.pdf</code>, <code>.docx</code>, 
              <code>.xlsx</code> 등)을 지원합니다.
            </p>
            <ol>
              <li>드래그 앤 드롭 또는 업로드 박스를 클릭하여 파일 선택</li>
              <li>여러 개 파일 동시 업로드 가능</li>
              <li>게스트 업로드는 임시 보관만 가능 (로그인 시 영구 저장)</li>
            </ol>
            <p>
              ⚠️ <strong>주의:</strong> 민감한 개인정보나 사적인 문서는 업로드하지 마세요.
            </p>
          </section>

          <section ref={sectionRefs.analysis} className={styles.section}>
            <h2>3. 분석 결과</h2>
            <p>업로드된 파일은 자동으로 정적/동적 분석이 진행됩니다:</p>
            <ul>
              <li>🔍 파일 헤더 및 메타데이터 검사</li>
              <li>📊 샌드박스 환경에서 동작 시뮬레이션</li>
              <li>🌐 네트워크 및 API 호출 추적</li>
              <li>⚡ AI/SLM 기반 이상 행위 탐지</li>
            </ul>
            <p>분석 결과는 대시보드에서 위험 점수와 IoC(침해 지표)와 함께 표시됩니다.</p>
          </section>

          <section ref={sectionRefs.api} className={styles.section}>
            <h2>4. API 이용</h2>
            <p>회원은 <strong>API 키</strong>를 발급받아 자동화된 업로드 및 리포트 다운로드를 할 수 있습니다.</p>
            <pre>
              {`curl -X POST "https://api.jaejudo.com/upload" \\
                -H "Authorization: Bearer <API_KEY>" \\
                -F "file=@malware.exe"`}
            </pre>
            <p>API 응답은 JSON 형식으로 분석 결과와 위험 점수를 제공합니다.</p>
          </section>

          <section ref={sectionRefs.report} className={styles.section}>
            <h2>5. 리포트 관리</h2>
            <p>
              로그인한 사용자는 <strong>리포트 대시보드</strong>를 통해 과거 업로드 이력을 관리할 수 있습니다.
            </p>
            <ul>
              <li>📁 파일 종류, 날짜, 위협 수준별 필터링</li>
              <li>📥 JSON, PDF, CSV 형식으로 결과 내보내기</li>
              <li>👥 팀원과 안전하게 공유 가능</li>
            </ul>
            <p>
              리포트 보관 기간은 계정 플랜(무료/유료)에 따라 다르며, 게스트 사용자의 리포트는
              임시 저장 후 세션 종료 시 삭제됩니다.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
