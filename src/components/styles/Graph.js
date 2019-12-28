import styled, { keyframes } from 'styled-components';

const clipAnimation = keyframes`
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    opacity: 0;
  }

  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
`;

export default styled.div`
  height: 100%;
  overflow-y: hidden;

  svg {
    display: block;
    fill: none;
    height: 100%;
    margin: 0 auto;
    stroke-width: 2;

    .x-grid {
      stroke: ${p => p.theme.white};
    }

    .grid {
      stroke-width: 1.5;
    }

    text {
      fill: ${p => p.theme.white};
      font-size: 0.8rem;
      stroke: none;
      text-anchor: middle;

      &.hour {
        fill: ${p => p.theme.black};
      }
    }

    .graph {
      opacity: 0;

      &.animate {
        animation: ${clipAnimation} ${p => p.animationTime}ms ease;
        opacity: 1;
      }

      path#line {
        fill: ${p => p.theme.lightBg};
        stroke: none;
      }

      .icon {
        color: ${p => p.theme.white};
      }
    }
  }
`;
