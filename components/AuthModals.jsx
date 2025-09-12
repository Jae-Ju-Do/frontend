"use client";

import { useState, useCallback, useEffect } from "react";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

export default function AuthModals({ trigger }) {
  const [which, setWhich] = useState("none");

  const openSignin = useCallback(() => setWhich("signin"), []);
  const openSignup = useCallback(() => setWhich("signup"), []);
  const closeAll  = useCallback(() => setWhich("none"), []);

  useEffect(() => {
    if (typeof trigger === "function") {
      trigger({ openSignin, openSignup, closeAll });
    }
  }, [trigger, openSignin, openSignup, closeAll]);

  return (
    <>
      <SigninModal
        open={which === "signin"}
        onClose={closeAll}
        onSwitchToSignup={() => setWhich("signup")}
      />
      <SignupModal
        open={which === "signup"}
        onClose={closeAll}
        onSwitchToSignin={() => setWhich("signin")}
      />
    </>
  );
}
