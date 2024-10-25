import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Albergue } from '../models/Albergue';
import { map, Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AlbergueService {
  private url=`${base_url}/albergues`
  private listaCambio = new Subject<Albergue[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Albergue[]>(this.url).pipe(
      map((albergues: Albergue[]) => albergues.sort((a, b) => a.idAlbergue - b.idAlbergue) // Orden ascendente por nombre
      )
    );
  }
  insert(albergue:Albergue){
    return this.http.post(this.url, albergue)
  }

  setList(listaCambio: Albergue[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Albergue>(`${this.url}/${id}`)
  }
  update(a:Albergue){
    return this.http.put(this.url, a)
  }
}
