//src\sections\SignInView.tsx

"use client";

import { signIn } from "next-auth/react";

export default function SignInView() {
  return (
    <button onClick={() => signIn("google")}>Sign in with Google</button>
  );
}
