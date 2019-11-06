import { LitElement, html, css } from 'lit-element';

class GroupsElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-top: 2.5rem;
          width: 75%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      groups: { type: Array },
      renamingConnectionId: { type: Number, attribute: false },
    };
  }

  render() {
    return html`
      ${this.groups.map(
        group =>
          html`
            <xmas-group
              .group="${group}"
              .renamingConnectionId="${this.renamingConnectionId}"
            ></xmas-group>
          `,
      )}
    `;
  }
}

customElements.define('xmas-groups', GroupsElement);
