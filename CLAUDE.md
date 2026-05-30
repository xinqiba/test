# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**慧眼 - 能力管理与发展系统**：面向石油天然气行业的培训与认证平台前端原型。纯静态 HTML/CSS/JS 实现，无构建工具、无框架依赖，便于后续接入任意后端。

## 开发方式

本项目无包管理器、无构建流程。开发时直接打开 HTML 文件，或使用本地服务器预览：

```bash
# 使用 Python 简易服务器（推荐）
python -m http.server 8080

# 或使用 Node 的 npx
npx serve .
```

浏览器访问 `http://localhost:8080` 即可预览。修改文件后刷新页面生效。

## 文件架构

```
html-v1/
├── index.html              # 首页入口（深色主题品牌门户）
├── pages/                  # 内页（浅色主题工作界面）
│   ├── knowledge.html      # 知识矩阵
│   ├── course-learn.html   # 课程学习
│   ├── skill.html          # 技能矩阵
│   ├── workshop.html       # 经验工作坊
│   ├── assessment.html     # 评估认证
│   ├── ptw.html            # PTW 工作许可证
│   ├── compliance.html     # 合规管理
│   ├── reports.html        # 数据报表
│   ├── news.html           # 新闻公告
│   ├── news-detail.html    # 新闻详情
│   ├── login.html          # 登录
│   ├── register.html       # 注册
│   ├── profile.html        # 个人中心
│   ├── my-learning.html    # 我的学习
│   ├── my-skills.html      # 我的技能
│   ├── my-workshops.html   # 我的工作坊
│   └── about.html          # 关于我们
├── styles/
│   ├── variables.css       # CSS 变量/设计令牌
│   ├── main.css            # 全局基础样式 + 动画 + 通用组件（按钮/卡片/徽章/输入框/进度条/标签页）
│   └── layout.css          # 布局系统：顶部导航栏 + 下拉菜单 + 主内容区 + 浅色主题覆盖
├── app/
│   └── sidebar.js           # 废弃：原统一侧边栏菜单组件（已不再引用）
├── components/             # 预留目录（当前为空）
└── assets/                 # 静态资源（icons/ images/）
```

## 设计系统

### 双主题策略

- **首页 (`index.html`)**：深色主题，品牌门户风格。背景 `var(--deep-ocean)` (#060d1a)，强调色 `var(--amber-gold)` (#c8956c)。包含 Hero 粒子动效、滚动显现动画。
- **内页 (`pages/*.html`)**：浅色主题，工作界面风格。背景 `#f5f7fa`，主文字色 `#1a202c`，主色 `#1a365d`，强调色 `#c8956c`。
  - 内页通过 `light-theme` CSS 类或 `<style>` 内联覆盖实现浅色主题。

### 核心色彩（variables.css）

- 深海蓝系：`--deep-ocean` (#060d1a)、`--abyss` (#0a1628)、`--energy-blue` (#1e3a5f)
- 琥珀金系：`--amber-gold` (#c8956c)、`--amber-light` (#d4a574)
- 功能色：`--success` (#4caf7a)、`--warning` (#e6a23c)、`--danger` (#e05d5d)、`--info` (#5b9bd5)

### 字体与图标

- 字体：Noto Sans SC（正文）+ Playfair Display（首页标题），通过 Google Fonts CDN 加载
- 图标：Remix Icon (`ri-*`)，通过 CDN `https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css` 加载

### 布局系统（layout.css）

- 顶部导航栏 (`.topbar`)：固定定位，高度 `var(--topbar-height)` (64px)，滚动后添加 `.topbar-scrolled`
- 下拉菜单系统 (`.nav-dropdown`)：一级菜单悬停展开二级下拉，`.nav-sub-dropdown` 支持三级菜单，桌面端 hover / 移动端 click 触发
- 主内容区 (`.main-content`)：`margin-top` 避让顶部栏，`margin-left: 0` 全宽布局
- 移动端（≤1200px）：导航折叠为汉堡菜单，下拉菜单通过点击展开，无侧边栏

### 通用组件（main.css）

项目中大量使用以下类：
- `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-ghost`：按钮
- `.card` / `.card-glass`：卡片
- `.badge-*`：徽章（success/warning/danger/info/gold）
- `.input`：输入框
- `.progress-bar` / `.progress-bar-fill`：进度条
- `.tabs` / `.tab`：标签页

## 页面清单与导航结构

顶部导航采用下拉菜单层级：

| 一级菜单 | 二级菜单 | 三级菜单 | 对应页面 |
|---------|---------|---------|---------|
| 首页 | - | - | `index.html` |
| 关于我们 | - | - | `pages/about.html` |
| 新闻公告 | - | - | `pages/news.html` |
| 在线学习 | 知识矩阵 | - | `pages/knowledge.html` |
| | 技能矩阵 | - | `pages/skill.html` |
| | 经验工作坊 | - | `pages/workshop.html` |
| | 评估认证 | - | `pages/assessment.html` |
| Insight CA 系统 | Matrix 管理 | 档案管理 | `pages/my-skills.html` |
| | | 数据图表 | `pages/reports.html` |
| | | 课程成绩 | `pages/my-learning.html` |
| | | 课程学习 | `pages/course-learn.html` |
| Insight HSSE 管理 | PTW 作业许可 | - | `pages/ptw.html` |
| | HSSE Passport | - | `pages/compliance.html` |
| 登录/注册 | 登录 | - | `pages/login.html` |
| | 注册 | - | `pages/register.html` |

右侧用户头像下拉菜单（登录后显示）：个人资料 (`profile.html`)、我的报名 (`my-workshops.html`)、退出。

### 页面说明

| 功能模块 | 页面文件 | 说明 |
|---------|---------|------|
| 首页 | `index.html` | 深色主题品牌门户 |
| 知识矩阵 | `pages/knowledge.html` | 课程筛选 + 环形进度 + 卡片列表 |
| 课程学习 | `pages/course-learn.html` | 三栏布局：目录 + 内容 + 工具栏 |
| 技能矩阵 | `pages/skill.html` | 统计卡片 + 技能分类 + 证据上传弹窗 |
| 经验工作坊 | `pages/workshop.html` | 列表/日历视图切换 + 报名管理 |
| 评估认证 | `pages/assessment.html` | 评估任务列表 + 三级验证流程 |
| PTW 许可证 | `pages/ptw.html` | 申请/审批/统计 |
| 合规管理 | `pages/compliance.html` | 合规运营 + HSE |
| 数据报表 | `pages/reports.html` | 快捷图标栏 + 柱状图/饼图 + 表格 |
| 新闻公告 | `pages/news.html` | 分类筛选 + 列表 + 分页 |
| 新闻详情 | `pages/news-detail.html` | 正文 + 相关推荐 |
| 登录/注册 | `pages/login.html` / `pages/register.html` | 双栏布局（品牌展示 + 表单） |
| 个人中心 | `pages/profile.html` | 个人信息 + 编辑表单 |
| 我的学习 | `pages/my-learning.html` | 学习进度明细 |
| 我的技能 | `pages/my-skills.html` | 技能档案与证据 |
| 我的工作坊 | `pages/my-workshops.html` | 报名记录与考核结果 |
| 关于我们 | `pages/about.html` | 时间线 + 价值观 + 联系 |

## 交互实现要点

- **JavaScript 位置**：所有页面内联在 `</body>` 前的 `<script>` 标签中，无外部 JS 文件。
- **状态持久化**：无需 localStorage 状态。
- **图表**：纯 CSS/SVG 模拟（柱状图、饼图、环形图），无图表库依赖。
- **页面导航**：标准 `<a href="pages/xxx.html">` 多页跳转，非 SPA。
- **响应式断点**：xl(1440px+) / lg(1200px，导航折叠) / md(992px，搜索框隐藏) / sm(768px，单列)

## 注意事项

- `app/` 中 `sidebar.js` 已废弃；`components/` 目录为空，是预留的模块化目录。
- 新增内页时，建议复制已有内页模板（如 `pages/knowledge.html`），保持顶部栏下拉菜单结构一致，并设置浅色主题。
- 样式修改优先在 `styles/` 文件中进行；若仅单页特殊样式，可在该页 `<style>` 内联处理。
- 图片资源存放于 `assets/images/`。
