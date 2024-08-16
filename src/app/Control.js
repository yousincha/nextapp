"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Control.module.css";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ul className={styles.controlList}>
      <li className={styles.controlItem}>
        <Link href="/create" className={styles.createButton}>
          <Image src="/add.png" alt="Create" width={40} height={40} />
        </Link>
      </li>
      {id ? (
        <>
          <li className={styles.controlItem}>
            <Link href={`/update/${id}`} className={styles.updateButton}>
              <Image src="/reload.png" alt="Update" width={40} height={40} />
            </Link>
          </li>
          <li className={styles.controlItem}>
            <input
              type="button"
              value=""
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
            <Image src="/delete.png" alt="Delete" width={40} height={40} />
          </li>
        </>
      ) : null}
    </ul>
  );
}
