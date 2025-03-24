// src/app/(public)/o-nas/page.tsx

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const metadata = { title: 'O nás | KamNaKavu' };

export default function AboutUs() {
    return (
        <Container sx={{ padding: 2 }}>
            <Box 
                sx={{ 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    padding: 4, 
                    marginTop: 4 
                }}
            >
                <Typography 
                    variant="h3" 
                    align="center" 
                    sx={{ 
                        background: 'linear-gradient(90deg, #6a5acd, #00bfff)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                    }}
                >
                    O nás
                </Typography>
                <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                    KamNaKavu je platforma, ktorá spája milovníkov kávy a pomáha im objavovať nové kaviarne.
                </Typography>
                <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                    Našou misiou je vytvoriť komunitu, kde si môžu ľudia zdieľať svoje zážitky a odporúčania.
                </Typography>
                <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                    Pridajte sa k nám a objavte svet kávy spolu s ostatnými nadšencami!
                </Typography>
            </Box>
        </Container>
    );
}