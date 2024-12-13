"use client";

import { signIn } from "next-auth/react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'; // Import Link from Next.js
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SignUpView() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State to track if GDPR checkbox is checked

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign-up failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update state based on checkbox status
  };

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
          boxShadow: 3, // Optional: Adds a shadow for better appearance
        }}
      >
        <Typography variant="h5"><strong>Registrovať sa</strong></Typography>
        <Button
          variant='contained'
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignUp}
          disabled={isLoading || !isChecked} // Disable the button if not checked
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Registrovať sa pomocou Google'}
        </Button>

        {/* GDPR Checkbox with text */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2" color="textSecondary">
              Súhlasím s{' '}
              <Link href="/gdpr" passHref>
                <Typography variant="body2" color="primary" component="a" sx={{ textDecoration: 'underline' }}>
                  podmienkami ochrany osobných údajov (GDPR)
                </Typography>
              </Link>.
            </Typography>
          }
        />

        <Typography variant="body1" color="textSecondary" marginTop={2}>
          Už máte účet?{' '}
          <Link href="/auth/prihlasenie" passHref>
            <Typography variant="body1" color="primary" component="a" sx={{ textDecoration: 'underline' }}>
              Prihláste sa!
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
