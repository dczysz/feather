import React, { useState, useRef } from 'react';

import StyledMenu from './styles/Menu';
import { getParamUrl, copyToClipboard } from '../util';
import darkSkyLogo from '../assets/powered-by-darksky.png';
import ToggleButton from './ToggleButton';

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
            <p className="label">
              Shortcut URL
              <button className="btn span" onClick={copyUrl}>
                {copied ? 'Copied' : 'Copy'}
              </button>
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

        <p className="label">Unit</p>
        <div className="toggles">
          {['F', 'C'].map(u => (
            <ToggleButton
              key={u}
              value={u}
              checked={unit === u}
              change={setUnit}
            />
          ))}
        </div>

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
