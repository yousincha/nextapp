"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./Update.module.css";
// import Quill from "react-quill";
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

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const images = document.querySelectorAll(".ql-editor img");
    images.forEach((img) => {
      img.classList.add("resizable-img");
    });
  }, [body]);

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
        const lastid = result.id;
        router.push(`/read/${lastid}`);
        router.refresh();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      // ImageResize 모듈을 사용하여 이미지 크기 조절 기능 활성화
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  if (loading) return <p>Loading...</p>;

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
        <DynamicReactQuill
          className={styles.q}
          value={body}
          onChange={handleChange}
          placeholder="Body"
          modules={modules}
        />
      </div>
      <div className={styles.buttonContainer}>
        <input className={styles.submit} type="submit" value="Update" />
      </div>
    </form>
  );
}
