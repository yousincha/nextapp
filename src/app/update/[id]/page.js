"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import styles from "./Update.module.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
        .then((resp) => resp.json())
        .then((result) => {
          setTitle(result.title);
          setBody(result.body);
          console.log("aaaaa" + result.body);

          setLoading(false); // 데이터 로드 완료 후 로딩 상태 false
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // 에러 발생 시에도 로딩 상태 false
        });
    }
  }, [id]);

  const handleChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const lastid = result.id;
        router.push(`/read/${lastid}`);
        router.refresh();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  if (loading) return <p>Loading...</p>; // 로딩 중일 때 표시

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <ReactQuill
          className={styles.q}
          type="text"
          name="body"
          placeholder="Body"
          value={body}
          onChange={handleChange}
        />
      </div>
      <div>
        <input className={styles.submit} type="submit" value="Update" />
      </div>
    </form>
  );
}
