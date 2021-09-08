import ErrorPage from 'next/error';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Repository } from '../../interfaces';

import dbConnect from '../../lib/mongodb';
import User from '../../models/user';

import { getRepo } from '../../util/util';

import GitCard from '../../components/GitCard/GitCard';

type RepoPageProps = {
  repository: Repository;
  color: string;
  err: number;
  shortlink: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { shortlink } = context.query;
  console.log(context);
  await dbConnect();
  const u = await User.findOne({ nano_id: shortlink }).exec();
  const user = u.toObject({ getters: true });
  if (user?.nano_id === undefined) {
    context.res.statusCode = 404;
    return { props: { err: 404 } };
  }
  const { repo, owner, color } = user;
  const repository = await getRepo(owner, repo);

  console.log(repository, 'REPO');
  return {
    props: {
      repository,
      color,
      shortlink,
    },
  };
};

const CardPage = ({ repository, color, err, shortlink }: RepoPageProps) => {
  if (err) {
    return <ErrorPage statusCode={err}/>;
  }
  return (
    <div>
      <Head>
        <title>
          {repository.author}/{repository.repo}
        </title>
        <meta property="og:title" content={`${repository.author}/${repository.repo}`}/>
        <meta property="og:type" content="website"/>
        <meta
          property="og:description"
          content={`Preview ${repository.author}/${repository.repo} on Mini-Git`}
        />
        <meta property="og:site_name" content="Mini-Git"/>
      </Head>
      <GitCard color={color} repository={repository}/>
    </div>
  );
};
export default CardPage;
