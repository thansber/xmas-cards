import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { buttonCss } from '../css/button.css';
import { inputCss } from '../css/input.css';
import { icons } from './icons';

class AddConnectionElement extends LitElement {
  constructor() {
    super();
    this.nameId = 'name';
  }

  static get styles() {
    return [
      buttonCss,
      inputCss,
      css`
        :host {
        }

        input {
          font-family: inherit;
          font-size: 150%;
          margin-top: 0.5rem;
          padding: 0.25rem 0.5rem;
          width: 66%;
        }

        label {
          position: relative;
        }

        span {
          display: block;
        }

        #add {
          align-items: center;
          display: inline-flex;
        }
      `,
    ];
  }

  static get properties() {
    return {
      nameError: { type: Boolean },
    };
  }

  addConnection(e) {
    const name = this.nameInput.value;
    this.nameError = false;
    e.preventDefault();

    if (!name) {
      this.nameError = true;
      this.nameInput.focus();
    } else {
      this.dispatchEvent(new CustomEvent('addConnection', { detail: { name } }));
      this.nameInput.focus();
      this.nameInput.select();
    }
  }

  firstUpdated() {
    this.nameInput = this.shadowRoot.getElementById(this.nameId);
    this.nameInput.focus();
  }

  inputClasses() {
    return classMap({
      'has-error': this.nameError,
    });
  }

  render() {
    return html`
      <form @submit="${this.addConnection}">
        <label class="${this.inputClasses()}" for="${this.nameId}">
          <span>Add someone you connect with during the Christmas season</span>
          <input id="${this.nameId}" placeholder="Enter a name" />
        </label>
        <button id="add" class="primary large" title="Add a new connection">
          Add ${icons.plus}
        </button>
      </form>
    `;
  }
}

customElements.define('xmas-add-connection', AddConnectionElement);
