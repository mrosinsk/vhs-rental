import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TapesComponent } from './tapes.component';
import { AppModule } from './app.module';
import { HttpModule, Http } from "@angular/http";
import { ComponentFixtureAutoDetect, fakeAsync, tick } from '@angular/core/testing';
import { TapeService } from './tape.service';
import { FormsModule, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Tape } from './tape';

describe('TapesComponent (templateUrl)', function () {

  let comp: TapesComponent;
  let fixture: ComponentFixture<TapesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let tapeServiceStub = {
    getTapes() {
      return Promise.resolve([
        { id: 1, title: 'Rambo I', date: '1982.01.01', rating: 5, description: 'desc', photo: './app/photo/rambo_first_blood_original_poster_1982.jpg', category: 'animowany', rent: false },
        { id: 2, title: 'Rambo II', date: '1985.01.03', rating: 4, description: 'desc', photo: './app/photo/ramboII.jpg', category: 'komedia', rent: false },
        { id: 3, title: 'Rambo III', date: '1988.05.04', rating: 3, description: 'desc', photo: './app/photo/ramboIII.jpg', category: 'kryminał', rent: false },
        { id: 4, title: 'Terminator I', date: '1964.06.06', rating: 2, description: 'desc', photo: './app/photo/terminatorI.jpg', category: 'kryminał', rent: true },
        { id: 5, title: 'Terminator II', date: '1991.07.07', rating: 1, description: 'desc', photo: './app/photo/terminatorII.jpg', category: 'komedia', rent: false },
        { id: 6, title: 'Terminator III', date: '2003.08.08', rating: 5, description: 'desc', photo: './app/photo/terminatorIII.jpg', category: 'komedia', rent: true },
        { id: 7, title: 'Obcy 1', date: '1979.09.09', rating: 4, description: 'desc', photo: './app/photo/obcy1.jpg', category: 'horror', rent: false },
        { id: 8, title: 'Obcy 2', date: '1986.10.10', rating: 3, description: 'desc', photo: './app/photo/obcy2.jpg', category: 'komedia', rent: true },
        { id: 9, title: 'Obcy 3', date: '1992.11.11', rating: 2, description: 'desc', photo: './app/photo/obcy3.jpg', category: 'horror', rent: true },
        { id: 10, title: 'Szczęki', date: '1975.12.12', rating: 5, description: 'desc', photo: './app/photo/szczeki.jpg', category: 'komedia', rent: true },
        { id: 11, title: 'Gwiezdne wojny IV', date: '1977.02.20', rating: 5, description: 'desc', photo: './app/photo/gwiezdnewojnyIV.jpg', category: 'komedia', rent: true }
      ])
    },

    delete(id: number) {
      return Promise.resolve(null)
    },

    create(title: string) {
      let newTape = new Tape(12, 'Jaś Fasola', '1979.09.09', 4, 'desc', './app/photo/obcy1.jpg', 'horror', false);
      return Promise.resolve(newTape)
    },

    update(tape: Tape) {
      return Promise.resolve(null)
    },

  };



  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [TapesComponent],
    })
      .overrideComponent(TapesComponent, {
        set: {
          templateUrl: '/base/src/app/tapes.component.html',
          styleUrls: ['/base/src/app/tapes.component.css']
        }
      })
      .overrideComponent(TapesComponent, {
        add: {
          providers: [{ provide: TapeService, useValue: tapeServiceStub }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapesComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
    comp.sortByField = '';
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <h2> text', () => {
    fixture.detectChanges();
    const h2 = de.nativeElement;
    expect(h2.innerText).toMatch(comp.pageName,
      '<h2> should say something about "rent"');
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    const h2 = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.pageName);
  });

  it('should display a different test title', () => {
    comp.pageName = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

  it('should change value of sortByField and byIdDescending', () => {
    comp.byId();
    expect(comp.sortByField).toBe('id');
    expect(comp.byIdDescending).toBe(true);
  });

  it('sortById() should return sorted descending list of tape to rent', fakeAsync(() => {
    comp.byId();
    comp.sortById();
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes[0].id).toBe(7);
    expect(comp.tapes[0].title).toBe('Obcy 1');
  }));

  it('should change value of sortByField and byCategoryDescending', () => {
    comp.byCategory();
    expect(comp.sortByField).toBe('category');
    expect(comp.byCategoryDescending).toBe(true);
  });

  it('sortByCategory() should return sorted descending list of tape to rent', fakeAsync(() => {
    comp.byCategory();
    comp.sortByCategory();
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes[0].id).toBe(3);
    expect(comp.tapes[0].title).toBe('Rambo III');
    expect(comp.tapes[0].category).toBe('kryminał');
  }));

  it('should change value of sortByField and byDateDescending', () => {
    comp.byDate();
    expect(comp.sortByField).toBe('date');
    expect(comp.byDateDescending).toBe(true);
  });

  it('sortByDate() should return sorted descending list of tape to rent', fakeAsync(() => {
    comp.byDate();
    comp.sortByDate();
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes[0].id).toBe(5);
    expect(comp.tapes[0].title).toBe('Terminator II');
    expect(comp.tapes[0].date).toBe('1991.07.07');
  }));

  it('should change value of sortByField and byDateDescending', () => {
    comp.byTitle();
    expect(comp.sortByField).toBe('title');
    expect(comp.byTitleDescending).toBe(true);
  });

  it('sortByTitle() should return sorted descending list of tape to rent', fakeAsync(() => {
    comp.byTitle();
    comp.sortByTitle();
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes[0].id).toBe(5);
    expect(comp.tapes[0].title).toBe('Terminator II');
  }));

  it('getTapes() should return first id from tapes to rent', fakeAsync(() => {
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes[0].id).toBe(1);
  }));

  it('getTapes() should return length tapes list to rent', fakeAsync(() => {
    comp.getTapes();
    tick();
    fixture.detectChanges();
    expect(comp.tapes.length).toBe(5);
  }));

  it('ngOnInit() should return length tapes list to rent', fakeAsync(() => {
    comp.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(comp.tapes.length).toBe(5);
  }));

  it('onSelect() should return selectedTape', fakeAsync(() => {
    let tape = new Tape(7, 'Obcy 1', '1979.09.09', 4, 'desc', './app/photo/obcy1.jpg', 'horror', false);
    comp.onSelect(tape);
    tick();
    fixture.detectChanges();
    expect(comp.selectedTape.title).toBe('Obcy 1');
  }));

  it('delete() should delete tape', fakeAsync(() => {
    comp.ngOnInit();
    tick();
    let tapesListLenthBefore = comp.tapes.length;

    comp.delete(comp.tapes[0]);
    tick();
    fixture.detectChanges();
    expect(comp.tapes.length).toBe(tapesListLenthBefore - 1);
  }));

  it('createNewTape() should add new tape', fakeAsync(() => {
    comp.ngOnInit();
    tick();
    let tapesListLenthBefore = comp.tapes.length;
    let newTape = new Tape(12, 'Jaś Fasola', '1979.09.09', 4, 'desc', './app/photo/obcy1.jpg', 'horror', false);
    comp.model = newTape;
    comp.createNewTape();
    tick();
    fixture.detectChanges();

    expect(comp.tapes.length).toBe(tapesListLenthBefore + 1);
  }));

  it('editTape() should edit tape', fakeAsync(() => {
    comp.ngOnInit();
    tick();
    comp.selectedTape = new Tape(90, 'Obcy 1', '1979.09.09', 4, 'desc', './app/photo/obcy1.jpg', 'horror', false);

    comp.editTape();
    tick();
    fixture.detectChanges();
    expect(comp.editModel.id).toBe(90);
  }));

});


describe('TapesComponent test for rent method', function () {

  let comp: TapesComponent;
  let fixture: ComponentFixture<TapesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let tapeServiceStub = {
    getTapes() {
      return Promise.resolve([
        { id: 1, title: 'Rambo I', date: '1982.01.01', rating: 5, description: 'desc', photo: './app/photo/rambo_first_blood_original_poster_1982.jpg', category: 'animowany', rent: true },
        { id: 2, title: 'Rambo II', date: '1985.01.03', rating: 4, description: 'desc', photo: './app/photo/ramboII.jpg', category: 'komedia', rent: false },
        { id: 3, title: 'Rambo III', date: '1988.05.04', rating: 3, description: 'desc', photo: './app/photo/ramboIII.jpg', category: 'kryminał', rent: false },
        { id: 4, title: 'Terminator I', date: '1964.06.06', rating: 2, description: 'desc', photo: './app/photo/terminatorI.jpg', category: 'kryminał', rent: true },
        { id: 5, title: 'Terminator II', date: '1991.07.07', rating: 1, description: 'desc', photo: './app/photo/terminatorII.jpg', category: 'komedia', rent: false },
        { id: 6, title: 'Terminator III', date: '2003.08.08', rating: 5, description: 'desc', photo: './app/photo/terminatorIII.jpg', category: 'komedia', rent: true },
        { id: 7, title: 'Obcy 1', date: '1979.09.09', rating: 4, description: 'desc', photo: './app/photo/obcy1.jpg', category: 'horror', rent: false },
        { id: 8, title: 'Obcy 2', date: '1986.10.10', rating: 3, description: 'desc', photo: './app/photo/obcy2.jpg', category: 'komedia', rent: true },
        { id: 9, title: 'Obcy 3', date: '1992.11.11', rating: 2, description: 'desc', photo: './app/photo/obcy3.jpg', category: 'horror', rent: true },
        { id: 10, title: 'Szczęki', date: '1975.12.12', rating: 5, description: 'desc', photo: './app/photo/szczeki.jpg', category: 'komedia', rent: true },
        { id: 11, title: 'Gwiezdne wojny IV', date: '1977.02.20', rating: 5, description: 'desc', photo: './app/photo/gwiezdnewojnyIV.jpg', category: 'komedia', rent: true }
      ])
    },

    update(tape: Tape) {
      return Promise.resolve(null)
    },

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [TapesComponent], 
    })
      .overrideComponent(TapesComponent, {
        set: {
          templateUrl: '/base/src/app/tapes.component.html',
          styleUrls: ['/base/src/app/tapes.component.css']
        }
      })
      .overrideComponent(TapesComponent, {
        add: {
          providers: [{ provide: TapeService, useValue: tapeServiceStub }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapesComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
  });

  it('should change value of rent to be true and delete from tape list to rent', fakeAsync(() => {
    comp.ngOnInit();
    tick();
    let tapeToRent = new Tape(1, 'Rambo I', '1982.01.01', 5, 'desc', './app/photo/rambo_first_blood_original_poster_1982.jpg', 'animowany', false);

    comp.rent(tapeToRent);
    tick();
    fixture.detectChanges();
    expect(comp.tapes.length).toBe(4);
  }));

});



