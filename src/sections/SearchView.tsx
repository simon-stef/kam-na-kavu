// src/app/sections/SearchView.tsx

'use client';

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { searchUsers } from '@/app/actions/users';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface UserWithProfile extends User {
  profile?: {
    bio?: string | null;
    location?: string | null;
  } | null;
}

export default function SearchView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load all users on component mount
  useEffect(() => {
    loadUsers('');
  }, []);

  const loadUsers = async (term: string) => {
    setIsLoading(true);
    try {
      const results = await searchUsers(term);
      setUsers(results);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    loadUsers(value);
  };

  const handleUserClick = (id: string) => {
    router.push(`/profil/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Hľadať používateľov
      </Typography>
      
      <TextField
        fullWidth
        label="Hľadať podľa mena"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
        disabled={isLoading}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ mt: 2 }}>
          {users.map((user) => (
            <ListItem 
              key={user.id} 
              disablePadding
              sx={{
                '&:not(:last-child)': {
                  borderBottom: 1,
                  borderColor: 'divider',
                },
              }}
            >
              <ListItemButton 
                onClick={() => handleUserClick(user.id)}
                sx={{ 
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.image || undefined} alt={user.name || 'User'}>
                    {user.name?.[0] || 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        📍 {user.profile?.location || 'Lokalita nie je definovaná'}
                      </Typography>
                      {user.profile?.bio && (
                        <Typography
                          component="p"
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {user.profile.bio}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
          {users.length === 0 && (
            <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              Neboli nájdení žiadni používatelia
            </Typography>
          )}
        </List>
      )}
    </Box>
  );
}
