import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeafarerService } from '../../../core/services/seafarer.service';

@Component({
  selector: 'app-seafarer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seafarer-modal.component.html',
  styleUrls: ['./seafarer-modal.component.scss']
})
export class SeafarerModalComponent implements OnInit {
  @Input() seafarer: any = {};
  @Output() close = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<any>();

  employees: any[] = [];
  sponsors: any[] = [];


  isSaving = false;

  constructor(private seafarerService: SeafarerService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadSponsors();

  }



  loadEmployees() {
    this.seafarerService.getEmployees().subscribe({
      next: (res: any[]) => {
        this.employees = res || [];
      },
      error: (err) => console.error(err)
    });
  }

  loadSponsors() {
    this.seafarerService.getVendors().subscribe({
      next: (res: any[]) => {
        this.sponsors = res || [];
      },
      error: (err) => console.error(err)
    });
  }

  save() {
    // Validation
    // if (!this.seafarer.EmployeeCode) {
    //   alert('Employee Code is required');
    //   return;
    //}
    if (!this.seafarer.VendorId) {
      alert('Sponsor is required');
      return;
    }

    this.isSaving = true;

    const payload = {
      entity: {
        EmpId: this.seafarer.EmpId || 0, // 0 for new employee
        EmployeeName: this.seafarer.EmployeeName,
        EmployeeCode: this.seafarer.EmployeeCode || '',
        JobName: this.seafarer.JobName || '',
        Nationality: this.seafarer.Nationality || '',
        SponsorName: this.seafarer.SponsorName || '',
        VisaSponsorId: this.seafarer.VendorId,
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
        VisaExpiryDate: this.seafarer.VisaExpiryDate || '',
        SignedOffFromAShipDueToMedicalReason: this.seafarer.SignedOffFromAShipDueToMedicalReason || false,
        SignedOffFromAShipDueToMedicalReasonComment: this.seafarer.SignedOffFromAShipDueToMedicalReasonComment || '',
        UndergoneAnyMedicalOperation: this.seafarer.UndergoneAnyMedicalOperation || false,
        UndergoneAnyMedicalOperationComment: this.seafarer.UndergoneAnyMedicalOperationComment || '',
        DoctorConsultation: this.seafarer.DoctorConsultation || false,
        DoctorConsultationComment: this.seafarer.DoctorConsultationComment || '',
        HealthOrDisabilityProblem: this.seafarer.HealthOrDisabilityProblem || false,
        HealthOrDisabilityProblemComment: this.seafarer.HealthOrDisabilityProblemComment || '',
        InquiryOrInvolvedMaritimeAccident: this.seafarer.InquiryOrInvolvedMaritimeAccident || false,
        InquiryOrInvolvedMaritimeAccidentComment: this.seafarer.InquiryOrInvolvedMaritimeAccidentComment || '',
        LicenseSuspendedOrRevoked: this.seafarer.LicenseSuspendedOrRevoked || false,
        LicenseSuspendedOrRevokedComment: this.seafarer.LicenseSuspendedOrRevokedComment || ''
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
          this.saved.emit(res);
          this.close.emit(true);
        } else {
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

  dismiss() {
    this.close.emit(false);
  }
}






// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SeafarerService } from '../../../core/services/seafarer.service';



// @Component({
//   selector: 'app-seafarer-modal',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './seafarer-modal.component.html',
//   styleUrls: ['./seafarer-modal.component.scss']
// })
// export class SeafarerModalComponent {
//   @Input() seafarer: any = {};
//   @Output() close = new EventEmitter<boolean>();
//  @Output() saved = new EventEmitter<any>();

//  isSaving = false;
//   vendors: any[] = [];
//   sponsors: any[] = [];
//   employees: any[] = [];



// constructor( private seafarerService: SeafarerService) {}

//  ngOnInit() {
//     this.loadVendors();
//     this.loadSponsors();
//     this.loadEmployees();


//   if (!this.seafarer.EmpId) this.seafarer.EmpId = 0; // add new
//   }

//   loadEmployees() {
//   this.seafarerService.getEmployees().subscribe({
//     next: (res: any) => this.employees = res || [],
//     error: err => console.error('Error loading employees:', err)
//   });
// }

// loadSponsors() {
//   this.seafarerService.getVendors().subscribe({
//     next: (res: any) => this.sponsors = res || [],
//     error: err => console.error('Error loading sponsors:', err)
//   });
// }

//   loadVendors() {
//     this.seafarerService.getVendors().subscribe({
//       next: (res) => {
//         this.vendors = res || [];
//       },
//       error: (err) => {
//         console.error('Error loading vendors:', err);
//       }
//     });
//   }


//  save() {
//     // EmpId = 0 إذا add new
//     if (!this.seafarer.EmpId) this.seafarer.EmpId = 0;

//     // تأكد من وجود VendorId mandatory
//     if (!this.seafarer.VendorId) {
//       alert('Please select a Sponsor');
//       return;
//     }

//     this.isSaving = true;

//     const payload = {
//       entity: {
//         EmpId: 0,
//         EmployeeName: this.seafarer.EmployeeName || '',
//         EmployeeCode: this.seafarer.EmployeeCode || '',
//         JobName: this.seafarer.JobName || '',
//         Nationality: this.seafarer.Nationality || '',
//         SponsorName: this.seafarer.SponsorName || '',
//          VisaSponsorId: this.seafarer.VendorId,
//         BirthDate: this.seafarer.BirthDate || '',
//         Age: this.seafarer.Age || 0,
//         Phone: this.seafarer.Phone || '',
//         Mobile: this.seafarer.Mobile || '',
//         Email: this.seafarer.Email || '',
//         NationalID: this.seafarer.NationalID || '',
//         EmploymentDate: this.seafarer.EmploymentDate || '',
//         InsuranceDate: this.seafarer.InsuranceDate || '',
//         PassportExpiryDate: this.seafarer.PassportExpiryDate || '',
//         PassportNumber: this.seafarer.PassportNumber || '',
//         PassportIssueDate: this.seafarer.PassportIssueDate || '',
//         VisaIssueDate: this.seafarer.VisaIssueDate || '',
//         VisaExpiryDate: this.seafarer.VisaExpiryDate || ''
//       },
//       Qualifications: this.seafarer.Qualifications || [],
//       Certificates: this.seafarer.Certificates || [],
//       Languages: this.seafarer.Languages || [],
//       References: this.seafarer.References || [],
//       WorkExperiences: this.seafarer.WorkExperiences || []
//     };

//     this.seafarerService.saveSeafarer(payload).subscribe({
//       next: (res: any) => {
//         this.isSaving = false;
//         if (res.Result) {
//           this.saved.emit(res);
//           this.close.emit(true);
//         } else {
//           alert(res.ErrorMessage || 'Save failed');
//         }
//       },
//       error: (err) => {
//         this.isSaving = false;
//         console.error(err);
//         alert('Save failed: check console');
//       }
//     });
//   }



//   dismiss() { this.close.emit(false); }






