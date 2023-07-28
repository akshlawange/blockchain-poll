import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollForm } from '../types';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {
  pollForm: FormGroup;

  @Output() pollCreated:EventEmitter<PollForm> = new EventEmitter()


  constructor(private fb: FormBuilder) {
    this.pollForm = this.fb.group({
      question: this.fb.control('',[Validators.required]),
      image: this.fb.control('',[Validators.required]),
      op1 : this.fb.control('',[Validators.required]),
      op2: this.fb.control('',[Validators.required]),
      op3: this.fb.control('',[Validators.required])
    })
  }

  submiForm(): void{
    const formData: PollForm = {
      question:this.pollForm.get("question").value,
      image:this.pollForm.get("image").value,
      options:[
        this.pollForm.get("op1").value,
        this.pollForm.get("op2").value,
        this.pollForm.get("op3").value
      ]
    };
    this.pollCreated.emit(formData);
  }

  ngOnInit(): void {
  }

}
