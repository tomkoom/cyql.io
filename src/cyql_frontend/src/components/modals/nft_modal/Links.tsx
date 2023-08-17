import React, { FC } from "react";
import styled from "styled-components";

// icons
import { iExternalLink } from "@/components/icons/Icons";

interface LinksProps {
  type: string;
  url: string;
  text: string;
}

const Link: FC<LinksProps> = ({ type, url, text }): JSX.Element => {
  return (
    <LinkStyled id={type} href={url} rel="noreferrer noopener" target="_blank">
      {text} <Icon>{iExternalLink}</Icon>
    </LinkStyled>
  );
};

const Links: FC = (): JSX.Element => {
  const links = [
    { type: "primary", url: "https://entrepot.app/marketplace/ic-apps", text: "buy" },
    {
      type: "secondary",
      url: "https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/collection/dtlqp-nqaaa-aaaak-abwna-cai/summary",
      text: "stats",
    },
  ];

  return (
    <LinksStyled>
      {links.map((link) => (
        <Link type={link.type} url={link.url} text={link.text} />
      ))}
    </LinksStyled>
  );
};

const LinksStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LinkStyled = styled.a`
  flex: 1;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: var(--fs6);
  font-weight: var(--fwBold);
  padding: 0 1rem;
  border-radius: 1.375rem;

  &:hover {
    opacity: 0.8;
  }

  &#primary {
    color: #fff;
    background-color: var(--highlight1);
  }

  &#secondary {
    background: var(--underlay1);
  }
`;

const Icon = styled.span`
  flex-shrink: 0;
  font-size: var(--fs7);
`;

export default Links;
