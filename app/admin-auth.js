/**
 * Admin Portal Authentication & Role Management
 * Mock login system using localStorage
 */

const MOCK_USERS = [
  { username: 'admin', password: '123456', role: 'system_admin', roleName: 'System Admin', avatar: 'A' },
  { username: 'manager', password: '123456', role: 'enterprise_admin', roleName: 'Enterprise Admin', avatar: 'M' },
  { username: 'assessor', password: '123456', role: 'assessor', roleName: 'Assessor', avatar: 'E' },
  { username: 'verifier', password: '123456', role: 'internal_verifier', roleName: 'Internal Verifier', avatar: 'V' },
  { username: 'final_verifier', password: '123456', role: 'standard_verifier', roleName: 'Standard Verifier', avatar: 'S' },
  { username: 'user', password: '123456', role: 'student', roleName: 'Student', avatar: 'U' }
];

const ADMIN_ROLES = ['system_admin', 'enterprise_admin'];

const ROLE_MENU_MAP = {
  system_admin: ['users', 'courses', 'workshops', 'settings'],
  enterprise_admin: ['users', 'courses', 'workshops'],
  assessor: [],
  internal_verifier: [],
  standard_verifier: [],
  student: []
};

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', href: 'index.html' },
  { id: 'users', label: 'User Management', icon: 'ri-user-settings-line', href: 'users.html', section: 'User Management' },
  { id: 'courses', label: 'Course Management', icon: 'ri-book-open-line', href: 'courses.html', section: 'Content' },
  { id: 'workshops', label: 'Workshop Management', icon: 'ri-calendar-event-line', href: 'workshops.html', section: 'Content' },
  { id: 'assessments', label: 'Assessment Tasks', icon: 'ri-task-line', href: 'assessments.html', section: 'Assessment & Verification' },
  { id: 'skills-review', label: 'Skills Review', icon: 'ri-shield-check-line', href: 'skills-review.html', section: 'Assessment & Verification' },
  { id: 'verification', label: 'Verification', icon: 'ri-git-merge-line', href: 'verification.html', section: 'Assessment & Verification' },
  { id: 'reports', label: 'Reports', icon: 'ri-bar-chart-box-line', href: 'reports.html', section: 'Insights' },
  { id: 'settings', label: 'Settings', icon: 'ri-settings-3-line', href: 'settings.html', section: 'System' }
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

  menuItems.forEach(item => {
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
      <div class="role-option" onclick="logout()"><i class="ri-logout-box-line"></i>Logout</div>
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
    entry.innerHTML = '<i class="ri-dashboard-line"></i> Admin Panel';
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
