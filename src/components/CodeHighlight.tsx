import type { FC } from 'react';
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

import '../css/prismjs-github-theme.css';

interface CodeHighlightProps {
  language: string;
  source: string;
}

const CodeHighlight: FC<CodeHighlightProps> = ({ language, source }) => {
  return (
    <Highlight theme={themes.github} code={source} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            paddingLeft: '15px',
            ...style,
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {/* <span>{i + 1}</span> */}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeHighlight;
