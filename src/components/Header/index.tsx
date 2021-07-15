import React from 'react';
import Head from 'next/head';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import ButtonWithTooltip from '../ButtonWithTooltip';
import ButtonGroup from '../ButtonGroup';
import css from '../../styles/Header.module.css';
import Logo from '../Logo';

type Action = {
  key: string,
  disabled: boolean,
  icon: IconProp,
  onClick: () => void,
  visible?: boolean,
  tooltip: string,
};

type HeaderProps = {
  authorName: string,
  authorUrl: string,
  actions: Action[],
  title: string,
};

function Header({
  authorName,
  authorUrl,
  actions,
  title,
}: HeaderProps) {
  return (
    <header className={css.header}>
      <Head>
        <title>stakk &middot; {title} by {authorName}</title>
        <meta
          name="description"
          content={`flip through ${authorName}'s stakk "${title}"`}
        />
      </Head>
      <div className={css['header-content']}>
        <h1 className={css['header-title']}>
          <span className={css['header-title-logo']}>
            <Logo />
            &nbsp;&middot;&nbsp;{title}
          </span>
          <span className={css['header-stakker']}>
            &nbsp;by&nbsp;
            <a
              href={authorUrl}
              target="_blank"
              rel="noreferrer nofollow"
            >
              {authorName}
            </a>
          </span>
        </h1>
      </div>
      <ButtonGroup className={css['header-actions']}>
        {actions.map((action) => {
          if (action.visible === false) return null;
          return (
            <ButtonWithTooltip
              disabled={action.disabled}
              icon={action.icon}
              key={action.key}
              tooltip={action.tooltip}
              onClick={action.onClick}
            />
          );
        })}
      </ButtonGroup>
    </header>
  );
}

export default React.memo(Header);
