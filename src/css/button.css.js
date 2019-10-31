import { css } from 'lit-element';

export const buttonCss = css`
  button {
    background-color: rgb(128, 0, 0);
    border: 0;
    border-radius: 0.25rem;
    color: rgb(192, 192, 192);
    cursor: pointer;
    font-size: 150%;
    padding: 0.45rem 1rem;
    position: relative;
  }

  button:active {
    top: 1px;
  }
`;
