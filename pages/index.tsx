import type { NextPage } from 'next';
import Head from 'next/head';

import dbConnect from '../lib/mongodb';

import styles from '../styles/Home.module.css';

import GenFrom from '../components/GenForm/GenFrom';

const Home: NextPage = () => {
  //
  const setResult = (res: string) => {
    console.log(res);
  };

  return (
    <div>
      <Head>
        <title>Mini-Git</title>
        <meta name="description" content="Github repo short link generator"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <GenFrom setResult={(res) => {
        setResult(res);
      }}/>
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  return { props: {} };
}

export default Home;

