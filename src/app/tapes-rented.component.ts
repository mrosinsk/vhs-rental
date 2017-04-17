import { Component, OnInit } from '@angular/core';
import { Tape } from './tape';
import { Payment } from './payment';
import { TapeService } from './tape.service';
import { Router } from '@angular/router';


@Component({
  selector: 'my-tapes-rented',
  templateUrl: './tapes-rented.component.html',
  styleUrls: [`./tapes.component.css`],
  providers: [TapeService],

})
export class TapesRentedComponent implements OnInit {
  pageName = 'VHS Movies listing';
  tapes: Tape[] = [];
  selectedTape = new Tape(0, '', '', 0, '', '', '', false);
  model = new Tape(0, '', '', 0, '', '', '', false);
  editModel = new Tape(0, '', '', 0, '', '', '', false);
  tmpTape = new Tape(0, '', '', 0, '', '', '', false);
  idSearch: number;
  titleSearch: String;
  relaseDateSearch: String;
  categorySearch: String;
  sortByField = "id";
  byIdDescending = false;
  byTitleDescending = false;
  byDateDescending = false;
  byCategoryDescending = false;
  payment = new Payment(false, false, false, 0);

  constructor(
    private router: Router,
    private tapeService: TapeService, ) { }


  getTapes(): void {
    this.tapeService.getTapes().then(tapes => this.tapes = tapes)
      .then(tape => {
        this.tapes = this.tapes.filter(tape => tape.rent == true);
        if (this.idSearch !== undefined && this.idSearch.toString() !== '') { this.tapes = this.tapes.filter(tape => tape.id == this.idSearch); }
        if (this.titleSearch !== undefined && this.titleSearch !== '') { this.tapes = this.tapes.filter(tape => tape.title.toUpperCase().toString().indexOf(this.titleSearch.toUpperCase().toString()) != -1); }
        if (this.relaseDateSearch !== undefined && this.relaseDateSearch !== '') { this.tapes = this.tapes.filter(tape => tape.date.indexOf(this.relaseDateSearch.toString()) != -1); }
        if (this.categorySearch !== undefined && this.categorySearch !== '') { this.tapes = this.tapes.filter(tape => tape.category.toUpperCase().toString().indexOf(this.categorySearch.toUpperCase().toString()) != -1); }
        if (this.sortByField == "id") this.sortById();
        if (this.sortByField == "title") this.sortByTitle();
        if (this.sortByField == "date") this.sortByDate();
        if (this.sortByField == "category") this.sortByCategory();
      });
  }


  ngOnInit(): void {
    this.getTapes();
  }

  onSelect(tape: Tape): void {
    this.selectedTape = tape;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTape.id]);
  }

  //oddanie filmu
  returnTape(tape: Tape): void {
    this.payment.sum = 10;
    tape.rent = false;
    this.tapeService.update(tape)
      .then(tape => {
        this.getTapes();
      });
  }

  //naliczenie opłaty
  calculate() {
    this.payment.sum = 10;
    if (this.payment.broken == true) { this.payment.sum += 50; }
    if (this.payment.rewind == true) { this.payment.sum += 5; }
    if (this.payment.delay == true) { this.payment.sum += 10; }
  }

  byId() {
    this.sortByField = "id";
    this.byIdDescending = !this.byIdDescending;
  }

  sortById() {
    var tmpTape: Tape;
    for (let i = 0; i < this.tapes.length; i++) {
      for (let k = i + 1; k < this.tapes.length; k++) {
        if (this.tapes[i].id > this.tapes[k].id && this.byIdDescending == false) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
        if (this.tapes[i].id < this.tapes[k].id && this.byIdDescending == true) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
      }
    }
  }

  byTitle() {
    this.sortByField = "title";
    this.byTitleDescending = !this.byTitleDescending;
  }

  sortByTitle() {
    var tmpTape: Tape;
    for (let i = 0; i < this.tapes.length; i++) {
      for (let k = i + 1; k < this.tapes.length; k++) {
        if (this.tapes[i].title > this.tapes[k].title && this.byTitleDescending == false) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
        if (this.tapes[i].title < this.tapes[k].title && this.byTitleDescending == true) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
      }
    }
  }

  byDate() {
    this.sortByField = "date";
    this.byDateDescending = !this.byDateDescending;
  }

  sortByDate() {
    var tmpTape: Tape;
    for (let i = 0; i < this.tapes.length; i++) {
      for (let k = i + 1; k < this.tapes.length; k++) {
        if (this.tapes[i].date > this.tapes[k].date && this.byDateDescending == false) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
        if (this.tapes[i].date < this.tapes[k].date && this.byDateDescending == true) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
      }
    }
  }

  byCategory() {
    this.sortByField = "category";
    this.byCategoryDescending = !this.byCategoryDescending;
  }

  sortByCategory() {
    var tmpTape: Tape;
    for (let i = 0; i < this.tapes.length; i++) {
      for (let k = i + 1; k < this.tapes.length; k++) {
        if (this.tapes[i].category > this.tapes[k].category && this.byCategoryDescending == false) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
        if (this.tapes[i].category < this.tapes[k].category && this.byCategoryDescending == true) {
          tmpTape = this.tapes[i];
          this.tapes[i] = this.tapes[k];
          this.tapes[k] = tmpTape;
        }
      }
    }
  }

}




