import { LitElement, html, css } from 'lit-element';

import { IO } from './io.js';
import './elements/index.js';

class XmasCards extends LitElement {
  constructor() {
    super();
    IO.initialize();

    this.data = IO.read();
    this.renamingConnectionId = -1;
    this.testing = /testing/.test(window.location.search);
  }

  static get styles() {
    return [
      css`
        :host {
          background-color: var(--xmas-green-dark);
          bottom: 0;
          color: white;
          left: 0;
          padding: 1rem;
          position: absolute;
          right: 0;
          top: 0;
        }

        footer {
          bottom: 1rem;
          position: absolute;
          right: 1rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      data: { type: Object },
      renamingConnectionId: { type: Number },
    };
  }

  onAddConnection(e) {
    IO.newConnection(e.detail.name);
    this.data = IO.read();
  }

  onAutoPopulate() {
    IO.autoPopulate();
    this.data = IO.read();
  }

  onClearAll() {
    IO.nukeEverything();
    this.data = IO.read();
  }

  onDeleteConnection(e) {
    IO.deleteConnection(e.detail.id);
    this.data = IO.read();
  }

  onRenameCancel() {
    this.renamingConnectionId = -1;
  }

  onRenameConnection(e) {
    this.renamingConnectionId = e.detail.id;
  }

  onRenameSave(e) {
    IO.renameConnection(this.renamingConnectionId, e.detail.name);
    this.data = IO.read();
    this.onRenameCancel();
  }

  onTogglePing(e) {
    IO.togglePing(e.detail);
    this.data = IO.read();
  }

  render() {
    return html`
      <xmas-add-connection @addConnection="${this.onAddConnection}"></xmas-add-connection>

      <xmas-groups
        .groups="${this.data.groups}"
        .renamingConnectionId="${this.renamingConnectionId}"
        @deleteConnection="${this.onDeleteConnection}"
        @renameCancel="${this.onRenameCancel}"
        @renameConnection="${this.onRenameConnection}"
        @renameSave="${this.onRenameSave}"
        @togglePing="${this.onTogglePing}"
      ></xmas-groups>

      ${this.renderTesting()}
    `;
  }

  renderTesting() {
    if (this.testing) {
      return html`
        <footer>
          <xmas-auto-populate @autoPopulate="${this.onAutoPopulate}"></xmas-auto-populate>
          <xmas-clear-all @clearAll="${this.onClearAll}"></xmas-clear-all>
        </footer>
      `;
    }
  }
}

customElements.define('xmas-cards', XmasCards);
