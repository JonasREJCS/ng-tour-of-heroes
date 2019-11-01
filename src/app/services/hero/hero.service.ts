import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero';
import { HEROES } from '../../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../services/message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:8080/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    this.log('HeroService => fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.log(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
