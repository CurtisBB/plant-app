import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Plant } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPlantList(
    order: string,
    search?: string
  ): Observable<APIResponse<Plant>> {
   let params = new HttpParams().set('order', order);

   if (search) {
     params = new HttpParams().set('order', order).set('q', search);
   }

   return this.http.get<APIResponse<Plant>>(`${env.BASE_URL}/api/species-list`, {
     params: params,
   });
 }

 getPlantDetails(id: string): Observable<Plant> {
  const plantInfoRequest = this.http.get<Plant>(`${env.BASE_URL}/api/species/details/${id}`);

  return plantInfoRequest
 }
}
