"use client";

import Button from '@mui/material/Button';
import { PaletteMode } from '@mui/material';
 
interface ThemeToggleProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}
 
function ThemeSwitcher({ mode, setMode }: ThemeToggleProps) {
  return (
    <Button
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </Button>
  );
}
 
export default ThemeSwitcher;