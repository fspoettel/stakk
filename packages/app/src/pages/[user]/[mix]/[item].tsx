import { Stack } from '@stakk/types/Stack';
import HtmlHead from '../../../components/HtmlHead';
import StackContainer from '../../../components/StackContainer';
import { getMixData, getDataForAllMixes } from '../../../helpers/getMixData';

export async function getStaticPaths() {
  const mixes = await getDataForAllMixes();

  return {
    paths: [
      ...mixes
        .map((data) => [
          ...data.items.map((item) => ({
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
    items: data.items.sort((a) => {
      if (a.slug === targetItemSlug) return 1;
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
