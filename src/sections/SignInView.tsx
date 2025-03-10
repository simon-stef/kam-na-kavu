//src\sections\SignInView.tsx

"use client";

import { signIn } from "next-auth/react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';

export default function SignInView() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box 
        sx={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          height: "100%",  
          padding: "4%", 
          gap: 2, 
          borderRadius: "5px", 
          boxShadow: 3
        }}
      >
        <Typography variant="h5" component="h1">
          <strong>Prihlásiť sa</strong>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="body1" color="textSecondary" component="span">
            Ešte nemáte účet?
          </Typography>
          <Link 
            href="/auth/registracia" 
            style={{ 
              textDecoration: 'underline',
              color: 'inherit'
            }}
          >
            Registrujte sa!
          </Link>
        </Box>

        <Button 
          variant='contained' 
          startIcon={<GoogleIcon />} 
          onClick={() => signIn("google")}
        >
          Prihlásiť sa pomocou Google
        </Button>
      </Box>
    </Box>
  );
}
