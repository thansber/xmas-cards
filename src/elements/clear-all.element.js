import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';

class ClearAllElement extends LitElement {
  static get styles() {
    return [buttonCss];
  }

  static get properties() {
    return {};
  }

  clearAll() {
    this.dispatchEvent(new CustomEvent('clearAll'));
  }

  render() {
    return html`
      <button @click="${this.clearAll}">Clear All</button>
    `;
  }
}

customElements.define('xmas-clear-all', ClearAllElement);
