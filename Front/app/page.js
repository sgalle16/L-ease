import Page from "./search/page";
import Header from "./search/Header";
import Footer from "./search/Footer";
import Category from "./search/components/Category";
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>RentEvo - Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Category />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}
