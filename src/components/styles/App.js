import styled from 'styled-components';

export default styled.div`
  background-image: linear-gradient(
    170deg,
    hsl(${p => p.theme.bgHsl[p.bg].from}),
    hsl(${p => p.theme.bgHsl[p.bg].to})
  );
  color: ${p => p.theme.black};
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  transition: background-image 0.2s;
  overflow: hidden;

  .top-bar {
    background-color: ${p => p.theme.lightBg};
  }
`;
