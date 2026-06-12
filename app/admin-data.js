/**
 * Admin Portal Mock Data
 * Provides simulated data for all admin pages
 */

const MOCK_DEPARTMENTS = ['Wells Engineering', 'HSE', 'Mechanical Engineering', 'Instrumentation & Controls', 'Electrical', 'Process Facilities'];
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
  const givenNames = ['Zhang Wei', 'Wang Fang', 'Li Na', 'Liu Min', 'Chen Jing', 'Yang Li', 'Zhao Qiang', 'Huang Lei', 'Zhou Yang', 'Wu Yong'];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: givenNames[i % 10],
      employeeId: 'EMP' + String(i + 1).padStart(4, '0'),
      department: MOCK_DEPARTMENTS[i % 6],
      role: i < 5 ? ['Enterprise Admin', 'Assessor', 'Internal Verifier', 'Standard Verifier', 'System Admin'][i] : 'Student',
      skillsCount: Math.floor(Math.random() * 15) + 1,
      trainingProgress: Math.floor(Math.random() * 100),
      certStatus: ['Active', 'Expiring Soon', 'Expired'][Math.floor(Math.random() * 3)],
      email: `user${i+1}@company.com`,
      phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0]
    });
  }
  return users;
}

function generateCourses() {
  return [
    { id: 1, name: 'Drilling Engineering Intro', discipline: 'Wells Engineering', level: 'Level 2', units: 8, students: 45, progress: 78, status: 'Published' },
    { id: 2, name: 'HSE Management System', discipline: 'Health Safety Environment', level: 'Level 3', units: 12, students: 62, progress: 65, status: 'Published' },
    { id: 3, name: 'Mechanical Maintenance Basics', discipline: 'Mechanical Engineering', level: 'Level 2', units: 6, students: 38, progress: 82, status: 'Published' },
    { id: 4, name: 'Instrument Calibration', discipline: 'Instrumentation and Controls', level: 'Level 4', units: 10, students: 25, progress: 45, status: 'Draft' },
    { id: 5, name: 'Oil & Gas Processing', discipline: 'Process Facilities', level: 'Level 3', units: 15, students: 55, progress: 70, status: 'Published' },
    { id: 6, name: 'Electrical Safety Operations', discipline: 'Electrical', level: 'Level 2', units: 7, students: 42, progress: 90, status: 'Published' }
  ];
}

function generateEvidenceReviews() {
  return [
    { id: 1, employeeName: 'Zhang Wei', skillName: 'Well Control', discipline: 'Wells Engineering', uploadTime: '2026-06-10', type: 'Document', status: 'Pending Review' },
    { id: 2, employeeName: 'Wang Fang', skillName: 'HSE Risk Assessment', discipline: 'Health Safety Environment', uploadTime: '2026-06-09', type: 'Image', status: 'Pending Review' },
    { id: 3, employeeName: 'Li Qiang', skillName: 'Mechanical Fault Diagnosis', discipline: 'Mechanical Engineering', uploadTime: '2026-06-08', type: 'Video', status: 'Approved' },
    { id: 4, employeeName: 'Liu Yang', skillName: 'Instrument Debugging', discipline: 'Instrumentation and Controls', uploadTime: '2026-06-07', type: 'Document', status: 'Rejected' },
    { id: 5, employeeName: 'Chen Jing', skillName: 'Well Control', discipline: 'Wells Engineering', uploadTime: '2026-06-06', type: 'Image', status: 'Pending Review' }
  ];
}

function generateWorkshops() {
  return [
    { id: 1, title: 'Drilling Safety Operations', date: '2026-06-20', location: 'Training Center A', instructor: 'Prof. Zhang', capacity: 30, enrolled: 24, status: 'Enrolling' },
    { id: 2, title: 'HSE Emergency Response Drill', date: '2026-06-25', location: 'Site Zone B', instructor: 'Expert Wang', capacity: 20, enrolled: 18, status: 'Enrolling' },
    { id: 3, title: 'Mechanical Maintenance Hands-on', date: '2026-07-05', location: 'Workshop C', instructor: 'Tech Li', capacity: 15, enrolled: 12, status: 'Enrolling' },
    { id: 4, title: 'Instrumentation & Controls Training', date: '2026-05-15', location: 'Training Center A', instructor: 'Lecturer Zhao', capacity: 25, enrolled: 25, status: 'Ended' }
  ];
}

function generateAssessments() {
  return [
    { id: 1, employeeName: 'Zhang Wei', skillName: 'Well Control', discipline: 'Wells Engineering', evidenceCount: 3, submitTime: '2026-06-10', priority: 'Urgent', status: 'Pending' },
    { id: 2, employeeName: 'Wang Fang', skillName: 'HSE Risk Assessment', discipline: 'Health Safety Environment', evidenceCount: 2, submitTime: '2026-06-09', priority: 'Normal', status: 'Pending' },
    { id: 3, employeeName: 'Li Qiang', skillName: 'Mechanical Fault Diagnosis', discipline: 'Mechanical Engineering', evidenceCount: 4, submitTime: '2026-06-08', priority: 'Normal', status: 'In Progress' },
    { id: 4, employeeName: 'Liu Yang', skillName: 'Instrument Debugging', discipline: 'Instrumentation and Controls', evidenceCount: 1, submitTime: '2026-06-05', priority: 'Urgent', status: 'Completed' }
  ];
}

function generateVerificationCases() {
  return [
    { id: 1, employeeName: 'Zhang Wei', skillName: 'Well Control', assessor: 'Assessor Li', status: 'Pending Review', level: 'internal' },
    { id: 2, employeeName: 'Wang Fang', skillName: 'HSE Risk Assessment', assessor: 'Assessor Li', status: 'Reviewing', level: 'internal' },
    { id: 3, employeeName: 'Li Qiang', skillName: 'Mechanical Fault Diagnosis', assessor: 'Assessor Chen', status: 'Pending Final Approval', level: 'standard' },
    { id: 4, employeeName: 'Liu Yang', skillName: 'Instrument Debugging', assessor: 'Assessor Zhao', status: 'Approved', level: 'standard' }
  ];
}

function generateReportData() {
  return {
    trainingCompletion: [65, 72, 78, 82, 85, 88],
    skillPassRate: [78, 82, 75, 88, 80, 85],
    workshopAttendance: [85, 90, 78, 92],
    departmentRank: [
      { name: 'Wells Engineering', rate: 92 },
      { name: 'HSE', rate: 88 },
      { name: 'Mechanical Engineering', rate: 85 },
      { name: 'Electrical', rate: 82 }
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
