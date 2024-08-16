"use client";
import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
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
