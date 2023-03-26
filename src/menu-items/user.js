// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    FontSizeOutlined,
    UserAddOutlined,
    LoadingOutlined,
    UserOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    UserAddOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    UserOutlined
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
            url: '/admin/userList',
            icon: icons.UserOutlined
        },
        {
            id: 'user-create',
            title: 'Create User',
            type: 'item',
            url: '/admin/userCreate',
            icon: icons.UserAddOutlined
        }
    ]
};

export default user;
