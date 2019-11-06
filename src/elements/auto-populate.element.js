import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';

class AutoPopulateElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
      css`
        :host {
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  autoPopulate() {
    this.dispatchEvent(new CustomEvent('autoPopulate'));
  }

  render() {
    return html`
      <button @click="${this.autoPopulate}">Auto Populate</button>
    `;
  }
}

customElements.define('xmas-auto-populate', AutoPopulateElement);
