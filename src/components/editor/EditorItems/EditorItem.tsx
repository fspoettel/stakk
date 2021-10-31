import React, { useContext } from 'react';
import cx from 'classnames';
import { faChevronUp, faGripVertical, faPencil, faTrash } from '@fortawesome/pro-solid-svg-icons';

import { RenderProps } from '@stakk/components/shared/SortableList/interfaces';
import ButtonGroup from '@stakk/components/shared/ButtonGroup';
import ButtonWithTooltip from '@stakk/components/shared/ButtonWithTooltip';
import Button from '@stakk/components/shared/Button';
import Field from '@stakk/components/shared/Form/Field';

import { EditorContext } from '@stakk/context/editor/context';
import * as actions from '@stakk/context/editor/actions';
import { getIsEditingItem } from '@stakk/context/editor/selectors';

import css from './EditorItems.module.css';
import { StackItem } from '@stakk/types/StackItem';
import { TagField } from '@stakk/components/shared/Form/TagField';

type EditorItemProps = RenderProps<StackItem>;

function EditorItem({ item, dragging, listeners }: EditorItemProps) {
  const { dispatch, state } = useContext(EditorContext);
  const isEditing = getIsEditingItem(state, item.id);

  const onItemDelete = actions.deleteItem(dispatch);
  const onItemToggleEdit = actions.toggleItemEdit(dispatch);
  const onItemChange = actions.changeItemField(dispatch);
  const onItemChangeTags = actions.changeItemFieldGeneric<string[]>(dispatch);

  return (
    <article className={cx([css['editoritem'], { [css.dragging]: dragging }])} key={item.id}>
      <header className={css['editoritem-header']}>
        <Button
          className={css['editoritem-handle']}
          {...(listeners ?? {})}
          size="sm"
          icon={faGripVertical}
        />
        <h4>{typeof item.title === 'string' ? item.title : item.id}</h4>
        <ButtonGroup className={css['editoritem-actions']}>
          <ButtonWithTooltip
            data-id={item.id}
            icon={isEditing ? faChevronUp : faPencil}
            onClick={onItemToggleEdit}
            size="sm"
            strategy="fixed"
            tooltip={isEditing ? 'finish editing item' : 'edit item'}
          />
        </ButtonGroup>
      </header>

      {isEditing && (
        <div className={css['editoritem-edit']}>
          <Field
            label="Title"
            name="title"
            onChange={onItemChange(item.id, 'title')}
            value={item.title}
          >
            {(props) => <input {...props} type="text" />}
          </Field>
          <Field
            label="Description"
            name="description"
            onChange={onItemChange(item.id, 'description')}
            value={item.description}
          >
            {(props) => <textarea {...props} />}
          </Field>

          <TagField
            label="Tags"
            onChange={onItemChangeTags(item.id, 'tags')}
            placeholder="add tag"
            value={item.tags}
          />

          <ButtonWithTooltip
            data-id={item.id}
            icon={faTrash}
            onClick={onItemDelete}
            size="sm"
            tooltip="delete item"
          />
        </div>
      )}
    </article>
  );
}

export default React.memo(EditorItem);
