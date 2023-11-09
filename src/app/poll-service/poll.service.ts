import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PollForm, Polls } from '../types';
import { Web3Service } from '../blockchain/web3.service';
import { fromAscii,toAscii }  from 'web3-utils';
@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls(): Promise<Polls[]> {
    const polls: Polls[] = [];
    const totalPolls = await this.web3.callFunction("getTotalPolls");
    const acc = await this.web3.getAccount();
    const voter = this.web3.callFunction("getVoter",acc);
    const normalizedVoter = this.normalizeVoter(voter);

    for (let i = 0; i< parseInt(totalPolls); i++){
      const poll = await this.web3.callFunction("getPoll",i);
      const normalizedPoll = this.normalizePoll(poll,normalizedVoter);
      polls.push(normalizedPoll);
    }

    return polls;
  }

  vote(pollId: number, voteNumber: number) {
    console.log('Vote() - ', pollId, voteNumber);
    this.web3.executeTransaction('vote', pollId, voteNumber);
  }

  createPolls(poll: PollForm) {
    console.log('createPolls() - ', poll);
    this.web3.executeTransaction(
      'createPoll',
      poll.question,
      poll.image || '',
      poll.options.map(opt => fromAscii(opt))
    );
  }

  private normalizeVoter(voter){
    return({
      id:voter[0],
      votedIds:voter[1]
    })
  }

  private normalizePoll(pollRaw,voterNormalized):Polls{
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      image: pollRaw[2],
      votes: pollRaw[3].map((vote) => parseInt(vote)),
      options: pollRaw[4].map((opt) => toAscii(opt).replace(/\u0000/g, '')),
      voted:
      voterNormalized.votedIds.length &&
      voterNormalized.votedIds.find((votedId) => votedId === parseInt(pollRaw[0])) !=
          undefined,
    };
  }

  onEvent(name:string){
    return this.web3.onEvents(name);
  }
}


