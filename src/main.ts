import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
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
import "@apexui/web-components/components/apex-data-table.js";
import "@apexui/web-components/components/apex-date-picker.js";
import "@apexui/web-components/components/apex-divider.js";
import "@apexui/web-components/components/apex-empty-state.js";
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

type ApexTheme = "enterprise-light" | "enterprise-dark";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="app-shell" [attr.data-apex-theme]="theme">
      <apex-app-bar heading="ApexUI Angular Operations">
        <apex-breadcrumbs slot="navigation" label="Workspace path" [items]="breadcrumbs"></apex-breadcrumbs>
        <div slot="actions" class="app-actions">
          <apex-switch
            label="Dark theme"
            description="Enterprise token set"
            [checked]="isDark"
            (apexChange)="setTheme($event)">
          </apex-switch>
          <apex-button size="sm" variant="secondary">Export</apex-button>
          <apex-button size="sm">Deploy</apex-button>
        </div>
      </apex-app-bar>

      <div class="app-main">
        <aside class="app-nav">
          <apex-sidebar
            heading="Atomic layers"
            label="Demo sections"
            [activeId]="activeSection"
            [items]="navItems"
            (apexSelect)="selectSection($event)">
            <apex-stack slot="footer" gap="sm">
              <apex-badge tone="success">Angular 20</apex-badge>
              <apex-typography variant="caption">Web components fallback active.</apex-typography>
            </apex-stack>
          </apex-sidebar>
        </aside>

        <section class="app-page" aria-label="ApexUI Angular demo app">
          <section class="app-hero" id="overview">
            <div class="app-hero-copy">
              <apex-stack gap="lg">
                <apex-badge tone="info">Full app demo</apex-badge>
                <apex-typography as="h1" variant="display">ApexUI enterprise workspace</apex-typography>
                <apex-typography variant="body">
                  End-to-end Angular surface using ApexUI tokens, custom elements, data displays,
                  forms, navigation, and workflow primitives.
                </apex-typography>
                <div class="app-actions">
                  <apex-button size="lg">Create release</apex-button>
                  <apex-button size="lg" variant="secondary">Review system</apex-button>
                </div>
              </apex-stack>
            </div>

            <div class="app-hero-panel">
              <apex-card eyebrow="Release command" heading="Enterprise tokens">
                <apex-stack gap="md">
                  <apex-progress label="Design system adoption" [value]="94"></apex-progress>
                  <apex-progress label="Angular demo coverage" [value]="88"></apex-progress>
                  <apex-alert tone="success" heading="Theme ready">
                    {{ themeLabel }} applied at app root with ApexUI token variables.
                  </apex-alert>
                </apex-stack>
              </apex-card>
            </div>
          </section>

          <section class="app-kpis" aria-label="System metrics">
            <apex-card *ngFor="let metric of metrics" [eyebrow]="metric.eyebrow" [heading]="metric.heading">
              <div class="metric-row">
                <apex-icon [name]="metric.icon" size="lg"></apex-icon>
                <div>
                  <apex-typography as="strong" variant="title">{{ metric.value }}</apex-typography>
                  <apex-typography variant="caption">{{ metric.note }}</apex-typography>
                </div>
              </div>
            </apex-card>
          </section>

          <section class="app-section" id="atoms">
            <div class="section-heading">
              <apex-typography as="h2" variant="title">Atoms</apex-typography>
              <apex-typography variant="body">Smallest reusable UI signals: icons, badges, chips, buttons, text, and progress.</apex-typography>
            </div>

            <div class="app-grid app-grid-four">
              <apex-card eyebrow="Actions" heading="Buttons">
                <apex-stack gap="sm">
                  <apex-button>Primary</apex-button>
                  <apex-button variant="secondary">Secondary</apex-button>
                  <apex-button variant="danger">Danger</apex-button>
                </apex-stack>
              </apex-card>

              <apex-card eyebrow="Status" heading="Badges">
                <div class="app-inline">
                  <apex-badge tone="neutral">Neutral</apex-badge>
                  <apex-badge tone="info">Info</apex-badge>
                  <apex-badge tone="success">Success</apex-badge>
                  <apex-badge tone="warning">Warning</apex-badge>
                  <apex-badge tone="danger">Danger</apex-badge>
                </div>
              </apex-card>

              <apex-card eyebrow="Identity" heading="Icons and chips">
                <div class="app-inline">
                  <apex-icon name="token" size="lg"></apex-icon>
                  <apex-icon name="workflow" size="lg"></apex-icon>
                  <apex-icon name="theme" size="lg"></apex-icon>
                  <apex-chip selected>Selected</apex-chip>
                  <apex-chip>Queued</apex-chip>
                </div>
              </apex-card>

              <apex-card eyebrow="Feedback" heading="Progress">
                <apex-stack gap="md">
                  <apex-progress label="Token sync" [value]="76"></apex-progress>
                  <apex-progress label="QA pass" [value]="61"></apex-progress>
                </apex-stack>
              </apex-card>
            </div>
          </section>

          <section class="app-section" id="molecules">
            <div class="section-heading">
              <apex-typography as="h2" variant="title">Molecules</apex-typography>
              <apex-typography variant="body">Composed controls for selection, input, filtering, and preference capture.</apex-typography>
            </div>

            <div class="app-grid app-grid-two">
              <apex-card eyebrow="Search and filters" heading="Release query">
                <apex-stack gap="md">
                  <apex-search-form label="Search releases" placeholder="Search tokens, routes, owners" submit-label="Search"></apex-search-form>
                  <apex-select
                    label="Risk lane"
                    hint="Changes active review lane"
                    [options]="riskOptions"
                    [value]="riskLane"
                    (apexChange)="setRiskLane($event)">
                  </apex-select>
                  <apex-toggle-group
                    label="Density"
                    [options]="densityOptions"
                    [value]="density"
                    (apexChange)="setDensity($event)">
                  </apex-toggle-group>
                </apex-stack>
              </apex-card>

              <apex-card eyebrow="Form controls" heading="Governance intake">
                <apex-stack gap="md">
                  <apex-text-field label="Release name" value="Tokens 0.1 adoption"></apex-text-field>
                  <apex-textarea label="Decision note" value="Ship after wrapper package is republished with dist assets."></apex-textarea>
                  <div class="app-grid app-grid-two compact">
                    <apex-date-picker label="Target date" value="2026-06-28"></apex-date-picker>
                    <apex-number-field label="Approvers" [min]="1" [max]="8" value="3"></apex-number-field>
                  </div>
                  <apex-checkbox label="Require accessibility signoff" checked></apex-checkbox>
                  <apex-slider label="Confidence" [min]="0" [max]="100" [value]="82"></apex-slider>
                </apex-stack>
              </apex-card>
            </div>
          </section>

          <section class="app-section" id="organisms">
            <div class="section-heading">
              <apex-typography as="h2" variant="title">Organisms</apex-typography>
              <apex-typography variant="body">Larger ApexUI patterns for navigation, status, transfer, timelines, and workflow state.</apex-typography>
            </div>

            <div class="app-grid app-grid-two">
              <apex-card eyebrow="Workflow" heading="Release board">
                <apex-workflow-board [columns]="workflowColumns"></apex-workflow-board>
              </apex-card>

              <apex-card eyebrow="History" heading="Decision timeline">
                <apex-timeline [events]="timelineEvents"></apex-timeline>
              </apex-card>
            </div>

            <div class="app-grid app-grid-two">
              <apex-card eyebrow="Ownership" heading="Transfer list">
                <apex-transfer-list
                  source-title="Available reviewers"
                  target-title="Assigned reviewers"
                  [sourceItems]="sourceReviewers"
                  [targetItems]="targetReviewers">
                </apex-transfer-list>
              </apex-card>

              <apex-card eyebrow="Information architecture" heading="System tree">
                <apex-tree-view label="ApexUI package tree" [items]="treeItems"></apex-tree-view>
              </apex-card>
            </div>
          </section>

          <section class="app-section" id="templates">
            <div class="section-heading">
              <apex-typography as="h2" variant="title">Templates</apex-typography>
              <apex-typography variant="body">Dashboard page composition with ApexUI tables, charts, tabs, and stepper states.</apex-typography>
            </div>

            <apex-toolbar label="Template controls" density="comfortable">
              <apex-tabs
                label="Template view"
                [items]="templateTabs"
                [activeId]="activeTemplate"
                (apexChange)="setTemplate($event)">
              </apex-tabs>
              <apex-button-group label="Template actions">
                <apex-button size="sm" variant="secondary">Save</apex-button>
                <apex-button size="sm">Publish</apex-button>
              </apex-button-group>
            </apex-toolbar>

            <div class="app-grid app-grid-two">
              <apex-card eyebrow="Analytics" heading="Component adoption">
                <apex-chart label="Component adoption" [data]="chartData"></apex-chart>
              </apex-card>

              <apex-card eyebrow="Lifecycle" heading="Release steps">
                <apex-stepper [activeIndex]="2" [steps]="releaseSteps"></apex-stepper>
              </apex-card>
            </div>

            <apex-data-table caption="ApexUI Angular release matrix" [columns]="tableColumns" [rows]="tableRows"></apex-data-table>
          </section>

          <section class="app-section" id="states">
            <div class="section-heading">
              <apex-typography as="h2" variant="title">States</apex-typography>
              <apex-typography variant="body">Empty, warning, success, and responsive fallback states share token color roles.</apex-typography>
            </div>

            <div class="app-grid app-grid-two">
              <apex-empty-state
                align="start"
                heading="No blocked wrapper checks"
                description="Angular wrapper package still needs dist assets, but app runtime is unblocked through web components.">
              </apex-empty-state>

              <apex-card eyebrow="Runtime mode" heading="Upstream package gap">
                <apex-stack gap="md">
                  <apex-alert tone="warning" heading="Wrapper import unavailable">
                    @apexui/angular 0.1.0 exports dist/index.js, but installed package has no dist folder.
                  </apex-alert>
                  <apex-radio-group
                    label="Runtime strategy"
                    name="runtime"
                    value="web-components"
                    [options]="runtimeOptions">
                  </apex-radio-group>
                </apex-stack>
              </apex-card>
            </div>
          </section>
        </section>
      </div>
    </main>
  `
})
class AppComponent {
  isDark = false;
  activeSection = "overview";
  activeTemplate = "dashboard";
  density = "comfortable";
  riskLane = "standard";

  get theme(): ApexTheme {
    return this.isDark ? "enterprise-dark" : "enterprise-light";
  }

  get themeLabel(): string {
    return this.isDark ? "Enterprise dark" : "Enterprise light";
  }

  breadcrumbs = [
    { label: "ApexUI", href: "#" },
    { label: "Demos", href: "#" },
    { label: "Angular" }
  ];

  navItems = [
    { id: "overview", label: "Overview", badge: "Live" },
    { id: "atoms", label: "Atoms", badge: "6" },
    { id: "molecules", label: "Molecules", badge: "8" },
    { id: "organisms", label: "Organisms", badge: "4" },
    { id: "templates", label: "Templates", badge: "3" },
    { id: "states", label: "States", badge: "4" }
  ];

  metrics = [
    { eyebrow: "Tokens", heading: "Theme reach", value: "2 modes", note: "Enterprise light and dark", icon: "theme" },
    { eyebrow: "Components", heading: "Surface breadth", value: "30+", note: "ApexUI elements in use", icon: "component" },
    { eyebrow: "Runtime", heading: "Integration", value: "Schema", note: "CUSTOM_ELEMENTS_SCHEMA active", icon: "codeXml" }
  ];

  riskOptions = [
    { label: "Standard", value: "standard" },
    { label: "Elevated", value: "elevated" },
    { label: "Critical", value: "critical" }
  ];

  densityOptions = [
    { label: "Compact", value: "compact" },
    { label: "Comfortable", value: "comfortable" },
    { label: "Expanded", value: "expanded" }
  ];

  templateTabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "review", label: "Review" },
    { id: "handoff", label: "Handoff" }
  ];

  chartData = [
    { label: "Atoms", value: 96 },
    { label: "Molecules", value: 88 },
    { label: "Organisms", value: 81 },
    { label: "Templates", value: 74 }
  ];

  releaseSteps = [
    { label: "Scope", description: "Demo inventory complete" },
    { label: "Compose", description: "Atomic app assembled" },
    { label: "Verify", description: "Local build required" },
    { label: "Publish", description: "No push from this worker" }
  ];

  timelineEvents = [
    { label: "Tokens loaded", description: "Enterprise token theme applied globally.", meta: "08:40" },
    { label: "Components registered", description: "Custom elements imported as side effects.", meta: "09:05" },
    { label: "App shell composed", description: "Navigation, sections, state, and data surfaces wired.", meta: "09:35" }
  ];

  workflowColumns = [
    {
      title: "Queued",
      items: [
        { title: "Wrapper republish", meta: "@apexui/angular dist assets" },
        { title: "Docs sync", meta: "Runtime note" }
      ]
    },
    {
      title: "In review",
      items: [
        { title: "Theme switch", meta: "Enterprise tokens" },
        { title: "Responsive pass", meta: "App layout" }
      ]
    },
    {
      title: "Ready",
      items: [
        { title: "Atomic sections", meta: "Atoms to templates" },
        { title: "Build check", meta: "Angular CLI" }
      ]
    }
  ];

  sourceReviewers = [
    { id: "design", label: "Design systems" },
    { id: "platform", label: "Platform" },
    { id: "security", label: "Security" }
  ];

  targetReviewers = [
    { id: "dx", label: "Developer experience" },
    { id: "qa", label: "Quality" }
  ];

  treeItems = [
    {
      id: "apexui",
      label: "ApexUI",
      children: [
        { id: "tokens", label: "@apexui/tokens" },
        { id: "web-components", label: "@apexui/web-components" },
        { id: "angular", label: "@apexui/angular" }
      ]
    }
  ];

  tableColumns = [
    { key: "layer", header: "Layer" },
    { key: "coverage", header: "Coverage" },
    { key: "owner", header: "Owner" },
    { key: "status", header: "Status" }
  ];

  tableRows = [
    { layer: "Atoms", coverage: "Complete", owner: "Design system", status: "Live" },
    { layer: "Molecules", coverage: "Complete", owner: "Product UI", status: "Live" },
    { layer: "Organisms", coverage: "Complete", owner: "Platform", status: "Live" },
    { layer: "Templates", coverage: "Complete", owner: "Demo app", status: "Build pending" }
  ];

  runtimeOptions = [
    { label: "Web components fallback", value: "web-components" },
    { label: "Angular wrappers", value: "angular", disabled: true }
  ];

  setTheme(event: Event): void {
    this.isDark = Boolean((event as CustomEvent<{ checked: boolean }>).detail?.checked);
  }

  selectSection(event: Event): void {
    const selectedId = (event as CustomEvent<string>).detail;
    this.activeSection = selectedId;
    document.getElementById(selectedId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  setTemplate(event: Event): void {
    this.activeTemplate = (event as CustomEvent<{ id: string }>).detail?.id ?? this.activeTemplate;
  }

  setDensity(event: Event): void {
    this.density = (event as CustomEvent<{ id?: string; value?: string }>).detail?.value ?? this.density;
  }

  setRiskLane(event: Event): void {
    this.riskLane = (event as CustomEvent<{ value: string }>).detail?.value ?? this.riskLane;
  }
}

bootstrapApplication(AppComponent);
