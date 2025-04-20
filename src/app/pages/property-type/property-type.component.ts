import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IApiResponseModel, IPropertyType } from '../../model/master';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({

  });
  gridData:IPropertyType[] = [];
  masterSrv = inject(MasterService);
  loading = false;


  constructor(private toastr: ToastrService) { this.initializeForm(); }

  ngOnInit() :void {
    this.getGridData();
  }

  getGridData() {
    this.masterSrv.getAllPropertyType().subscribe((res: IApiResponseModel) => {
      this.gridData = res.data;
    });
  }

  onSave() {
    this.loading = true;
    this.masterSrv.savePropertyType(this.form.value).subscribe((res: IApiResponseModel) => {
      this.loading = false;
      if (res.result) {
        this.toastr.success('Data Saved Successfully');
        this.getGridData();
        this.form.reset();  // Auto-clear the form
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  onUpdate() {
    this.loading = true;
    this.masterSrv.updatePropertyType(this.form.value).subscribe((res: IApiResponseModel) => {
      this.loading = false;
      if (res.result) {
        this.toastr.success('Data Updated Successfully');
        this.getGridData();
        this.form.reset();  // Auto-clear the form
      } else {
        this.toastr.error(res.message);
      }
    });
  }


  onEdit(item:IPropertyType){
    this.initializeForm(item);
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure to delete this record?");
    if (isDelete) {
      this.masterSrv.deletePropertyTypeById(id).subscribe((res: IApiResponseModel) => {
        if (res.result) {
          this.toastr.success('Data Deleted Successfully');
          this.getGridData();
          this.form.reset();  // Auto-clear the form
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }


  initializeForm(item?:IPropertyType) {
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId: 0),
      propertyType: new FormControl<string>(item ? item.propertyType :'',[Validators.required,Validators.minLength(3)])
    })
  }
}
