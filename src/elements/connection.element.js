import { LitElement, html, css } from 'lit-element';

class ConnectionElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }
      `,
    ];
  }

  static get properties() {
    return {
      connection: { type: Object },
    };
  }

  render() {
    return html`
      <div class="name">${this.connection.name}</div>
    `;
  }
}

customElements.define('xmas-connection', ConnectionElement);
