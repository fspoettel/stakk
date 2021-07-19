import StackContainer from '../../../components/StackContainer';
import { getMixData, getDataForAllMixes } from '../../../helpers/readData';
import { Stack } from '../../../types/Stack';

type MixContext = {
  params: {
    user: string,
    mix: string,
  },
};

type MixProps = {
  data: Stack,
};

export async function getStaticProps(ctx: MixContext): Promise<{
  props: MixProps
}> {
  const data = await getMixData(ctx.params.user, ctx.params.mix);
  return {
    props: { data }
  };
}

export async function getStaticPaths() {
  const mixes = await getDataForAllMixes();

  return {
    paths: mixes.map((data) => ({
      params: {
        mix: data.slug,
        user: data.author.slug,
      }
    })),
    fallback: false,
  };
}

function Mix({ data }: MixProps) {
  return <StackContainer data={data} />;
}

export default Mix;
