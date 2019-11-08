import { LitElement, html, css } from 'lit-element';

class GroupsElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-bottom: 2.5rem;
          margin-top: 2.5rem;
          width: 75%;
        }

        #empty {
          font-size: 125%;
          text-align: center;
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
    if (!this.groups.length) {
      return html`
        <section id="empty">
          Your groups and connections will appear here once you have added one using the input box
          above and clicking the Add button
        </section>
      `;
    }
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
