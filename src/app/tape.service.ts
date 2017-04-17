import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tape } from './tape';

@Injectable()
export class TapeService {
    private tapesUrl = 'api/tapes'; 

    constructor(private http: Http) { }

    getTapes(): Promise<Tape[]> {
        return this.http.get(this.tapesUrl)
            .toPromise()
            .then(response => response.json().data as Tape[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    getTape(id: number): Promise<Tape> {
        const url = `${this.tapesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Tape)
            .catch(this.handleError);
    }


    private headers = new Headers({ 'Content-Type': 'application/json' });

    update(tape: Tape): Promise<Tape> {
        const url = `${this.tapesUrl}/${tape.id}`;
        console.log(tape.id);
        return this.http
            .put(url, JSON.stringify(tape), { headers: this.headers })
            .toPromise()
            .then(() => tape)
            .catch(this.handleError);
    }

    create(title: string): Promise<Tape> {
        return this.http
            .post(this.tapesUrl, JSON.stringify({ title: title }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Tape)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.tapesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }



}



