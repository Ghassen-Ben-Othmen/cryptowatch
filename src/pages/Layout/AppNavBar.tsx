import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerWidth } from './constants';
import { IconButton, Skeleton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brand from './Brand';
import { initAction, selectCurrencyAction } from '../../store/navbarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CurrenciesRef from './CurrenciesRef';
import Stats from './Stats';
import CurrencyRef from '../../models/currencyRef';


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

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navbarState = useAppSelector(state => state.navbar);

  const handleCurrencyChange = (currencyRef: CurrencyRef) => {
    setStatsLoading(true);
    selectCurrencyAction(dispatch, currencyRef).subscribe(_ => setStatsLoading(false));
  }

  useEffect(() => {
    const subscription = initAction(dispatch).subscribe(_ => setLoading(false));

    return () => {
      subscription.unsubscribe();
    }
  }, [dispatch]);

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
        {!open && <Brand />}
        <div style={{ flexGrow: 1, overflowX: 'auto' }}>
          {
            loading || statsLoading ? <Skeleton /> : (
              <Stats stats={navbarState.stats} currencySign={navbarState.selectedCurrency.sign || navbarState.selectedCurrency.symbol} />
            )
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            loading ? <Skeleton /> : (
              <CurrenciesRef currencies={navbarState.currenciesRef} selectedCurrency={navbarState.selectedCurrency} onCurrencyChange={handleCurrencyChange} />
            )
          }
          {/* <ThemeSwitch /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavBar;
