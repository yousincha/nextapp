"use client";

import { useState, useEffect } from "react";
import styles from "./Read.module.css";

export default function Read(props) {
  const [topic, setTopic] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
    const interval = setInterval(fetchTopic, 10000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(interval);
  }, [props.params.id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}/comments`,
          { cache: "no-store" }
        );
        if (!resp.ok) throw new Error("Network response was not ok");
        const data = await resp.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
    const interval = setInterval(fetchComments, 10000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(interval);
  }, [props.params.id]);

  const handleLike = async () => {
    try {
      setLikes((prevLikes) => prevLikes + 1);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim() === "") return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const newCommentData = await response.json();
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}comments/${commentId}`, // 댓글 ID로 삭제 요청
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error deleting comment:", errorDetails);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // 댓글 삭제 성공 시 상태 업데이트
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
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
          ❤️ {likes}
        </button>
      </div>

      <div className={styles.commentsContainer}>
        <h3>📪</h3>
        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              {comment.text}
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteComment(comment.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          <textarea
            className={styles.commentInput}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="의견을 남겨보세요..✏️"
          />
          <button type="submit" className={styles.commentButton}>
            ✉️
          </button>
        </form>
      </div>
    </div>
  );
}
