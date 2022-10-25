import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { Global } from './global';

@Injectable() 
export class ProyectoService{
    public url: string;
    
    constructor(
        private _http: HttpClient 
    ) {
        this.url = Global.url
    }

    testService() {
        return 'Probando el servivio de angular'
    }

    saveProject(proyecto: Proyecto): Observable<any>{
        let params = JSON.stringify(proyecto);
        let headers = new HttpHeaders().set('Content-type', 'application/json')

        return this._http.post(this.url+'save-proyecto', params, {headers: headers})
    }
}