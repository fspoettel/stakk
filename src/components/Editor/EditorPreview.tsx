import { Stack } from '../../types/Stack';
import StackContainer from '../StackContainer';

type PreviewProps = {
  data: Stack
};

function EditorPreview({ data }: PreviewProps) {
  return (
    <section className='preview'>
      <StackContainer
        data={data}
        hideDragIndicator
        hideInitialAnimation
      />
    </section>
  );
}

export default EditorPreview;
