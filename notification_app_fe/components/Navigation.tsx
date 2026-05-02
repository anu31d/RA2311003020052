'use client';

import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';

export default function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#FFB6C1', color: '#333' }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Typography 
          variant={isMobile ? 'body1' : 'h6'} 
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          {isMobile ? 'Notify' : 'Notifications'}
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 2 }, flexWrap: 'nowrap' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button 
              size={isMobile ? 'small' : 'medium'}
              sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, color: '#333', '&:hover': { backgroundColor: '#FFD4E5' } }}
            >
              All
            </Button>
          </Link>
          <Link href="/priority" style={{ textDecoration: 'none' }}>
            <Button 
              size={isMobile ? 'small' : 'medium'}
              sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, color: '#333', '&:hover': { backgroundColor: '#FFD4E5' } }}
            >
              Priority
            </Button>
          </Link>
          <Link href="/filter" style={{ textDecoration: 'none' }}>
            <Button 
              size={isMobile ? 'small' : 'medium'}
              sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, color: '#333', '&:hover': { backgroundColor: '#FFD4E5' } }}
            >
              Filter
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
