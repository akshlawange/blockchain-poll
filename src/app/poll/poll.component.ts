import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Input() question:string;
  @Input() votes:number[];
  @Input() voted:boolean;
  @Input() image:string;

  numberOfVotes : number;
  constructor() {

  }

  ngOnInit(): void {
    if(this.votes.length){
      this.numberOfVotes = this.votes.reduce((acc,curr) => {
        return acc+= curr;
      })
    }
  }

}
