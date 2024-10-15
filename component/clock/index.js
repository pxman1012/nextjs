// 'use client'

// import React, { useState, useEffect } from 'react';
// import moment from 'moment-timezone';

// const Clock = () => {
//     const [localTime, setLocalTime] = useState('');
//     const [polandTime, setPolandTime] = useState('');
//     const [getTime, setGetTime] = useState(true);

//     useEffect(() => {
//         // Lấy vị trí của người dùng
//         navigator.geolocation.getCurrentPosition((position) => {
//             console.log('position ======', position)
//             const { latitude, longitude } = position.coords;

//             // Tạo URL cho việc lấy thông tin vị trí từ API
//             const apiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;

//             // Gọi API để lấy thông tin vị trí
//             fetch(apiUrl)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     // Kiểm tra xem người dùng có ở Ba Lan không
//                     const isPoland = data.country === 'Poland';

//                     // Lấy giờ địa phương
//                     const localFormattedTime = moment().format('HH:mm:ss');

//                     // Cập nhật state để hiển thị giờ địa phương
//                     setLocalTime(localFormattedTime);

//                     // Nếu người dùng không ở Ba Lan, lấy giờ Ba Lan
//                     if (!isPoland) {
//                         const polandTimezone = 'Europe/Warsaw';
//                         const polandFormattedTime = moment().tz(polandTimezone).format('HH:mm:ss');

//                         // Cập nhật state để hiển thị giờ Ba Lan
//                         setPolandTime(polandFormattedTime);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching location:', error);
//                 });
//         });
//     }, [getTime]);

//     return (
//         <div style={{
//             width: '100vw',
//             textAlign: 'center'
//         }}>
//             <h2>Your Local Time:</h2>
//             <p>{localTime}</p>
//             {polandTime && (
//                 <>
//                     <h2>Poland Time:</h2>
//                     <p>{polandTime}</p>
//                 </>
//             )}
//             <button onClick={() => setGetTime(!getTime)}>GET TIME</button>
//         </div>
//     );
// };

// export default Clock;


import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

// import { parseISO, format } from 'date-fns';
import { parseISO, setDefaultOptions } from 'date-fns';
// import { format } from 'date-fns-tz';
import { pl, vi } from 'date-fns/locale';
// import vi from 'date-fns/locale/vi';

// Import các hàm cần thiết từ thư viện date-fns-tz
import { format, utcToZonedTime } from 'date-fns-tz';

const Clock = () => {
    const [localDateTime, setLocalDateTime] = useState('');
    const [polandDateTime, setPolandDateTime] = useState('');
    const [getTime, setGetTime] = useState(true);

    const date = "2024-05-07T18:50:00Z";
    setDefaultOptions({ locale: pl })

    // Chuyển đổi thời gian từ chuỗi sang đối tượng thời gian
    // const serverParsedTime = parseISO(date);
    const serverParsedTime = new Date(date);

    // Chuyển đổi thời gian từ UTC sang múi giờ của Ba Lan (GMT+2)
    // const polandTime = format(serverParsedTime, 'yyyy-MM-dd HH:mm:ss', { locale: pl, timeZone: 'Europe/Warsaw' });
    // const polandTime = format(serverParsedTime, 'yyyy-MM-dd HH:mm:ss');

    // Múi giờ UTC+2
    const utcPlus2TimeZone = 'UTC+2';
    const polandTime = format(serverParsedTime, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Europe/Paris' });

    const currentDate = new Date(date);

    // Mã múi giờ cho Paris (UTC+2)
    const parisTimeZone = 'Europe/Paris';

    // Định dạng ngày giờ theo múi giờ Paris (UTC+2)
    const formattedDateParis = format(currentDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: parisTimeZone });

    console.log('Ngày giờ theo múi giờ Paris (UTC+2):', formattedDateParis);


    // Chuyển đổi thời gian từ UTC sang múi giờ của Việt Nam (GMT+7)
    const localTime = format(serverParsedTime, 'yyyy-MM-dd HH:mm:ss');

    console.log("Thời gian ở Ba Lan:", polandTime);
    console.log("Thời gian ở Việt Nam:", localTime);

    useEffect(() => {
        // Gọi API để lấy thông tin vị trí từ địa chỉ IP của người dùng
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY')
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem người dùng có ở Ba Lan không
                const isPoland = data.country_code2 === 'PL';

                // Lấy thứ, ngày và giờ địa phương
                // const localFormattedDateTime = moment(date).locale('vi').format('dddd, MMMM Do YYYY, HH:mm:ss');
                const localFormattedDateTime = moment(date).format('YYYY-MM-DD HH:mm');
                setLocalDateTime(localFormattedDateTime);

                // Nếu người dùng không ở Ba Lan, lấy thứ, ngày và giờ Ba Lan
                if (!isPoland) {
                    const polandTimezone = 'Europe/Warsaw';
                    // const polandFormattedDateTime = moment(date).tz(polandTimezone).locale('vi').format('dddd, MMMM Do YYYY, HH:mm:ss');
                    // const polandFormattedDateTime = moment(date).tz(polandTimezone).format('YYYY-MM-DD HH:mm');
                    const polandFormattedDateTime = moment(date).tz(polandTimezone).format('dddd DD/MM');
                    setPolandDateTime(polandFormattedDateTime);
                }
            })
            .catch((error) => {
                console.error('Error fetching location:', error);
            });
    }, []);

    return (
        <div style={{
            width: '100vw',
            textAlign: 'center'
        }}>
            <h2>Server time</h2>
            <p>{date}</p>
            <h2>Poland time</h2>
            <p>{polandTime}</p>
            <h2>Vietnamese time</h2>
            <p>{localTime}</p>
            <h2>Your Local Date & Time:</h2>
            <p>{localDateTime}</p>
            {polandDateTime && (
                <>
                    <h2>Poland Date & Time:</h2>
                    <p>{polandDateTime}</p>
                </>
            )}
            <button onClick={() => setGetTime(!getTime)}>GET TIME</button>
        </div>
    );
};

export default Clock;
