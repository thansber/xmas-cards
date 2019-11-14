import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';

class SettingsElement extends LitElement {
  constructor() {
    super();

    this.minYears = 1;
    this.maxYears = 5;

    this.saveMessage = null;
    this.yearInput = null;
  }

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
          margin: 1rem;
        }

        section {
          margin-top: 1rem;
        }

        #years input {
          font-size: 125%;
          padding: 0.25rem;
        }

        footer {
          align-items: center;
          display: flex;
          margin-top: 3rem;
        }

        .primary {
          font-size: 150%;
        }

        #saveMessage {
          font-weight: normal;
          margin-left: 2rem;
          opacity: 0;
          transition: opacity 0.5s;
        }

        #saveMessage.show {
          opacity: 1;
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
    this.yearInput.focus();
  }

  hideSettings() {
    this.dispatchEvent(new CustomEvent('toggleSettings', { detail: false }));
    this.resetSettings();
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
            <input
              id="yearInput"
              type="number"
              min="${this.minYears}"
              max="${this.maxYears}"
              value="${this.numYears}"
            />
          </label>
        </section>

        <footer>
          <button class="primary" @click="${this.saveSettings}">Save</button>
          <b id="saveMessage">Settings Saved</b>
        </footer>
      </main>
    `;
  }

  resetSettings() {
    this.yearInput.value = this.numYears;
  }

  saveSettings() {
    if (this.yearInput.value < this.minYears) {
      this.yearInput.value = this.minYears;
    }

    if (this.yearInput.value > this.maxYears) {
      this.yearInput.value = this.maxYears;
    }

    this.dispatchEvent(
      new CustomEvent('saveSettings', {
        detail: {
          numTrackingYears: this.yearInput.value,
        },
      }),
    );
    this.saveMessage.classList.add('show');
    setTimeout(() => this.saveMessage.classList.remove('show'), 2500);
  }

  updated() {
    this.saveMessage = this.shadowRoot.getElementById('saveMessage');
    this.yearInput = this.shadowRoot.getElementById('yearInput');
  }
}

customElements.define('xmas-settings', SettingsElement);
