import { Stack } from '@stakk/types/Stack';
import { getDataForAllMixes, getDataForAllUserMixes } from '../../lib/getMixData';
import HtmlHead from '../../components/HtmlHead';
import StackContainer from '../../components/StackContainer';

export async function getStaticPaths() {
  const mixes = await getDataForAllMixes();
  const users = Array.from(new Set(mixes.map(m => m.author.slug)));

  return {
    paths: users.map((user) => ({
      params: { user }
    })),
    fallback: false,
  };
}

type UserContext = {
  params: { user: string },
};

type UserProps = { data: Stack };

export async function getStaticProps(ctx: UserContext): Promise<{
  props: UserProps
}> {
  const mixes = await getDataForAllUserMixes(ctx.params.user);
  const data = mixes[0];

  return { props: { data } };
}

function User({ data }: UserProps) {
  return (
    <>
      <HtmlHead data={data} />
      <StackContainer data={data} />
    </>
  );
}

export default User;
