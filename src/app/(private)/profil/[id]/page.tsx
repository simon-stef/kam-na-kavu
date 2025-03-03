// src/app/profil/[id]/page.tsx

export const metadata = { title: 'Detail profilu | KamNaKavu'};

import ProfileView from '@/sections/ProfileView';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <ProfileView id={params.id} />;
} 