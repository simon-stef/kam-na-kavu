// src\sections\SignOutView.tsx
'use client';

import { signOut }  from "next-auth/react";

// export const metadata = { title: 'Odhlásiť sa | KamNaKavu'};

export default function SignOutView() {
  return (
    <button onClick={() => signOut()}>Odhlásiť sa</button>

  );
}