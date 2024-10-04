//src/components/NavBar.tsx

"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, AddCircle as AddCircleIcon, Login as LoginIcon, AppRegistration as AppRegistrationIcon } from '@mui/icons-material';
import Link from 'next/link';  // Import Link from Next.js

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => { setValue(newValue); }}
      >
        {/* Home Link */}
        <Link href="/" passHref legacyBehavior>
          <BottomNavigationAction label="Domov" icon={<HomeIcon />} />
        </Link>

        {/* Profile Link */}
        <Link href="/profil" passHref legacyBehavior>
          <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} />
        </Link>

        {/* Posts Link */}
        <Link href="/prispevok" passHref legacyBehavior>
          <BottomNavigationAction label="Príspevky" icon={<AddCircleIcon />} />
        </Link>

        {/* Login Link */}
        <Link href="/auth/prihlasenie" passHref legacyBehavior>
          <BottomNavigationAction label="Prihlásenie" icon={<LoginIcon />} />
        </Link>

        {/* Registration Link */}
        <Link href="/auth/registracia" passHref legacyBehavior>
          <BottomNavigationAction label="Registrácia" icon={<AppRegistrationIcon />} />
        </Link>
      </BottomNavigation>
    </Box>
  );
}
