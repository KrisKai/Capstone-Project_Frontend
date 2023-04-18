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
            title: 'List of Trips',
            type: 'item',
            url: '/admin/tripList',
            icon: icons.ChromeOutlined
        }
    ]
};

export default trip;
