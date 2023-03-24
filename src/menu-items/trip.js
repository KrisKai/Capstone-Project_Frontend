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
            url: '/sample-page',
            icon: icons.ChromeOutlined
        },
        {
            id: 'trip-create',
            title: 'Create Trip',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.QuestionOutlined
        }
    ]
};

export default trip;
