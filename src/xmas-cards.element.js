import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { IO } from './io.js';
import './elements/index.js';

class XmasCards extends LitElement {
  constructor() {
    super();
    IO.initialize();

    this.data = IO.read();
    this.renamingConnectionId = -1;
    this.selectedConnectionId = 0;
    this.settingsShown = false;
    this.testing = /testing/.test(window.location.search);

    this.groupElementRegex = /xmas-groups/i;
    this.addEventListener('click', this.onClick);
  }

  static get styles() {
    return [
      css`
        :host {
          bottom: 0;
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
      selectedConnectionId: { type: Number },
      settingsShown: { type: Boolean },
    };
  }

  onAddConnection(e) {
    IO.newConnection(e.detail.name);
    this.data = IO.read();
  }

  onAddYear() {
    IO.addNewYear();
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

  onClick(e) {
    // On click outside of groups, clear selected connection
    // This closes any open actions
    if (!e.composedPath().map(elem => elem.localName).includes('xmas-groups')) {
      this.selectedConnectionId = 0;
    }
  }

  onConnectionActionsClick(e) {
    this.selectedConnectionId = e.detail;
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

  onSaveSettings(e) {
    IO.updateSettings(e.detail);
    this.data = IO.read();
  }

  onTogglePing(e) {
    IO.togglePing(e.detail);
    this.data = IO.read();
  }

  onToggleSettings(e) {
    this.settingsShown = e.detail;
    if (e.detail) {
      this.shadowRoot.getElementById('settings').applyFocus();
    }
  }

  render() {
    return html`
      <xmas-header
        @addConnection="${this.onAddConnection}"
        @toggleSettings="${this.onToggleSettings}"
      ></xmas-header>

      <xmas-summary
        .connections="${this.data.connections}"
        .year="${this.data.currentYear}"
      ></xmas-summary>

      <xmas-groups
        .groups="${this.data.groups}"
        .renamingConnectionId="${this.renamingConnectionId}"
        .selectedConnectionId="${this.selectedConnectionId}"
        .numYears="${this.data.numTrackingYears}"
        @connectionActionsClick="${this.onConnectionActionsClick}"
        @deleteConnection="${this.onDeleteConnection}"
        @renameCancel="${this.onRenameCancel}"
        @renameConnection="${this.onRenameConnection}"
        @renameSave="${this.onRenameSave}"
        @togglePing="${this.onTogglePing}"
      ></xmas-groups>

      <xmas-settings
        id="settings"
        class="${this.settingsClasses()}"
        .numYears="${this.data.numTrackingYears}"
        @addYear="${this.onAddYear}"
        @saveSettings="${this.onSaveSettings}"
        @toggleSettings="${this.onToggleSettings}"
      ></xmas-settings>

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

  settingsClasses() {
    return classMap({
      shown: this.settingsShown,
    });
  }
}

customElements.define('xmas-cards', XmasCards);
