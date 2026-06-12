/**
 * Frontend Authentication & Dynamic Menu Module
 * For non-admin Insight platform pages.
 * Reads login state from localStorage (set by login.html via admin-auth.js).
 *
 * Usage:
 *   <script src="../app/frontend-auth.js"></script>
 *   <script>initFrontendPage('page-id', { protected: true, search: true });</script>
 */

// ==================== Menu Configuration ====================
var FRONTEND_MENU = [
  { id: 'home', label: 'Home', href: '../index.html' },
  { id: 'about', label: 'About Us', href: 'about.html' },
  { id: 'news', label: 'News & Announcements', href: 'news.html' },
  {
    id: 'e-learning', label: 'E-Learning', children: [
      { id: 'knowledge', label: 'Knowledge Matrix', href: 'knowledge.html' },
      { id: 'skill', label: 'Skill Matrix', href: 'skill.html' },
      { id: 'workshop', label: 'Experience Workshop', href: 'workshop.html' },
      { id: 'assessment', label: 'Assessment & Certification', href: 'assessment.html' }
    ]
  },
  {
    id: 'ca-system', label: 'Insight CA System', children: [
      { id: 'my-skills', label: 'Profile Archives', href: 'my-skills.html' },
      { id: 'reports', label: 'Data & Reports', href: 'reports.html' },
      { id: 'my-learning', label: 'Course Grades', href: 'my-learning.html' },
      { id: 'course-learn', label: 'Course Learning', href: 'course-learn.html' }
    ]
  },
  {
    id: 'hsse', label: 'Insight HSSE Management', children: [
      { id: 'ptw', label: 'PTW Work Permit', href: 'ptw.html' },
      { id: 'compliance', label: 'HSSE Passport', href: 'compliance.html' }
    ]
  }
];

// null = show all menu items
var ROLE_MENU_ALLOW = {
  student: null,
  system_admin: null,
  enterprise_admin: null,
  standard_verifier: null,
  assessor: null,
  internal_verifier: null
};

var ROLE_VIEW_MAP = {
  student: 'candidate',
  enterprise_admin: 'candidate',
  assessor: 'assessor',
  internal_verifier: 'iv',
  standard_verifier: 'ev',
  system_admin: 'ev'
};

var ROLE_WEIGHT = {
  guest: 0,
  student: 1,
  assessor: 2,
  internal_verifier: 3,
  standard_verifier: 4,
  enterprise_admin: 5,
  system_admin: 6
};

// ==================== Helper Functions ====================

function getCurrentUser() {
  try {
    var data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
}

function logout() {
  localStorage.removeItem('currentUser');
  var path = window.location.pathname;
  var isInPages = /\/pages\//.test(path);
  window.location.href = isInPages ? 'login.html' : 'pages/login.html';
}

function isItemAllowed(item, allowedIds) {
  if (allowedIds === null) return true;
  if (item.id && allowedIds.indexOf(item.id) !== -1) return true;
  if (item.children) {
    for (var i = 0; i < item.children.length; i++) {
      if (allowedIds.indexOf(item.children[i].id) !== -1) return true;
    }
  }
  return false;
}

function getVisibleMenu(role) {
  var allowedIds = ROLE_MENU_ALLOW[role];
  if (allowedIds === null) return FRONTEND_MENU;
  var result = [];
  for (var i = 0; i < FRONTEND_MENU.length; i++) {
    var item = FRONTEND_MENU[i];
    if (!isItemAllowed(item, allowedIds)) continue;
    if (item.children) {
      var filteredChildren = [];
      for (var j = 0; j < item.children.length; j++) {
        if (allowedIds.indexOf(item.children[j].id) !== -1) {
          filteredChildren.push(item.children[j]);
        }
      }
      if (filteredChildren.length > 0) {
        result.push({ id: item.id, label: item.label, children: filteredChildren });
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

function getRoleView(role) {
  return ROLE_VIEW_MAP[role] || 'candidate';
}

// Unknown data-min-role values default to 99 (hidden for most roles), which is a safe fail-closed behavior for the prototype.
function filterActionButtons(role) {
  var weight = ROLE_WEIGHT[role] || 0;
  document.querySelectorAll('[data-min-role]').forEach(function(el) {
    var required = el.getAttribute('data-min-role');
    if (weight < (ROLE_WEIGHT[required] || 99)) {
      el.style.display = 'none';
    }
  });
}

function filterRoleSections(role) {
  var view = getRoleView(role);
  document.querySelectorAll('[data-role-section]').forEach(function(el) {
    var allowed = el.getAttribute('data-role-section').split(',').map(function(s) { return s.trim(); });
    if (allowed.indexOf(view) === -1 && allowed.indexOf(role) === -1) {
      el.style.display = 'none';
    }
  });
}

// ==================== Topbar Rendering ====================

function renderTopbar(activeId, opts) {
  var container = document.getElementById('topbar-root');
  if (!container) return;

  var user = getCurrentUser();
  var showSearch = opts && opts.search !== false;
  var menu = user ? getVisibleMenu(user.role) : FRONTEND_MENU;

  var html = '<nav class="topbar">';
  html += '<div class="topbar-left">';
  html += '<button class="menu-toggle" id="menuToggle"><i class="ri-menu-line"></i></button>';
  html += '<div class="brand"><div class="brand-logo"><i class="ri-eye-line"></i></div><div class="brand-text">Insight <span>System</span></div></div>';
  html += '<div class="topbar-nav">';

  for (var i = 0; i < menu.length; i++) {
    var item = menu[i];
    if (item.children) {
      html += '<div class="nav-dropdown">';
      html += '<a href="#" class="nav-dropdown-toggle">' + item.label + ' <i class="ri-arrow-down-s-line"></i></a>';
      html += '<div class="nav-dropdown-menu">';
      for (var j = 0; j < item.children.length; j++) {
        var activeClass = (item.children[j].id === activeId) ? ' active' : '';
        html += '<a href="' + item.children[j].href + '" class="' + activeClass + '">' + item.children[j].label + '</a>';
      }
      html += '</div></div>';
    } else {
      var activeClass = (item.id === activeId) ? ' active' : '';
      html += '<a href="' + item.href + '" class="' + activeClass + '">' + item.label + '</a>';
    }
  }

  html += '</div></div>'; // close topbar-nav, topbar-left
  html += '<div class="topbar-right">';

  if (showSearch) {
    html += '<div class="search-box">';
    html += '<i class="ri-search-line"></i>';
    html += '<input type="text" placeholder="Search...">';
    html += '</div>';
  }

  if (user) {
    html += '<div class="user-menu" id="userMenuBtn">';
    html += '<div class="user-avatar">' + (user.avatar || user.username.charAt(0).toUpperCase()) + '</div>';
    html += '<span class="user-name">' + (user.roleName || user.username) + '</span>';
    html += '<i class="ri-arrow-down-s-line" style="font-size:0.75rem;color:#94a3b8;"></i>';
    html += '</div>';
    html += '<div class="user-dropdown" id="userDropdown">';
    html += '<a href="profile.html"><i class="ri-user-line"></i> Profile</a>';
    if (user.role === 'student') {
      html += '<a href="my-workshops.html"><i class="ri-calendar-line"></i> My Workshops</a>';
    }
    html += '<a href="javascript:logout()"><i class="ri-logout-box-line"></i> Logout</a>';
    html += '</div>';
  } else {
    html += '<a href="login.html" style="padding:8px 16px;font-size:0.875rem;font-weight:500;color:#64748b;border-radius:8px;text-decoration:none;">Login</a>';
  }

  html += '</div></nav>';

  container.innerHTML = html;
}

// ==================== Event Setup ====================

function setupMobileMenu() {
  var toggle = document.getElementById('menuToggle');
  var nav = document.querySelector('.topbar-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('mobile-open');
    });
  }

  // Mobile submenu toggle (click to expand on mobile)
  document.querySelectorAll('.nav-dropdown-toggle, .nav-sub-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (window.innerWidth > 1200) return;
      e.preventDefault();
      var menu = this.nextElementSibling;
      if (menu) menu.classList.toggle('open');
    });
  });
}

function setupUserDropdown() {
  var btn = document.getElementById('userMenuBtn');
  var dropdown = document.getElementById('userDropdown');
  if (btn && dropdown) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    document.addEventListener('click', function() {
      if (dropdown) dropdown.classList.remove('show');
    });
  }
}

// ==================== Main Init ====================

function initFrontendPage(activeId, opts) {
  opts = opts || {};
  var user = getCurrentUser();

  // Protected page: redirect to login
  if (opts.protected && !user) {
    var redirect = encodeURIComponent(window.location.pathname);
    window.location.href = 'login.html?redirect=' + redirect;
    return;
  }

  renderTopbar(activeId, opts);

  // Defer event setup so DOM is ready
  setTimeout(function() {
    setupMobileMenu();
    setupUserDropdown();
  }, 0);

  var role = user ? user.role : 'guest';
  filterActionButtons(role);
  filterRoleSections(role);
}

// ==================== Export to Window ====================

if (typeof window !== 'undefined') {
  window.getCurrentUser = getCurrentUser;
  window.logout = logout;
  window.initFrontendPage = initFrontendPage;
  window.getRoleView = getRoleView;
}
