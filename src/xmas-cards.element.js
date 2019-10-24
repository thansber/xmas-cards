import { LitElement, html, css } from 'lit-element';

class XmasCards extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      I love xmas cards
    `;
  }
}

customElements.define('xmas-cards', XmasCards);
