// assets
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const feedback = {
    id: 'feedback',
    title: 'Feedback',
    type: 'group',
    children: [
        {
            id: 'feedback-list',
            title: 'List of Feedbacks',
            type: 'item',
            url: '/admin/feedbackList',
            icon: FeedbackOutlinedIcon
        }
    ]
};

export default feedback;
