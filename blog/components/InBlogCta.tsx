import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Divider: React.FC = () => <span className="in-blog-cta--divider"> → </span>;

const InBlogCta: React.FC = () => (
  <p className="in-blog-cta-link-container">
    <Link className="in-blog-cta--link" to="">
      We are in Beta (try it out)!
    </Link>
    <Divider />
    <Link className="in-blog-cta--link" to="">
      Join our community
    </Link>
    <Divider />
    <Link className="in-blog-cta--link" to="">
      Colaborate with us
    </Link>
  </p>
);

export default InBlogCta;
