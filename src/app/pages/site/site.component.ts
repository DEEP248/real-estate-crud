import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IPropertyType, Site, IApiResponseModel, IProperty } from '../../model/master';
import { map, Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule,ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css',
})
export class SiteComponent implements OnInit {
  isFormView = signal<boolean>(false);
  @ViewChild('propertyModel') modal: ElementRef | undefined;
  formobj: Site = new Site();
  loading = false;
  propertyType$: Observable<IPropertyType[]> = new Observable<
    IPropertyType[]
  >();
  propertyForm : FormGroup = new FormGroup({});
  mastersrv = inject(MasterService);
  gridData: Site[] = [];
  propertyList: IProperty[] = [];
  currentSiteId : number = 0;
  constructor(private toastr: ToastrService) {
    this.propertyType$ = this.mastersrv.getAllPropertyType().pipe(
      map((item: IApiResponseModel) => {
        return item.data;
      })
    );
    this.intializeForm();
  }

  toggleFormView() {
    this.isFormView.set(!this.isFormView());
  }

  intializeForm() {
    this.propertyForm = new FormGroup({
      propertyId:new FormControl(0),
      propertyNo:new FormControl(''),
      facing:new FormControl(''),
      totalArea:new FormControl(''),
      rate:new FormControl(''),
      siteId:new FormControl(this.currentSiteId)
    });
  }

  ngOnInit(): void {
    this.getGridData();
  }

  getGridData() {
    this.mastersrv.getAllSites().subscribe((res: IApiResponseModel) => {
      this.gridData = res.data;
    });
  }

  onSave() {
    this.loading = true;
    this.mastersrv
      .saveSite(this.formobj)
      .subscribe((res: IApiResponseModel) => {
        this.loading = false;
        if (res.result) {
          this.toastr.success('Site Saved Successfully');
          this.getGridData();
          this.toggleFormView();
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  onEdit(data: Site) {
    this.formobj = data;
    this.toggleFormView();
  }

  onUpdate() {
    this.loading = true;
    this.mastersrv
      .updateSites(this.formobj)
      .subscribe((res: IApiResponseModel) => {
        this.loading = false;
        if (res.result) {
          this.toastr.success('Site Updated Successfully');
          this.getGridData();
          this.toggleFormView();
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  onDelete(data: Site) {
    const isDelete = confirm('Are you sure you want to delete this site?');
    if (isDelete) {
      this.mastersrv
        .deleteSitesTypeById(data.siteId)
        .subscribe((res: IApiResponseModel) => {
          if (res.result) {
            this.toastr.success('Site Deleted Successfully');
            this.getGridData();
          } else {
            this.toastr.error(res.message);
          }
        });
    }
  }

  openModal(data:Site) {
    this.currentSiteId = data.siteId;
    this.intializeForm();
    this.getProperties();
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    if(this.modal) {
      this.modal.nativeElement.style.display ='none'
    }
  }

  onSaveProperty() {
    this.loading = true;
    this.mastersrv
      .saveProperty(this.propertyForm.value)
      .subscribe((res: IApiResponseModel) => {
        this.loading = false;
        if (res.result) {
          this.toastr.success('Property Saved Successfully');
          this.getProperties();
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  getProperties() {
    this.mastersrv.getAllPropertyMasters().subscribe((res: IApiResponseModel)=>{
       this.propertyList =  res.data.filter((m:any)=>m.siteId ==  this.currentSiteId);
    })
  }
}
