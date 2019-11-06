import { css } from 'lit-element';

export const buttonCss = css`
  button {
    border: 0;
    border-radius: 0.25rem;
    background-color: var(--xmas-green-light);
    color: var(--xmas-grey);
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
    padding: 0.25rem 0.5rem;
    position: relative;
  }

  button.primary {
    background-color: var(--xmas-red);
  }

  button.large {
    font-size: 150%;
    padding: 0.45rem 1rem;
  }

  button:active {
    top: 1px;
  }
`;
