import styled, { keyframes } from 'styled-components';

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default styled.div`
  animation: ${opacityAnimation} 1000ms;
  background-color: ${p => p.theme.lightBg};
  height: 100%;
  overflow-y: auto;

  .more-info {
    align-items: center;
    background-color: ${p => p.theme.white};
    display: flex;
    justify-content: center;
    overflow: hidden;
    padding: 1rem;

    a {
      background-color: ${p => p.theme.white};
      box-shadow: 0 0 4px ${p => p.theme.shadow};
      border: 1px solid ${p => p.theme.lightGrey};
      border-radius: ${p => p.theme.br};
      color: ${p => p.theme.black};
      line-height: 1rem;
      padding: 1rem;
      text-align: center;
      width: 100%;
      max-width: ${p => p.theme.maxWidth};

      @media screen and (min-width: ${p => p.theme.maxWidth}) {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
`;
