import Footer from '../components/Footer';
import StackContainer from '../components/StackContainer';
import { Stack } from '../types/Stack';

export async function getStaticProps(): Promise<{
  props: IndexProps
}> {
  const data = await import('../data.json');

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }
  };
}

type IndexProps = {
  data: Stack,
};

function Index({ data }: IndexProps) {
  return (
    <StackContainer data={data}>
      <Footer />
    </StackContainer>
  );
}

export default Index;
