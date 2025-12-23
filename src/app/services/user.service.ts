import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import {  STUDENT_API_CONFIG, buildStudentUrl } from '../config/api.config';

export interface User {
  // Normalized fields
  id: string;
  name: string;
  email: string;
  degree: string;
  university: string;
  status?: string;
  
  // Original field variations (optional)
  Name?: string;
  Email?: string;
  Degree?: string;
  University?: string;
  studentId?: string;
  studentName?: string;
  course?: string;
  mobile?: string;
}

export interface StudentApprovalResponse {
  success: boolean;
  message: string;
  updatedStudent: {
    studentId: number | string;
    studentName: string | null;
    course: string | null;
    email: string | null;
    mobile: string | null;
    status: string | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    console.log('Fetching users from:', STUDENT_API_CONFIG.getAllStudents.url);
    return this.http.get<User[]>(STUDENT_API_CONFIG.getAllStudents.url).pipe(
      tap(
        (data) => {
          console.log('Successfully fetched users:', data);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      )
    );
  }

  getUserById(id: string): Observable<User> {
    const url = buildStudentUrl(id);
    return this.http.get<User>(url).pipe(
      tap(
        (data) => console.log('User fetched:', data),
        (error) => console.error('Error fetching user:', error)
      )
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(STUDENT_API_CONFIG.getAllStudents.url, user).pipe(
      tap(
        (data) => console.log('User created:', data),
        (error) => console.error('Error creating user:', error)
      )
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    const url = buildStudentUrl(id);
    return this.http.put<User>(url, user).pipe(
      tap(
        (data) => console.log('User updated:', data),
        (error) => console.error('Error updating user:', error)
      )
    );
  }

  partialUpdateUser(id: string, updates: Partial<User>): Observable<User> {
    const url = buildStudentUrl(id);
    return this.http.patch<User>(url, updates).pipe(
      tap(
        (data) => console.log('User partially updated:', data),
        (error) => console.error('Error partially updating user:', error)
      )
    );
  }

  deleteUser(id: string): Observable<void> {
    const url = buildStudentUrl(id);
    return this.http.delete<void>(url).pipe(
      tap(
        () => console.log('User deleted:', id),
        (error) => console.error('Error deleting user:', error)
      )
    );
  }

  approveUser(id: string): Observable<User> {
    console.log('Approving user:', id);
    const url = buildStudentUrl(id);
    return this.http.patch<User>(url, { status: 'Approved' }).pipe(
      tap(
        (data) => console.log('User approved:', data),
        (error) => console.error('Error approving user:', error)
      )
    );
  }

  /**
   * Approve student using Student API
   * Sends a PUT request with the student data and sets status to approved
   */
  approveStudent(studentId: string | number, studentData?: any): Observable<StudentApprovalResponse> {
    console.log('Approving student:', studentId);
    const url = buildStudentUrl(String(studentId));
    
    // Prepare the request body matching the expected format
    const requestBody = {
      studentId: studentId,
      studentName: studentData?.studentName || null,
      course: studentData?.course || null,
      email: studentData?.email || null,
      mobile: studentData?.mobile || null,
      status: 'Approved'
    };

    return this.http.put<StudentApprovalResponse>(url, requestBody).pipe(
      tap(
        (response) => console.log('Student approved:', response),
        (error) => console.error('Error approving student:', error)
      )
    );
  }

  rejectUser(id: string): Observable<User> {
    console.log('Rejecting user:', id);
    const url = buildStudentUrl(id);
    return this.http.patch<User>(url, { status: 'Rejected' }).pipe(
      tap(
        (data) => console.log('User rejected:', data),
        (error) => console.error('Error rejecting user:', error)
      )
    );
  }

  /**
   * Reject student using Student API
   * Sends a PUT request with the student data and sets status to rejected
   */
  rejectStudent(studentId: string | number, studentData?: any): Observable<StudentApprovalResponse> {
    console.log('Rejecting student:', studentId);
    const url = buildStudentUrl(String(studentId));
    
    // Prepare the request body matching the expected format
    const requestBody = {
      studentId: studentId,
      studentName: studentData?.studentName || null,
      course: studentData?.course || null,
      email: studentData?.email || null,
      mobile: studentData?.mobile || null,
      status: 'Rejected'
    };

    return this.http.put<StudentApprovalResponse>(url, requestBody).pipe(
      tap(
        (response) => console.log('Student rejected:', response),
        (error) => console.error('Error rejecting student:', error)
      )
    );
  }

  // Normalize data from API to handle inconsistent field names
  normalizeUser(user: any): User {
    const normalized: User = {
      id: user.id || String(user.studentId) || '',
      name: user.name || user.Name || user.studentName || '',
      email: user.email || user.Email || '',
      degree: user.degree || user.Degree || user.course || '',
      university: user.university || user.University || '',
      status: user.status || 'Pending',
      mobile: user.mobile || '',
      studentId: user.studentId || user.id || ''
    };
    console.log('normalizeUser input:', user, 'output:', normalized);
    return normalized;
  }
}
