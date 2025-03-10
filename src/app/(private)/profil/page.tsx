// src/app/profil/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const metadata = { 
  title: 'Môj profil | KamNaKavu',
  description: 'Správa profilu používateľa'
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return <Typography>Please sign in to view your profile</Typography>;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      profile: true
    }
  });

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 3 
          }}>
            <Avatar
              src={session.user.image || undefined}
              alt={user.name || 'Profile'}
              sx={{ width: 120, height: 120 }}
            />
            
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                {user.name || 'Bez mena'}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                {user.profile?.bio || 'Žiadne bio'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                📍 {user.profile?.location || 'Lokalita nie je uvedená'}
              </Typography>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                href="/profil/upravit"
              >
                Upraviť profil
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
