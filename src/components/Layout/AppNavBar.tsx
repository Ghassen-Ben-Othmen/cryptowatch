import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerWidth } from './constants';
import { IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brand from './Brand';
import ThemeSwitch from './ThemeSwitch';
import { globalStatsService } from '../../services';
import { retrieveGlobalStatsAction } from '../../store/golobalStatsSlice';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  open: boolean,
  handleDrawerOpen: () => void
}

function AppNavBar({ open, handleDrawerOpen }: Props) {

  const dispatch = useAppDispatch();
  const globalStats = useAppSelector(state => state.globalStats);
  console.log(globalStats);

  useEffect(() => {
    retrieveGlobalStatsAction(dispatch);
  }, []);

  return (
    <AppBar position="fixed" open={open}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          { !open && <Brand /> }
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
  );
}

export default AppNavBar;
