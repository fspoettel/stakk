import { Stack } from '@stakk/types/Stack';
import { getMixData, getDataForAllMixes } from '@stakk/lib/getMixData';
import getStackMetadata from '@stakk/lib/getStackMetadata';
import generateRSS from '@stakk/lib/generateRSS';
import writeRSSToFile from '@stakk/lib/writeRSSToFile';
import HtmlHead from '@stakk/components/stack/HtmlHead';
import StackContainer from '@stakk/components/stack/StackContainer';

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
