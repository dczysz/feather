import styled from 'styled-components';

export default styled.div`
  --animation-time: 500ms;
  transition: all var(--animation-time);
  pointer-events: ${p => (p.open ? 'all' : 'none')};
  overflow-y: hidden;
  visibility: ${p =>
    p.open ? 'visible' : 'hidden'}; /* block tab focus when not open */

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
      font-size: 1.3rem;
      margin: 1rem 0 0 0;
    }

    p {
      margin: 0.5rem 0;
    }

    button {
      background-color: transparent;

      &.span {
        margin-left: 1ch;
      }
    }

    button.btn,
    label.btn {
      border: 2px solid hsl(var(--accentHsl));
      border-radius: ${p => p.theme.br};
      box-shadow: 0 0 0 2px transparent, 0 0 0 4px transparent;
      color: hsl(var(--accentHsl));
      font-size: 0.9rem;
      font-weight: bold;
      padding: 0.5em;
      transition: all 200ms;

      :hover {
        background-color: hsla(var(--accentHsl), 0.8);
        color: ${p => p.theme.white};
      }

      :focus,
      :active {
        box-shadow: 0 0 0 2px ${p => p.theme.white},
          0 0 0 4px hsl(var(--accentHsl));
      }
    }

    input.btn {
      :checked + label {
        background-color: hsl(var(--accentHsl));
        color: ${p => p.theme.white};
      }

      :focus + label {
        box-shadow: 0 0 0 2px ${p => p.theme.white},
          0 0 0 4px hsl(var(--accentHsl));
      }
    }

    .label {
      align-items: center;
      display: flex;
      margin-top: 1.5rem;
    }

    .url {
      font-size: 0.9rem;
      margin-top: 0;

      a {
        color: ${p => p.theme.grey};
        display: block;
        text-overflow: ellipsis;
      }

      input {
        all: inherit;
        width: 100%;
      }
    }

    .toggles {
      display: flex;
    }

    .footer {
      margin-top: auto;

      a.darksky {
        display: block;
        margin: 0 auto;
        text-align: center;
        margin: 1rem 0;

        svg {
          max-width: 14rem;
          width: 100%;
          height: auto;
          fill: hsl(var(--accentHsl));
        }
      }
    }
  }

  .background {
    background-color: ${p => p.theme.shadow};
    opacity: ${p => (p.open ? 1 : 0)};
    transition: opacity var(--animation-time);
    width: 100%;
    backdrop-filter: blur(2px);
  }
`;
