import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  getAllDevice(page:number, item:number, order:string): Observable<any>{
    let params = new HttpParams()
    .set("pageIndex",page.toString())
    .set("order", order)
    .set('showItem', item.toString());

    let headers = new HttpHeaders();
    headers.append('accept','application/json');
    //headers.append('Content-Type', 'application/json');


    return this.http.get<any>('https://localhost:5001/api/device', {params : params, headers: headers} );
  }

  getDevice(id:string){
    return this.http.get<any>('https://localhost:5001/api/device/'+id);
  }

  createDevice(device:any){
    return this.http.post<any>('https://localhost:5001/api/device', device);
  }

  updateDevice(device:any){
    return this.http.put<any>('https://localhost:5001/api/device/'+device.id, device);
  }

  activeDeactiveDevice(device:any){
    return this.http.patch<any>('https://localhost:5001/api/device/'+device.id, device);
  }

  deleteDevice(id:any){
    return this.http.delete<any>('https://localhost:5001/api/device/'+id);
  }

}
