import { LitElement, html, css } from 'lit-element';

import { IO } from './io.js';
import './elements/index.js';

class XmasCards extends LitElement {
  constructor() {
    super();
    IO.initialize();
    this.data = IO.read();
  }

  static get styles() {
    return [
      css`
        :host {
          background-color: rgb(0, 32, 0);
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
    return {
      data: { type: Object },
    };
  }

  onAddConnection(e) {
    IO.newConnection(e.detail.name);
    this.data = IO.read();
  }

  onClearAll() {
    IO.nukeEverything();
    this.data = IO.read();
  }

  render() {
    return html`
      <xmas-add-connection @addConnection="${this.onAddConnection}"></xmas-add-connection>

      <xmas-groups .groups="${this.data.groups}"></xmas-groups>

      <xmas-clear-all @clearAll="${this.onClearAll}"></xmas-clear-all>
    `;
  }
}

customElements.define('xmas-cards', XmasCards);
