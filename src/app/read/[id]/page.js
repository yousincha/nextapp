import styles from "./Read.module.css";

export default async function Read(props) {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `topics/${props.params.id}`,
    {
      cache: "no-store",
    }
  );
  const topic = await resp.json();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{topic.title}</h2>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: topic.body }}
      />
    </div>
  );
}
