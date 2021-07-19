import StackContainer from '../components/StackContainer';
import { getMixData } from '../helpers/readData';
import { Stack } from '../types/Stack';

export async function getStaticProps(): Promise<{
  props: IndexProps
}> {
  const data = await getMixData('felix', 'mixtapes');

  return {
    props: { data }
  };
}

type IndexProps = {
  data: Stack,
};

function Index({ data }: IndexProps) {
  return <StackContainer data={data} />;
}

export default Index;
