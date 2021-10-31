import StackContainer from '@stakk/components/stack/StackContainer';

import css from './EditorPreview.module.css';
import { useContext } from 'react';
import { EditorContext } from '@stakk/reducers/editor/context';

function EditorPreview() {
  const { state } = useContext(EditorContext);

  return (
    <section className={css['preview']}>
      <StackContainer data={state.stack} hideDragIndicator hideInitialAnimation />
    </section>
  );
}

export default EditorPreview;
