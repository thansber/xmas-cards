import { LitElement, html, css } from 'lit-element';
import './elements/index.js';

class XmasCards extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          background-color: rgb(0, 64, 0);
          bottom: 0;
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
