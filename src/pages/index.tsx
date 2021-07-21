import HtmlHead from '../components/HtmlHead';
import StackContainer from '../components/StackContainer';
import { Stack } from '../types/Stack';

export async function getStaticProps(): Promise<{
  props: IndexProps
}> {
  const { getMixData } = await import('../helpers/getMixData');
  const data = await getMixData('felix', 'mixtapes');
  return { props: { data } };
}

type IndexProps = {
  data: Stack,
};

function Index({ data }: IndexProps) {
  return (
    <>
      <HtmlHead data={data} />
      <StackContainer data={data} />
    </>
  );
}

export default Index;
