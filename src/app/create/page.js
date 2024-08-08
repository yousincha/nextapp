"use client";

import { useRouter } from "next/navigation";
import styles from "./Create.module.css";

export default function Create() {
  const router = useRouter();
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics`, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.push(`/read/${lastid}`);
            router.refresh();
          });
      }}
    >
      <p>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Title"
        />
      </p>
      <p>
        <textarea
          className={styles.textarea}
          name="body"
          placeholder="Body"
        ></textarea>
      </p>
      <p>
        <input className={styles.submit} type="submit" value="Create" />
      </p>
    </form>
  );
}
