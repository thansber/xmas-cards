import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';

class HeaderElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
      css`
        :host {
          align-items: center;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        #add {
          flex: 1;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <xmas-add-connection id="add"></xmas-add-connection>
      <button @click="${this.showSettings}">Settings</button>
    `;
  }

  showSettings() {
    this.dispatchEvent(new CustomEvent('settings', { detail: true }));
  }
}

customElements.define('xmas-header', HeaderElement);
