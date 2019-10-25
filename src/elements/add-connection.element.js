import { LitElement, html, css } from 'lit-element';

class AddConnection extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        input {
          font-family: inherit;
          font-size: 150%;
          padding: 0.25rem 0.5rem;
          width: 50%;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <input placeholder="Add someone you connect with during the Christmas season" />
    `;
  }
}

customElements.define('xmas-add-connection', AddConnection);
