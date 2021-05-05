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
        <meta property="og:image" content="../assets/preview.png" />
        <meta name="twitter:creator" content="@SovereignKiche" />
        <meta property="og:title" content="Crypto Currency Rankings" />
        <meta
          property="og:description"
          content="Vote on your favorite cryptocurrencies and submit them to the global rankings. See how your top ten compare to the global top ten crypto currencies which are based on the peoples votes!"
        />
        <meta name="twitter:card" content="summary"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RankingList />
      </main>
    </div>
  );
}
