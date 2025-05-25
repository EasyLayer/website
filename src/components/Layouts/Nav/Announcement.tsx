import React from 'react';
import classNames from 'classnames';
import { useHistory } from '@docusaurus/router';
import styles from './styles.module.css';
import { BLOG_URLS } from '../../../urls';

const Announcement: React.FC = () => {
  const history = useHistory();
  const handleLink = () => {
    history.push(`${BLOG_URLS.BASE}/welcome-bitcoin-crawler-beta-app`);
  };
  return (
    <div
      onClick={handleLink}
      className={classNames(
        styles.gradientBackground,
        `
                cursor-pointer
                flex-row space-x-3
                overflow-hidden
                text-white
            `
      )}
    >
      <div
        className={`
                    mx-auto flex items-center justify-center divide-white p-3
                    text-sm font-medium
                    lg:container lg:divide-x lg:px-16 xl:px-20
                `}
      >
        <span className="item-center flex gap-2 px-3">
          <span>
            <b>🚀 Bitcoin Crawler beta is here! 🚀</b>
          </span>
        </span>
        <span className="hidden items-center space-x-2 px-3 lg:flex">
          <span
            className={`
                    cursor-pointer rounded-full bg-neutral-700 px-2.5 py-1 text-xs
                    hover:bg-neutral-600
                `}
          >
            See what's new ⚙️ →
          </span>
        </span>
      </div>
    </div>
  );
};
export default Announcement;
