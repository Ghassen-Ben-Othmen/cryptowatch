import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppNavBar from './AppNavBar';
import AppSideBar, { DrawerHeader } from './AppSideBar';

type Props = {
  children?: JSX.Element
};

function Layout({ children }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={(theme) => ({ display: 'flex', bgcolor: theme.palette.grey[100] })}>
      <CssBaseline />
      <AppNavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <AppSideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={(theme) => ({ flexGrow: 1, p: 3 })}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
