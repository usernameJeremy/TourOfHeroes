import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private FakeApiUrl ='https://ontwikkeling.online-planning.nl/fakeApi.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.FakeApiUrl)
        .pipe(
          tap(heroes => console.log(heroes)),
          catchError(this.handleError<Hero[]>('getHeroes', []))
         
        );
    }
    
   

     /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.FakeApiUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  
  // }
  /**
   * ERROR HANDLING 
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}