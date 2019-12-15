import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { getParamUrl, copyToClipboard } from '../util';
import darkSkyLogo from '../assets/powered-by-darksky.png';

const StyledMenu = styled.div`
  --animation-time: 500ms;
  transition: all var(--animation-time);
  pointer-events: ${p => (p.open ? 'all' : 'none')};
  overflow-y: hidden;

  &,
  & .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .background,
  .menu-container {
    height: 100%;
  }

  .menu-container {
    background: ${p => p.theme.white};
    display: flex;
    flex-direction: column;
    width: 60%;
    max-width: 20rem;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 1rem;
    pointer-events: all;
    transition: all var(--animation-time);
    transform: translateX(${p => (p.open ? 0 : '-100%')});

    h2 {
      text-align: center;
      font-size: 1.2rem;
      margin: 1rem 0 0 0;
    }

    p {
      margin: 1rem 0;
    }

    .label {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;

      button {
        background-color: transparent;
        border: 1px solid ${p => p.theme.grey};
        border-radius: ${p => p.theme.br};
        margin-left: 0.5ch;
        padding: 0.1em;

        &:hover,
        &:active {
          background-color: ${p => p.theme.lightGrey};
        }
      }
    }

    .url {
      font-size: 0.9rem;
      margin: 0;

      a {
        color: ${p => p.theme.grey};
        text-overflow: ellipsis;
        display: block;
      }

      input {
        all: inherit;
        width: 100%;
      }
    }

    .footer {
      margin-top: auto;

      .darksky {
        display: block;
        margin: 0 auto;
        text-align: center;
        margin: 1rem 0;

        img {
          max-width: 12rem;
          width: 100%;
        }
      }
    }
  }

  .background {
    background-color: ${p => p.theme.shadow};
    opacity: ${p => (p.open ? 1 : 0)};
    transition: opacity var(--animation-time);
    width: 100%;
  }
`;

const Menu = ({ isOpen, close, query }) => {
  const [copied, setCopied] = useState(false);
  const urlRef = useRef();

  const copyUrl = () => {
    copyToClipboard(urlRef.current);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <StyledMenu open={isOpen}>
      <div className="background" onClick={close}></div>
      <div className="menu-container">
        <h2>Featherr</h2>
        {query && (
          <>
            <p className="label">
              Shortcut URL
              <span>
                <button onClick={copyUrl}>{copied ? 'Copied' : 'Copy'}</button>
              </span>
            </p>
            <p className="url">
              <a href={getParamUrl([{ key: 'q', value: query }])}>
                <input
                  type="text"
                  ref={urlRef}
                  value={getParamUrl([{ key: 'q', value: query }])}
                  readOnly
                />
              </a>
            </p>
          </>
        )}

        <div className="footer">
          <a href="https://darksky.net/poweredby/" className="darksky">
            <img src={darkSkyLogo} alt="Powered by Dark Sky" />
          </a>
        </div>
      </div>
    </StyledMenu>
  );
};

export default Menu;
