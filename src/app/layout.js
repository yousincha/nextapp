import Link from "next/link";
import "./globals.css";
import { Control } from "./Control";

export const metadata = {
  title: "Web tutorials",
  description: "Generated by YouGod",
};

export default async function RootLayout({ children }) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, {
    cache: "no-store",
  });
  const topics = await resp.json();

  return (
    <html>
      <body>
        <div className="container">
          <header>
            <h1>
              <Link href="/">WEB</Link>
            </h1>
          </header>
          <nav>
            <ol>
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link href={`/read/${topic.id}`}>{topic.title}</Link>
                </li>
              ))}
            </ol>
          </nav>
          <main>{children}</main>
          <footer>
            <Control />
          </footer>
        </div>
      </body>
    </html>
  );
}
