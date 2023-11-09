import { Component } from '@angular/core';
import { PollForm, PollVote, Polls } from './types';
import { PollService } from './poll-service/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showForm = false;
  activePoll:Polls = null;
  polls = this.ps.getPolls();

  constructor(private ps:PollService){}

  ngOnInit() {
    this.ps.onEvent('PollCreated').subscribe(() => {
      this.polls = this.ps.getPolls();
    });
  }

  setActivePoll(poll){
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    },100)
  }

  handlePollCreated(poll:PollForm){
    this.ps.createPolls(poll);
  }

  handlePollVoted(pollVoted){
    this.ps.vote(pollVoted.id,pollVoted.votes)
  }
}
