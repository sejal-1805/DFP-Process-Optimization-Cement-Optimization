import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// ─────────────────────────────────────────────────────────────
// MENU ITEM INTERFACE
// ─────────────────────────────────────────────────────────────
export interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  hasDropdown?: boolean;
  children?: MenuItem[];
}

// ─────────────────────────────────────────────────────────────
// MENU DATA
// ─────────────────────────────────────────────────────────────
export const MENU_ITEMS: MenuItem[] = [
  { name: 'Mimics', icon: 'settings', path: '/dashboard/mimics' },
  { name: 'Data Download', icon: 'download', path: '/dashboard/data_download' },
  { name: 'Trends', icon: 'trend', path: '' },
  { name: 'Report', icon: 'report', path: '/dashboard/report' },
  { name: 'Tag Utility', icon: 'link', path: '' },
  {
    name: 'CBM', icon: 'wrench', path: '', hasDropdown: true,
    children: [
      { name: 'Equipment Template', icon: '', path: '/dashboard/cbm/equipment_template' },
      { name: 'Email Template', icon: '', path: '/dashboard/cbm/email_template' },
      { name: 'Cyclone View List', icon: '', path: '/dashboard/cbm/cyclone_list' },
    ],
  },
  { name: 'Charts Visualization', icon: 'chart', path: '/dashboard/chartvisualization' },
  {
    name: 'Process Optimization', icon: 'cogs', path: '', hasDropdown: true,
    children: [
      { name: 'Blaine Prediction', icon: '', path: '/dashboard/processOptimization/blaineprediction' },
      {
        name: 'Cement OPT', icon: '', hasDropdown: true,
        children: [
          { name: 'Home', icon: '', path: '/home' },
          { name: 'Dashboard', icon: '', path: '/dashboard' },
          { name: 'Recommendation', icon: '', path: '/recommendationsList' },
          { name: 'Admin', icon: '', path: '/adminpage' },
        ],
      },
      {
        name: 'Kiln OPT', icon: '', path: '', hasDropdown: true,
        children: [
          { name: 'Performance Dashboard', icon: '', path: '' },
          { name: 'Process Dashboard', icon: '', path: '' },
          { name: 'Recommendations', icon: '', path: '' },
          { name: 'Alerts', icon: '', path: '' },
          { name: 'Equipment', icon: '', path: '' },
          { name: 'Tag List', icon: '', path: '' },
          { name: 'Admin Page', icon: '', path: '' },
          { name: 'Control Range Page', icon: '', path: '' },
        ],
      },
    ],
  },
  {
    name: 'Admin', icon: 'admin', path: '/dashboard/admin', hasDropdown: true,
    children: [
      { name: 'User List', icon: '', path: '/dashboard/admin/user_list' },
      { name: 'Access Logs', icon: '', path: '/dashboard/admin/access_logs' },
      { name: 'Sent Email Logs', icon: '', path: '/dashboard/admin/email_logs' },
      { name: 'Alerts', icon: '', path: '/dashboard/admin/alerts' },
      { name: 'Alert For Blaine', icon: '', path: '/dashboard/admin/blainealerts' },
      { name: 'Alert For Kiln', icon: '', path: '/dashboard/admin/kilnalerts' },
      { name: 'Kiln Master', icon: '', path: '/dashboard/admin/klinmaster' },
      { name: 'Utilization', icon: '', path: '/dashboard/admin/utilization' },
      { name: 'CBM Templates', icon: '', path: '/dashboard/admin/cbm_temp' },
      { name: 'Settings', icon: '', path: '/dashboard/admin/settings' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// DROPDOWN TREE CONNECTOR CONSTANTS
// ═══════════════════════════════════════════════════════════════════
export const SVG_WIDTH = 16;
export const SVG_HEIGHT = 33;
export const VERTICAL_LINE_X = 1.5;
export const LINE_WIDTH = 1.5;
export const MID_Y = SVG_HEIGHT / 2;
export const CURVE_START_Y = SVG_HEIGHT * 0.6875;
export const CURVE_END_Y = SVG_HEIGHT * 0.875;
export const CURVE_RADIUS = CURVE_END_Y - CURVE_START_Y;

@Component({
  selector: 'app-left-drawer',        // ← kept original selector
  templateUrl: './left-drawer.component.html',   // ← kept original template
  // styleUrls: ['./left-drawer.component.scss']    // ← kept original styles
})
export class LeftDrawerComponent implements OnInit {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  theme = 'light';
  mounted = false;
  menuItems = MENU_ITEMS;
  currentPath = '';

  openDropdowns: Record<string, boolean> = {};

  // SVG constants exposed to template
  SVG_WIDTH = SVG_WIDTH;
  SVG_HEIGHT = SVG_HEIGHT;
  VERTICAL_LINE_X = VERTICAL_LINE_X;
  LINE_WIDTH = LINE_WIDTH;
  MID_Y = MID_Y;
  CURVE_START_Y = CURVE_START_Y;
  CURVE_END_Y = CURVE_END_Y;
  CURVE_RADIUS = CURVE_RADIUS;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => (this.currentPath = e.urlAfterRedirects));
  }

  ngOnInit(): void {
    this.mounted = true;
    this.currentPath = this.router.url;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }

  isActiveRoute(path?: string): boolean {
    return !!path && this.currentPath === path;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
  }

  get lineColor(): string {
    return this.theme === 'dark' ? '#7E8383' : '#9FACAC';
  }

  closeMobile(): void {
    this.openChange.emit(false);
  }

  toggleCollapsed(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  toggleDropdown(key: string): void {
    this.openDropdowns[key] = !this.openDropdowns[key];
  }

  isDropdownOpen(key: string): boolean {
    return !!this.openDropdowns[key];
  }

  handleParentClick(item: MenuItem): void {
    if (!item.hasDropdown) return;
    if (this.collapsed) {
      this.collapsedChange.emit(false);
      setTimeout(() => this.toggleDropdown(item.name), 310);
    } else {
      this.toggleDropdown(item.name);
    }
  }

  getCurvedPath(): string {
    return `M ${VERTICAL_LINE_X} 0
            L ${VERTICAL_LINE_X} ${CURVE_START_Y}
            Q ${VERTICAL_LINE_X} ${CURVE_END_Y} ${VERTICAL_LINE_X + CURVE_RADIUS} ${CURVE_END_Y}
            L ${SVG_WIDTH} ${CURVE_END_Y}`;
  }

  isChildActive(children: MenuItem[] = [], currentPath: string): boolean {
    return children.some(
      (c) => currentPath === c.path || this.isChildActive(c.children ?? [], currentPath)
    );
  }

  getVerticalLineHeight(child: MenuItem, nestedOpen: boolean): string {
    if (nestedOpen && child.hasDropdown && child.children?.length) {
      return `${SVG_HEIGHT + child.children.length * SVG_HEIGHT}px`;
    }
    return `${SVG_HEIGHT}px`;
  }
}