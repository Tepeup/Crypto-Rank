import Head from "next/head";
import styles from "../styles/Home.module.css";
import RankingList from "../components/RankingList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> My Top Crypto </title>{" "}
        <meta name="description" content="Rank your top ten Cryptocurrencies" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RankingList />
      </main>
    </div>
  );
}
