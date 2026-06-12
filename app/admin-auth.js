/**
 * Admin Portal Authentication & Role Management
 * Mock login system using localStorage
 */

const MOCK_USERS = [
  { username: 'admin', password: '123456', role: 'system_admin', roleName: '系统管理员', avatar: 'A' },
  { username: 'manager', password: '123456', role: 'enterprise_admin', roleName: '企业管理员', avatar: 'M' },
  { username: 'assessor', password: '123456', role: 'assessor', roleName: '评估师', avatar: 'E' },
  { username: 'verifier', password: '123456', role: 'internal_verifier', roleName: '内部验证员', avatar: 'V' },
  { username: 'final_verifier', password: '123456', role: 'standard_verifier', roleName: '标准验证员', avatar: 'S' },
  { username: 'user', password: '123456', role: 'student', roleName: '普通学员', avatar: 'U' }
];

const ADMIN_ROLES = ['system_admin', 'enterprise_admin', 'assessor', 'internal_verifier', 'standard_verifier'];

const ROLE_MENU_MAP = {
  system_admin: ['dashboard', 'users', 'courses', 'workshops', 'reports', 'settings'],
  enterprise_admin: ['dashboard', 'users', 'courses', 'workshops', 'reports'],
  assessor: ['dashboard', 'assessments', 'skills-review'],
  internal_verifier: ['dashboard', 'verification'],
  standard_verifier: ['dashboard', 'verification'],
  student: []
};

const MENU_ITEMS = [
  { id: 'dashboard', label: '仪表盘', icon: 'ri-dashboard-line', href: 'index.html' },
  { id: 'users', label: '用户管理', icon: 'ri-user-settings-line', href: 'users.html', section: '人员管理' },
  { id: 'courses', label: '课程管理', icon: 'ri-book-open-line', href: 'courses.html', section: '内容管理' },
  { id: 'workshops', label: '工作坊管理', icon: 'ri-calendar-event-line', href: 'workshops.html', section: '内容管理' },
  { id: 'assessments', label: '评估任务', icon: 'ri-task-line', href: 'assessments.html', section: '评估验证' },
  { id: 'skills-review', label: '技能审核', icon: 'ri-shield-check-line', href: 'skills-review.html', section: '评估验证' },
  { id: 'verification', label: '验证流程', icon: 'ri-git-merge-line', href: 'verification.html', section: '评估验证' },
  { id: 'reports', label: '报表中心', icon: 'ri-bar-chart-box-line', href: 'reports.html', section: '数据洞察' },
  { id: 'settings', label: '系统设置', icon: 'ri-settings-3-line', href: 'settings.html', section: '系统设置' }
];

function login(username, password) {
  const user = MOCK_USERS.find(u => u.username === username && u.password === password);
  if (!user) return null;
  const userInfo = {
    username: user.username,
    role: user.role,
    roleName: user.roleName,
    avatar: user.avatar,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(userInfo));
  return userInfo;
}

function logout() {
  localStorage.removeItem('currentUser');
  // Use correct path depending on whether we're in admin pages or user pages
  var isAdminPage = window.location.pathname.indexOf('/admin/') !== -1;
  window.location.href = isAdminPage ? '../login.html' : 'login.html';
}

function getCurrentUser() {
  try {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
}

function isAdmin(role) {
  return ADMIN_ROLES.includes(role);
}

function checkAdminAuth() {
  const user = getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    window.location.href = '../login.html?redirect=' + redirect;
    return false;
  }
  return true;
}

function getMenuForRole(role) {
  const allowedIds = ROLE_MENU_MAP[role] || [];
  return MENU_ITEMS.filter(item => allowedIds.includes(item.id));
}

function renderSidebar(activeId) {
  const user = getCurrentUser();
  if (!user) return;

  const menuItems = getMenuForRole(user.role);
  const nav = document.querySelector('.sidebar-nav');
  if (!nav) return;

  let html = '';
  let currentSection = '';

  // Always add dashboard first
  const dash = MENU_ITEMS.find(i => i.id === 'dashboard');
  if (dash) {
    html += `<a class="nav-item ${activeId === dash.id ? 'active' : ''}" href="${dash.href}"><i class="${dash.icon}"></i><span>${dash.label}</span></a>`;
    html += '<div class="nav-section"><div class="nav-section-title" style="height:1px;background:rgba(255,255,255,0.1);margin:8px 20px;"></div></div>';
  }

  menuItems.forEach(item => {
    if (item.id === 'dashboard') return; // Skip dashboard, already added
    if (item.section && item.section !== currentSection) {
      if (currentSection) html += '</div>';
      html += `<div class="nav-section"><div class="nav-section-title">${item.section}</div>`;
      currentSection = item.section;
    }
    const activeClass = item.id === activeId ? 'active' : '';
    html += `<a class="nav-item ${activeClass}" href="${item.href}"><i class="${item.icon}"></i><span>${item.label}</span></a>`;
  });
  if (currentSection) html += '</div>';

  nav.innerHTML = html;
}

function renderRoleSwitcher() {
  const user = getCurrentUser();
  if (!user) return;

  const container = document.getElementById('roleSwitcher');
  if (!container) return;

  container.innerHTML = `
    <button class="role-switcher-btn" onclick="toggleRoleDropdown()">
      <i class="ri-shield-user-line"></i>
      <span>${user.roleName}</span>
      <i class="ri-arrow-down-s-line"></i>
    </button>
    <div class="role-switcher-dropdown" id="roleDropdown">
      ${MOCK_USERS.filter(u => isAdmin(u.role)).map(u => `
        <div class="role-option ${u.role === user.role ? 'active' : ''}" onclick="switchRole('${u.username}')">
          <i class="ri-user-line"></i>${u.roleName}
        </div>
      `).join('')}
      <div style="border-top:1px solid var(--border-color);margin:4px 0;"></div>
      <div class="role-option" onclick="logout()"><i class="ri-logout-box-line"></i>退出登录</div>
    </div>
  `;
}

function toggleRoleDropdown() {
  const switcher = document.querySelector('.role-switcher');
  switcher.classList.toggle('open');
}

function switchRole(username) {
  const user = MOCK_USERS.find(u => u.username === username);
  if (user) {
    const userInfo = {
      username: user.username,
      role: user.role,
      roleName: user.roleName,
      avatar: user.avatar,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    window.location.reload();
  }
}

function renderUserAvatar() {
  const user = getCurrentUser();
  if (!user) return;
  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl) avatarEl.textContent = user.avatar || user.username.charAt(0).toUpperCase();
}

// Inject "Enter Admin Portal" link into existing user pages
function injectAdminEntry() {
  const user = getCurrentUser();
  if (!user || !isAdmin(user.role)) return;

  // Look for user dropdown menu in existing pages
  // Only match actual dropdown containers, not the trigger button itself
  const selectors = [
    '.user-dropdown', '.user-dropdown-menu', '.dropdown-menu',
    '.nav-user-dropdown'
  ];
  const userMenus = document.querySelectorAll(selectors.join(','));
  userMenus.forEach(menu => {
    if (menu.querySelector('.admin-entry')) return; // Already injected
    const entry = document.createElement('a');
    entry.href = 'admin/index.html';
    entry.className = 'admin-entry';
    entry.innerHTML = '<i class="ri-dashboard-line"></i> 进入管理后台';
    entry.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;color:#64748b;text-decoration:none;font-size:0.875rem;transition:all 0.15s;';
    entry.onmouseenter = () => entry.style.background = 'rgba(0,0,0,0.04)';
    entry.onmouseleave = () => entry.style.background = 'transparent';
    menu.appendChild(entry);
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  const switcher = document.querySelector('.role-switcher');
  if (switcher && !switcher.contains(e.target)) {
    switcher.classList.remove('open');
  }
});

// Export for inline usage
if (typeof window !== 'undefined') {
  window.login = login;
  window.logout = logout;
  window.getCurrentUser = getCurrentUser;
  window.isAdmin = isAdmin;
  window.checkAdminAuth = checkAdminAuth;
  window.renderSidebar = renderSidebar;
  window.renderRoleSwitcher = renderRoleSwitcher;
  window.renderUserAvatar = renderUserAvatar;
  window.toggleRoleDropdown = toggleRoleDropdown;
  window.switchRole = switchRole;
  window.injectAdminEntry = injectAdminEntry;
}
