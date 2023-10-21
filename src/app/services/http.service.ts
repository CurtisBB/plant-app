import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Plant } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPlantList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Plant>> {
   let params = new HttpParams().set('ordering', ordering);

   if (search) {
     params = new HttpParams().set('ordering', ordering).set('search', search);
   }

   return this.http.get<APIResponse<Plant>>(`${env.BASE_URL}/api/species-list?key=${env.key}`, {
     params: params,
   });
 }
}
