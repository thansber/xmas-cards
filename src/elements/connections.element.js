import { LitElement, html, css } from 'lit-element';

class ConnectionsElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        #headings {
          display: flex;
          font-size: 175%;
          margin-bottom: 1rem;
        }

        section {
          align-items: flex-start;
          display: flex;
          justify-content: space-between;
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
            <section>
              <xmas-connection .connection="${conn}"></xmas-connection>
              <xmas-connection-actions .connection="${conn}"></xmas-connection-actions>
            </section>
          `,
      )}
    `;
  }
}

customElements.define('xmas-connections', ConnectionsElement);
