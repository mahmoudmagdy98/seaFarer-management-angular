import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeafarerService } from '../../../core/services/seafarer.service';



@Component({
  selector: 'app-seafarer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seafarer-modal.component.html',
  styleUrls: ['./seafarer-modal.component.scss']
})
export class SeafarerModalComponent {
  @Input() seafarer: any = {};
  @Output() close = new EventEmitter<boolean>();
 @Output() saved = new EventEmitter<any>(); // لما يتم الحفظ بنجاح


  isSaving = false;


constructor( private seafarerService: SeafarerService) {}



  // save() {
  //   this.isSaving = true;
  //   this.seafarerService.saveSeafarer(this.seafarer).subscribe({
  //     next: () => { this.isSaving = false; this.close.emit(true); },
  //     error: err => { console.error(err); this.isSaving = false; }
  //   });
  // }

   save() {
    this.isSaving = true;

    // تجهيز الـ payload بالشكل المطلوب من الـ backend
    const payload = {
      entity: {
        EmpId: this.seafarer.EmpId || 0,
        EmployeeName: this.seafarer.EmployeeName || '',
        EmployeeCode: this.seafarer.EmployeeCode || '',
        JobName: this.seafarer.JobName || '',
        Nationality: this.seafarer.Nationality || '',
        SponsorName: this.seafarer.SponsorName || '',
        BirthDate: this.seafarer.BirthDate || '',
        Age: this.seafarer.Age || 0,
        Phone: this.seafarer.Phone || '',
        Mobile: this.seafarer.Mobile || '',
        Email: this.seafarer.Email || '',
        NationalID: this.seafarer.NationalID || '',
        EmploymentDate: this.seafarer.EmploymentDate || '',
        InsuranceDate: this.seafarer.InsuranceDate || '',
        PassportExpiryDate: this.seafarer.PassportExpiryDate || '',
        PassportNumber: this.seafarer.PassportNumber || '',
        PassportIssueDate: this.seafarer.PassportIssueDate || '',
        VisaIssueDate: this.seafarer.VisaIssueDate || '',
        VisaExpiryDate: this.seafarer.VisaExpiryDate || ''
      },
      Qualifications: this.seafarer.Qualifications || [],
      Certificates: this.seafarer.Certificates || [],
      Languages: this.seafarer.Languages || [],
      References: this.seafarer.References || [],
      WorkExperiences: this.seafarer.WorkExperiences || []
    };

    this.seafarerService.saveSeafarer(payload).subscribe({
      next: (res: any) => {
        this.isSaving = false;
        if (res.Result) {
          // تم الحفظ بنجاح
          this.saved.emit(res);
          this.close.emit(true);
        } else {
          // حدث خطأ من الـ backend
          alert(res.ErrorMessage || 'Save failed');
        }
      },
      error: (err) => {
        this.isSaving = false;
        console.error(err);
        alert('Save failed: check console');
      }
    });
  }




  dismiss() { this.close.emit(false); }





}
