// src/app/auth/odhlasenie/page.tsx

// import Typography from '@mui/material/Typography';

export const metadata = { title: 'Odhlásiť sa | KamNaKavu'};

export default function SignOut() {
  return (
    <button onClick={() => signOut()}>Odhlásiť sa</button>

  );
}
