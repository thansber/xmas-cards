import { LitElement, html, css } from 'lit-element';

class XmasSummary extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-top: 1.5rem;
        }

        table {
          border: 0;
          border-spacing: 0;
          margin-top: 0.5rem;
        }

        td:first-child {
          width: 7rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      connections: { type: Array },
      year: { type: Number },
    };
  }

  countPings(type) {
    return this.connections.filter(conn => {
      const currentYearPing = conn.pings.find(ping => ping.year === this.year);
      if (currentYearPing) {
        return !!currentYearPing[type];
      }
      return false;
    }).length;
  }

  render() {
    return html`
      <header>${this.year} Summary</header>
      <table>
        <tbody>
          <tr>
            <td>Sent</td>
            <td>${this.countPings('sent')} of ${this.connections.length}</td>
          </tr>
          <tr>
            <td>Received</td>
            <td>${this.countPings('received')} of ${this.connections.length}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define('xmas-summary', XmasSummary);
