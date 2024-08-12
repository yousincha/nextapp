"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  useEffect(() => {
    // 30초마다 페이지 새로고침
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 30000);

    // 컴포넌트 언마운트 시 interval 해제
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>안녕하세요🍀</h2>
      <p className={styles.greeting}>여러분의 이야기를 공유해주세요.</p>
      <Image
        className={styles.image}
        src="/profile.jpg"
        alt="Profile Image"
        width={80}
        height={80}
      />
    </div>
  );
}
