import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { useClickAway } from 'react-use';
import Button, { ButtonProps } from '../Button';

type ButtonWithTooltipProps = Omit<ButtonProps, 'popperRef'> & { tooltip: string };

function ButtonWithTooltip({
  tooltip,
  ...buttonProps
}: ButtonWithTooltipProps) {
  const [visible, setVisible] = useState(false);
  const onHide = () => setVisible(false);
  const onShow = () => setVisible(true);

  const [referenceElement, setReferenceElement] = useState<HTMLElement|null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement|null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [{ name: 'offset', options: { offset: [0, 6] }}],
  });

  // 1. hide when button becomes disabled
  useEffect(() => {
    if (buttonProps.disabled && visible) onHide();
  }, [buttonProps.disabled, visible]);  
  // 2. hide when swiping the stack on touch devices
  useClickAway({ current: referenceElement }, () => setVisible(false), ['touchstart']);

  return (
    <>
      {!buttonProps.disabled && visible && (
        <div
          {...attributes.popper}
          className='tooltip-container'
          style={styles.popper}
          ref={setPopperElement}
        >
          {tooltip}
        </div>
      )}
      <Button
        popperRef={setReferenceElement}
        onMouseEnter={onShow}
        onMouseLeave={onHide}
        onBlur={onHide}
        onFocus={onShow}
        aria-label={tooltip}
        {...buttonProps}
      />
    </>
  );
}

export default ButtonWithTooltip;
