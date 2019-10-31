import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

class AddConnection extends LitElement {
  constructor() {
    super();
    this.nameId = 'name';
  }

  static get styles() {
    return [
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

        .name-error input {
          background-color: rgb(239, 202, 113);
        }

        .name-error:after {
          bottom: 0;
          content: '!';
          color: red;
          font-size: 150%;
          position: absolute;
          right: 1.5rem;
        }

        button {
          background-color: rgb(128, 0, 0);
          border: 0;
          border-radius: 0.25rem;
          color: rgb(160, 160, 160);
          cursor: pointer;
          font-size: 150%;
          padding: 0.45rem 1rem;
        }

        button:active {
          top: 1px;
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
    }
  }

  firstUpdated() {
    this.nameInput = this.shadowRoot.getElementById(this.nameId);
    this.nameInput.focus();
  }

  inputClasses() {
    return classMap({
      'name-error': this.nameError,
    });
  }

  render() {
    return html`
      <form @submit="${this.addConnection}">
        <label class="${this.inputClasses()}">
          <span>Add someone you connect with during the Christmas season</span>
          <input id="${this.nameId}" placeholder="Enter a name" />
        </label>
        <button>Add</button>
      </form>
    `;
  }
}

customElements.define('xmas-add-connection', AddConnection);
