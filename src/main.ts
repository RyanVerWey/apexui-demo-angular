import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DIRECTIVES } from "@apexui/angular";
import "@apexui/tokens/css";
import "@apexui/web-components/components/apex-alert.js";
import "@apexui/web-components/components/apex-app-bar.js";
import "@apexui/web-components/components/apex-avatar.js";
import "@apexui/web-components/components/apex-badge.js";
import "@apexui/web-components/components/apex-breadcrumbs.js";
import "@apexui/web-components/components/apex-button.js";
import "@apexui/web-components/components/apex-button-group.js";
import "@apexui/web-components/components/apex-card.js";
import "@apexui/web-components/components/apex-chart.js";
import "@apexui/web-components/components/apex-checkbox.js";
import "@apexui/web-components/components/apex-chip.js";
import "@apexui/web-components/components/apex-data-grid.js";
import "@apexui/web-components/components/apex-data-table.js";
import "@apexui/web-components/components/apex-date-picker.js";
import "@apexui/web-components/components/apex-divider.js";
import "@apexui/web-components/components/apex-empty-state.js";
import "@apexui/web-components/components/apex-file-upload.js";
import "@apexui/web-components/components/apex-icon.js";
import "@apexui/web-components/components/apex-number-field.js";
import "@apexui/web-components/components/apex-progress.js";
import "@apexui/web-components/components/apex-radio-group.js";
import "@apexui/web-components/components/apex-search-form.js";
import "@apexui/web-components/components/apex-select.js";
import "@apexui/web-components/components/apex-sidebar.js";
import "@apexui/web-components/components/apex-slider.js";
import "@apexui/web-components/components/apex-stack.js";
import "@apexui/web-components/components/apex-stepper.js";
import "@apexui/web-components/components/apex-switch.js";
import "@apexui/web-components/components/apex-tabs.js";
import "@apexui/web-components/components/apex-text-field.js";
import "@apexui/web-components/components/apex-textarea.js";
import "@apexui/web-components/components/apex-timeline.js";
import "@apexui/web-components/components/apex-toggle-group.js";
import "@apexui/web-components/components/apex-toolbar.js";
import "@apexui/web-components/components/apex-transfer-list.js";
import "@apexui/web-components/components/apex-tree-view.js";
import "@apexui/web-components/components/apex-typography.js";
import "@apexui/web-components/components/apex-workflow-board.js";
import "zone.js";

type ApexTheme = "graphite-light" | "graphite-dark";
type SelectEvent = CustomEvent<{ value: string }>;
type SwitchEvent = CustomEvent<{ checked: boolean }>;
type TabsEvent = CustomEvent<{ id: string }>;

const pageSchemas = [CUSTOM_ELEMENTS_SCHEMA];
const packageNames = ["@apexui/angular", "@apexui/web-components", "@apexui/tokens"];

const navItems = [
  { label: "Home", path: "/", exact: true },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Work Orders", path: "/work-orders" },
  { label: "Customers", path: "/customers" },
  { label: "Settings", path: "/settings" },
  { label: "About", path: "/about" }
];

const customerRows = [
  { account: "Granite Ridge Health", region: "North", stage: "Renewal", value: "$480K", owner: "Mara Chen" },
  { account: "Cedarline Utilities", region: "West", stage: "Pilot", value: "$220K", owner: "Theo Grant" },
  { account: "HarborWorks Transit", region: "East", stage: "Expansion", value: "$680K", owner: "Iris Patel" },
  { account: "Summit Cold Storage", region: "Central", stage: "Qualified", value: "$140K", owner: "Jon Bell" }
];

const customerColumns = [
  { key: "account", header: "Account" },
  { key: "region", header: "Region" },
  { key: "stage", header: "Stage" },
  { key: "value", header: "Annual value" },
  { key: "owner", header: "Owner" }
];

@Component({
  selector: "northstar-home",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="hero-page">
      <div class="hero-copy">
        <apex-badge tone="info">Regional field ops platform</apex-badge>
        <apex-typography as="h1" variant="display">Northstar Field Services</apex-typography>
        <apex-typography variant="body">
          Northstar coordinates mobile crews, customer sites, parts readiness, and service proof for regional operators that cannot afford missed windows.
        </apex-typography>
        <div class="button-row">
          <a href="#/work-orders" class="button-link primary">Create work order</a>
          <a href="#/dashboard" class="button-link secondary">View dispatch metrics</a>
        </div>
      </div>
      <div class="operations-board" aria-label="Live dispatch board">
        <div class="board-header">
          <span>Today</span>
          <apex-badge tone="success">94% on-time</apex-badge>
        </div>
        <div class="route-map">
          <span class="node large">HQ</span>
          <span class="node">A12</span>
          <span class="node">B04</span>
          <span class="node">C31</span>
        </div>
        <apex-progress label="Critical parts staged" [value]="82"></apex-progress>
      </div>
    </section>

    <section class="section-band">
      <div class="section-heading">
        <apex-typography as="h2" variant="title">What the business sells</apex-typography>
        <apex-typography variant="body">A field service operating layer for dispatch, asset history, job intake, and customer commitments.</apex-typography>
      </div>
      <div class="feature-grid">
        <apex-card eyebrow="Dispatch" heading="Crew capacity">
          <p>Balance technician skill, drive time, emergency priority, and promised arrival windows.</p>
        </apex-card>
        <apex-card eyebrow="Service" heading="Work order memory">
          <p>Keep asset notes, photos, parts, warranty status, and approvals beside each job.</p>
        </apex-card>
        <apex-card eyebrow="Revenue" heading="Customer growth">
          <p>Expose renewals, open quotes, risk accounts, and expansion routes in one pipeline.</p>
        </apex-card>
      </div>
    </section>

    <section class="proof-strip" aria-label="Customer proof">
      <div *ngFor="let proof of proofPoints">
        <strong>{{ proof.value }}</strong>
        <span>{{ proof.label }}</span>
      </div>
    </section>
  `
})
class HomePageComponent {
  proofPoints = [
    { value: "38K", label: "jobs coordinated each quarter" },
    { value: "17%", label: "fewer repeat site visits" },
    { value: "11", label: "regional teams onboarded" }
  ];
}

@Component({
  selector: "northstar-dashboard",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="page-heading">
      <apex-badge tone="info">Metrics dashboard</apex-badge>
      <apex-typography as="h1" variant="display">Field command center</apex-typography>
      <p>Operations leads use this page during morning dispatch and late-day recovery.</p>
    </section>

    <section class="metric-grid">
      <apex-card *ngFor="let metric of metrics" [eyebrow]="metric.eyebrow" [heading]="metric.heading">
        <div class="metric-value">{{ metric.value }}</div>
        <apex-progress [label]="metric.label" [value]="metric.progress"></apex-progress>
      </apex-card>
    </section>

    <section class="dashboard-insights-grid">
      <apex-card eyebrow="Capacity" heading="Work by line of service">
        <apex-chart label="Service demand by team" [data]="chartData"></apex-chart>
      </apex-card>

      <apex-card eyebrow="Readiness" heading="Regional operating signals">
        <div class="signal-list" aria-label="Regional readiness signals">
          <div *ngFor="let signal of signals" class="signal-row">
            <span>{{ signal.label }}</span>
            <strong>{{ signal.value }}</strong>
            <apex-progress [label]="signal.label" [value]="signal.progress"></apex-progress>
          </div>
        </div>
      </apex-card>
    </section>

    <section class="dashboard-workflow-card">
      <apex-card eyebrow="Workflow" heading="Dispatch lanes">
        <apex-workflow-board [columns]="workflowColumns"></apex-workflow-board>
      </apex-card>
    </section>

    <section class="dashboard-data-grid">
      <div class="section-band no-pad">
        <apex-data-table caption="High priority work orders" [columns]="workColumns" [rows]="workRows"></apex-data-table>
      </div>

      <apex-card eyebrow="Closeout quality" heading="Today at a glance">
        <apex-stack gap="md">
          <div class="record-line"><span>Open orders</span><strong>128</strong></div>
          <div class="record-line"><span>Crews active</span><strong>18</strong></div>
          <div class="record-line"><span>Protected SLA</span><strong>94%</strong></div>
          <apex-timeline [events]="timelineEvents"></apex-timeline>
        </apex-stack>
      </apex-card>
    </section>
  `
})
class DashboardPageComponent {
  metrics = [
    { eyebrow: "Today", heading: "Open work", value: "128", label: "Assigned before noon", progress: 76 },
    { eyebrow: "SLA", heading: "Arrival promise", value: "94%", label: "On-time window", progress: 94 },
    { eyebrow: "Parts", heading: "Ready kits", value: "82%", label: "Critical kits staged", progress: 82 },
    { eyebrow: "Revenue", heading: "Approved extras", value: "$41K", label: "Same-week capture", progress: 68 }
  ];

  chartData = [
    { label: "HVAC", value: 42 },
    { label: "Electrical", value: 31 },
    { label: "Safety", value: 18 },
    { label: "Install", value: 27 }
  ];

  signals = [
    { label: "North region ready", value: "88%", progress: 88 },
    { label: "Parts staged", value: "82%", progress: 82 },
    { label: "First visit fix", value: "78%", progress: 78 }
  ];

  workflowColumns = [
    { title: "Intake", items: [{ title: "Cooling outage", meta: "Granite Ridge" }, { title: "Panel fault", meta: "HarborWorks" }] },
    { title: "Scheduled", items: [{ title: "Dock sensor", meta: "Summit Cold" }, { title: "Roof unit", meta: "North clinic" }] },
    { title: "Approval", items: [{ title: "Compressor swap", meta: "$7,900 quote" }] },
    { title: "Closed", items: [{ title: "Generator test", meta: "Signed 10:42" }] }
  ];

  timelineEvents = [
    { label: "Parts desk", description: "Three critical kits staged before 10:00.", meta: "08:45" },
    { label: "Dispatch sync", description: "Crew B moved to Summit Cold after approval.", meta: "10:20" },
    { label: "Closeout", description: "Generator load test signed by facilities lead.", meta: "12:10" }
  ];

  workColumns = [
    { key: "id", header: "ID" },
    { key: "site", header: "Site" },
    { key: "crew", header: "Crew" },
    { key: "priority", header: "Priority" },
    { key: "window", header: "Window" }
  ];

  workRows = [
    { id: "WO-1048", site: "Granite Ridge East", crew: "Avery / Lane", priority: "Critical", window: "09:00-11:00" },
    { id: "WO-1051", site: "HarborWorks Depot 4", crew: "Mills", priority: "High", window: "11:30-14:00" },
    { id: "WO-1056", site: "Summit Cold Bay 7", crew: "Nolan / Price", priority: "High", window: "13:00-15:00" }
  ];
}

@Component({
  selector: "northstar-work-orders",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="page-heading">
      <apex-badge tone="warning">Work order intake</apex-badge>
      <apex-typography as="h1" variant="display">Create a service visit</apex-typography>
      <p>Capture enough signal for dispatch to route the right crew without follow-up calls.</p>
    </section>

    <form class="form-layout" (submit)="submit($event)" novalidate>
      <apex-card eyebrow="Request" heading="Job details">
        <div class="form-grid">
          <apex-text-field
            label="Work summary"
            name="summary"
            placeholder="Roof unit not cooling"
            [value]="form.summary"
            [error]="errors.summary"
            (input)="updateText('summary', $event)">
          </apex-text-field>
          <apex-select
            label="Priority"
            name="priority"
            hint="Critical routes to duty manager"
            [options]="priorityOptions"
            [value]="form.priority"
            (apexChange)="updateSelect('priority', $event)">
          </apex-select>
          <apex-select
            label="Customer site"
            name="site"
            [options]="siteOptions"
            [value]="form.site"
            [hint]="siteHint"
            (apexChange)="updateSelect('site', $event)">
          </apex-select>
          <apex-date-picker
            label="Requested date"
            name="date"
            hint="Business days only for standard priority"
            [value]="form.date"
            (input)="updateText('date', $event)">
          </apex-date-picker>
          <apex-number-field label="Estimated labor hours" name="hours" min="1" max="16" value="4"></apex-number-field>
          <apex-file-upload
            label="Site photos or inspection report"
            action-label="Attach files"
            accept=".jpg,.png,.pdf"
            description="Photos help dispatch avoid repeat site visits."
            [files]="attachedFiles"
            multiple
            (apexFilesChange)="setFiles($event)">
          </apex-file-upload>
          <apex-textarea
            label="Technician notes"
            name="notes"
            rows="5"
            placeholder="Access instructions, asset tag, visible damage"
            [value]="form.notes"
            (input)="updateText('notes', $event)">
          </apex-textarea>
        </div>
      </apex-card>

      <aside class="form-rail">
        <apex-card eyebrow="Validation" heading="Dispatch readiness">
          <apex-stack gap="md">
            <apex-alert *ngIf="submitted && hasErrors" tone="danger" heading="Missing required fields">
              Work summary and customer site are required before dispatch can stage the job.
            </apex-alert>
            <apex-alert *ngIf="submitted && !hasErrors" tone="success" heading="Ready for dispatch">
              Intake has required routing data, {{ form.priority }} priority, {{ attachedFiles.length }} attachment(s).
            </apex-alert>
            <apex-checkbox label="Customer approved site access" checked></apex-checkbox>
            <apex-checkbox label="Parts desk should review before assignment"></apex-checkbox>
            <apex-button type="submit">Validate work order</apex-button>
          </apex-stack>
        </apex-card>
      </aside>
    </form>
  `
})
class WorkOrdersPageComponent {
  submitted = false;
  attachedFiles: Array<{ name: string; meta?: string }> = [];
  errors: Record<string, string | undefined> = {};
  form = {
    summary: "North loading dock sensor fault",
    priority: "high",
    site: "summit",
    date: "2026-06-18",
    notes: "Gate code expires at 16:00. Ask for Maribel at receiving."
  };

  priorityOptions = [
    { label: "Standard", value: "standard" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" }
  ];

  siteOptions = [
    { label: "Choose a site", value: "" },
    { label: "Summit Cold Storage, Bay 7", value: "summit" },
    { label: "Granite Ridge East Clinic", value: "granite" },
    { label: "HarborWorks Depot 4", value: "harbor" }
  ];

  get siteHint(): string {
    return this.errors.site ?? "Sites come from customer records.";
  }

  get hasErrors(): boolean {
    return Object.values(this.errors).some(Boolean);
  }

  updateSelect(field: "priority" | "site", event: Event): void {
    this.form[field] = ((event as SelectEvent).detail?.value ?? this.form[field]);
    this.validate();
  }

  updateText(field: "summary" | "date" | "notes", event: Event): void {
    const input = event.composedPath().find((node): node is HTMLInputElement | HTMLTextAreaElement => {
      return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
    });
    this.form[field] = input?.value ?? this.form[field];
    this.validate();
  }

  setFiles(event: Event): void {
    const names = (event as CustomEvent<string[]>).detail ?? [];
    this.attachedFiles = names.map((name) => ({ name, meta: "Attached now" }));
  }

  submit(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    this.validate();
  }

  private validate(): void {
    this.errors = {
      summary: this.form.summary.trim() ? undefined : "Summary is required.",
      site: this.form.site ? undefined : "Choose a customer site."
    };
  }
}

@Component({
  selector: "northstar-customers",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="page-heading">
      <apex-badge tone="success">Customer records</apex-badge>
      <apex-typography as="h1" variant="display">Pipeline and service memory</apex-typography>
      <p>Account teams can see active revenue, service risk, and recent field outcomes without leaving operations.</p>
    </section>

    <section class="split-grid">
      <apex-card eyebrow="Pipeline" heading="Accounts by stage">
        <apex-data-grid caption="Northstar customer pipeline" [columns]="customerColumns" [rows]="customerRows"></apex-data-grid>
      </apex-card>
      <apex-card eyebrow="Selected account" heading="Granite Ridge Health">
        <apex-stack gap="md">
          <div class="record-line"><span>Region</span><strong>North</strong></div>
          <div class="record-line"><span>Open sites</span><strong>18</strong></div>
          <div class="record-line"><span>Renewal date</span><strong>Aug 30, 2026</strong></div>
          <div class="record-line"><span>Risk</span><apex-badge tone="warning">Parts delays</apex-badge></div>
          <apex-divider></apex-divider>
          <apex-timeline [events]="accountTimeline"></apex-timeline>
        </apex-stack>
      </apex-card>
    </section>

    <section class="section-band">
      <div class="section-heading">
        <apex-typography as="h2" variant="title">Service contacts</apex-typography>
        <apex-typography variant="body">Repeated list and detail patterns for account operations.</apex-typography>
      </div>
      <div class="contact-grid">
        <apex-card *ngFor="let contact of contacts" [eyebrow]="contact.role" [heading]="contact.name">
          <div class="contact-row">
            <apex-avatar [initials]="contact.initials" size="lg"></apex-avatar>
            <div>
              <p>{{ contact.email }}</p>
              <apex-badge [tone]="contact.tone">{{ contact.status }}</apex-badge>
            </div>
          </div>
        </apex-card>
      </div>
    </section>
  `
})
class CustomersPageComponent {
  customerRows = customerRows;
  customerColumns = customerColumns;

  accountTimeline = [
    { label: "Renewal review", description: "Operations risk review scheduled.", meta: "Jun 21" },
    { label: "Critical job closed", description: "Cooling outage resolved under SLA.", meta: "Jun 14" },
    { label: "Quote approved", description: "Preventive maintenance expansion accepted.", meta: "Jun 02" }
  ];

  contacts = [
    { initials: "MC", name: "Mara Chen", role: "Account owner", email: "mara@northstar.example", status: "Primary", tone: "info" },
    { initials: "JG", name: "Jules Grant", role: "Facility lead", email: "jules@graniteridge.example", status: "Approver", tone: "success" },
    { initials: "RP", name: "Rae Porter", role: "Dispatch liaison", email: "rae@northstar.example", status: "Escalation", tone: "warning" }
  ];
}

@Component({
  selector: "northstar-settings",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="page-heading">
      <apex-badge tone="neutral">Settings</apex-badge>
      <apex-typography as="h1" variant="display">Account and workspace controls</apex-typography>
      <p>Preference surfaces validate toggles, segmented controls, tabs, locale fields, and token theme handling.</p>
    </section>

    <apex-toolbar label="Settings views" density="comfortable" wrap>
      <apex-tabs label="Settings section" [items]="tabs" [activeId]="activeTab" (apexChange)="setTab($event)"></apex-tabs>
    </apex-toolbar>

    <section class="split-grid wide-left">
      <apex-card eyebrow="Profile" heading="Operator account">
        <div class="form-grid">
          <apex-text-field label="Display name" value="Ryan Demo Operator"></apex-text-field>
          <apex-text-field label="Email" type="email" value="operator@northstar.example"></apex-text-field>
          <apex-select label="Locale" hint="Formats dates and numbers" [options]="localeOptions" value="en-US"></apex-select>
          <apex-select label="Timezone" [options]="timezoneOptions" value="america-new-york"></apex-select>
        </div>
      </apex-card>

      <apex-card eyebrow="Preferences" heading="Workspace behavior">
        <apex-stack gap="md">
          <apex-switch label="Use dark mode" description="Switches graphite token family" [checked]="isDark" (apexChange)="toggleTheme.emit($event)"></apex-switch>
          <apex-switch label="Notify on critical reassignment" checked></apex-switch>
          <apex-switch label="Show compact dispatch rows"></apex-switch>
          <apex-toggle-group label="Default landing page" [options]="landingOptions" value="dashboard"></apex-toggle-group>
          <apex-select label="Notification cadence" [options]="cadenceOptions" value="immediate"></apex-select>
        </apex-stack>
      </apex-card>
    </section>
  `
})
class SettingsPageComponent {
  activeTab = "account";
  isDark = false;

  toggleTheme = {
    emit: (event: Event) => {
      window.dispatchEvent(new CustomEvent("northstar-theme", { detail: (event as SwitchEvent).detail }));
    }
  };

  tabs = [
    { id: "account", label: "Account" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" }
  ];

  localeOptions = [
    { label: "English, United States", value: "en-US" },
    { label: "English, Canada", value: "en-CA" },
    { label: "Spanish, United States", value: "es-US" }
  ];

  timezoneOptions = [
    { label: "America/New York", value: "america-new-york" },
    { label: "America/Chicago", value: "america-chicago" },
    { label: "America/Denver", value: "america-denver" }
  ];

  landingOptions = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Customers", value: "customers" },
    { label: "Work Orders", value: "work-orders" }
  ];

  cadenceOptions = [
    { label: "Immediate", value: "immediate" },
    { label: "Every 15 minutes", value: "15" },
    { label: "Daily digest", value: "daily" }
  ];

  setTab(event: Event): void {
    this.activeTab = (event as TabsEvent).detail?.id ?? this.activeTab;
  }
}

@Component({
  selector: "northstar-about",
  standalone: true,
  imports: [CommonModule],
  schemas: pageSchemas,
  template: `
    <section class="page-heading">
      <apex-badge tone="info">Package proof</apex-badge>
      <apex-typography as="h1" variant="display">ApexUI Angular integration</apex-typography>
      <p>This page proves the demo uses the shipped packages as a business app, not as a component catalog.</p>
    </section>

    <section class="feature-grid">
      <apex-card *ngFor="let pkg of packages" [eyebrow]="pkg.role" [heading]="pkg.name">
        <p>{{ pkg.description }}</p>
        <apex-badge [tone]="pkg.tone">{{ pkg.status }}</apex-badge>
      </apex-card>
    </section>

    <section class="split-grid">
      <apex-card eyebrow="Routing" heading="Angular hash routes">
        <apex-tree-view label="Route map" [items]="routeTree"></apex-tree-view>
      </apex-card>
      <apex-card eyebrow="Framework proof" heading="Angular package surface">
        <apex-stack gap="md">
          <p>@apexui/angular exports {{ angularDirectiveCount }} generated directive proxies in this install.</p>
          <p>Runtime rendering uses Stencil custom elements from @apexui/web-components with CUSTOM_ELEMENTS_SCHEMA.</p>
        <p>Theme values come from @apexui/tokens/css and data-apex-theme graphite-light or graphite-dark.</p>
        </apex-stack>
      </apex-card>
    </section>
  `
})
class AboutPageComponent {
  angularDirectiveCount = DIRECTIVES.length;

  packages = [
    { name: packageNames[0], role: "Angular", status: "Installed", tone: "success", description: "Provides generated Angular proxy metadata for ApexUI elements." },
    { name: packageNames[1], role: "Web components", status: "Rendering", tone: "success", description: "Registers the Apex custom elements used across all routes." },
    { name: packageNames[2], role: "Tokens", status: "graphite-light", tone: "info", description: "Supplies CSS variables for light and dark graphite themes." }
  ];

  routeTree = [
    {
      id: "root",
      label: "Northstar routes",
      children: navItems.map((item) => ({ id: item.path || "home", label: item.path || "/" }))
    }
  ];
}

const routes = [
  { path: "/", title: "Northstar Field Services" },
  { path: "/dashboard", title: "Dashboard" },
  { path: "/work-orders", title: "Work Orders" },
  { path: "/customers", title: "Customers" },
  { path: "/settings", title: "Settings" },
  { path: "/about", title: "About" }
];

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    HomePageComponent,
    DashboardPageComponent,
    WorkOrdersPageComponent,
    CustomersPageComponent,
    SettingsPageComponent,
    AboutPageComponent
  ],
  schemas: pageSchemas,
  template: `
    <main class="app-shell" [attr.data-apex-theme]="theme">
      <apex-app-bar heading="Northstar Field Services">
        <div slot="actions" class="app-actions">
          <apex-badge tone="info">{{ theme }}</apex-badge>
          <apex-switch label="Dark mode" [checked]="isDark" (apexChange)="setTheme($event)"></apex-switch>
        </div>
      </apex-app-bar>

      <div class="app-frame">
        <aside class="desktop-nav" aria-label="Primary">
          <div class="brand-mark">
            <apex-icon name="workflow" size="lg"></apex-icon>
            <span>Field OS</span>
          </div>
          <nav>
            <a
              *ngFor="let item of navItems"
              [href]="hashFor(item.path)"
              [class.active]="activePath === item.path"
              [attr.aria-label]="item.label">
              {{ item.label }}
            </a>
          </nav>
          <apex-alert tone="success" heading="Demo scope">
            Six routed pages, graphite tokens, ApexUI custom elements.
          </apex-alert>
        </aside>

        <section class="route-surface">
          <northstar-home *ngIf="activePath === '/'"></northstar-home>
          <northstar-dashboard *ngIf="activePath === '/dashboard'"></northstar-dashboard>
          <northstar-work-orders *ngIf="activePath === '/work-orders'"></northstar-work-orders>
          <northstar-customers *ngIf="activePath === '/customers'"></northstar-customers>
          <northstar-settings *ngIf="activePath === '/settings'"></northstar-settings>
          <northstar-about *ngIf="activePath === '/about'"></northstar-about>
        </section>
      </div>

      <nav class="mobile-nav" aria-label="Mobile primary">
        <a
          *ngFor="let item of navItems"
          [href]="hashFor(item.path)"
          [class.active]="activePath === item.path">
          {{ item.label }}
        </a>
      </nav>
    </main>
  `
})
class AppComponent {
  isDark = false;
  activePath = "/";
  navItems = navItems;
  breadcrumbs = [{ label: "Northstar", href: "#/" }, { label: "Home" }];

  constructor() {
    window.addEventListener("hashchange", () => this.syncRoute());
    window.addEventListener("northstar-theme", (event) => this.setTheme(event));
    this.syncRoute();
  }

  get theme(): ApexTheme {
    return this.isDark ? "graphite-dark" : "graphite-light";
  }

  setTheme(event: Event): void {
    this.isDark = Boolean((event as SwitchEvent).detail?.checked);
  }

  hashFor(path: string): string {
    return `#${path}`;
  }

  private syncRoute(): void {
    const hashPath = window.location.hash.replace(/^#/, "") || "/";
    this.activePath = routes.some((route) => route.path === hashPath) ? hashPath : "/";
    if (hashPath !== this.activePath) {
      window.location.hash = this.activePath;
    }

    const active = navItems.find((item) => item.path === this.activePath) ?? navItems[0];
    const route = routes.find((item) => item.path === this.activePath);
    this.breadcrumbs = [{ label: "Northstar", href: "#/" }, { label: active.label }];
    document.title = route?.title === "Northstar Field Services" ? route.title : `${route?.title ?? active.label} | Northstar Field Services`;
  }
}

bootstrapApplication(AppComponent);
