import { LitElement, html, css } from 'lit-element';

import { IO } from '../io';

class GroupElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        h2 {
          background-color: rgb(0, 64, 0);
          border: 1px solid rgb(192, 192, 192);
          font-size: 175%;
          font-weight: normal;
          margin: 0;
          padding: 0.75rem 1rem;
        }

        #connections {
          border: 1px solid rgb(192, 192, 192);
          border-top: 0;
          padding: 0.75rem 1rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      group: { type: Object },
      renamingConnectionId: { type: Number, attribute: false },
      numYears: { type: Number },
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
        .numYears="${this.numYears}"
      ></xmas-connections>
    `;
  }

  sortByName(connA, connB) {
    return connA.name.localeCompare(connB.name, undefined, { sensitivity: 'base' });
  }
}

customElements.define('xmas-group', GroupElement);
