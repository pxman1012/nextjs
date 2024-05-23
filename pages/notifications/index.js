import React from 'react';
import timeAgo from '../../utils/timeAgo';

const Notification = ({ notification, locale }) => {
    return (
        <div className="notification">
            <p>{notification.message}</p>
            <small>{timeAgo(notification.timeServer, locale)}</small>
        </div>
    );
};

const notifications = [
    { id: 1, message: 'You have a new message', timeServer: '2024-05-21T12:00:00Z' },
    { id: 2, message: 'Someone liked your post', timeServer: '2024-05-20T15:00:00Z' },
    { id: 3, message: 'Bạn có tin nhắn mới', timeServer: '2024-05-23T12:00:00Z' },
    { id: 4, message: 'Ai đó đã thích bài viết của bạn', timeServer: '2024-05-22T15:00:00Z' },
    // Thêm nhiều thông báo khác
];

const NotificationList = ({ locale = 'vi' }) => {
    return (
        <div className="notification-list">
            {notifications.map(notification => (
                <Notification key={notification.id} notification={notification} locale={locale} />
            ))}
        </div>
    );
};

export default NotificationList;
