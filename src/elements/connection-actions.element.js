import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { buttonCss } from '../css/button.css';
import { icons } from './icons';

class ConnectionActionsElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
      css`
        :host {
          position: relative;
        }

        p {
          margin: 0;
        }

        #trigger {
          display: flex;
        }

        #actions {
          background-color: var(--xmas-green-light);
          border-radius: 0.25rem;
          display: none;
          list-style-type: none;
          margin: 0;
          padding: 0.5rem 0;
          position: absolute;
          z-index: 1;
        }

        #actions.open {
          display: block;
        }

        [action] {
          border: 1px solid transparent;
          cursor: pointer;
          padding: 0.5rem 1rem;
        }

        [action]:hover {
          border-color: white;
        }
      `,
      css`
        @media print {
          :host {
            display: none;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      connection: Object,
      open: Boolean,
      selectedConnectionId: { type: Number, attribute: false },
    };
  }

  actionClasses() {
    return classMap({
      open: this.open,
    });
  }

  fireAction(e) {
    const action = e.target.getAttribute('action');
    this.dispatchEvent(
      new CustomEvent(action, {
        bubbles: true,
        composed: true,
        detail: this.connection,
      }),
    );
    this.toggleActions();
  }

  render() {
    return html`
      <button
        id="trigger"
        @click="${this.toggleActions}"
        title="More actions for ${this.connection.name} (Click again to close)"
      >
        ${icons.more}
      </button>
      <ul id="actions" class="${this.actionClasses()}" @click="${this.fireAction}">
        <li action="renameConnection" title="Rename ${this.connection.name}">Rename</li>
        <li action="deleteConnection" title="Delete ${this.connection.name}">Delete</li>
      </ul>
    `;
  }

  toggleActions() {
    this.dispatchEvent(
      new CustomEvent('connectionActionsClick', {
        bubbles: true,
        composed: true,
        detail: this.open ? 0 : this.connection.id,
      }),
    );
  }

  updated(changed) {
    if (changed.has('selectedConnectionId') && this.connection) {
      this.open = this.selectedConnectionId === this.connection.id;
    }
  }
}

customElements.define('xmas-connection-actions', ConnectionActionsElement);
