import { Component, Input, OnInit,AfterViewInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../types';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss'],
})
export class PollVoteComponent implements AfterViewInit  {
  @Input() voted: boolean;
  @Input() options: string[];
  @Input() results: number[];
  @Input() question: string;
  @Input() id:number;
  @Output() voteSubmitted:EventEmitter<PollVote> = new EventEmitter();

  voteForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      selected: this.fb.control('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    if (this.voted) {
      this.generateCharts();
    }
  }

  submitOptions() {
    const voteData: PollVote = {
      id:this.id,
      vote:this.voteForm.get("selected").value
    }
    this.voteSubmitted.emit(voteData);
  }

  generateCharts() {
    const chartOptions: ApexCharts.ApexOptions = {
      series: [
        {
          name: 'basic',
          data: this.results,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: this.options,
      },
    };

    const chart = new ApexCharts(
      document.getElementById('poll-results'),
      chartOptions
    )
    chart.render();
  }
}
