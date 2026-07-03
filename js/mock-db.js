// Mock Database for Static Demo on GitHub Pages
(function() {
    const defaultStudents = [
        { student_id: "1234", first_name: "Vijay", last_name: "Mahes", password: "password", cpi: 8.9, leader: "1234", participate: 1, allocated: 0 },
        { student_id: "1123", first_name: "Yug", last_name: "Ver", password: "password", cpi: 9.3, leader: "1123", participate: 1, allocated: 0 }
    ];

    const defaultFaculty = [
        { faculty_id: "4545", name: "Vijay Mahes", password: "password", admin: 1, enable: 1 }
    ];

    const defaultProjects = [
        { project_id: "101", definition: "Online Project Allocation", description: "Web based tool for project selection and average CPI calculation." },
        { project_id: "102", definition: "E-Commerce Hub", description: "Scalable marketplace application using PHP & MySQL." },
        { project_id: "103", definition: "Real-time Chat App", description: "Real-time communication software with WebSockets." },
        { project_id: "104", definition: "AI Code Assistant", description: "Intelligent helper tool utilizing Large Language Models." }
    ];

    const defaultProcess = {
        process: 2, // Round 1 Project Selection
        news: "Round 1 Project Selection has started! Please select and prioritize your choices."
    };

    const defaultGroups = [
        { leader: "1234", members: ["1234"], choices: ["101", "103"] }
    ];

    // Initialize local storage keys if they don't exist
    if (!localStorage.getItem('db_students')) {
        localStorage.setItem('db_students', JSON.stringify(defaultStudents));
    }
    if (!localStorage.getItem('db_faculty')) {
        localStorage.setItem('db_faculty', JSON.stringify(defaultFaculty));
    }
    if (!localStorage.getItem('db_projects')) {
        localStorage.setItem('db_projects', JSON.stringify(defaultProjects));
    }
    if (!localStorage.getItem('db_process')) {
        localStorage.setItem('db_process', JSON.stringify(defaultProcess));
    }
    if (!localStorage.getItem('db_groups')) {
        localStorage.setItem('db_groups', JSON.stringify(defaultGroups));
    }
})();

// Helper Functions
const MockDB = {
    getStudents: () => JSON.parse(localStorage.getItem('db_students')),
    setStudents: (data) => localStorage.setItem('db_students', JSON.stringify(data)),
    
    getFaculty: () => JSON.parse(localStorage.getItem('db_faculty')),
    setFaculty: (data) => localStorage.setItem('db_faculty', JSON.stringify(data)),
    
    getProjects: () => JSON.parse(localStorage.getItem('db_projects')),
    setProjects: (data) => localStorage.setItem('db_projects', JSON.stringify(data)),
    
    getProcess: () => JSON.parse(localStorage.getItem('db_process')),
    setProcess: (data) => localStorage.setItem('db_process', JSON.stringify(data)),
    
    getGroups: () => JSON.parse(localStorage.getItem('db_groups')),
    setGroups: (data) => localStorage.setItem('db_groups', JSON.stringify(data)),

    loginStudent: (id, password) => {
        const students = MockDB.getStudents();
        const found = students.find(s => s.student_id === id && s.participate === 1);
        if (found && found.password === password) {
            localStorage.setItem('session_student', JSON.stringify(found));
            return { success: true, student: found };
        }
        return { success: false, message: "INVALID LOGIN DETAILS" };
    },

    loginFaculty: (id, password) => {
        const facultyList = MockDB.getFaculty();
        const found = facultyList.find(f => f.faculty_id === id && f.enable === 1);
        if (found && found.password === password) {
            localStorage.setItem('session_faculty', JSON.stringify(found));
            return { success: true, faculty: found };
        }
        return { success: false, message: "INVALID LOGIN DETAILS" };
    },

    logout: () => {
        localStorage.removeItem('session_student');
        localStorage.removeItem('session_faculty');
    },

    getCurrentStudent: () => JSON.parse(localStorage.getItem('session_student')),
    getCurrentFaculty: () => JSON.parse(localStorage.getItem('session_faculty'))
};
