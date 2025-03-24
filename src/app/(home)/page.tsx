// src/app/(home)/page.tsx
"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link'; // Import Link from Next.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//export const metadata = { title: 'Domovská stránka | KamNaKavu'};

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redirect to '/prispevok' after session is available
      router.push('/prispevok');
    }
  }, [session, router]);

  if (!session) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ padding: 2 }}>
        <Box 
          sx={{ 
            backgroundColor: '#f5f5f5', 
            borderRadius: 2, 
            boxShadow: 3, 
            padding: 4, 
            width: '80%', 
            maxWidth: 600 
          }}
        >
          <Typography variant="h3" align="center" sx={{ background: 'linear-gradient(90deg, #6a5acd, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Vitajte na <strong>KamNaKavu!</strong>
          </Typography>
          <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
            KamNaKavu je platforma, kde môžete zdieľať svoje obľúbené kaviarne a príspevky o nich.
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" align="center" sx={{ marginBottom: 1, background: 'linear-gradient(90deg, #6a5acd, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', padding: 1, borderRadius: 1 }}>
              Objavte nové miesta
            </Typography>
            <Typography variant="h6" align="center" sx={{ marginBottom: 1, background: 'linear-gradient(90deg, #6a5acd, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', padding: 1, borderRadius: 1 }}>
              Zdieľajte svoje zážitky
            </Typography>
            <Typography variant="h6" align="center" sx={{ marginBottom: 1, background: 'linear-gradient(90deg, #6a5acd, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', padding: 1, borderRadius: 1 }}>
              Pripojte sa k našej komunite milovníkov kávy!
            </Typography>
          </Box>
          <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
            Ak ste tu po prvý raz môžete sa <Link href="/register" style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'underline' }}>registrovať</Link>, ak sa k nám vraciate tak sa <Link href="/login" style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'underline' }}>prihláste</Link>.
          </Typography>
        </Box>
      </Box>
    );
  }  
}
