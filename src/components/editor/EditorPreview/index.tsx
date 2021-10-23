import StackContainer from '@stakk/components/stack/StackContainer';

import css from './EditorPreview.module.css';
import { useContext } from 'react';
import { FormStateContext } from '../reducer/context';

function EditorPreview() {
  const state = useContext(FormStateContext);
  if (!state) return null;

  return (
    <section className={css['preview']}>
      <StackContainer data={state.stack} hideDragIndicator hideInitialAnimation />
    </section>
  );
}

export default EditorPreview;
