import { Stack } from '@stakk/types/Stack';
import StackContainer from '@stakk/components/stack/StackContainer';

import css from './EditorPreview.module.css';

type PreviewProps = {
  data: Stack
};

function EditorPreview({ data }: PreviewProps) {
  return (
    <section className={css['preview']}>
      <StackContainer
        data={data}
        hideDragIndicator
        hideInitialAnimation
      />
    </section>
  );
}

export default EditorPreview;
