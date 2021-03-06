import styled, { keyframes } from 'styled-components';

const expandAnimation = keyframes`
  from {
    margin-top: -5rem;
  }

  to {
    margin-top: initial;
  }
`;

export default styled.div`
  --animation-time: 500ms;
  --transition-time: 300ms;
  animation: ${expandAnimation} var(--animation-time) ease;
  transition: all var(--transition-time);
  overflow-y: hidden;
  border-top: ${p => p.theme.border};
  background-color: ${p => p.theme.white};

  &:first-of-type {
    border-top: none;
  }

  button {
    all: inherit;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0 1rem;
    width: 100%;

    p {
      margin: 0.5rem 0;
      line-height: 1rem;

      &:first-of-type {
        margin-top: 1rem;
      }

      &:last-of-type {
        margin-bottom: 1rem;
      }
    }

    .light {
      color: ${p => p.theme.grey};
    }

    .clickable-content,
    .hidden-content {
      max-width: ${p => p.theme.maxWidth};

      @media screen and (min-width: ${p => p.theme.maxWidth}) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .clickable-content {
      display: flex;
      justify-content: space-between;

      .icon-and-temp {
        display: flex;
        align-items: center;
        margin-left: 1rem;

        .precip-probability,
        svg {
          color: hsl(${p => p.theme.bgHsl.day.from});
        }

        .precip-probability {
          margin: 0.5rem 0;
        }

        svg {
          height: 4.5em;
          margin: 0 1rem;
        }

        .temps {
          p {
            text-align: center;
          }
        }
      }
    }

    .hidden-content {
      transition: all var(--transition-time) ease-in-out;
      max-height: ${p => (p.open ? p.numLines * 1.5 + 1 + 'rem' : '0px')};
      overflow-y: hidden;

      p {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        max-width: calc(${p => p.theme.maxWidth} / 2);

        &:first-child {
          margin-top: 0.5rem;
        }

        span {
          width: 50%;
        }
      }

      &:focus {
        box-shadow: 0 0 30px red;
      }
    }
  }
`;
