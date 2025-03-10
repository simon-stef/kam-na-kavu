'use client';

import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Avatar
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
  const { data: session } = useSession();
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { mode, toggleTheme } = useTheme();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue === '/auth/odhlasenie') {
      signOut();
    } else {
      router.push(newValue);
    }
  };

  // Custom Profile Icon component
  const ProfileIcon = () => (
    session?.user?.image ? (
      <Avatar 
        src={session.user.image}
        alt={session.user.name || "Profile"}
        sx={{ 
          width: 24, 
          height: 24,
          // Add a slight border to make the avatar stand out
          border: '1px solid',
          borderColor: 'primary.main'
        }}
      />
    ) : (
      <Avatar 
        sx={{ 
          width: 24, 
          height: 24 
        }}
      />
    )
  );

  // Navigation items
  const navItems = session
    ? [
        { label: 'Domov', icon: <HomeIcon />, value: '/' },
        { label: 'Hľadať', icon: <SearchIcon />, value: '/hladanie' },
        { label: 'Pridať', icon: <AddIcon />, value: '/pridat' },
        { label: 'Profil', icon: <ProfileIcon />, value: '/profil' },
        { label: 'Odhlásiť', icon: <LogoutIcon />, value: '/auth/odhlasenie' },
      ]
    : [
        { label: 'Domov', icon: <HomeIcon />, value: '/' },
        { label: 'O mne', icon: <InfoIcon />, value: '/o-mne' },
        { label: 'Prihlásenie', icon: <LoginIcon />, value: '/auth/prihlasenie' },
        { label: 'Registrácia', icon: <PersonAddIcon />, value: '/auth/registracia' },
      ];

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: mode === 'light' 
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(30, 30, 30, 0.8)',
      }}
    >
      <IconButton 
        sx={{ 
          position: 'absolute', 
          right: 16, 
          top: -48,
          backdropFilter: 'blur(10px)',
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(30, 30, 30, 0.8)',
        }}
        onClick={toggleTheme}
        color="inherit"
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.value}
            sx={{
              minWidth: 'auto',
              padding: '6px 12px',
              fontSize: '0.75rem',
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
