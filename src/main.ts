import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { defineCustomElements } from "@apexui/web-components/loader";
import "zone.js";

defineCustomElements();

type RoutePath = "/" | "/analytics" | "/work-orders" | "/customers" | "/data-table" | "/settings" | "/about";
type SwitchEvent = CustomEvent<{ checked: boolean }>;

const routes: Array<{ path: RoutePath; label: string; icon: string; title: string }> = [
  { path: "/", label: "Home", icon: "home", title: "Kentro" },
  { path: "/analytics", label: "Analytics", icon: "bar-chart-3", title: "Analytics" },
  { path: "/work-orders", label: "Work orders", icon: "clipboard-list", title: "Work orders" },
  { path: "/customers", label: "Customers", icon: "users", title: "Customers" },
  { path: "/data-table", label: "Data table", icon: "table", title: "Data table" },
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

const serviceRecordRows = [
  { account: "Aster Foods", region: "North Loop", owner: "Maya Chen", priority: "High", status: "Scheduled", window: "09:00-11:00" },
  { account: "Briar Commons", region: "Lakeview", owner: "Omar Haddad", priority: "Critical", status: "Needs parts", window: "11:30-14:00" },
  { account: "Cobalt Labs", region: "West Yard", owner: "Elena Rossi", priority: "Normal", status: "On route", window: "13:00-15:00" },
  { account: "Dover Hotel Group", region: "Harbor", owner: "Nina Patel", priority: "High", status: "Approval", window: "15:00-17:00" },
  { account: "Evergreen Bank", region: "Uptown", owner: "Theo Brooks", priority: "Normal", status: "Closed", window: "08:00-10:00" },
  { account: "Foundry Works", region: "South Plant", owner: "Ana Silva", priority: "Critical", status: "Triage", window: "10:30-12:30" }
];

const serviceRecordColumns = [
  { key: "account", header: "Account", sortable: true, filterable: true },
  { key: "region", header: "Region", sortable: true, filterable: true },
  { key: "owner", header: "Owner", sortable: true, filterable: true },
  { key: "priority", header: "Priority", sortable: true, filterable: true },
  { key: "status", header: "Status", sortable: true, filterable: true },
  { key: "window", header: "Window", sortable: true, filterable: true }
];

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="site-shell" [attr.data-apex-theme]="theme">
      <header class="site-header">
        <a class="brand-lockup" [href]="hrefFor('/')" (click)="navigate($event, '/')" aria-label="Kentro home">
          <span class="brand-mark"><apex-icon name="navigation" size="sm"></apex-icon></span>
          <span>
            <strong>Kentro</strong>
            <small>Operations</small>
          </span>
        </a>

        <nav class="primary-nav" aria-label="Primary navigation">
          <a *ngFor="let item of navItems" [href]="hrefFor(item.path)" [class.nav-link-active]="activePath === item.path" class="nav-link" (click)="navigate($event, item.path)">
            {{ item.label }}
          </a>
        </nav>

        <div class="header-actions">
          <a class="action-link secondary compact-link" [href]="hrefFor('/customers')" (click)="navigate($event, '/customers')">Customer portal</a>
          <a class="action-link primary compact-link" [href]="hrefFor('/work-orders')" (click)="navigate($event, '/work-orders')">Book service</a>
          <apex-switch label="Dark" [checked]="isDark" (apexChange)="setTheme($event)"></apex-switch>
        </div>
      </header>

      <div class="route-shell">
        <section class="route-panel" [attr.aria-label]="activeLabel + ' page'">
          <apex-breadcrumbs [attr.items]="breadcrumbsJson"></apex-breadcrumbs>

          <ng-container [ngSwitch]="activePath">
            <section *ngSwitchCase="'/'" class="route-page home-page">
              <section class="hero-page" aria-labelledby="home-title">
                <div class="hero-copy">
                  <apex-stack gap="lg">
                    <apex-typography id="home-title" as="h1" variant="display">Field service that feels calm before the crew arrives.</apex-typography>
                    <p>Kentro coordinates commercial maintenance, emergency dispatch, customer approvals, and executive reporting from one operating system.</p>
                    <div class="button-row">
                      <a class="action-link primary" [href]="hrefFor('/work-orders')" (click)="navigate($event, '/work-orders')">Book a service visit</a>
                      <a class="action-link secondary" [href]="hrefFor('/analytics')" (click)="navigate($event, '/analytics')">View live metrics</a>
                    </div>
                  </apex-stack>
                </div>
                <apex-card eyebrow="Today at Kentro" heading="Readiness snapshot">
                  <apex-stack gap="md">
                    <apex-chart label="Service mix" [attr.data]="serviceMixChartJson"></apex-chart>
                    <div class="metric-band">
                      <article class="metric-card"><span>Open orders</span><strong>128</strong></article>
                      <article class="metric-card"><span>First-time fix</span><strong>94%</strong></article>
                      <article class="metric-card"><span>At-risk sites</span><strong>7</strong></article>
                    </div>
                  </apex-stack>
                </apex-card>
              </section>

              <section class="trust-band" aria-label="Customer proof">
                <span>Trusted by regional facilities teams</span>
                <strong>Aster Foods</strong>
                <strong>Briar Commons</strong>
                <strong>Cobalt Labs</strong>
                <strong>Dover Hotel Group</strong>
              </section>

              <section class="story-grid">
                <apex-card eyebrow="Response" heading="Book urgent work without calling dispatch">
                  <p>Customers can request service, upload logs, pick dates, and track status through one branded experience.</p>
                </apex-card>
                <apex-card eyebrow="Operations" heading="Managers see the route plan before it breaks">
                  <p>Dashboards combine work orders, crew load, SLA risk, and account health in one operations surface.</p>
                </apex-card>
                <apex-card eyebrow="Proof" heading="Every page exercises ApexUI in context">
                  <p>Marketing, metrics, forms, records, settings, and package proof share the same token system.</p>
                </apex-card>
              </section>
            </section>

            <section *ngSwitchCase="'/analytics'" class="route-page analytics-page">
              <header class="page-heading">
                <apex-typography as="h1" variant="display">Operations command center</apex-typography>
                <p>Real route density: crew load, SLA risk, customer health, and work-order evidence in one dashboard.</p>
              </header>

              <apex-grid columns="four" gap="md" align="stretch" class="metric-grid compact">
                <apex-card *ngFor="let metric of dashboardMetrics" [attr.eyebrow]="metric.eyebrow" [attr.heading]="metric.heading" fill>
                  <strong class="metric-value">{{ metric.value }}</strong>
                  <apex-progress [attr.label]="metric.label" [attr.value]="metric.progress"></apex-progress>
                </apex-card>
              </apex-grid>

              <section class="dashboard-visual-grid">
                <apex-card eyebrow="Dispatch" heading="Dispatch health">
                  <apex-chart label="Weekly dispatch completion" [attr.data]="dispatchChartJson"></apex-chart>
                </apex-card>
                <apex-card eyebrow="Capacity" heading="Regional load">
                  <apex-chart label="Regional scheduled capacity" [attr.data]="coverageChartJson"></apex-chart>
                </apex-card>
                <apex-card eyebrow="SLA" heading="Risk mix">
                  <apex-chart label="Open SLA risk by cause" [attr.data]="riskChartJson"></apex-chart>
                </apex-card>
                <apex-card eyebrow="Health" heading="Customer health">
                  <apex-chart label="Customer health by segment" [attr.data]="healthChartJson"></apex-chart>
                </apex-card>
              </section>

              <section class="dashboard-shell">
                <apex-card eyebrow="Crew" heading="Crew utilization">
                  <apex-chart label="Crew utilization" [attr.data]="crewChartJson"></apex-chart>
                </apex-card>
                <apex-card eyebrow="Territory" heading="Territory watchlist">
                  <ul class="proof-list">
                    <li><strong>North Loop</strong><span>Crew A has three stops and one SLA watch.</span></li>
                    <li><strong>Lakeview</strong><span>Crew B cleared after customer approval.</span></li>
                    <li><strong>West Yard</strong><span>Parts hold blocks a critical closeout.</span></li>
                  </ul>
                </apex-card>
              </section>

              <apex-card eyebrow="Live queue" heading="Route health">
                <apex-data-grid
                  caption="Open work order queue"
                  [attr.columns]="routeColumnsJson"
                  [attr.rows]="routeRowsJson"
                  sortable
                  filterable
                  pageable
                  page-size="3"
                ></apex-data-grid>
              </apex-card>
            </section>

            <section *ngSwitchCase="'/customers'" class="route-page customers-page">
              <header class="page-heading">
                <apex-typography as="h1" variant="display">Account pipeline and health records</apex-typography>
                <p>A customer operations page with searchable records, structured data, and next-best action states.</p>
              </header>

              <apex-toolbar label="Customer tools" density="comfortable" wrap>
                <apex-search-form label="Search accounts" placeholder="Search account, plan, owner"></apex-search-form>
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

            <section *ngSwitchCase="'/data-table'" class="route-page data-table-page">
              <header class="page-heading">
                <apex-typography as="h1" variant="display">Service records data table</apex-typography>
                <p>A routed data-table page proving ApexUI DataGrid sorting, filtering, and paging in Angular.</p>
              </header>

              <apex-toolbar label="Data table controls" density="comfortable" wrap>
                <apex-search-form label="Find service record" placeholder="Use column filters below for scoped search"></apex-search-form>
                <apex-button variant="secondary">Export CSV</apex-button>
                <apex-button>Save view</apex-button>
              </apex-toolbar>

              <section class="split-grid wide-left">
                <apex-card eyebrow="Grid" heading="Service record queue">
                  <apex-data-grid
                    caption="Service record queue"
                    [attr.columns]="serviceRecordColumnsJson"
                    [attr.rows]="serviceRecordRowsJson"
                    sortable
                    filterable
                    pageable
                    page-size="3"
                  ></apex-data-grid>
                </apex-card>
                <div class="insight-column">
                  <apex-card eyebrow="Proof" heading="Grid behavior">
                    <ul class="proof-list">
                      <li><strong>One-line sorting</strong><span>Enabled with the sortable flag.</span></li>
                      <li><strong>Column filters</strong><span>Enabled with the filterable flag.</span></li>
                      <li><strong>Paging</strong><span>Enabled with pageable and page-size.</span></li>
                    </ul>
                  </apex-card>
                  <apex-card eyebrow="Package" heading="Angular custom elements">
                    <p>This page uses ApexUI Stencil components through Angular CUSTOM_ELEMENTS_SCHEMA.</p>
                  </apex-card>
                </div>
              </section>
            </section>

            <section *ngSwitchCase="'/work-orders'" class="route-page work-orders-page">
              <header class="page-heading">
                <apex-typography as="h1" variant="display">Create a service visit</apex-typography>
                <p>A realistic intake page with typed fields, route selection, urgency, attachment, and dispatch confidence.</p>
              </header>

              <section class="split-grid">
                <apex-card eyebrow="Request intake" heading="Service details">
                  <div class="form-grid">
                    <apex-text-field label="Customer" value="Aster Foods"></apex-text-field>
                    <apex-text-field label="Asset" value="Rooftop unit 14"></apex-text-field>
                    <apex-select label="Service type" [attr.options]="serviceTypeOptionsJson" value="maintenance"></apex-select>
                    <apex-date-picker label="Requested date" value="2026-08-14"></apex-date-picker>
                    <apex-textarea label="Technician notes" rows="4" value="Customer reports intermittent alarm after compressor cycle."></apex-textarea>
                    <apex-checkbox label="Notify customer when crew is assigned" checked></apex-checkbox>
                  </div>
                </apex-card>
                <apex-card eyebrow="Dispatch controls" heading="Route plan">
                  <div class="form-grid single-column">
                    <apex-select label="Priority" [attr.options]="priorityOptionsJson" value="high"></apex-select>
                    <apex-number-field label="Crew size" value="2" min="1" max="8"></apex-number-field>
                    <apex-slider label="Dispatch confidence" value="72" min="0" max="100"></apex-slider>
                    <apex-alert tone="info" heading="Routing note">Crew assignment updates the customer timeline and route board.</apex-alert>
                    <apex-button>Create work order</apex-button>
                  </div>
                </apex-card>
              </section>

              <apex-card eyebrow="Kanban" heading="Daily work movement">
                <apex-workflow-board [attr.columns]="workflowColumnsJson"></apex-workflow-board>
              </apex-card>
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

      <footer class="site-footer">
        <div>
          <strong>Kentro Operations</strong>
          <span>Angular demo built with ApexUI tokens and Stencil custom elements.</span>
        </div>
        <nav aria-label="Footer navigation">
          <button type="button" (click)="go('/analytics')">Operations</button>
          <button type="button" (click)="go('/work-orders')">Service request</button>
          <button type="button" (click)="go('/data-table')">Data grid</button>
        </nav>
      </footer>

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

  dashboardMetrics = [
    { eyebrow: "Today", heading: "Open work", value: "128", label: "Assigned before noon", progress: 76 },
    { eyebrow: "SLA", heading: "Arrival promise", value: "94%", label: "On-time window", progress: 94 },
    { eyebrow: "Parts", heading: "Ready kits", value: "84%", label: "Critical kits staged", progress: 84 },
    { eyebrow: "Revenue", heading: "Protected work", value: "$311K", label: "At-risk value covered", progress: 71 }
  ];

  proofCards = [
    { eyebrow: "Tokens", heading: "Concept theme", copy: "Light and dark modes come from the ApexUI Concept token family.", status: "concept", tone: "info" },
    { eyebrow: "Angular", heading: "Custom elements", copy: "Angular uses CUSTOM_ELEMENTS_SCHEMA with ApexUI Stencil components.", status: "rendering", tone: "success" },
    { eyebrow: "Product UI", heading: "Real site shape", copy: "Pages model home, analytics, work orders, customers, data table, settings, and about.", status: "routed", tone: "success" }
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

  get activeLabel(): string {
    return (this.navItems.find((item) => item.path === this.activePath) ?? this.navItems[0]).label;
  }

  serviceMixChartJson = JSON.stringify([
    { label: "Maintenance", value: 86 },
    { label: "Emergency", value: 34 },
    { label: "Install", value: 52 },
    { label: "Audit", value: 69 }
  ]);

  dispatchChartJson = JSON.stringify([
    { label: "Mon", value: 72 },
    { label: "Tue", value: 84 },
    { label: "Wed", value: 91 },
    { label: "Thu", value: 78 },
    { label: "Fri", value: 88 }
  ]);

  coverageChartJson = JSON.stringify([
    { label: "North Loop", value: 86 },
    { label: "Lakeview", value: 64 },
    { label: "West Yard", value: 73 },
    { label: "South Bay", value: 58 }
  ]);

  riskChartJson = JSON.stringify([
    { label: "Parts hold", value: 42 },
    { label: "Crew delay", value: 28 },
    { label: "Customer approval", value: 18 },
    { label: "Weather", value: 12 }
  ]);

  healthChartJson = JSON.stringify([
    { label: "Enterprise", value: 94 },
    { label: "Priority", value: 87 },
    { label: "Preventive", value: 91 },
    { label: "At risk", value: 38 }
  ]);

  crewChartJson = JSON.stringify([
    { label: "Crew A", value: 92 },
    { label: "Crew B", value: 76 },
    { label: "Crew C", value: 88 },
    { label: "Crew D", value: 81 }
  ]);

  routeColumnsJson = JSON.stringify(routeColumns);
  routeRowsJson = JSON.stringify(routeRows);
  serviceRecordColumnsJson = JSON.stringify(serviceRecordColumns);
  serviceRecordRowsJson = JSON.stringify(serviceRecordRows);

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

  serviceTypeOptionsJson = JSON.stringify([
    { label: "Preventive maintenance", value: "maintenance" },
    { label: "Emergency repair", value: "emergency" },
    { label: "Installation", value: "install" }
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
    { label: "Work orders", value: "work-orders" }
  ]);

  treeJson = JSON.stringify([
    {
      id: "root",
      label: "ApexUI demo",
      children: [
        { id: "atoms", label: "Atoms: Icon, Badge, Button, Chip, Avatar" },
        { id: "molecules", label: "Molecules: SearchForm, Toolbar, Tabs, Stepper" },
        { id: "organisms", label: "Organisms: DataGrid, WorkflowBoard, Chart" },
        { id: "pages", label: "Pages: Home, Analytics, Work orders, Customers, Data table, Settings, About" }
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

  go(path: RoutePath): void {
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
    case "work-orders":
    case "workflows":
      return "/work-orders";
    case "customers":
      return "/customers";
    case "data-table":
      return "/data-table";
    case "settings":
      return "/settings";
    case "about":
      return "/about";
    default:
      return null;
  }
}

bootstrapApplication(AppComponent);
