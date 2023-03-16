import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, find, map, tap, filter } from 'rxjs/operators';

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
          tap(banaan => console.log(banaan)),
          
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }
    
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero[]>(this.FakeApiUrl).pipe(
      map(heroes =>   heroes.find(hero => hero.id === id)),
      tap(_ => this.log(`fetched hero id=${id}`)),
      filter(hero => hero !== undefined), // controleert held niet undefined is
      map(hero => hero as Hero), // converteer de gevonden held naar het type Hero
     catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * ERROR HANDLING 
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