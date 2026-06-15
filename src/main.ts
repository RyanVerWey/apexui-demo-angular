import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "@apexui/tokens/css";

@Component({ selector: "app-root", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: `
<main class="demo-shell" data-apex-theme="enterprise-light"><div class="demo-frame"><apex-app-bar title="ApexUI Angular Console"><apex-button size="sm">Approve</apex-button></apex-app-bar><section class="demo-hero"><div class="demo-panel"><apex-stack gap="md"><apex-badge tone="info">Angular standalone wrappers</apex-badge><apex-typography as="h1" variant="display">Enterprise workflow with generated inputs</apex-typography><apex-typography variant="body">Angular imports standalone ApexUI wrappers per route and keeps token styling global.</apex-typography><div class="demo-actions"><apex-button>Commit change</apex-button><apex-button variant="secondary">Review event</apex-button></div><apex-text-field label="Package scope" value="@apexui/angular"></apex-text-field></apex-stack></div><apex-card eyebrow="Readiness" title="Standalone controls"><apex-progress label="Wrapper coverage" [value]="88"></apex-progress><apex-switch label="Strict templates" checked></apex-switch><apex-date-picker label="Release date"></apex-date-picker></apex-card></section><section class="demo-grid"><apex-chart label="Angular checks" [data]="chartData"></apex-chart><apex-timeline [items]="timeline"></apex-timeline><apex-card eyebrow="Routing" title="Lazy-ready">Standalone imports make route-level composition straightforward.</apex-card></section><apex-data-table caption="Angular matrix" [columns]="columns" [rows]="rows"></apex-data-table><apex-alert tone="success" title="Angular demo live">This repo installs @apexui/angular from npm.</apex-alert></div></main>` })
class AppComponent {
  chartData = [{ "label": "Tokens", "value": 92 }, { "label": "Components", "value": 84 }, { "label": "Routes", "value": 73 }];
  columns = [{ "key": "area", "header": "Area" }, { "key": "owner", "header": "Owner" }, { "key": "status", "header": "Status" }];
  rows = [{ "area": "Tokens", "owner": "Platform", "status": "Live" }, { "area": "Components", "owner": "Design system", "status": "Beta" }, { "area": "Docs", "owner": "DX", "status": "Linked" }];
  timeline = [{ title: "Install", meta: "npm" }, { title: "Import", meta: "standalone" }, { title: "Deploy", meta: "Pages" }];
}
bootstrapApplication(AppComponent).then(() => {
  if (typeof window !== "undefined") {
    import("@apexui/web-components/loader").then(({ defineCustomElements }) => defineCustomElements());
  }
});
