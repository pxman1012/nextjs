import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PUSHWOOSH_SCRIPT } from '../config/pushwoosh.config';
import { useEffect } from 'react';
// import { PPG_SUBCRIBE } from '../config/ppg.subcribe';
// import { PPG_TOGGLE } from '../config/ppg.toggle';
import Script from 'next/script'

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />

                {/* <script src="https://cdn.pushpushgo.com/scripts/sdk.js"></script> */}

                <script src="https://s-eu-1.pushpushgo.com/js/6616535545aef2aa169c8acb.js" async="async"></script>
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

            <main className={styles.main}>
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
            </main>

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
