import { css } from 'lit-element';

export const inputCss = css`
  .has-error input,
  input.has-error {
    background-color: rgb(239, 202, 113);
  }

  .has-error:after {
    bottom: 0;
    content: '!';
    color: red;
    font-size: 150%;
    position: absolute;
    right: 1.5rem;
  }
`;
