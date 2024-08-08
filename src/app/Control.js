"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styles from "./Control.module.css";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ul className={styles.controlList}>
      <li className={styles.controlItem}>
        <Link href="/create" className={styles.controlLink}>
          Create
        </Link>
      </li>
      {id ? (
        <>
          <li className={styles.controlItem}>
            <Link href={`/update/${id}`} className={styles.controlLink}>
              Update
            </Link>
          </li>
          <li className={styles.controlItem}>
            <input
              type="button"
              value="Delete"
              className={styles.controlButton}
              onClick={() => {
                const options = { method: "DELETE" };
                fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id, options)
                  .then((resp) => resp.json())
                  .then((result) => {
                    router.push("/");
                    router.refresh();
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
