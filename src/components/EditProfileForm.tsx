'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { updateUserProfile } from '@/app/actions/users';

interface EditProfileFormProps {
  initialData: {
    name: string;
    bio: string;
    location: string;
  };
  userId: string;
}

export default function EditProfileForm({ initialData, userId }: EditProfileFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserProfile(userId, formData);
      router.push('/profil');
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Meno"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />

        <TextField
          fullWidth
          label="Lokalita"
          name="location"
          value={formData.location}
          onChange={handleChange}
          variant="outlined"
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Zrušiť
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ukladá sa...' : 'Uložiť zmeny'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
} 