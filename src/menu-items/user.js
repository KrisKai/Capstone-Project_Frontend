// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const user = {
    id: 'user',
    title: 'User',
    type: 'group',
    children: [
        {
            id: 'user-list',
            title: 'List User',
            type: 'item',
            url: '/typography',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'user-create',
            title: 'Create User',
            type: 'item',
            url: '/color',
            icon: icons.BgColorsOutlined
        }
    ]
};

export default user;
