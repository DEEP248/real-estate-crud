import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponseModel, IPropertyType, Site } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  getAllPropertyType():Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>(environment.API_URL + 'GetAllPropertyType');
  }

  savePropertyType(obj:IPropertyType):Observable<IApiResponseModel>{
    const newObj = [obj];
    return this.http.post<IApiResponseModel>(environment.API_URL + 'AddPropertyType', newObj);
  }

  updatePropertyType(obj:IPropertyType):Observable<IApiResponseModel>{
    return this.http.put<IApiResponseModel>(environment.API_URL + 'UpdatePropertyType', obj);
  }

  deletePropertyTypeById(id: number):Observable<IApiResponseModel> {
    return this.http.delete<IApiResponseModel>(environment.API_URL + 'DeletePropertyTypeById?id='+id)
  }

  // ------------------------------------------------
  saveSite(obj: Site):Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(environment.API_URL + 'AddSites',obj)
  }

  getAllSites():Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + 'GetAllSites')
  }

  updateSites(obj: Site):Observable<IApiResponseModel> {
    return this.http.put<IApiResponseModel>(environment.API_URL + 'UpdateSites',obj)
  }

  deleteSitesTypeById(id: number):Observable<IApiResponseModel> {
    return this.http.delete<IApiResponseModel>(environment.API_URL + 'DeleteSitesById?id='+id)
  }

  saveProperty(obj: Site):Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(environment.API_URL + 'AddPropertyMasters',obj)
  }

  getAllPropertyMasters():Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + 'GetAllPropertyMasters')
  }

  getAllPropertyBySiteId(siteid: number):Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + 'GetAllPropertyBySiteId?siteid='+siteid)
  }

  onSaveBooking(obj: Site):Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(environment.API_URL + 'AddPropertyBooking',obj)
  }


  getAllPropertyBookingBySiteId(siteid: number):Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid='+siteid)
  }

}
