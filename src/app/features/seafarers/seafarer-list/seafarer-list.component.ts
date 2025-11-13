import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeafarerService } from '../../../core/services/seafarer.service';
import { FormsModule } from '@angular/forms';
import { SeafarerModalComponent } from '../seafarer-modal/seafarer-modal.component';

@Component({
  selector: 'app-seafarer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SeafarerModalComponent],
  templateUrl: './seafarer-list.component.html',
  styleUrls: ['./seafarer-list.component.scss']
})
export class SeafarerListComponent implements OnInit {
  seafarers: any[] = [];
  isLoading = true;
   selectedSeafarer: any = null;
  showModal = false;
  isEditing = false;


  constructor(private seafarerService: SeafarerService) {}

  ngOnInit(): void {
    this.loadSeafarers();
  }

   loadSeafarers() {
    this.isLoading = true;
    this.seafarerService.GetAllSeafarers().subscribe({
      next: (data: any[]) => { this.seafarers = data; this.isLoading = false; },
      error: (err) => { console.error(err); this.isLoading = false; }
    });
  }

   toggleStatus(empId: number, isActive: boolean) {
    const newStatus = isActive ? 1 : 2;
    this.seafarerService.changeStatus(empId, newStatus).subscribe({
      next: () => {
        const s = this.seafarers.find(x => x.EmpId === empId);
        if (s) s.IsActive = !isActive;
      },
      error: err => console.error(err)
    });
  }




  openAddModal() {
  this.selectedSeafarer = {
    EmpId: 0,
    EmployeeCode: '',
    EmployeeName: '',
    JobName: '',
    Phone: '',
    Mobile: '',
    Email: '',
    NationalID: '',
    PassportNumber: '',
    PassportIssueDate: '',
    PassportExpiryDate: '',
    VisaIssueDate: '',
    VisaExpiryDate: ''
  };
  this.showModal = true;
}

handleSaved(seafarer: any) {
  const index = this.seafarers.findIndex(s => s.EmpId === seafarer.EmpId);
  if (index > -1) {

    this.seafarers[index] = seafarer;
  } else {
    this.seafarers.push(seafarer);
  }
   
}

  openEditModal(seafarer: any) {
    this.selectedSeafarer = { ...seafarer };
    this.showModal = true;
  }

  closeModal(saved: boolean) {
    this.showModal = false;
  }


}










