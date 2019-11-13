import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';

class SettingsElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
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
          padding-left: 1rem;
          position: absolute;
          right: 0;
          width: 25rem;
        }

        header {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        h1 {
          font-size: 150%;
          margin: 1rem 0;
        }

        #close {
          margin: 0.5rem;
        }

        section {
          margin-top: 1rem;
        }

        #years input {
          font-size: 125%;
          padding: 0.25rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      numYears: { type: Number },
    };
  }

  async applyFocus() {
    await this.updateComplete;
    this.shadowRoot.getElementById('yearInput').focus();
  }

  hideSettings() {
    this.dispatchEvent(new CustomEvent('settings', { detail: false }));
  }

  render() {
    return html`
      <aside id="filler" title="Close Settings" @click="${this.hideSettings}"></aside>
      <main>
        <header>
          <h1>Settings</h1>
          <button id="close" title="Close Settings" @click="${this.hideSettings}">Close</button>
        </header>

        <section id="years">
          <label>
            How many years do you want to track?
            <input id="yearInput" type="number" min="1" max="5" value="${this.numYears}" />
          </label>
        </section>
      </main>
    `;
  }
}

customElements.define('xmas-settings', SettingsElement);
