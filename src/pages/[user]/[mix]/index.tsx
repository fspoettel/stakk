import { Stack } from '@stakk/types/Stack';
import { getMixData, getDataForAllMixes } from '../../../lib/getMixData';
import getStackMetadata from '../../../lib/getStackMetadata';
import generateRSS from '../../../lib/generateRSS';
import writeRSSToFile from '../../../lib/writeRSSToFile';
import HtmlHead from '../../../components/HtmlHead';
import StackContainer from '../../../components/StackContainer';

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

type MixContext = {
  params: {
    user: string,
    mix: string,
  },
};

type MixProps = { data: Stack };

export async function getStaticProps(ctx: MixContext): Promise<{
  props: MixProps
}> {
  const data = await getMixData(ctx.params.user, ctx.params.mix);
  await writeRSSToFile(getStackMetadata(data).rssPath, generateRSS(data));
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
