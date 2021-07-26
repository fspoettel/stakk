import { Stack } from '@stakk/types/Stack';
import HtmlHead from '../components/HtmlHead';
import StackContainer from '../components/StackContainer';
import { getMixData } from '../helpers/getMixData';

export async function getStaticProps(): Promise<{
  props: IndexProps
}> {
  const data = await getMixData('felix', 'mixtapes');
  return { props: { data } };
}

type IndexProps = { data: Stack };

function Index({ data }: IndexProps) {
  return (
    <>
      <HtmlHead data={data} />
      <StackContainer data={data} />
    </>
  );
}

export default Index;
