'use client'

import React, { useEffect, useState } from 'react';
import styles from './Job.module.scss';

function Job() {
  const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const getClipPath = (jobIndex) => {
  //   const start = jobIndex * window.innerHeight;
  //   const end = (jobIndex + 1) * window.innerHeight;
  //   const progress = Math.min(Math.max(scrollY - start, 0), window.innerHeight);
  //   const clipPercent = (progress / window.innerHeight) * 100;

  //   return `inset(0 0 ${clipPercent}% 0)`;
  // };

  return (
    <div className={styles.app}>
      <section className={styles.section} id="gioi-thieu">
        <h1>Giới thiệu</h1>
        <p>Đây là phần giới thiệu...</p>
      </section>

      {/* Wrapper cố định cho các phần "Việc làm" */}
      <div className={styles.jobsWrapper}>
        {/* <section className={styles.jobsSection} id="viec-lam">
          <div className={styles.job} style={{ clipPath: getClipPath(0) }}>
            <h2>Việc 1</h2>
          </div>
          <div className={styles.job} style={{ clipPath: getClipPath(1) }}>
            <h2>Việc 2</h2>
          </div>
          <div className={styles.job} style={{ clipPath: getClipPath(2) }}>
            <h2>Việc 3</h2>
          </div>
        </section> */}
      </div>

      <section className={styles.section} id="tong-ket">
        <h1>Tổng kết</h1>
        <p>Đây là phần tổng kết...</p>
      </section>
    </div>
  );
}

export default Job;
