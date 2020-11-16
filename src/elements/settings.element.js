import { LitElement, html, css } from 'lit-element';

import { buttonCss } from '../css/button.css';
import { icons } from './icons';

class SettingsElement extends LitElement {
  constructor() {
    super();

    this.minYears = 1;
    this.maxYears = 5;
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

        button {
          margin-right: 0.75rem;
        }

        .primary {
          font-size: 150%;
        }

        .message {
          font-weight: normal;
          margin-left: 1rem;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .message.show {
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

  addNewYear() {
    this.dispatchEvent(
      new Event('addYear', {
        bubbles: true,
        composed: true,
      }),
    );
    this.hideSettings();
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
          <button id="close" title="Close Settings" @click="${this.hideSettings}">
            ${icons.close}
          </button>
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
          <button class="primary" @click="${this.addNewYear}">New Year</button>
          <b id="save-message" class="message">Settings Saved</b>
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

    this.showMessage('save-message');
  }

  showMessage(id) {
    const message = this.shadowRoot.getElementById(id);
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 2500);
  }

  updated() {
    this.yearInput = this.shadowRoot.getElementById('yearInput');
  }
}

customElements.define('xmas-settings', SettingsElement);
