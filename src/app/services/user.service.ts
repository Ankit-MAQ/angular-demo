import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://mp493fbdb64c15395114.free.beeceptor.com/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    console.log('Fetching users from:', this.apiUrl);
    return this.http.get<User[]>(this.apiUrl).pipe(
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
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap(
        (data) => console.log('User fetched:', data),
        (error) => console.error('Error fetching user:', error)
      )
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(
        (data) => console.log('User created:', data),
        (error) => console.error('Error creating user:', error)
      )
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      tap(
        (data) => console.log('User updated:', data),
        (error) => console.error('Error updating user:', error)
      )
    );
  }

  partialUpdateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, updates).pipe(
      tap(
        (data) => console.log('User partially updated:', data),
        (error) => console.error('Error partially updating user:', error)
      )
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(
        () => console.log('User deleted:', id),
        (error) => console.error('Error deleting user:', error)
      )
    );
  }

  approveUser(id: string): Observable<User> {
    console.log('Approving user:', id);
    return this.http.patch<User>(`${this.apiUrl}/${id}`, { status: 'Approved' }).pipe(
      tap(
        (data) => console.log('User approved:', data),
        (error) => console.error('Error approving user:', error)
      )
    );
  }

  rejectUser(id: string): Observable<User> {
    console.log('Rejecting user:', id);
    return this.http.patch<User>(`${this.apiUrl}/${id}`, { status: 'Rejected' }).pipe(
      tap(
        (data) => console.log('User rejected:', data),
        (error) => console.error('Error rejecting user:', error)
      )
    );
  }

  // Normalize data from API to handle inconsistent field names
  normalizeUser(user: any): User {
    const normalized: User = {
      id: user.id || '',
      name: user.name || user.Name || user.studentName || '',
      email: user.email || user.Email || '',
      degree: user.degree || user.Degree || user.course || '',
      university: user.university || user.University || '',
      status: user.status || 'Pending',
      mobile: user.mobile || '',
      studentId: user.studentId || ''
    };
    console.log('normalizeUser input:', user, 'output:', normalized);
    return normalized;
  }
}
