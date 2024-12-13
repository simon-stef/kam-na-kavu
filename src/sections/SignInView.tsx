//src\sections\SignInView.tsx

"use client";

import { signIn } from "next-auth/react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link'; // Import Link from Next.js

export default function SignInView() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", height:"100%",  padding:"4%", gap:2, borderRadius:"5px", boxShadow: 3}}>
        <Typography variant="h5"><strong>Prihlásiť sa</strong></Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Ešte nemáte účet?{' '}
          <Link href="/auth/registracia" passHref>
            <Typography variant="body1" color="primary" component="a" sx={{ textDecoration: 'underline' }}>
              Registrujte sa!
            </Typography>
          </Link>
        </Typography>
        <Button variant='contained' startIcon={<GoogleIcon />} onClick={() => signIn("google")}>Prihlásiť sa pomocou Google</Button>
      </Box>
      
    </Box>
  );
}
