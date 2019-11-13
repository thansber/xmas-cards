import { LitElement, html, css } from 'lit-element';

class SettingsElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          bottom: 0;
          color: white;
          display: none;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        :host(.shown) {
          display: flex;
        }

        #filler {
          background-color: black;
          flex: 1;
          opacity: 0.9;
        }

        main {
          background-color: var(--xmas-green-dark);
          height: 100vh;
          position: absolute;
          right: 0;
          width: 20rem;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  hideSettings() {
    this.dispatchEvent(new CustomEvent('settings', { detail: false }));
  }

  render() {
    return html`
      <aside id="filler" @click="${this.hideSettings}" title="Close Settings"></aside>
      <main>
        Settings
      </main>
    `;
  }
}

customElements.define('xmas-settings', SettingsElement);
