import { LitElement, html, css } from 'lit-element';

class ConnectionElement extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .name {
          font-size: 125%;
        }

        .year {
          align-items: center;
          display: flex;
          margin-top: 0.25rem;
        }

        p {
          margin: 0;
        }

        label {
          align-items: center;
          display: flex;
          margin-left: 1rem;
        }

        input[type='checkbox'] {
          height: 1rem;
          margin: 0 0.25rem 0 0;
          width: 1rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      connection: { type: Object },
    };
  }

  render() {
    return html`
      <div class="name">${this.connection.name}</div>
      ${this.connection.pings.map(
        ping => html`
          <section class="year">
            <p>${ping.year}</p>
            <label
              ><input
                type="checkbox"
                .checked="${ping.sent}"
                @change="${_ => this.togglePing(ping.year, 'sent')}"
              />Sent</label
            >
            <label
              ><input
                type="checkbox"
                .checked="${ping.received}"
                @change="${_ => this.togglePing(ping.year, 'received')}"
              />Received</label
            >
          </section>
        `,
      )}
    `;
  }

  togglePing(year, property) {
    this.dispatchEvent(
      new CustomEvent('togglePing', {
        bubbles: true,
        composed: true,
        detail: {
          connectionId: this.connection.id,
          property,
          year,
        },
      }),
    );
  }
}

customElements.define('xmas-connection', ConnectionElement);
