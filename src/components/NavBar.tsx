//src/components/NavBar.tsx

"use client";


import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
//import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
//import { useSession } from "next-auth/react";

export default function Navbar() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  //const { data: session, status } = session();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}> {/* Fixes the NavBar */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
      >
        <BottomNavigationAction label="Domov" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profily" value="/profil" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Príspevky" value="/prispevok" icon={<AddCircleIcon />} />
        ) : (
          [
            <BottomNavigationAction key="login" label="Prihlásenie" value="/auth/prihlasenie" icon={<LoginIcon />} />,
            <BottomNavigationAction key="register" label="Registrácia" value="/auth/registracia" icon={<AppRegistrationIcon />} />
          ]
        )
      </BottomNavigation>
    </Box>
  );
}