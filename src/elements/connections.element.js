import { LitElement, html, css } from 'lit-element';

class ConnectionsElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-top: 2.5rem;
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
