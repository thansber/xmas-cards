import { LitElement, html, css } from 'lit-element';

import { IO } from './io.js';
import './elements/index.js';

class XmasCards extends LitElement {
  constructor() {
    super();
    IO.initialize();
  }

  static get styles() {
    return [
      css`
        :host {
          background-color: rgb(0, 64, 0);
          bottom: 0;
          color: white;
          left: 0;
          padding: 1rem;
          position: absolute;
          right: 0;
          top: 0;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <xmas-add-connection></xmas-add-connection>
    `;
  }
}

customElements.define('xmas-cards', XmasCards);
