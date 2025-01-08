"use client";
import { useState } from "react";

import { NomalLogin } from "@/components/app/login/nomal_login/nomal_login";
import { SimpleLogin } from "@/components/app/login/simple_login/simple_login";
import { Logo } from "@/components/global/image/logo/logo";
import { LoginBar } from "@/components/app/login/login_bar/login_bar";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"nomal" | "simple">("nomal");

  return (
    <div>
      <Logo />
      <LoginBar loginMethod={loginMethod} setLoginMethod={setLoginMethod} />
      <div>
        {loginMethod === "nomal" && <NomalLogin />}
        {loginMethod === "simple" && <SimpleLogin />}
      </div>
    </div>
  );
}
