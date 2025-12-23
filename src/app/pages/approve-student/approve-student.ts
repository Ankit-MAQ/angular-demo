import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-approve-student',
  imports: [CommonModule],
  templateUrl: './approve-student.html',
  styleUrl: './approve-student.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApproveStudent implements OnInit, OnDestroy {
  students: User[] = [];
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();
    console.log('Starting to load students...');
    
    this.userService
      .getAllUsers()
      .pipe(
        timeout(10000), // 10 second timeout
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: any[]) => {
          console.log('API Response received:', data);
          try {
            // Normalize all students to handle inconsistent field names
            this.students = data.map(student => {
              const normalized = this.userService.normalizeUser(student);
              console.log('Normalized student:', normalized);
              return normalized;
            });
            console.log('Students loaded successfully:', this.students);
            this.loading = false;
            this.error = null;
            console.log('Loading set to false, marking for check');
            this.cdr.markForCheck();
          } catch (err) {
            console.error('Error normalizing data:', err);
            this.error = 'Error processing student data.';
            this.loading = false;
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          console.error('Error loading students:', err);
          this.error = 'Failed to load students. Please try again later.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  onApprove(studentId: string): void {
    this.userService
      .approveUser(studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser: any) => {
          console.log('Approve response:', updatedUser);
          const normalizedUser = this.userService.normalizeUser(updatedUser);
          const index = this.students.findIndex(s => s.id === studentId);
          if (index !== -1) {
            this.students[index] = normalizedUser;
            this.students = [...this.students]; // Force change detection
          }
          this.cdr.markForCheck();
          console.log(`Student ${studentId} approved successfully`);
        },
        error: (err) => {
          console.error(`Failed to approve student ${studentId}:`, err);
          alert('Failed to approve student. Please try again.');
        }
      });
  }

  onReject(studentId: string): void {
    this.userService
      .rejectUser(studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser: any) => {
          console.log('Reject response:', updatedUser);
          const normalizedUser = this.userService.normalizeUser(updatedUser);
          const index = this.students.findIndex(s => s.id === studentId);
          if (index !== -1) {
            this.students[index] = normalizedUser;
            this.students = [...this.students]; // Force change detection
          }
          this.cdr.markForCheck();
          console.log(`Student ${studentId} rejected successfully`);
        },
        error: (err) => {
          console.error(`Failed to reject student ${studentId}:`, err);
          alert('Failed to reject student. Please try again.');
        }
      });
  }
}
