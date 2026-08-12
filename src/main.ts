import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { defineCustomElements } from "@apexui/web-components/loader";
import "zone.js";

defineCustomElements();

type RoutePath = "/" | "/analytics" | "/customers" | "/workflows" | "/settings" | "/about";
type SwitchEvent = CustomEvent<{ checked: boolean }>;

const routes: Array<{ path: RoutePath; label: string; icon: string; title: string }> = [
  { path: "/", label: "Home", icon: "home", title: "Kentro" },
  { path: "/analytics", label: "Analytics", icon: "bar-chart-3", title: "Analytics" },
  { path: "/customers", label: "Customers", icon: "users", title: "Customers" },
  { path: "/workflows", label: "Workflows", icon: "workflow", title: "Workflows" },
  { path: "/settings", label: "Settings", icon: "settings", title: "Settings" },
  { path: "/about", label: "About", icon: "info", title: "About" }
];

const deploymentBaseSegment = "apexui-demo-angular";

const routeRows = [
  { route: "North loop", owner: "Maya Chen", status: "Ready", risk: "Low", revenue: "$84K", sla: "96%" },
  { route: "Central relay", owner: "Owen Vale", status: "Review", risk: "Medium", revenue: "$61K", sla: "89%" },
  { route: "South repair", owner: "Priya Shah", status: "Ready", risk: "Low", revenue: "$72K", sla: "94%" },
  { route: "Harbor audit", owner: "Mateo Ruiz", status: "Hold", risk: "High", revenue: "$38K", sla: "76%" },
  { route: "West handoff", owner: "Noor Ellis", status: "Ready", risk: "Low", revenue: "$56K", sla: "92%" }
];

const routeColumns = [
  { key: "route", header: "Route", sortable: true, filterable: true },
  { key: "owner", header: "Owner", sortable: true, filterable: true },
  { key: "status", header: "Status", sortable: true, filterable: true },
  { key: "risk", header: "Risk", sortable: true, filterable: true },
  { key: "revenue", header: "Revenue", sortable: true, filterable: true },
  { key: "sla", header: "SLA", sortable: true, filterable: true }
];

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="site-shell" [attr.data-apex-theme]="theme">
      <apex-app-bar heading="Kentro">
        <div slot="actions" class="app-actions">
          <apex-badge tone="info">Angular</apex-badge>
          <apex-switch label="Dark mode" [checked]="isDark" (apexChange)="setTheme($event)"></apex-switch>
        </div>
      </apex-app-bar>

      <div class="site-frame">
        <aside class="side-nav" aria-label="Primary">
          <div class="brand-panel">
            <apex-icon name="workflow" size="lg"></apex-icon>
            <div>
              <strong>Kentro Ops</strong>
              <span>Concept token demo</span>
            </div>
          </div>
          <nav>
            <a *ngFor="let item of navItems" [href]="hrefFor(item.path)" [class.active]="activePath === item.path" (click)="navigate($event, item.path)">
              <apex-icon [attr.name]="item.icon" size="sm"></apex-icon>
              <span>{{ item.label }}</span>
            </a>
          </nav>
          <apex-alert tone="success" heading="Live package proof">
            Concept tokens, ApexGrid, DataGrid, forms, charts, and workflow surfaces render through Angular custom elements.
          </apex-alert>
        </aside>

        <section class="page-surface">
          <apex-breadcrumbs [attr.items]="breadcrumbsJson"></apex-breadcrumbs>

          <ng-container [ngSwitch]="activePath">
            <section *ngSwitchCase="'/'" class="route-page home-page">
              <section class="hero-band" aria-labelledby="home-title">
                <div class="hero-copy">
                  <apex-stack gap="md">
                    <apex-badge tone="info">Regional operating system</apex-badge>
                    <apex-typography id="home-title" as="h1" variant="display">Kentro operations desk</apex-typography>
                    <p>Plan field capacity, monitor customer commitments, and recover risky work before the day slips.</p>
                    <div class="button-row">
                      <a class="action-link primary" [href]="hrefFor('/analytics')" (click)="navigate($event, '/analytics')">Open analytics</a>
                      <a class="action-link secondary" [href]="hrefFor('/workflows')" (click)="navigate($event, '/workflows')">Review workflows</a>
                    </div>
                  </apex-stack>
                </div>
                <apex-card eyebrow="Today" heading="Readiness snapshot">
                  <apex-stack gap="md">
                    <apex-progress label="Crew coverage" value="92"></apex-progress>
                    <apex-progress label="Parts staged" value="84"></apex-progress>
                    <apex-progress label="Closeout quality" value="88"></apex-progress>
                  </apex-stack>
                </apex-card>
              </section>

              <apex-grid columns="three" gap="lg" align="stretch" class="metric-grid">
                <apex-card *ngFor="let metric of homeMetrics" [attr.eyebrow]="metric.eyebrow" [attr.heading]="metric.heading" fill>
                  <strong class="metric-value">{{ metric.value }}</strong>
                  <span>{{ metric.copy }}</span>
                </apex-card>
              </apex-grid>

              <section class="split-grid">
                <apex-card eyebrow="Operating rhythm" heading="Morning standup">
                  <apex-timeline [attr.events]="timelineJson"></apex-timeline>
                </apex-card>
                <apex-card eyebrow="Components in use" heading="A real product screen">
                  <div class="chip-list">
                    <apex-chip *ngFor="let chip of componentChips">{{ chip }}</apex-chip>
                  </div>
                </apex-card>
              </section>
            </section>

            <section *ngSwitchCase="'/analytics'" class="route-page analytics-page">
              <header class="page-heading">
                <apex-badge tone="info">Analytics dashboard</apex-badge>
                <apex-typography as="h1" variant="display">Operating signals</apex-typography>
                <p>Leaders can scan capacity, route risk, revenue protection, and SLA trends in one dense view.</p>
              </header>

              <apex-grid columns="four" gap="md" align="stretch" class="metric-grid compact">
                <apex-card *ngFor="let metric of dashboardMetrics" [attr.eyebrow]="metric.eyebrow" [attr.heading]="metric.heading" fill>
                  <strong class="metric-value">{{ metric.value }}</strong>
                  <apex-progress [attr.label]="metric.label" [attr.value]="metric.progress"></apex-progress>
                </apex-card>
              </apex-grid>

              <section class="dashboard-grid">
                <apex-card eyebrow="Demand" heading="Coverage by region">
                  <apex-chart label="Crew coverage by region" [attr.data]="coverageChartJson"></apex-chart>
                </apex-card>
                <apex-card eyebrow="Revenue" heading="Protected pipeline">
                  <apex-chart label="Revenue protected this week" [attr.data]="revenueChartJson"></apex-chart>
                </apex-card>
              </section>

              <apex-card eyebrow="Route health" heading="Sortable dispatch queue">
                <apex-data-grid
                  caption="Route health queue"
                  [attr.columns]="routeColumnsJson"
                  [attr.rows]="routeRowsJson"
                  sortable
                  filterable
                  pageable
                  page-size="4"
                ></apex-data-grid>
              </apex-card>
            </section>

            <section *ngSwitchCase="'/customers'" class="route-page customers-page">
              <header class="page-heading">
                <apex-badge tone="success">Customer operations</apex-badge>
                <apex-typography as="h1" variant="display">Accounts and service memory</apex-typography>
                <p>Account teams see open revenue, site health, risk notes, and field history without leaving operations.</p>
              </header>

              <apex-toolbar label="Customer tools" density="comfortable" wrap>
                <apex-search-form label="Search accounts" placeholder="Search customers"></apex-search-form>
                <apex-button variant="secondary">Export CSV</apex-button>
                <apex-button>Add account</apex-button>
              </apex-toolbar>

              <section class="split-grid wide-left">
                <apex-card eyebrow="Pipeline" heading="Priority accounts">
                  <apex-data-grid
                    caption="Priority customer accounts"
                    [attr.columns]="customerColumnsJson"
                    [attr.rows]="customerRowsJson"
                    sortable
                    filterable
                    pageable
                    page-size="4"
                  ></apex-data-grid>
                </apex-card>
                <apex-card eyebrow="Selected account" heading="Granite Ridge Health">
                  <apex-stack gap="md">
                    <div class="contact-lead">
                      <apex-avatar initials="MC" size="lg"></apex-avatar>
                      <div>
                        <strong>Mara Chen</strong>
                        <span>Regional owner</span>
                      </div>
                    </div>
                    <div class="record-line"><span>Renewal</span><strong>Aug 30</strong></div>
                    <div class="record-line"><span>Open sites</span><strong>18</strong></div>
                    <div class="record-line"><span>Risk</span><apex-badge tone="warning">Parts delays</apex-badge></div>
                    <apex-divider></apex-divider>
                    <apex-timeline [attr.events]="accountTimelineJson"></apex-timeline>
                  </apex-stack>
                </apex-card>
              </section>
            </section>

            <section *ngSwitchCase="'/workflows'" class="route-page workflows-page">
              <header class="page-heading">
                <apex-badge tone="warning">Workflow center</apex-badge>
                <apex-typography as="h1" variant="display">Dispatch lanes</apex-typography>
                <p>Supervisors can review work order stages, escalate blocked jobs, and keep intake quality visible.</p>
              </header>

              <apex-card eyebrow="Kanban" heading="Daily work movement">
                <apex-workflow-board [attr.columns]="workflowColumnsJson"></apex-workflow-board>
              </apex-card>

              <section class="split-grid">
                <apex-card eyebrow="Intake quality" heading="New service request">
                  <div class="form-grid">
                    <apex-text-field label="Work summary" value="North loading dock sensor fault"></apex-text-field>
                    <apex-select label="Priority" [attr.options]="priorityOptionsJson" value="high"></apex-select>
                    <apex-date-picker label="Requested date" value="2026-08-14"></apex-date-picker>
                    <apex-number-field label="Labor hours" value="4" min="1" max="16"></apex-number-field>
                    <apex-textarea label="Technician notes" rows="4" value="Gate code expires at 16:00. Ask for Maribel at receiving."></apex-textarea>
                    <apex-checkbox label="Customer approved site access" checked></apex-checkbox>
                  </div>
                </apex-card>
                <apex-card eyebrow="Recovery" heading="Supervisor checklist">
                  <apex-stepper [attr.steps]="stepperJson" active-step="2"></apex-stepper>
                  <apex-alert tone="warning" heading="Harbor audit blocked">
                    Assign a senior technician before 13:00 or move the arrival promise.
                  </apex-alert>
                </apex-card>
              </section>
            </section>

            <section *ngSwitchCase="'/settings'" class="route-page settings-page">
              <header class="page-heading">
                <apex-badge tone="neutral">Settings</apex-badge>
                <apex-typography as="h1" variant="display">Workspace controls</apex-typography>
                <p>Preference surfaces prove form controls, tabs, selects, toggles, and theme tokens in one place.</p>
              </header>

              <apex-card eyebrow="Preferences" heading="Operator workspace">
                <apex-tabs label="Settings sections" [attr.items]="settingsTabsJson" active-id="profile"></apex-tabs>
                <div class="settings-grid">
                  <apex-text-field label="Display name" value="Ryan Demo Operator"></apex-text-field>
                  <apex-text-field label="Email" type="email" value="operator@kentro.example"></apex-text-field>
                  <apex-select label="Locale" [attr.options]="localeOptionsJson" value="en-US"></apex-select>
                  <apex-select label="Timezone" [attr.options]="timezoneOptionsJson" value="america-new-york"></apex-select>
                  <apex-switch label="Notify on critical reassignment" checked></apex-switch>
                  <apex-switch label="Compact dispatch rows"></apex-switch>
                  <apex-toggle-group label="Default landing page" [attr.options]="landingOptionsJson" value="analytics"></apex-toggle-group>
                  <apex-slider label="Alert sensitivity" value="72" min="0" max="100"></apex-slider>
                </div>
              </apex-card>
            </section>

            <section *ngSwitchCase="'/about'" class="route-page about-page">
              <header class="page-heading">
                <apex-badge tone="info">About the demo</apex-badge>
                <apex-typography as="h1" variant="display">Angular plus ApexUI</apex-typography>
                <p>This mock website uses shipped ApexUI tokens and Stencil custom elements inside Angular, shaped as a real operations product.</p>
              </header>

              <section class="feature-grid">
                <apex-card *ngFor="let proof of proofCards" [attr.eyebrow]="proof.eyebrow" [attr.heading]="proof.heading">
                  <p>{{ proof.copy }}</p>
                  <apex-badge [attr.tone]="proof.tone">{{ proof.status }}</apex-badge>
                </apex-card>
              </section>

              <section class="split-grid">
                <apex-card eyebrow="Atomic coverage" heading="Component layers">
                  <apex-tree-view label="ApexUI layers" [attr.items]="treeJson"></apex-tree-view>
                </apex-card>
                <apex-card eyebrow="Empty state" heading="No blocked migrations">
                  <apex-empty-state
                    icon="check-circle"
                    heading="Ready for review"
                    description="The demo deploy proves Concept tokens and Angular rendering against public GitHub Pages."
                    action-label="View analytics"
                  ></apex-empty-state>
                </apex-card>
              </section>
            </section>
          </ng-container>
        </section>
      </div>

      <nav class="mobile-nav" aria-label="Mobile primary">
        <a *ngFor="let item of navItems" [href]="hrefFor(item.path)" [class.active]="activePath === item.path" (click)="navigate($event, item.path)">
          <apex-icon [attr.name]="item.icon" size="sm"></apex-icon>
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </main>
  `
})
class AppComponent {
  isDark = false;
  activePath: RoutePath = "/";
  navItems = routes;

  homeMetrics = [
    { eyebrow: "Capacity", heading: "North loop", value: "92%", copy: "Same-day closeout confidence across staged crews." },
    { eyebrow: "Readiness", heading: "Parts staged", value: "18", copy: "Critical kits cleared for morning deployment." },
    { eyebrow: "Risk", heading: "SLA watch", value: "3", copy: "Accounts need supervisor review before 16:00." }
  ];

  dashboardMetrics = [
    { eyebrow: "Today", heading: "Open work", value: "128", label: "Assigned before noon", progress: 76 },
    { eyebrow: "SLA", heading: "Arrival promise", value: "94%", label: "On-time window", progress: 94 },
    { eyebrow: "Parts", heading: "Ready kits", value: "84%", label: "Critical kits staged", progress: 84 },
    { eyebrow: "Revenue", heading: "Protected work", value: "$311K", label: "At-risk value covered", progress: 71 }
  ];

  componentChips = ["AppBar", "Grid", "Cards", "Chart", "DataGrid", "Forms", "Tabs", "Timeline", "TreeView", "EmptyState"];

  proofCards = [
    { eyebrow: "Tokens", heading: "Concept theme", copy: "Light and dark modes come from the ApexUI Concept token family.", status: "concept", tone: "info" },
    { eyebrow: "Angular", heading: "Custom elements", copy: "Angular uses CUSTOM_ELEMENTS_SCHEMA with ApexUI Stencil components.", status: "rendering", tone: "success" },
    { eyebrow: "Product UI", heading: "Real site shape", copy: "Pages model home, analytics, customers, workflows, settings, and about.", status: "routed", tone: "success" }
  ];

  constructor() {
    window.addEventListener("popstate", () => this.syncRoute());
    window.addEventListener("hashchange", () => this.syncRoute());
    this.syncRoute();
  }

  get theme(): string {
    return this.isDark ? "concept-dark" : "concept-light";
  }

  get breadcrumbsJson(): string {
    const active = this.navItems.find((item) => item.path === this.activePath) ?? this.navItems[0];
    return JSON.stringify([{ label: "Kentro", href: this.hrefFor("/") }, { label: active.label }]);
  }

  coverageChartJson = JSON.stringify([
    { label: "North", value: 92 },
    { label: "Central", value: 78 },
    { label: "South", value: 84 },
    { label: "Harbor", value: 66 }
  ]);

  revenueChartJson = JSON.stringify([
    { label: "Renewal", value: 88 },
    { label: "Expansion", value: 76 },
    { label: "Recovery", value: 61 }
  ]);

  routeColumnsJson = JSON.stringify(routeColumns);
  routeRowsJson = JSON.stringify(routeRows);

  customerColumnsJson = JSON.stringify([
    { key: "account", header: "Account", sortable: true, filterable: true },
    { key: "region", header: "Region", sortable: true, filterable: true },
    { key: "stage", header: "Stage", sortable: true, filterable: true },
    { key: "value", header: "Annual value", sortable: true, filterable: true },
    { key: "owner", header: "Owner", sortable: true, filterable: true }
  ]);

  customerRowsJson = JSON.stringify([
    { account: "Granite Ridge Health", region: "North", stage: "Renewal", value: "$480K", owner: "Mara Chen" },
    { account: "Cedarline Utilities", region: "West", stage: "Pilot", value: "$220K", owner: "Theo Grant" },
    { account: "HarborWorks Transit", region: "East", stage: "Expansion", value: "$680K", owner: "Iris Patel" },
    { account: "Summit Cold Storage", region: "Central", stage: "Qualified", value: "$140K", owner: "Jon Bell" },
    { account: "Northline Clinics", region: "South", stage: "Risk review", value: "$310K", owner: "Noor Ellis" }
  ]);

  timelineJson = JSON.stringify([
    { label: "Capacity lock", description: "Duty manager confirms coverage gaps and protected sites.", meta: "07:45" },
    { label: "Parts desk", description: "Critical kits move from review to staged.", meta: "08:20" },
    { label: "Customer watch", description: "Renewal accounts with open work receive recovery owners.", meta: "09:05" }
  ]);

  accountTimelineJson = JSON.stringify([
    { label: "Renewal review", description: "Operations risk review scheduled.", meta: "Aug 12" },
    { label: "Critical job closed", description: "Cooling outage resolved under SLA.", meta: "Aug 10" },
    { label: "Quote approved", description: "Preventive maintenance expansion accepted.", meta: "Aug 04" }
  ]);

  workflowColumnsJson = JSON.stringify([
    { title: "Intake", items: [{ title: "Cooling outage", meta: "Granite Ridge" }, { title: "Panel fault", meta: "HarborWorks" }] },
    { title: "Scheduled", items: [{ title: "Dock sensor", meta: "Summit Cold" }, { title: "Roof unit", meta: "North clinic" }] },
    { title: "Approval", items: [{ title: "Compressor swap", meta: "$7,900 quote" }] },
    { title: "Closed", items: [{ title: "Generator test", meta: "Signed 10:42" }] }
  ]);

  priorityOptionsJson = JSON.stringify([
    { label: "Standard", value: "standard" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" }
  ]);

  stepperJson = JSON.stringify([
    { label: "Intake", description: "Request captured" },
    { label: "Dispatch", description: "Crew assigned" },
    { label: "Recovery", description: "Supervisor review" },
    { label: "Closeout", description: "Customer proof" }
  ]);

  settingsTabsJson = JSON.stringify([
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "routing", label: "Routing" }
  ]);

  localeOptionsJson = JSON.stringify([
    { label: "English, United States", value: "en-US" },
    { label: "English, Canada", value: "en-CA" },
    { label: "Spanish, United States", value: "es-US" }
  ]);

  timezoneOptionsJson = JSON.stringify([
    { label: "America/New York", value: "america-new-york" },
    { label: "America/Chicago", value: "america-chicago" },
    { label: "America/Denver", value: "america-denver" }
  ]);

  landingOptionsJson = JSON.stringify([
    { label: "Analytics", value: "analytics" },
    { label: "Customers", value: "customers" },
    { label: "Workflows", value: "workflows" }
  ]);

  treeJson = JSON.stringify([
    {
      id: "root",
      label: "ApexUI demo",
      children: [
        { id: "atoms", label: "Atoms: Icon, Badge, Button, Chip, Avatar" },
        { id: "molecules", label: "Molecules: SearchForm, Toolbar, Tabs, Stepper" },
        { id: "organisms", label: "Organisms: DataGrid, WorkflowBoard, Chart" },
        { id: "pages", label: "Pages: Home, Analytics, Customers, Workflows, Settings, About" }
      ]
    }
  ]);

  setTheme(event: Event): void {
    this.isDark = Boolean((event as SwitchEvent).detail?.checked);
  }

  hrefFor(path: RoutePath): string {
    return `${this.basePath()}${path === "/" ? "/" : path}${window.location.search}`;
  }

  navigate(event: Event, path: RoutePath): void {
    event.preventDefault();
    this.setRoute(path, "push");
  }

  private syncRoute(): void {
    const route = this.routeFromLocation();
    this.setRoute(route.path, route.shouldReplace ? "replace" : "none");
  }

  private setRoute(path: RoutePath, mode: "none" | "push" | "replace"): void {
    this.activePath = path;

    const active = routes.find((route) => route.path === this.activePath) ?? routes[0];
    document.title = active.path === "/" ? "Kentro | ApexUI Angular Demo" : `${active.title} | Kentro`;

    if (mode !== "none") {
      window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", this.hrefFor(path));
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  private routeFromLocation(): { path: RoutePath; shouldReplace: boolean } {
    const hashPath = normalizeRoute(window.location.hash.replace(/^#/, ""));
    if (hashPath) {
      return { path: hashPath, shouldReplace: true };
    }

    const segments = window.location.pathname.split("/").filter(Boolean);
    const routeSegment = segments[0] === deploymentBaseSegment ? segments[1] ?? "" : segments[0] ?? "";
    const normalizedPath = normalizeRoute(routeSegment);
    return { path: normalizedPath ?? "/", shouldReplace: normalizedPath === null };
  }

  private basePath(): string {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments[0] === deploymentBaseSegment ? `/${deploymentBaseSegment}` : "";
  }
}

function normalizeRoute(path: string): RoutePath | null {
  const [pathname] = path.split(/[?#]/);
  const normalized = pathname.replace(/^\/+|\/+$/g, "");

  switch (normalized) {
    case "":
      return "/";
    case "analytics":
      return "/analytics";
    case "customers":
      return "/customers";
    case "workflows":
      return "/workflows";
    case "settings":
      return "/settings";
    case "about":
      return "/about";
    default:
      return null;
  }
}

bootstrapApplication(AppComponent);
