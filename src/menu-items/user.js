// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    FontSizeOutlined,
    UserAddOutlined,
    LoadingOutlined,
    UserOutlined,
    FeedbackOutlined
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
            title: 'List of Users',
            type: 'item',
            url: '/admin/userList',
            icon: icons.UserOutlined
        }
    ]
};

export default user;
