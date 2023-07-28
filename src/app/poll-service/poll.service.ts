import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PollForm, Polls } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  getPolls(): Observable<Polls[]>{
    return of(
      [
        {
          id:1,
          question: '1. Which type of cold desert you like the most?',
          options: ['Icecream', 'Sorbet', 'Gelato', 'Yoghurt'],
          votes: [1, 4, 6, 3],
          voted: true,
          image:
            `https://recipes.net/wp-content/uploads/2020/03/ice-cream-gelato-sorbet-sherbet.jpg`,
        },
        {
          id:2,
          question: '2. Which type of cold desert you like the most?',
          options: ['Icecream', 'Sorbet', 'Gelato', 'Yoghurt'],
          votes: [1, 7, 4, 0],
          voted: false,
          image:
            `https://recipes.net/wp-content/uploads/2020/03/ice-cream-gelato-sorbet-sherbet.jpg`,
        }
      ]
    ).pipe(delay(2000))
  }

  vote(pollId:number,voteNumber:number){
    console.log('Vote() - ',pollId,voteNumber)
  }

  createPolls(poll:PollForm) {
    console.log('createPolls() - ',poll)
  }
}

