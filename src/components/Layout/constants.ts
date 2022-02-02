import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';


export const drawerWidth = 240;

export const navLinks: { text: string, icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; } }[] = [
    {
        text: 'Coins',
        icon: MonetizationOnOutlinedIcon
    },
    {
        text: 'Exchanges',
        icon: CurrencyExchangeOutlinedIcon
    },
    {
        text: 'News',
        icon: NewspaperOutlinedIcon
    },
    {
        text: 'Convertor',
        icon: ChangeCircleOutlinedIcon
    }
];