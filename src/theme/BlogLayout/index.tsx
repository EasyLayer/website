import React from 'react';
import classNames from 'classnames';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

interface BlogLayoutProps {
  sidebar?: any;
  toc?: React.ReactNode;
  children: React.ReactNode;
  [x: string]: unknown;
}

export default function BlogLayout({ sidebar, toc, children, ...layoutProps }: BlogLayoutProps) {
  const childrenArray = React.Children.toArray(children);

  const firstChild = childrenArray[0] as React.ReactElement<{ items?: Array<{ title: string; permalink: string }> }>;
  const isListOfBlogPosts = firstChild?.props?.items?.length > 0;

  return (
    <Layout {...layoutProps}>
      {/* <BlogNavbar /> */}

      <div className={classNames({ 'margin-vert--lg container': !isListOfBlogPosts })}>
        <div className="row">
          {!isListOfBlogPosts && <BlogSidebar sidebar={sidebar} />}
          <main
            className={classNames('col', {
              'col--7': !isListOfBlogPosts,
            })}
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
