import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiResponseModel, IProperty, Site } from '../../model/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  sites$: Observable<Site[]> = new Observable<Site[]>();
  masterSrv = inject(MasterService);
  siteId:number = 0;
  propertyList: IProperty[] = [];
  bookingList: any[] = [];
  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;

  constructor(private toastr: ToastrService) {
    this.initiaLizeFporm();
    this.sites$ = this.masterSrv.getAllSites().pipe(
      map((res:IApiResponseModel) => {
        return res.data;
      })
    )
  }

  initiaLizeFporm(){
    this.bookingForm =  new FormGroup({
      bookingId:new FormControl(0),
      propertyId:new FormControl(this.currentPropertyId),
      bookindDate:new FormControl(''),
      bookingRate:new FormControl(0),
      totalAmont:new FormControl(0),
      custId:new FormControl(0),
      name:new FormControl(''),
      mobile:new FormControl(''),
      emailid:new FormControl(''),
      address:new FormControl('')
    })
  }

  getProperties(event:Event){
    this.masterSrv.getAllPropertyBySiteId(this.siteId).subscribe((res:IApiResponseModel) => {
      this.propertyList = res.data;
    })
  }

  checkIfPropertyAvailable(propertyId: number) {
    const record=   this.bookingList.find(m=>m.propertyId == propertyId);
    if(record != undefined) {
      return record;
    } else {
      return null;
    }
  }

  openModal(data: IProperty) {
    this.currentPropertyId =  data.propertyId;
    this.initiaLizeFporm();
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block'
    }
  }
  closeModal() {
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }

  getBookignBYSiteId() {
    debugger;
    this.masterSrv. getAllPropertyBookingBySiteId(this.siteId).subscribe((res: IApiResponseModel) => {
      this.bookingList = res.data;
    })
  }
  doBooking() {
    this.masterSrv.onSaveBooking(this.bookingForm.value).subscribe((res: IApiResponseModel)=>{
      if(res.result) {
        this.toastr.success('Data Saved Successfully');
        this.getBookignBYSiteId()
      } else {
        this.toastr.error(res.message);
      }
    })
  }


}
