import { LitElement, html, css } from 'lit-element';

import { connectionCss } from '../css/connection.css';

class ConnectionsElement extends LitElement {
  static get styles() {
    return [
      connectionCss,
      css`
        :host {
          display: block;
        }

        #headings {
          display: flex;
          font-size: 175%;
          margin-bottom: 1rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      connections: { type: Array },
    };
  }

  render() {
    return html`
      ${this.connections.map(
        conn =>
          html`
            <xmas-connection .connection="${conn}"></xmas-connection>
          `,
      )}
    `;
  }
}

customElements.define('xmas-connections', ConnectionsElement);
