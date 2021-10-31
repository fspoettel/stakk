import { useContext, useCallback, MouseEvent } from 'react';
import { useCopyToClipboard } from 'react-use';
import { faDownload, faUpload } from '@fortawesome/pro-solid-svg-icons';
import Button from '@stakk/components/shared/Button';
import ButtonGroup from '@stakk/components/shared/ButtonGroup';

import LoadStackModal from '../LoadStackModal';

import * as actions from '@stakk/reducers/editor/actions';
import * as selectors from '@stakk/reducers/editor/selectors';
import { EditorContext } from '@stakk/reducers/editor/context';

export function EditorActions() {
  const { dispatch, state } = useContext(EditorContext);

  const [clipboardState, copyToClipboard] = useCopyToClipboard();

  const onFormSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      if (!state) return;

      const stack = selectors.getStack(state);
      evt.preventDefault();
      copyToClipboard(JSON.stringify(stack, null, 4));
      return false;
    },
    [copyToClipboard, state],
  );

  const onLoadStack = actions.loadStack(dispatch);
  const onOpenLoader = actions.openStackLoader(dispatch);
  const onCloseLoader = actions.closeStackLoader(dispatch);

  return (
    <>
      <ButtonGroup>
        <Button size="sm" onClick={onFormSubmit} icon={faDownload}>
          Export
        </Button>
        <Button icon={faUpload} onClick={onOpenLoader} size="sm" variant="secondary">
          Import
        </Button>
      </ButtonGroup>
      {clipboardState.error ? (
        <p>Unable to copy value: {clipboardState.error.message}</p>
      ) : (
        clipboardState.value && <p>Copied to clipboard!</p>
      )}
      <LoadStackModal
        open={selectors.getStackLoaderOpen(state)}
        onConfirmLoad={onLoadStack}
        onClose={onCloseLoader}
      />
    </>
  );
}
