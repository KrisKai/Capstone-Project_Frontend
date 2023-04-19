import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';

// ==============================|| MENU ITEMS  ||============================== //

const item = {
    id: 'item',
    title: 'Item management',
    type: 'group',
    children: [
        {
            id: 'item-list',
            title: 'Statistic of Items',
            type: 'item',
            url: '/admin/itemList',
            icon: TurnedInNotOutlinedIcon
        },
        {
            id: 'category-list',
            title: 'Category of Items',
            type: 'item',
            url: '/admin/itemCategory',
            icon: CategoryOutlinedIcon
        }
    ]
};

export default item;
