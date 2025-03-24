import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import EditProfileForm from "@/components/EditProfileForm";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: 'Upraviť profil | KamNaKavu',
  description: 'Úprava profilu používateľa'
};

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return <Typography>Please sign in to edit your profile</Typography>;
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
          <Typography variant="h5" gutterBottom align="center">
            Upraviť profil
          </Typography>
          <EditProfileForm 
            initialData={{
              name: user.name || '',
              bio: user.profile?.bio || '',
              location: user.profile?.location || '',
            }}
            userId={user.id}
          />
        </CardContent>
      </Card>
    </Container>
  );
} 