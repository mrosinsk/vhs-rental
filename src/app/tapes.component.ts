import { Component, OnInit } from '@angular/core';
import { Tape } from './tape'
import { TapeService } from './tape.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-tapes',
  templateUrl: './tapes.component.html',
  styleUrls: [`./tapes.component.css`],
  providers: [TapeService],

})
export class TapesComponent implements OnInit {
  pageName = 'Tapes to rent:';
  tapes: Tape[] = [];
  selectedTape = new Tape(0, '', '', 1, '', '', '', false);
  model = new Tape(0, '', '', 1, '', '', '', false);
  editModel = new Tape(0, '', '', 1, '', '', '', false);
  tmpTape = new Tape(0, '', '', 1, '', '', '', false);
  idSearch: number;
  titleSearch: String;
  relaseDateSearch: String;
  categorySearch: String;
  sortByField = "id";
  byIdDescending = false;
  byTitleDescending = false;
  byDateDescending = false;
  byCategoryDescending = false;

  constructor(
    private router: Router,
    private tapeService: TapeService, ) { }


  getTapes(): void {
    this.tapeService.getTapes().then(tapes => this.tapes = tapes)
      .then(tape => {
        this.tapes = this.tapes.filter(tape => tape.rent == false);

        //dowod na wiazanie dwustronne dual binding
        // this.titleSearch=this.titleSearch+"aaa";
        if (this.idSearch !== undefined && this.idSearch.toString() !== '') { this.tapes = this.tapes.filter(tape => tape.id == this.idSearch); }
        // indexOf -sprawdza, czy this.titleSearch zawiera się w tape.title i zwraca pozycje na ktorej znajduje sie szukany tekst lub -1 jesli nie znajdzie
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

  delete(tape: Tape): void {
    this.tapeService
      .delete(tape.id)
      .then(() => {
        this.tapes = this.tapes.filter(h => h.id !== tape.id);
        if (this.selectedTape === tape) { this.selectedTape = null; }
      });
  }

  createNewTape(): void {
    if (!this.model) { return; }
    this.tapeService.create(this.model.title)
      .then(tape => {
        tape.date = this.model.date;
        tape.category = this.model.category;
        tape.description = this.model.description;
        tape.rent = false;
        this.tapeService.update(tape);
        this.tapes.push(tape);
      });

  }

  //wypozyczenie filmu
  rent(tape: Tape): void {
    tape.rent = true;
    this.tapeService.update(tape)
      .then(tape => {
        this.getTapes();
      });
  }

  //edytowanie filmy
  editTape(): void {
    this.editModel.id = this.selectedTape.id;

    this.tapeService.update(this.selectedTape)
      .then(tape => {
        this.getTapes();
      });
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




