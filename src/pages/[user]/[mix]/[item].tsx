import { Stack } from '@stakk/types/Stack';
import HtmlHead from '@stakk/components/stack/HtmlHead';
import StackContainer from '@stakk/components/stack/StackContainer';
import { getMixData, getDataForAllMixes } from '@stakk/lib/getMixData';

export async function getStaticPaths() {
  const mixes = await getDataForAllMixes();

  return {
    paths: [
      ...mixes
        .map((data) => [
          ...Object.values(data.data).map((item) => ({
            params: {
              item: item.slug,
              mix: data.slug,
              user: data.author.slug,
            }
          }))
        ])
        .flat(),
    ],
    fallback: false,
  };
}

type ItemContext = {
  params: {
    user: string,
    mix: string,
    item: string,
  },
};

type ItemProps = {
  data: Stack,
  targetItemSlug: string,
};

export async function getStaticProps(ctx: ItemContext): Promise<{
  props: ItemProps
}> {
  const data = await getMixData(ctx.params.user, ctx.params.mix);
  return {
    props: {
      data,
      targetItemSlug: ctx.params.item,
    }
  };
}

function Item({ data, targetItemSlug }: ItemProps) {
  const sortedData = {
    ...data,
    sort: data.sort.sort((id) => {
      const item = data.data[id];
      if (item.slug === targetItemSlug) return 1;
      return 0;
    })
  };

  return (
    <>
      <HtmlHead data={data} targetItemSlug={targetItemSlug} />
      <StackContainer data={sortedData} />
    </>
  );
}

export default Item;
