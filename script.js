// document.addEventListener('DOMContentLoaded', () => {
//   // 1️⃣ Navigation Tabs
//   window.showSection = (sectionId) => {
//     document.querySelectorAll('.content-section').forEach(sec => {
//       sec.classList.toggle('active', sec.id === sectionId);
//     });
//     document.querySelectorAll('.nav-tab').forEach(btn => {
//       btn.classList.toggle('active', btn.textContent.trim().includes(capitalize(sectionId)));
//     });
//     document.addEventListener('DOMContentLoaded', () => {
//   // --- Your existing code above ---

//   // ======= STUDENT MANAGEMENT =======
//   const studentKey = 'studentsData';
//   function getStudents() {
//     return JSON.parse(localStorage.getItem(studentKey) || '[]');
//   }
//   function saveStudents(students) {
//     localStorage.setItem(studentKey, JSON.stringify(students));
//   }

//   window.addStudent = (student) => {
//     const students = getStudents();
//     if (students.find(s => s.student_id === student.student_id)) {
//       notify('Student ID already exists.');
//       return;
//     }
//     students.push(student);
//     saveStudents(students);
//     notify(`Student ${student.full_name} added.`);
//     renderStudents();
//   };

//   window.renderStudents = () => {
//     const students = getStudents();
//     const container = document.getElementById('studentsList');
//     if (!container) return;
//     container.innerHTML = students.length === 0
//       ? '<p>No students registered.</p>'
//       : students.map(s => `
//         <div>${s.student_id} - ${s.full_name} (${s.email})</div>
//       `).join('');
//   };

//   // ======= ATTENDANCE MANAGEMENT =======
//   const attendanceKey = 'attendanceData';
//   function getAttendance() {
//     return JSON.parse(localStorage.getItem(attendanceKey) || '[]');
//   }
//   function saveAttendance(records) {
//     localStorage.setItem(attendanceKey, JSON.stringify(records));
//   }

//   window.recordAttendance = (student_id, course, title, status='Present') => {
//     const students = getStudents();
//     if (!students.find(s => s.student_id === student_id)) {
//       notify('Student not found, cannot record attendance.');
//       return;
//     }
//     const attendance = getAttendance();
//     const date = new Date().toISOString().split('T')[0];
//     attendance.push({
//       student_id,
//       course_code: course,
//       lecture_title: title,
//       status,
//       lecture_date: date,
//       checkin_time: new Date().toLocaleTimeString()
//     });
//     saveAttendance(attendance);
//     notify('Attendance recorded.');
//     renderAttendance();
//   };

//   window.renderAttendance = () => {
//     const attendance = getAttendance();
//     const tbody = document.getElementById('attendanceTableBody');
//     if (!tbody) return;
//     if (attendance.length === 0) {
//       tbody.innerHTML = '<tr><td colspan="6">No attendance records.</td></tr>';
//       return;
//     }
//     tbody.innerHTML = attendance.map(r => `
//       <tr>
//         <td>${r.lecture_date}</td>
//         <td>${r.course_code}</td>
//         <td>${r.lecture_title}</td>
//         <td>${r.status}</td>
//         <td>${r.checkin_time}</td>
//         <td>${r.student_id}</td>
//       </tr>`).join('');
//   };

//   // Example usage buttons
//   window.addExampleStudent = () => addStudent({student_id: 'STU001', full_name: 'Alice Johnson', email: 'alice@example.com', phone: '1234567890'});
//   window.markAttendanceExample = () => recordAttendance('STU001', 'CS101', 'Intro to Algorithms');

//   // Initialize UI
//   renderLectures();
//   renderStudents();
//   renderAttendance();
// });

//   };

//   const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

//   // 2️⃣ Notification
//   const notify = msg => {
//     const toast = document.getElementById('notification');
//     toast.textContent = msg;
//     toast.style.display = 'block';
//     setTimeout(() => (toast.style.display = 'none'), 3000);
//   };

//   // 3️⃣ QR Scanner Placeholder (stub)
//   window.startQRScanner = () => {
//     notify('QR Scanner activated (stub implementation).');
//     // Integrate real scanning in production
//   };

//   // 4️⃣ Attendance Filters
//   window.filterAttendance = () => {
//     const course = document.getElementById('courseFilter').value;
//     const date = document.getElementById('dateFilter').value;
//     const tbody = document.getElementById('attendanceTableBody');
//     Array.from(tbody.children).forEach(row => {
//       const [d, c] = [row.children[0].textContent, row.children[1].textContent];
//       row.style.display = ((course && c !== course) || (date && d !== date)) ? 'none' : '';
//     });
//   };

//   // 5️⃣ Lecture Search & Filter
//   const lectures = [
//     { title: "Intro to Algorithms", course: "CS101", date: "2025-05-10", url: "#" },
//     { title: "Advanced Calculus",   course: "MATH201", date: "2025-05-12", url: "#" },
//     { title: "Classical Mechanics",  course: "PHYS101", date: "2025-05-15", url: "#" },
//     { title: "Shakespearean Lit",    course: "ENG102", date: "2025-05-18", url: "#" }
//   ];

//   window.renderLectures = () => {
//     const container = document.getElementById('lecturesList');
//     container.innerHTML = lectures.map(l => `
//       <div class="card mb-3">
//         <div class="card-body">
//           <h5>${l.title}</h5>
//           <p>Course: ${l.course} • Date: ${l.date}</p>
//           <button class="btn btn-outline-primary" onclick="playLecture('${l.url}', '${l.title}')">
//             <i class="fas fa-play-circle"></i> Play
//           </button>
//         </div>
//       </div>`).join('');
//   };

//   window.searchLectures = () => filterLectures();

//   window.filterLectures = () => {
//     const query = document.getElementById('lectureSearch').value.toLowerCase();
//     const subj = document.getElementById('lectureFilter').value;
//     const container = document.getElementById('lecturesList');
//     container.innerHTML = lectures
//       .filter(l => (!subj || l.course.startsWith(subj)) &&
//                    (l.title.toLowerCase().includes(query) || l.course.toLowerCase().includes(query)))
//       .map(l => `
//         <div class="card mb-3">
//           <div class="card-body">
//             <h5>${l.title}</h5>
//             <p>Course: ${l.course} • Date: ${l.date}</p>
//             <button class="btn btn-outline-primary" onclick="playLecture('${l.url}', '${l.title}')">
//               <i class="fas fa-play-circle"></i> Play
//             </button>
//           </div>
//         </div>`)
//       .join('');
//   };

//   // Playback in modal
//   window.playLecture = (url, title) => {
//     document.getElementById('lectureVideo').src = url;
//     document.getElementById('videoModalTitle').textContent = title;
//     const modal = new bootstrap.Modal(document.getElementById('videoModal'));
//     modal.show();
//   };

//   // 6️⃣ Profile Form Submit
//   document.getElementById('profileForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     notify('Profile updated successfully.');
//   });

//   // 7️⃣ Settings Form Submit
//   document.getElementById('settingsForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     notify('Settings saved successfully.');
//   });

//   // 8️⃣ Admin Actions Stubs
//   window.viewAllStudents = () => notify('Viewing all students (stub).');
//   window.exportAttendance = () => notify('Attendance exported (stub).');
//   window.generateReports = () => notify('Reports generated (stub).');

//   // Initialize UI
//   renderLectures();
// });
// script.js

// script.js

// script.js

// Load dummy data
const mockAttendanceData = [
    { date: '2025-07-01', course: 'CS101', lecture: 'Intro to AI', status: 'Present', checkIn: '10:02 AM' },
    { date: '2025-07-02', course: 'MATH201', lecture: 'Calculus II', status: 'Absent', checkIn: '-' },
    { date: '2025-07-03', course: 'ENG102', lecture: 'Shakespearean Drama', status: 'Present', checkIn: '9:58 AM' },
];

const mockStudents = [
    { id: 'STU001', name: 'John Doe', email: 'john.doe@university.edu', course: 'CS101' },
    { id: 'STU002', name: 'Jane Smith', email: 'jane.smith@university.edu', course: 'MATH201' },
    { id: 'STU003', name: 'Alan Turing', email: 'alan.turing@university.edu', course: 'PHYS101' },
];

document.addEventListener('DOMContentLoaded', function () {
    showSection('dashboard');

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.textContent.trim().toLowerCase();
            showSection(sectionId.includes('dashboard') ? 'dashboard'
                        : sectionId.includes('attendance') ? 'attendance'
                        : sectionId.includes('lectures') ? 'lectures'
                        : sectionId.includes('profile') ? 'profile'
                        : sectionId.includes('admin') ? 'admin'
                        : 'dashboard');
        });
    });

    renderAttendanceTable();
    renderStudentList();

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');
        });
    }

    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Settings saved!', 'success');
        });
    }

    const addLectureForm = document.getElementById('addLectureForm');
    if (addLectureForm) {
        addLectureForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('New lecture added!', 'success');
        });
    }
});

function renderAttendanceTable(filterCourse = '', filterDate = '') {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    mockAttendanceData.filter(item => {
        return (!filterCourse || item.course === filterCourse) &&
               (!filterDate || item.date === filterDate);
    }).forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.course}</td>
            <td>${record.lecture}</td>
            <td>${record.status}</td>
            <td>${record.checkIn}</td>
            <td><button class="btn btn-sm btn-info">Details</button></td>
        `;
        tbody.appendChild(row);
    });
}

function filterAttendance() {
    const course = document.getElementById('courseFilter')?.value || '';
    const date = document.getElementById('dateFilter')?.value || '';
    renderAttendanceTable(course, date);
}

function renderStudentList() {
    const section = document.querySelector('#admin .card:nth-child(2)');
    if (!section || document.getElementById('studentList')) return;
    const list = document.createElement('ul');
    list.id = 'studentList';
    list.className = 'list-group mt-3';

    mockStudents.forEach(student => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${student.name}</strong> (${student.id}) - ${student.course} - ${student.email}`;
        list.appendChild(li);
    });

    section.appendChild(list);
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeButton = Array.from(document.querySelectorAll('.nav-tab')).find(btn => btn.textContent.toLowerCase().includes(sectionId));
    if (activeButton) activeButton.classList.add('active');
}

function startQRScanner() {
    showNotification('QR Scanner started (simulation mode)', 'info');
}

function searchLectures() {
    const query = document.getElementById('lectureSearch')?.value || '';
    showNotification(`Searching for lectures: ${query}`, 'info');
}

function filterLectures() {
    const subject = document.getElementById('lectureFilter')?.value || '';
    showNotification(`Filtering lectures by ${subject || 'all subjects'}`, 'info');
}

function viewAllStudents() {
    renderStudentList();
    showNotification('Displaying all registered students.', 'info');
}

function exportAttendance() {
    showNotification('Attendance data exported (mock).', 'success');
}

function generateReports() {
    showNotification('Reports generated successfully (mock).', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(() => {
        notification.className = 'notification';
        notification.textContent = '';
    }, 3000);
}
// Export attendance data as CSV
function exportAttendance() {
    const headers = ['Date', 'Course', 'Lecture', 'Status', 'Check-in Time'];
    const rows = mockAttendanceData.map(record => [
        record.date,
        record.course,
        record.lecture,
        record.status,
        record.checkIn
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(value => `"${value}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'attendance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Attendance data exported as CSV!', 'success');
}
// Load Chart.js dynamically (if not already loaded)
function loadChartJsIfNeeded(callback) {
    if (typeof Chart !== 'undefined') return callback();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// Generate Reports: Pie chart and Bar chart
function generateReports() {
    showNotification('Generating visual reports...', 'info');

    loadChartJsIfNeeded(() => {
        const chartContainer = document.createElement('div');
        chartContainer.id = 'chartContainer';
        chartContainer.style.marginTop = '20px';
        chartContainer.innerHTML = `
            <h4>Attendance Report</h4>
            <canvas id="attendancePieChart" height="200"></canvas>
            <canvas id="attendanceBarChart" height="200"></canvas>
        `;

        const adminSection = document.querySelector('#admin .card:nth-child(2)');
        const oldChart = document.getElementById('chartContainer');
        if (oldChart) oldChart.remove();
        adminSection.appendChild(chartContainer);

        const presentCount = mockAttendanceData.filter(a => a.status === 'Present').length;
        const absentCount = mockAttendanceData.filter(a => a.status === 'Absent').length;

        const pieCtx = document.getElementById('attendancePieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Present', 'Absent'],
                datasets: [{
                    data: [presentCount, absentCount],
                    backgroundColor: ['#28a745', '#dc3545']
                }]
            },
            options: { responsive: true }
        });

        const barCtx = document.getElementById('attendanceBarChart').getContext('2d');
        const labels = [...new Set(mockAttendanceData.map(r => r.course))];
        const courseData = labels.map(course =>
            mockAttendanceData.filter(r => r.course === course && r.status === 'Present').length
        );

        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Present Count by Course',
                    data: courseData,
                    backgroundColor: '#007bff'
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });

        showNotification('Reports generated successfully (charts added).', 'success');
    });
}
// Visualize Students by Course using Chart.js
function visualizeStudentsByCourse() {
    loadChartJsIfNeeded(() => {
        const studentChartContainer = document.createElement('div');
        studentChartContainer.id = 'studentChartContainer';
        studentChartContainer.style.marginTop = '20px';
        studentChartContainer.innerHTML = `
            <h4>Student Enrollment by Course</h4>
            <canvas id="studentBarChart" height="200"></canvas>
        `;

        const section = document.querySelector('#admin .card:nth-child(2)');
        const oldChart = document.getElementById('studentChartContainer');
        if (oldChart) oldChart.remove();
        section.appendChild(studentChartContainer);

        const courseCounts = {};
        mockStudents.forEach(student => {
            courseCounts[student.course] = (courseCounts[student.course] || 0) + 1;
        });

        const labels = Object.keys(courseCounts);
        const values = Object.values(courseCounts);

        const barCtx = document.getElementById('studentBarChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Students',
                    data: values,
                    backgroundColor: '#17a2b8'
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });

        showNotification('Student course distribution chart generated.', 'success');
    });
}

// Extend viewAllStudents to include chart
function viewAllStudents() {
    renderStudentList();
    visualizeStudentsByCourse();
    showNotification('Displaying all registered students and chart.', 'info');
}
// Sample mock lectures
const mockLectures = [
    {
        title: 'Intro to AI',
        course: 'CS101',
        date: '2025-07-01',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
        title: 'Calculus Review',
        course: 'MATH201',
        date: '2025-07-02',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    },
    {
        title: 'Newton Laws',
        course: 'PHYS101',
        date: '2025-07-03',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    }
];

// Render lectures in the lecture library
function renderLectureLibrary(filterQuery = '', filterCourse = '') {
    const lectureList = document.getElementById('lecturesList');
    if (!lectureList) return;
    lectureList.innerHTML = '';

    const filteredLectures = mockLectures.filter(lec => {
        const matchQuery = lec.title.toLowerCase().includes(filterQuery.toLowerCase());
        const matchCourse = !filterCourse || lec.course.includes(filterCourse);
        return matchQuery && matchCourse;
    });

    if (filteredLectures.length === 0) {
        lectureList.innerHTML = '<p>No lectures found matching your criteria.</p>';
        return;
    }

    filteredLectures.forEach(lec => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${lec.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${lec.course} | ${lec.date}</h6>
                <button class="btn btn-primary" onclick="openLectureVideo('${lec.title}', '${lec.videoUrl}')">
                    <i class="fas fa-play"></i> Watch Lecture
                </button>
            </div>
        `;
        lectureList.appendChild(card);
    });
}

// Trigger search
function searchLectures() {
    const query = document.getElementById('lectureSearch')?.value || '';
    const filter = document.getElementById('lectureFilter')?.value || '';
    renderLectureLibrary(query, filter);
}

// Trigger filter
function filterLectures() {
    searchLectures();
}

// Open lecture video in modal
function openLectureVideo(title, videoUrl) {
    const videoElement = document.getElementById('lectureVideo');
    const modalTitle = document.getElementById('videoModalTitle');
    if (videoElement && modalTitle) {
        videoElement.src = videoUrl;
        modalTitle.textContent = title;
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        modal.show();
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    renderLectureLibrary();
});
function openLectureVideo(title, videoUrl) {
    const videoElement = document.getElementById('lectureVideo');
    const modalTitle = document.getElementById('videoModalTitle');
    if (videoElement && modalTitle) {
        videoElement.pause();                          // Stop any current video
        videoElement.setAttribute('src', videoUrl);    // Set new video URL
        videoElement.load();                           // Load new source
        videoElement.play();                           // Start playing

        modalTitle.textContent = title;
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        modal.show();
    }
}

