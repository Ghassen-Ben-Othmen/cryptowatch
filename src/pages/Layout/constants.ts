import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';


export const drawerWidth = 240;

type NavLink = {
    text: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    to: string
}

export const navLinks: NavLink[] = [
    {
        text: 'Coins',
        icon: MonetizationOnOutlinedIcon,
        to: 'coins'
    },
    {
        text: 'Exchanges',
        icon: CurrencyExchangeOutlinedIcon,
        to: 'exchanges'
    },
    {
        text: 'News',
        icon: NewspaperOutlinedIcon,
        to: 'news'
    }
];