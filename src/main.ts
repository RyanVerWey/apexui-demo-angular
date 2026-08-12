import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "@apexui/tokens/css";
import { defineCustomElements } from "@apexui/web-components/loader";
import "zone.js";

defineCustomElements();

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="demo-shell" data-apex-theme="concept-light">
      <section class="demo-hero" aria-labelledby="dashboard-title">
        <div class="demo-hero-copy">
          <apex-stack gap="md">
            <apex-badge tone="info">Concept token set</apex-badge>
            <apex-typography id="dashboard-title" as="h1" variant="display">Kentro operations desk</apex-typography>
            <apex-typography variant="body">Angular consumes ApexUI tokens and custom elements in one focused dispatch workflow.</apex-typography>
            <div class="demo-actions">
              <apex-button>Review routes</apex-button>
              <apex-button variant="secondary">Export handoff</apex-button>
            </div>
          </apex-stack>
        </div>
        <apex-card eyebrow="Live capacity" heading="Field readiness">
          <apex-chart label="Crew coverage" [attr.data]="chartDataJson"></apex-chart>
        </apex-card>
      </section>

      <apex-grid columns="three" gap="lg" align="stretch" class="demo-metric-grid">
        <apex-card eyebrow="Capacity" heading="North loop" fill>
          <strong class="demo-metric">92%</strong>
          <span>Same-day closeout confidence across staged crews.</span>
        </apex-card>
        <apex-card eyebrow="Readiness" heading="Parts staged" fill>
          <strong class="demo-metric">18</strong>
          <span>Critical kits cleared for morning deployment.</span>
        </apex-card>
        <apex-card eyebrow="Risk" heading="SLA watch" fill>
          <strong class="demo-metric">3</strong>
          <span>Accounts need supervisor review before 16:00.</span>
        </apex-card>
      </apex-grid>

      <section class="demo-workspace">
        <apex-card eyebrow="Dispatch queue" heading="Route health">
          <apex-data-grid
            caption="Route health queue"
            [attr.columns]="columnsJson"
            [attr.rows]="rowsJson"
            sortable
            filterable
            pageable
            page-size="3"
          ></apex-data-grid>
        </apex-card>
        <apex-alert title="Angular path" tone="success">Concept tokens, ApexGrid layout, filled cards, and DataGrid behavior ship through Angular custom elements.</apex-alert>
      </section>
    </main>
  `
})
class AppComponent {
  chartDataJson = JSON.stringify([
    { label: "North", value: 92 },
    { label: "Central", value: 78 },
    { label: "South", value: 84 }
  ]);

  columnsJson = JSON.stringify([
    { key: "route", header: "Route", sortable: true, filterable: true },
    { key: "owner", header: "Owner", sortable: true, filterable: true },
    { key: "status", header: "Status", sortable: true, filterable: true },
    { key: "risk", header: "Risk", sortable: true, filterable: true }
  ]);

  rowsJson = JSON.stringify([
    { route: "North loop", owner: "Maya Chen", status: "Ready", risk: "Low" },
    { route: "Central relay", owner: "Owen Vale", status: "Review", risk: "Medium" },
    { route: "South repair", owner: "Priya Shah", status: "Ready", risk: "Low" },
    { route: "Harbor audit", owner: "Mateo Ruiz", status: "Hold", risk: "High" },
    { route: "West handoff", owner: "Noor Ellis", status: "Ready", risk: "Low" }
  ]);
}

bootstrapApplication(AppComponent);
