/**
 * Insight System - 统Mon侧边栏Menu组件
 * 自动检测页面 sidebar 结构类型（A/B/C），并渲染统MonMenu数据
 * 在各页面 </body> 前引入：<script src="../app/sidebar.js"></script>
 */
(function() {
  'use strict';

  // ==================== 统MonMenu数据 ====================
  const MENU_DATA = [
    {
      title: '核心模块',
      items: [
        { name: 'Knowledge Matrix', href: 'knowledge.html', icon: 'ri-book-open-line' },
        { name: 'Skill Matrix', href: 'skill.html', icon: 'ri-award-line', badge: 3 },
        { name: 'Workshop', href: 'workshop.html', icon: 'ri-team-line' },
        { name: 'Assessment & Certification', href: 'assessment.html', icon: 'ri-task-line' },
      ]
    },
    {
      title: '运营管理',
      items: [
        { name: '工作许可证', href: 'ptw.html', icon: 'ri-shield-check-line' },
        { name: 'Compliant管理', href: 'compliance.html', icon: 'ri-verified-badge-line' },
        { name: '数据报表', href: 'reports.html', icon: 'ri-bar-chart-2-line' },
      ]
    },
    {
      title: '个中心',
      items: [
        { name: 'Profile', href: 'profile.html', icon: 'ri-user-line' },
        { name: 'Progress', href: 'my-learning.html', icon: 'ri-history-line' },
        { name: 'Skill Profile', href: 'my-skills.html', icon: 'ri-medal-line' },
        { name: 'My Registrations', href: 'my-workshops.html', icon: 'ri-calendar-check-line' },
      ]
    }
  ];

  // ==================== 工具函数 ====================
  function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  }

  // ==================== 渲染函数 ====================
  function renderItemA(item, currentPage) {
    const active = currentPage === item.href ? ' active' : '';
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="nav-item${active}">
      <i class="${item.icon}"></i>
      <span>${item.name}</span>
      ${badge}
    </a>`;
  }

  function renderItemBC(item, currentPage) {
    const active = currentPage === item.href ? ' active' : '';
    return `<li><a href="${item.href}" class="${active}">
      <i class="${item.icon}"></i>${item.name}
    </a></li>`;
  }

  function renderSectionA(section, currentPage) {
    const itemsHtml = section.items.map(item => renderItemA(item, currentPage)).join('');
    return `<div class="nav-section">
      <div class="nav-section-title">${section.title}</div>
      ${itemsHtml}
    </div>`;
  }

  function renderSectionBC(section, currentPage) {
    const itemsHtml = section.items.map(item => renderItemBC(item, currentPage)).join('');
    return `<div class="sidebar-section">
      <div class="sidebar-title">${section.title}</div>
      <ul class="sidebar-menu">${itemsHtml}</ul>
    </div>`;
  }

  // C 型扁平结构（所有 li 在同Mon ul 下）
  function renderSectionC(section, currentPage) {
    const itemsHtml = section.items.map(item => renderItemBC(item, currentPage)).join('');
    return `<li class="section-title">${section.title}</li>${itemsHtml}`;
  }

  // ==================== 结构检测 ====================
  function detectType() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return null;

    // A 型：.sidebar-nav 存在
    if (sidebar.querySelector('.sidebar-nav')) return 'A';
    // B 型：.sidebar-content 存在
    if (sidebar.querySelector('.sidebar-content')) return 'B';
    // C 型：直接子元素是 ul.sidebar-menu，且没有 .sidebar-nav / .sidebar-content
    if (sidebar.querySelector(':scope > ul.sidebar-menu') || sidebar.querySelector('ul.sidebar-menu')) {
      return 'C';
    }
    return null;
  }

  // ==================== 统Mon图标大小 CSS ====================
  function injectIconStyle() {
    const cssId = 'sidebar-unify-style';
    if (document.getElementById(cssId)) return;
    const style = document.createElement('style');
    style.id = cssId;
    style.textContent = `
      /* 统Mon sidebar 图标大小 */
      #sidebar .nav-item i,
      #sidebar .sidebar-menu li a i,
      #sidebar .sidebar-menu li i {
        font-size: 1.125rem !important;
        min-width: 24px !important;
        width: 24px !important;
        text-align: center !important;
        flex-shrink: 0 !important;
        display: inline-block !important;
      }
      /* 覆盖 C 型原 SVG 尺寸 */
      #sidebar .sidebar-menu li a svg {
        width: 1.125rem !important;
        height: 1.125rem !important;
        min-width: 24px !important;
      }
      /* 统Mon选中样式 */
      #sidebar .nav-item.active,
      #sidebar .sidebar-menu li a.active {
        color: #1a365d !important;
        background: rgba(26, 54, 93, 0.08) !important;
        font-weight: 600 !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ==================== 主入口 ====================
  function initSidebar() {
    const type = detectType();
    if (!type) return;

    const currentPage = getCurrentPage();
    const sidebar = document.getElementById('sidebar');

    if (type === 'A') {
      const nav = sidebar.querySelector('.sidebar-nav');
      if (nav) {
        nav.innerHTML = MENU_DATA.map(s => renderSectionA(s, currentPage)).join('');
      }
    } else if (type === 'B') {
      const content = sidebar.querySelector('.sidebar-content');
      if (content) {
        content.innerHTML = MENU_DATA.map(s => renderSectionBC(s, currentPage)).join('');
      }
    } else if (type === 'C') {
      const menu = sidebar.querySelector(':scope > ul.sidebar-menu') || sidebar.querySelector('ul.sidebar-menu');
      if (menu) {
        menu.innerHTML = MENU_DATA.map(s => renderSectionC(s, currentPage)).join('');
      }
    }

    injectIconStyle();
  }

  // ==================== 自动Initialization ====================
  if (document.readyStatus === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }

  // 暴露全局接口，供手动调用
  window.initSidebar = initSidebar;
})();
