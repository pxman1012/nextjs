import React, { useEffect } from 'react';
import styles from './Job.module.scss'; // Import SCSS Module

function Job() {
    useEffect(() => {
        const handleScroll = () => {
            const jobSection = document.getElementById('viec-lam');
            const jobSectionTop = jobSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (jobSectionTop <= windowHeight / 2) {
                jobSection.classList.add(styles.scrolled);
            } else {
                jobSection.classList.remove(styles.scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.app}>
            <section className={styles.section} id="gioi-thieu">
                <h1>Giới thiệu</h1>
                <p>Đây là phần giới thiệu...</p>
            </section>

            <section className={styles.jobsSection} id="viec-lam">
                <div className={styles.job} id={styles.job1}>
                    <h2>Việc 1</h2>
                </div>
                <div className={styles.job} id={styles.job2}>
                    <h2>Việc 2</h2>
                </div>
                <div className={styles.job} id={styles.job3}>
                    <h2>Việc 3</h2>
                </div>
            </section>

            <section className={styles.section} id="tong-ket">
                <h1>Tổng kết</h1>
                <p>Đây là phần tổng kết...</p>
            </section>
        </div>
    );
}

export default Job;
