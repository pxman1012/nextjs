'use client'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { PUSHWOOSH_SCRIPT } from '../config/pushwoosh.config';
import { useEffect, useState } from 'react';
// import { PPG_SUBCRIBE } from '../config/ppg.subcribe';
// import { PPG_TOGGLE } from '../config/ppg.toggle';
import Script from 'next/script'
import WelcomePopup from '../component/pop-up';

const pushPushGoConfig = {
    'nextjs-ppg.vercel.app': '670e2ec97004ee67a0f4bd85',
    'nextjs-pushwoosh.vercel.app': '6616535545aef2aa169c8acb',
    'localhost:4200': '6616535545aef2aa169c8acb',
    'localhost:3000': '670e2ec97004ee67a0f4bd85',
    // 'localhost:4200': '64896a37402e4ef3feb866c2',
    // 'polsatboxgo.pl': '64896a37402e4ef3feb866c2',
    // 'www.elevensports.pl': '648bf3b3599526d9fc5c70bc',
    // 'elevensports.pl': '648bf3b3599526d9fc5c70bc',
};

export default function Home() {
    // const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Chỉ chạy trên client-side
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname.replace(/^www\./, ''); // Loại bỏ 'www.' nếu có
            const ppgId = pushPushGoConfig[hostname];

            if (ppgId) {
                // Thêm script PushPushGo vào DOM
                const script = document.createElement('script');
                // importScripts(`https://cdn.pushpushgo.com/${ppgId}/worker.js`);
                script.src = `https://cdn.pushpushgo.com/js/${ppgId}.js`;
                // script.src = `https://s-eu-1.pushpushgo.com/js/${ppgId}.js`;
                script.async = true;
                document.head.appendChild(script);

                // Kiểm tra hỗ trợ Service Worker
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker
                        .register(`/sw.js?ppgId=${ppgId}`)
                        .then((registration) => {
                            console.log('Service Worker registered for domain:', hostname);
                        })
                        .catch((error) => {
                            console.error('Error registering Service Worker:', error);
                        });
                } else {
                    console.warn('Service Worker not supported in this browser.');
                }
            } else {
                console.warn('No PushPushGo config found for hostname:', hostname);
            }
        }
    }, []);

    // useEffect(() => {
    //     // Chỉ đăng ký một lần service worker
    //     if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    //         const hostname = window.location.hostname.replace(/^www\./, '');
    //         const ppgId = pushPushGoConfig[hostname];

    //         if (ppgId) {
    //             navigator.serviceWorker
    //                 .register(`/sw.js?ppgId=${ppgId}`)
    //                 .then((registration) => {
    //                     console.log('Service Worker registered for domain:', hostname);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error registering Service Worker:', error);
    //                 });
    //         } else {
    //             console.warn('No PushPushGo config found for hostname:', hostname);
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     // Chỉ chạy trên client-side
    //     if (typeof window !== 'undefined') {
    //         const hostname = window.location.hostname.replace(/^www\./, ''); // Loại bỏ 'www.' nếu có
    //         const ppgId = pushPushGoConfig[hostname];

    //         if (ppgId) {
    //             // Thêm script PushPushGo vào DOM
    //             const script = document.createElement('script');
    //             script.src = `https://s-eu-1.pushpushgo.com/js/${ppgId}.js`;
    //             script.async = true;
    //             document.head.appendChild(script);

    //             // Kiểm tra hỗ trợ Service Worker
    //             if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    //                 navigator.serviceWorker
    //                     .register(`/sw.js?ppgId=${ppgId}`)
    //                     .then((registration) => {
    //                         console.log('Service Worker registered for domain:', hostname);
    //                     })
    //                     .catch((error) => {
    //                         console.error('Error registering Service Worker:', error);
    //                     });
    //             }

    //             // Kiểm tra nếu PushPushGo đã được tải
    //             const checkPushPushGoLoaded = () => {
    //                 if (typeof window.PushPushGo !== 'undefined') {
    //                     const pushClient = window.PushPushGo;

    //                     // Kiểm tra hỗ trợ Push Notifications
    //                     pushClient.isPushSupport()
    //                         .then(() => {
    //                             console.log('Push notifications are supported.');

    //                             // Kiểm tra người dùng đã đăng ký chưa
    //                             return pushClient.isSubscribed();
    //                         })
    //                         .then((isSubscribed) => {
    //                             if (!isSubscribed) {
    //                                 // Nếu chưa đăng ký, hiển thị dialog subscribe
    //                                 return pushClient.register();
    //                             } else {
    //                                 console.log('User is already subscribed.');
    //                             }
    //                         })
    //                         .then((subscriberId) => {
    //                             if (subscriberId) {
    //                                 console.log('User subscribed successfully with ID:', subscriberId);
    //                             }
    //                         })
    //                         .catch((error) => {
    //                             console.error('Error during subscription:', error);
    //                         });
    //                 } else {
    //                     // Nếu PushPushGo chưa được tải, chờ 1 chút và kiểm tra lại
    //                     setTimeout(checkPushPushGoLoaded, 500);
    //                 }
    //             };

    //             // Gọi hàm kiểm tra PushPushGo
    //             checkPushPushGoLoaded();
    //         } else {
    //             console.warn('No PushPushGo config found for hostname:', hostname);
    //         }
    //     }
    // }, []);


    // Sử dụng useEffect để hiển thị popup khi user vào trang
    // useEffect(() => {
    //     setShowPopup(true);
    // }, []);

    // // Hàm để đóng popup
    // const closePopup = () => {
    //     setShowPopup(false);
    // };

    // useEffect(() => {
    //     // Chỉ chạy trên client-side
    //     if (typeof window !== 'undefined') {
    //         const hostname = window.location.hostname.replace(/^www\./, ''); // Loại bỏ 'www.' nếu có
    //         const ppgId = pushPushGoConfig[hostname];

    //         if (ppgId) {
    //             const script = document.createElement('script');
    //             script.src = `https://s-eu-1.pushpushgo.com/js/${ppgId}.js`;
    //             script.async = true;
    //             document.head.appendChild(script);

    //             // Đăng ký service worker dựa trên PPG ID
    //             navigator.serviceWorker
    //                 .register(`https://s-eu-1.pushpushgo.com/${ppgId}/worker.js`)
    //                 .then((registration) => {
    //                     console.log('PushPushGo worker registered for domain:', hostname);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error registering PushPushGo worker:', error);
    //                 });
    //         } else {
    //             console.warn('No PushPushGo config found for hostname:', hostname);
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     const checkPushPushGoLoaded = () => {
    //         // Kiểm tra nếu PushPushGo đã được tải
    //         if (typeof window.PushPushGo !== 'undefined') {
    //             const pushClient = window.PushPushGo;

    //             // Kiểm tra hỗ trợ Push Notifications
    //             pushClient.isPushSupport()
    //                 .then(() => {
    //                     console.log('Push notifications are supported.');

    //                     // Kiểm tra người dùng đã đăng ký chưa
    //                     return pushClient.isSubscribed();
    //                 })
    //                 .then((isSubscribed) => {
    //                     if (!isSubscribed) {
    //                         // Nếu chưa đăng ký, hiển thị dialog subscribe
    //                         return pushClient.register();
    //                     } else {
    //                         console.log('User is already subscribed.');
    //                     }
    //                 })
    //                 .then((subscriberId) => {
    //                     if (subscriberId) {
    //                         console.log('User subscribed successfully with ID:', subscriberId);
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error during subscription:', error);
    //                 });
    //         } else {
    //             // Nếu PushPushGo chưa được tải, chờ 1 chút và kiểm tra lại
    //             setTimeout(checkPushPushGoLoaded, 500);
    //         }
    //     };

    //     // Gọi hàm kiểm tra PushPushGo
    //     checkPushPushGoLoaded();
    // }, []);

    return (
        <div className={styles.container}>
            {/* {showPopup && <WelcomePopup onClose={closePopup} />} */}
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <script src="https://cdn.pushpushgo.com/scripts/sdk.js"></script>

                {/* <script src="https://cdn.pushpushgo.com/scripts/sdk.js"></script> */}

                {/* <script src="https://s-eu-1.pushpushgo.com/js/6616535545aef2aa169c8acb.js" async="async"></script> */}
                {/* <script src="https://s-eu-1.pushpushgo.com/js/670e2ec97004ee67a0f4bd85.js" async="async"></script> */}
                {/* <script charset="UTF-8" src="https://s-eu-1.pushpushgo.com/js/670e2ec97004ee67a0f4bd85.js" async="async"></script> */}

                {/* <Script charset="UTF-8" src="https://s-eu-1.pushpushgo.com/js/6616535545aef2aa169c8acb.js" async="async"/> */}

                {/* <link rel="manifest" href="/manifest.json" />

                <script
                type="text/javascript"
                src="//cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js"
                async
                ></script> */}

                {/* <script
                dangerouslySetInnerHTML={{
                    __html: PUSHWOOSH_SCRIPT
                }}
                /> */}

            </Head>

            {/* <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main> */}

            <div>
                <h1>Welcome to PushPushGo Integration</h1>
            </div>

            {/* <NextScript /> */}
            {/* Chèn mã JavaScript vào cuối phần body */}
            {/* <script
                dangerouslySetInnerHTML={{
                    __html: PPG_TOGGLE,
                }}
            /> */}

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}
