import moment from 'moment';
import 'moment/locale/vi'; // Import ngôn ngữ tiếng Việt

function timeAgo(timeServer, locale = 'en') {
    moment.locale(locale);
    return moment(timeServer).fromNow();
}

export default timeAgo;
