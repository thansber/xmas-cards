import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';
import { icons } from './icons';

class HeaderElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
      css`
        :host {
          align-items: flex-start;
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
      <button title="Open Settings" @click="${this.showSettings}">${icons.settings}</button>
    `;
  }

  showSettings() {
    this.dispatchEvent(new CustomEvent('toggleSettings', { detail: true }));
  }
}

customElements.define('xmas-header', HeaderElement);
