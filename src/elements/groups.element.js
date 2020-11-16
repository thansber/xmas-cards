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
        }
      `,
      css`
        @media print {
          :host {
            width: 100%;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      groups: { type: Array },
      numYears: { type: Number },
      renamingConnectionId: { type: Number, attribute: false },
      selectedConnectionId: { type: Number, attribute: false },
    };
  }

  render() {
    if (!this.groups.length) {
      return html`
        <section id="empty">
          <p>
            Your groups and connections will appear here once you have added one using the input box
            above and clicking the Add button.
          </p>
          <p>Changes are saved automatically.</p>
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
              .selectedConnectionId="${this.selectedConnectionId}"
              .numYears="${this.numYears}"
            ></xmas-group>
          `,
      )}
    `;
  }
}

customElements.define('xmas-groups', GroupsElement);
