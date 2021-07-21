import HtmlHead from '../../../components/HtmlHead';
import StackContainer from '../../../components/StackContainer';
import { getMixData, getDataForAllMixes } from '../../../helpers/getMixData';
import getStackMetadata from '../../../helpers/getStackMetadata';
import { generateRSS, writeRSS } from '../../../helpers/rss';
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

export async function getStaticProps(ctx: MixContext): Promise<{
  props: MixProps
}> {
  const data = await getMixData(ctx.params.user, ctx.params.mix);
  await writeRSS(getStackMetadata(data).rssPath, generateRSS(data));
  return { props: { data } };
}

function Mix({ data }: MixProps) {
  return (
    <>
      <HtmlHead data={data} />
      <StackContainer data={data} />
    </>
  );
}

export default Mix;
