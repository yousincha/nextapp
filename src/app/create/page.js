"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import styles from "./Create.module.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };

    fetch(process.env.NEXT_PUBLIC_API_URL + "topics", options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const lastid = result.id;
        router.push(`/read/${lastid}`);
        router.refresh();
      });
  };

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
          className={styles.quill}
          value={body}
          onChange={handleChange}
          placeholder="Body"
        />
      </div>
      <div>
        <input className={styles.submit} type="submit" value="Create" />
      </div>
    </form>
  );
}
