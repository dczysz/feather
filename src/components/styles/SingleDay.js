import styled from 'styled-components';

export default styled.div`
  --larger-font: 1.2rem;
  --text-shadow: 0 1px 1px;
  color: ${p => p.theme.white};
  padding: 0 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  text-shadow: var(--text-shadow) ${p => p.theme.shadow};

  @media screen and (min-width: ${p => p.theme.maxWidth}) {
    margin: 0 auto;
    width: ${p => p.theme.maxWidth};
  }

  p {
    margin: 1rem 0;
    line-height: 1em;

    &.black {
      color: ${p => p.theme.black};
    }
  }

  .left {
    p {
      &.date {
        font-size: var(--larger-font);
      }
      &.temp {
        font-size: 5rem;
        line-height: normal;
        margin: -1rem 0;

        sup {
          font-size: 0.5em;
          font-weight: bold;
        }
      }

      &.summary {
        margin-top: 1rem;
        font-size: var(--larger-font);
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    svg {
      --size: 5rem;
      width: var(--size);
      height: var(--size);
      color: ${p => p.theme.white};
    }

    p {
      text-align: center;
    }
  }
`;
