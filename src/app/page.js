import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      Hello, WEB!
      <br />
      <Image src="/hello.png" alt="Hello Image" width={80} height={80} />
    </>
  );
}
