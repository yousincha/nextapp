"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import styles from "./Create.module.css";

// SSR을 비활성화한 상태에서 동적으로 ReactQuill을 로드합니다.
const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  // 클라이언트에서만 Quill과 ImageResize 모듈을 등록합니다.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Quill = require("react-quill").Quill;
      const ImageResize = require("quill-image-resize-module-react").default;
      Quill.register("modules/imageResize", ImageResize);
    }
  }, []);

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
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

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
        {/* DynamicReactQuill은 클라이언트에서만 로드됩니다. */}
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
