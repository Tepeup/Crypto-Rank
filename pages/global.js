import Head from "next/head";
import styles from "../styles/Home.module.css";
import GlobalRankings from "../components/GlobalRankings";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Global Top Ten Crypto </title>{" "}
        <meta
          name="description"
          content="Most Popular Cryptocurrencies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GlobalRankings />
      </main>
    </div>
  );
}
