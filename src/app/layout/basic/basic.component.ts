import { Component } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  template: `
    <nz-layout>
      <nz-header>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal" class="header-menu">
          <li nz-menu-item>nav 1</li>
          <li nz-menu-item nzSelected>nav 2</li>
          <li nz-menu-item>nav 3</li>
        </ul>
      </nz-header>
      <nz-content class="outer-content">
        <nz-breadcrumb>
          <nz-breadcrumb-item>Home</nz-breadcrumb-item>
          <nz-breadcrumb-item>List</nz-breadcrumb-item>
          <nz-breadcrumb-item>App</nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-layout class="inner-layout">
          <nz-sider nzWidth="200px" nzTheme="light">
            <ul nz-menu nzMode="inline" class="sider-menu">
              <li nz-submenu nzOpen nzTitle="subnav 1" nzIcon="user">
                <ul>
                  <li nz-menu-item nzSelected>option1</li>
                  <li nz-menu-item><header-clear-storage></header-clear-storage></li>
                  <li nz-menu-item>option3</li>
                  <li nz-menu-item>option4</li>
                </ul>
              </li>
              <li nz-submenu nzTitle="subnav 2" nzIcon="laptop">
                <ul>
                  <li nz-menu-item>option5</li>
                  <li nz-menu-item>option6</li>
                  <li nz-menu-item>option7</li>
                  <li nz-menu-item>option8</li>
                </ul>
              </li>
              <li nz-submenu nzTitle="subnav 3" nzIcon="notification">
                <ul>
                  <li nz-menu-item>option9</li>
                  <li nz-menu-item>option10</li>
                  <li nz-menu-item>option11</li>
                  <li nz-menu-item>option12</li>
                </ul>
              </li>
            </ul>
          </nz-sider>
        </nz-layout>
        <nz-footer>Ant Design ©2020 Implement By Angular</nz-footer>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
      }

      .header-menu {
        line-height: 64px;
      }

      .outer-content {
        padding: 0 50px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-layout {
        padding: 24px 0;
        background: #fff;
      }

      .sider-menu {
        height: 100%;
      }

      .inner-content {
        padding: 0 24px;
        min-height: 280px;
      }

      nz-footer {
        text-align: center;
      }
    `
  ]
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }

  constructor(private settings: SettingsService) {}
}
