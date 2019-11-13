import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { buttonCss } from '../css/button.css';
import { inputCss } from '../css/input.css';

class ConnectionsElement extends LitElement {
  static get styles() {
    return [
      buttonCss,
      inputCss,
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
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          min-height: 3rem;
          position: relative;
        }

        #edit {
          margin-bottom: 1rem;
        }

        #rename {
          font-size: 125%;
          width: 50%;
        }

        .has-error::after {
          bottom: 0.66rem;
          right: 51%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      connections: { type: Array },
      nameError: { type: Boolean },
      numYears: { type: Number },
      renamingConnectionId: { type: Number, attribute: false },
    };
  }

  inputClasses() {
    return classMap({
      'has-error': this.nameError,
    });
  }

  renameCancel() {
    this.dispatchEvent(
      new CustomEvent('renameCancel', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  renameSave() {
    const name = this.shadowRoot.getElementById('rename').value;
    if (!name) {
      this.nameError = true;
      return;
    }
    this.dispatchEvent(
      new CustomEvent('renameSave', {
        bubbles: true,
        composed: true,
        detail: {
          name,
        },
      }),
    );
  }

  render() {
    return html`
      ${this.connections.map(conn =>
        conn.id === this.renamingConnectionId
          ? this.renderEditMode(conn)
          : this.renderViewMode(conn),
      )}
    `;
  }

  renderEditMode(connection) {
    return html`
      <section id="edit" class="${this.inputClasses()}">
        <input id="rename" value="${connection.name}" />
        <aside>
          <button @click="${this.renameCancel}">Cancel</button>
          <button class="primary" @click="${this.renameSave}">Save</button>
        </aside>
      </section>
    `;
  }

  renderViewMode(connection) {
    return html`
      <section id="view">
        <xmas-connection .connection="${connection}" .numYears="${this.numYears}"></xmas-connection>
        <xmas-connection-actions .connection="${connection}"></xmas-connection-actions>
      </section>
    `;
  }

  updated() {
    if (this.renamingConnectionId > 0) {
      const nameInput = this.shadowRoot.getElementById('rename');
      nameInput.focus();
    }
  }
}

customElements.define('xmas-connections', ConnectionsElement);
