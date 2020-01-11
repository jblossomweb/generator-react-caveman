import React from 'react';

export interface Props {
  href: string,
  children: JSX.Element | string,
}

const ExternalLink: React.FC<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalLink;
