"use client";

import { useState, useEffect } from "react";
import styles from "./Read.module.css";

export default function Read(props) {
  const [topic, setTopic] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`,
          { cache: "no-store" }
        );
        if (!resp.ok) throw new Error("Network response was not ok");
        const data = await resp.json();
        setTopic(data);
        setLikes(data.likes || 0);
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };

    fetchTopic();
  }, [props.params.id]);

  const handleLike = async () => {
    try {
      // 좋아요 수를 클라이언트 측에서 증가
      setLikes((prevLikes) => prevLikes + 1);

      // 서버에 좋아요 수 업데이트 요청
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: likes + 1 }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const updatedTopic = await response.json();
      setLikes(updatedTopic.likes);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  if (!topic) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{topic.title}</h2>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: topic.body }}
      />
      <div className={styles.likeContainer}>
        <button className={styles.likeButton} onClick={handleLike}>
          👍 {likes} Likes
        </button>
      </div>
    </div>
  );
}
