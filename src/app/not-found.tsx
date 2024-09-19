// src/app/notfound.tsx

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const metadata = { title: 'Zadaná stránka nebola nájdená | KamNaKavu'};

export default function NotFound() {
    return (
        <Box>
            <Typography>Zadaná stránka nexistuje</Typography>
        </Box>
    );
}
