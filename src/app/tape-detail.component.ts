import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


import { Tape } from './tape'
import { TapeService } from './tape.service'

@Component({
  selector: 'tape-detail',
  templateUrl: './tape-detail.component.html',
})
export class TapeDetailComponent implements OnInit {
 
  @Input() tape: Tape;
  constructor(
    private tapeService: TapeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
 
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.tapeService.getTape(+params['id']))
      .subscribe(tape => this.tape = tape);
  }
 
  goBack(): void {
    this.location.back();
  }

}