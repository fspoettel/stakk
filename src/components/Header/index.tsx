import React from 'react';
import Head from 'next/head';
import { faAlbumCollection } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import ButtonWithTooltip from '../ButtonWithTooltip';
import ButtonGroup from '../ButtonGroup';
import css from '../../styles/Header.module.css';

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
          <FontAwesomeIcon
            className={css['logo']}
            transform="rotate-180"
            icon={faAlbumCollection}
          />
            stakk &middot; {title} by&nbsp;<a
              className={css['header-stakker']}
              href={authorUrl}
              target="_blank"
              rel="noreferrer nofollow"
            >{authorName}</a>
        </h1>
        {/*
        <nav className={css['header-nav']}>
          <a href='#'>Want your own stakk?</a>
        </nav>
        */}
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
