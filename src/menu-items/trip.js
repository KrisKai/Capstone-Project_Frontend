// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS  ||============================== //

const trip = {
    id: 'trip',
    title: 'Trip',
    type: 'group',
    children: [
        {
            id: 'trip-list',
            title: 'List Trip',
            type: 'item',
            url: '/admin/tripList',
            icon: icons.ChromeOutlined
        },
        {
            id: 'trip-create',
            title: 'Create Trip',
            type: 'item',
            url: '/admin/tripCreate',
            icon: icons.QuestionOutlined
        }
    ]
};

export default trip;
