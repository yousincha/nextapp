"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 이 부분을 수정했습니다.

    const title = e.target.title.value;
    const body = e.target.body.value;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };

    try {
      const response = await fetch(`http://localhost:9999/topics`, options);
      const result = await response.json();
      console.log(result);
      const lastid = result.id;
      router.push(`/read/${lastid}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
