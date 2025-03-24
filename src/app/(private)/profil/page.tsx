// src/app/profil/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions"; // Import CardActions
import { CardMedia } from "@mui/material"; // Import CardMedia

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
      profile: true,
      Bookmark: {
        include: {
          post: true
        }
      }
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

      {/* Display saved posts */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Uložené príspevky
        </Typography>
        {user.Bookmark.length > 0 ? (
          user.Bookmark.map((bookmark) => (
            <Card key={bookmark.id} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                image={bookmark.post.imageUrl}
                alt={bookmark.post.caption || "Príspevok bez popisu"}
              />
              <CardContent>
                <Typography variant="body1">{bookmark.post.caption || "Bez popisu"}</Typography>
              </CardContent>
              <CardActions>
                {/* Add any actions you want for the saved posts */}
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Žiadne uložené príspevky</Typography>
        )}
      </Box>
    </Container>
  );
}