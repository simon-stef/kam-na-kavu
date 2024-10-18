// src/app/(home)
"use client";

import Typography from '@mui/material/Typography';
import { useSession, signIn, signOut } from "next-auth/react";

//export const metadata = { title: 'Domovská stránka | KamNaKavu'};

export default function Home() {
  const { data: session} = useSession();
  if (!session) {
    return (
      <div>
        <h1>NEprihlásený pouzívateľ, ak chceš pokračovať, prosím prihlás sa alebo si sprav účet na našej stránke.</h1>
      </div>
      );
  }
      
  return (
    <div>
      <h1>Vitaj, {session.user.name}</h1>
      <p>Váš email je: {session.user.email}</p>
    </div>
  );
    }
