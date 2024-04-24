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

const Clock = () => {
    const [localDateTime, setLocalDateTime] = useState('');
    const [polandDateTime, setPolandDateTime] = useState('');
    const [getTime, setGetTime] = useState(true);

    useEffect(() => {
        // Gọi API để lấy thông tin vị trí từ địa chỉ IP của người dùng
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY')
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem người dùng có ở Ba Lan không
                const isPoland = data.country_code2 === 'PL';

                // Lấy thứ, ngày và giờ địa phương
                const localFormattedDateTime = moment().locale('vi').format('dddd, MMMM Do YYYY, HH:mm:ss');
                setLocalDateTime(localFormattedDateTime);

                // Nếu người dùng không ở Ba Lan, lấy thứ, ngày và giờ Ba Lan
                if (!isPoland) {
                    const polandTimezone = 'Europe/Warsaw';
                    const polandFormattedDateTime = moment().tz(polandTimezone).locale('vi').format('dddd, MMMM Do YYYY, HH:mm:ss');
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
