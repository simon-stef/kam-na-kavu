'use client';

import { useEffect, useState } from 'react';
import { fetchUserProfile } from '@/app/actions/users';
import { getbookmarks } from '@/app/actions/bookmarks'; // Ensure you have this function
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { User, Post, Profile } from '@prisma/client';

interface UserWithDetails extends User {
  profile: Profile | null;
  posts: Post[];
}

export default function ProfileView({ id }: { id: string }) {
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]); // Initialize as empty array
  const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await fetchUserProfile(id);
        setUser(userData as UserWithDetails);
      } catch (err) {
        setError('Nepodarilo sa načítať profil používateľa');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  const loadBookmarkedPosts = async () => {
    try {
      const bookmarks = await getbookmarks(id);
      setBookmarkedPosts(bookmarks);
    } catch (err) {
      setError('Nepodarilo sa načítať uložené príspevky');
      console.error('Error loading bookmarked posts:', err);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error || 'Používateľ nebol nájdený'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Profile Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          src={user.image || '/default-avatar.png'} // Default fallback image
          alt={user.name || 'User'}
          sx={{
            width: 150,
            height: 150,
            mx: 'auto',
            mb: 2,
            border: 3,
            borderColor: 'primary.main',
          }}
        >
          {user.name?.[0] || 'U'}
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        
        {user.profile?.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <LocationOnIcon color="action" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle1" color="text.secondary">
              {user.profile.location}
            </Typography>
          </Box>
        )}

        {user.profile?.bio && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}
          >
            {user.profile.bio}
          </Typography>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Posts Grid */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      
      {user.posts.length === 0 ? (
        <Typography color="text.secondary" textAlign="center">
          Používateľ zatiaľ nemá žiadne príspevky
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {user.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.imageUrl || '/default-post-image.png'} // Default fallback image
                  alt={post.caption || 'Post image'}
                  sx={{ objectFit: 'cover' }}
                />
                {post.caption && (
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post.caption}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Button to toggle Bookmarked Posts */}
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => {
            setShowBookmarkedPosts((prev) => !prev);
            if (!showBookmarkedPosts) loadBookmarkedPosts(); // Load bookmarked posts if toggled to show
          }}
        >
          {showBookmarkedPosts ? 'Zobraziť príspevky' : 'Zobraziť uložené príspevky'}
        </Button>
      </Box>

      {/* Bookmarked Posts */}
      {showBookmarkedPosts && bookmarkedPosts.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Uložené príspevky
          </Typography>
          <Grid container spacing={3}>
            {bookmarkedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl || '/default-post-image.png'} // Default fallback image
                    alt={post.caption || 'Bookmarked post image'}
                    sx={{ objectFit: 'cover' }}
                  />
                  {post.caption && (
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {post.caption}
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* If no bookmarked posts */}
      {showBookmarkedPosts && bookmarkedPosts.length === 0 && (
        <Typography color="text.secondary" textAlign="center">
          Žiadne uložené príspevky
        </Typography>
      )}
    </Box>
  );
}
