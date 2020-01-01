import React, { useState, useRef } from 'react';

import StyledMenu from './styles/Menu';
import { getParamUrl, copyToClipboard } from '../util';
import ToggleButton from './ToggleButton';
import { ReactComponent as DarkSkySvg } from '../assets/powered-by-darksky.svg';
import { unitTypes } from '../types';

const Menu = ({ isOpen, close, query, unit, setUnit }) => {
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
    <StyledMenu open={isOpen} aria-hidden={!isOpen}>
      <div className="background" onClick={close}></div>
      <div className="menu-container">
        <h2>Feather</h2>
        {query && (
          <>
            <p className="label">Shortcut URL</p>
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
            <button className="btn" onClick={copyUrl}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </>
        )}

        <p className="label">Units</p>
        <div className="toggles">
          {Object.entries(unitTypes).map(([key, value]) => (
            <ToggleButton
              key={key}
              value={key}
              checked={unit === value}
              change={setUnit}
            />
          ))}
        </div>

        <div className="footer">
          <a href="https://darksky.net/poweredby/" className="darksky">
            <DarkSkySvg />
          </a>
        </div>
      </div>
    </StyledMenu>
  );
};

export default Menu;
