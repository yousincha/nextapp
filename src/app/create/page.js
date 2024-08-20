"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./Create.module.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

// ImageResize 모듈 등록 (클라이언트 사이드에서만 실행)
if (typeof window !== "undefined" && Quill) {
  try {
    Quill.register("modules/imageResize", ImageResize);
  } catch (error) {
    console.error("Error registering ImageResize module:", error);
  }
}

// 동적으로 ReactQuill 로드
const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!body.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };

    fetch(process.env.NEXT_PUBLIC_API_URL + "topics", options)
      .then((res) => res.json())
      .then((result) => {
        const lastid = result.id;
        router.push(`/read/${lastid}`);
        router.refresh();
      });
  };

  // Quill 모듈 설정
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"], // 이미지 버튼 추가
      ["clean"],
    ],
    imageResize: {
      // ImageResize 모듈을 사용하여 이미지 크기 조절 기능 활성화
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <DynamicReactQuill
          className={styles.quill}
          value={body}
          onChange={handleChange}
          placeholder="내용을 작성해보세요"
          modules={modules}
        />
      </div>
      <div className={styles.buttonContainer}>
        <input className={styles.submit} type="submit" value="Create" />
      </div>
    </form>
  );
}
