import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface ImgWithCaptionProps {
  alt: string;
  source: string;
  caption: React.ReactNode;
  width?: string;
}

const ImgWithCaption: React.FC<ImgWithCaptionProps> = ({ alt, source, caption, width }) => {
  return (
    <div>
      <p>
        <figure>
          <img style={{ width }} alt={alt} src={useBaseUrl(source)} />
          <figcaption className="image-caption" style={{ fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem' }}>
            {caption}
          </figcaption>
        </figure>
      </p>
    </div>
  );
};

export default ImgWithCaption;
