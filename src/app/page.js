import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome</h2>
      <p className={styles.greeting}>Hello, WEB!</p>
      <Image
        className={styles.image}
        src="/hello.png"
        alt="Hello Image"
        width={80}
        height={80}
      />
    </div>
  );
}
