import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CurrencyRef from '../../models/currencyRef';
import { selectCurrencyAction } from '../../store/navbarSlice';
import { useAppDispatch } from '../../store/hooks';


interface Props {
    currencies: CurrencyRef[];
    selectedCurrency: CurrencyRef;
}

function CurrenciesRef({ currencies, selectedCurrency }: Props) {

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCurrencyChange = (currencyRef: CurrencyRef) => {
        selectCurrencyAction(dispatch, currencyRef);
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen} color={'inherit'}>
                <Avatar
                    alt=""
                    src={selectedCurrency.iconUrl || ''}
                    sx={{ width: 24, height: 24, mr: 1 }}
                />
                {selectedCurrency.symbol}
            </Button>
            <Dialog disableEscapeKeyDown open={open} maxWidth={'md'} onClose={handleClose}>
                <DialogTitle>
                    Select Currency
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid container spacing={1}>
                            {
                                currencies.map(currency => (
                                    <Grid key={currency.uuid} item xs={12} sm={6} md={4}>
                                        <ToggleButton
                                            value={currency.uuid}
                                            selected={currency.uuid === selectedCurrency.uuid}
                                            style={{ textAlign: 'left', width: '100%', height: '100%', justifyContent: 'start' }}
                                            onChange={() => handleCurrencyChange(currency)}
                                        >
                                            <Avatar
                                                alt=""
                                                src={currency.iconUrl || ''}
                                                sx={{ width: 24, height: 24, mr: 1 }}
                                            />
                                            <Stack>
                                                <Typography variant='subtitle2'>{currency.name}</Typography>
                                                <Typography variant='caption'>{currency.symbol} {!!currency.sign && ` - ${currency.sign}`}</Typography>
                                            </Stack>
                                        </ToggleButton>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CurrenciesRef;
