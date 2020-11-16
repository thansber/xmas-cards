import { LitElement, html, css } from 'lit-element';

import { IO } from '../io';

class GroupElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        h2 {
          background-color: var(--xmas-green-light);
          border: 1px solid var(--xmas-grey);
          font-size: 175%;
          font-weight: normal;
          margin: 0;
          padding: 0.75rem 1rem;
        }

        #connections {
          border: 1px solid var(--xmas-grey);
          border-top: 0;
          padding: 0.75rem 1rem;
        }
      `,
      css`
        @media print {
          h2 {
            background-color: white;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      group: { type: Object },
      numYears: { type: Number },
      renamingConnectionId: { type: Number, attribute: false },
      selectedConnectionId: { type: Number, attribute: false },
    };
  }

  render() {
    const connections = this.group.connections
      .map(connectionId => IO.findConnection(connectionId))
      .sort(this.sortByName);
    return html`
      <h2 data-groupId="${this.group.id}">${this.group.name}</h2>
      <xmas-connections
        id="connections"
        .connections="${connections}"
        .renamingConnectionId="${this.renamingConnectionId}"
        .selectedConnectionId="${this.selectedConnectionId}"
        .numYears="${this.numYears}"
      ></xmas-connections>
    `;
  }

  sortByName(connA, connB) {
    return connA.name.localeCompare(connB.name, undefined, { sensitivity: 'base' });
  }
}

customElements.define('xmas-group', GroupElement);
