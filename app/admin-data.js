/**
 * Admin Portal Mock Data
 * Provides simulated data for all admin pages
 */

const MOCK_DEPARTMENTS = ['井工程部', 'HSE部', '机械工程部', '仪表控制部', '电气部', '工艺设施部'];
const MOCK_DISCIPLINES = [
  { id: 1, name: 'Wells Engineering', color: '#5b9bd5' },
  { id: 2, name: 'Health Safety Environment', color: '#e6a23c' },
  { id: 3, name: 'Mechanical Engineering', color: '#4caf7a' },
  { id: 4, name: 'Instrumentation and Controls', color: '#e05d5d' },
  { id: 5, name: 'Process Facilities', color: '#5b9bd5' },
  { id: 6, name: 'Electrical', color: '#e6a23c' }
];

function generateUsers(count = 50) {
  const users = [];
  const surnames = ['张', '王', '李', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
  const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '洋', '勇'];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: surnames[i % 10] + names[Math.floor(i / 10) % 10],
      employeeId: 'EMP' + String(i + 1).padStart(4, '0'),
      department: MOCK_DEPARTMENTS[i % 6],
      role: i < 5 ? ['企业管理员', '评估师', '内部验证员', '标准验证员', '系统管理员'][i] : '学员',
      skillsCount: Math.floor(Math.random() * 15) + 1,
      trainingProgress: Math.floor(Math.random() * 100),
      certStatus: ['正常', '即将到期', '已过期'][Math.floor(Math.random() * 3)],
      email: `user${i+1}@company.com`,
      phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0]
    });
  }
  return users;
}

function generateCourses() {
  return [
    { id: 1, name: '钻井工程入门', discipline: 'Wells Engineering', level: 'Level 2', units: 8, students: 45, progress: 78, status: '已发布' },
    { id: 2, name: 'HSE管理体系', discipline: 'Health Safety Environment', level: 'Level 3', units: 12, students: 62, progress: 65, status: '已发布' },
    { id: 3, name: '机械维护基础', discipline: 'Mechanical Engineering', level: 'Level 2', units: 6, students: 38, progress: 82, status: '已发布' },
    { id: 4, name: '仪表校准技术', discipline: 'Instrumentation and Controls', level: 'Level 4', units: 10, students: 25, progress: 45, status: '草稿' },
    { id: 5, name: '油气处理工艺', discipline: 'Process Facilities', level: 'Level 3', units: 15, students: 55, progress: 70, status: '已发布' },
    { id: 6, name: '电气安全操作', discipline: 'Electrical', level: 'Level 2', units: 7, students: 42, progress: 90, status: '已发布' }
  ];
}

function generateEvidenceReviews() {
  return [
    { id: 1, employeeName: '张伟', skillName: '井控技术', discipline: 'Wells Engineering', uploadTime: '2026-06-10', type: '文档', status: '待审核' },
    { id: 2, employeeName: '王芳', skillName: 'HSE风险评估', discipline: 'Health Safety Environment', uploadTime: '2026-06-09', type: '图片', status: '待审核' },
    { id: 3, employeeName: '李强', skillName: '机械故障诊断', discipline: 'Mechanical Engineering', uploadTime: '2026-06-08', type: '视频', status: '已通过' },
    { id: 4, employeeName: '刘洋', skillName: '仪表调试', discipline: 'Instrumentation and Controls', uploadTime: '2026-06-07', type: '文档', status: '已驳回' },
    { id: 5, employeeName: '陈静', skillName: '井控技术', discipline: 'Wells Engineering', uploadTime: '2026-06-06', type: '图片', status: '待审核' }
  ];
}

function generateWorkshops() {
  return [
    { id: 1, title: '钻井安全操作培训', date: '2026-06-20', location: '培训中心A', instructor: '张教授', capacity: 30, enrolled: 24, status: '报名中' },
    { id: 2, title: 'HSE应急响应演练', date: '2026-06-25', location: '现场B区', instructor: '王专家', capacity: 20, enrolled: 18, status: '报名中' },
    { id: 3, title: '机械维护实操课', date: '2026-07-05', location: '车间C', instructor: '李技师', capacity: 15, enrolled: 12, status: '报名中' },
    { id: 4, title: '仪表控制系统培训', date: '2026-05-15', location: '培训中心A', instructor: '赵讲师', capacity: 25, enrolled: 25, status: '已结束' }
  ];
}

function generateAssessments() {
  return [
    { id: 1, employeeName: '张伟', skillName: '井控技术', discipline: 'Wells Engineering', evidenceCount: 3, submitTime: '2026-06-10', priority: '紧急', status: '待评估' },
    { id: 2, employeeName: '王芳', skillName: 'HSE风险评估', discipline: 'Health Safety Environment', evidenceCount: 2, submitTime: '2026-06-09', priority: '普通', status: '待评估' },
    { id: 3, employeeName: '李强', skillName: '机械故障诊断', discipline: 'Mechanical Engineering', evidenceCount: 4, submitTime: '2026-06-08', priority: '普通', status: '评估中' },
    { id: 4, employeeName: '刘洋', skillName: '仪表调试', discipline: 'Instrumentation and Controls', evidenceCount: 1, submitTime: '2026-06-05', priority: '紧急', status: '已完成' }
  ];
}

function generateVerificationCases() {
  return [
    { id: 1, employeeName: '张伟', skillName: '井控技术', assessor: '李评估师', status: '待复核', level: 'internal' },
    { id: 2, employeeName: '王芳', skillName: 'HSE风险评估', assessor: '李评估师', status: '复核中', level: 'internal' },
    { id: 3, employeeName: '李强', skillName: '机械故障诊断', assessor: '陈评估师', status: '待终审', level: 'standard' },
    { id: 4, employeeName: '刘洋', skillName: '仪表调试', assessor: '赵评估师', status: '已通过', level: 'standard' }
  ];
}

function generateReportData() {
  return {
    trainingCompletion: [65, 72, 78, 82, 85, 88],
    skillPassRate: [78, 82, 75, 88, 80, 85],
    workshopAttendance: [85, 90, 78, 92],
    departmentRank: [
      { name: '井工程部', rate: 92 },
      { name: 'HSE部', rate: 88 },
      { name: '机械工程部', rate: 85 },
      { name: '电气部', rate: 82 }
    ]
  };
}

// Export
if (typeof window !== 'undefined') {
  window.MOCK_DEPARTMENTS = MOCK_DEPARTMENTS;
  window.MOCK_DISCIPLINES = MOCK_DISCIPLINES;
  window.generateUsers = generateUsers;
  window.generateCourses = generateCourses;
  window.generateEvidenceReviews = generateEvidenceReviews;
  window.generateWorkshops = generateWorkshops;
  window.generateAssessments = generateAssessments;
  window.generateVerificationCases = generateVerificationCases;
  window.generateReportData = generateReportData;
}
