/**
 * Centralized API Configuration
 * All API endpoints are defined here for easy maintenance and updates
 */



// Student Management API (Local)
export const STUDENT_API_CONFIG = {
  baseUrl: 'http://localhost:5296/api/Student',

  getAllStudents: {
    url: 'http://localhost:5296/api/Student',
    method: 'GET',
    description: 'Get all students'
  },

  getStudentById: {
    url: 'http://localhost:5296/api/Student/:id',
    method: 'GET',
    description: 'Get student by ID'
  },

  approveStudent: {
    url: 'http://localhost:5296/api/Student/:id',
    method: 'PUT',
    description: 'Approve student - Update student status'
  },

  rejectStudent: {
    url: 'http://localhost:5296/api/Student/:id',
    method: 'PUT',
    description: 'Reject student - Update student status'
  }
};



/**
 * Helper function to build URLs with ID parameter for Student API
 */
export function buildStudentUrl(id: string): string {
  return `${STUDENT_API_CONFIG.baseUrl}/${id}`;
}

