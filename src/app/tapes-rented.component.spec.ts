import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TapesRentedComponent } from './tapes-rented.component';
import { AppModule } from './app.module';
import { HttpModule, Http } from "@angular/http";
import { ComponentFixtureAutoDetect, fakeAsync, tick } from '@angular/core/testing';
import { TapeService } from './tape.service';
import { FormsModule, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Tape } from './tape';
import { Payment } from "./payment";

describe('TapesRentedComponent (templateUrl)', function () {

    let comp: TapesRentedComponent;
    let fixture: ComponentFixture<TapesRentedComponent>;
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
            declarations: [TapesRentedComponent],
        })
            .overrideComponent(TapesRentedComponent, {
                set: {
                    templateUrl: '/base/src/app/tapes.component.html',
                    styleUrls: ['/base/src/app/tapes.component.css']
                }
            })
            .overrideComponent(TapesRentedComponent, {
                add: {
                    providers: [{ provide: TapeService, useValue: tapeServiceStub }]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TapesRentedComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h2'));
        el = de.nativeElement;
        comp.sortByField = '';
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should change value of sortByField and byIdDescending', () => {
        comp.byId();
        expect(comp.sortByField).toBe('id');
        expect(comp.byIdDescending).toBe(true);
    });

    it('sortById() should return sorted descending list of tapes rented', fakeAsync(() => {
        comp.byId();
        comp.sortById();
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes[0].id).toBe(11);
        expect(comp.tapes[0].title).toBe('Gwiezdne wojny IV');
    }));

    it('should change value of sortByField and byCategoryDescending', () => {
        comp.byCategory();
        expect(comp.sortByField).toBe('category');
        expect(comp.byCategoryDescending).toBe(true);
    });

    it('sortByCategory() should return sorted descending list of tapes rented', fakeAsync(() => {
        comp.byCategory();
        comp.sortByCategory();
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes[0].id).toBe(4);
        expect(comp.tapes[0].title).toBe('Terminator I');
        expect(comp.tapes[0].category).toBe('kryminał');
    }));

    it('should change value of sortByField and byDateDescending', () => {
        comp.byDate();
        expect(comp.sortByField).toBe('date');
        expect(comp.byDateDescending).toBe(true);
    });

    it('sortByDate() should return sorted descending list of tapes rented', fakeAsync(() => {
        comp.byDate();
        comp.sortByDate();
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes[0].id).toBe(6);
        expect(comp.tapes[0].title).toBe('Terminator III');
        expect(comp.tapes[0].date).toBe('2003.08.08');
    }));

    it('should change value of sortByField and byDateDescending', () => {
        comp.byTitle();
        expect(comp.sortByField).toBe('title');
        expect(comp.byTitleDescending).toBe(true);
    });

    it('sortByTitle() should return sorted descending list of tapes rented', fakeAsync(() => {
        comp.byTitle();
        comp.sortByTitle();
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes[0].id).toBe(6);
        expect(comp.tapes[0].title).toBe('Terminator III');
    }));

    it('getTapes() should return first id from tapes rented', fakeAsync(() => {
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes[0].id).toBe(4);
    }));

    it('getTapes() should return length tapes list rented', fakeAsync(() => {
        comp.getTapes();
        tick();
        fixture.detectChanges();
        expect(comp.tapes.length).toBe(6);
    }));

    it('ngOnInit() should return length tapes list rented', fakeAsync(() => {
        comp.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(comp.tapes.length).toBe(6);
    }));

    it('onSelect() should return selectedTape', fakeAsync(() => {
        let tape = new Tape(4, 'Terminator I', '1964.06.06', 2, 'desc', './app/photo/terminatorI.jpg', 'kryminał', true);
        comp.onSelect(tape);
        tick();
        fixture.detectChanges();
        expect(comp.selectedTape.title).toBe('Terminator I');
    }));

    it('calculate() should return payment.sum = 10$', fakeAsync(() => {
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(10);
    }));

    it('calculate() should return payment.sum = 60$', fakeAsync(() => {
        comp.payment.broken = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(60);
    }));

    it('calculate() should return payment.sum = 15$', fakeAsync(() => {
        comp.payment.rewind = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(15);
    }));

    it('calculate() should return payment.sum = 20$', fakeAsync(() => {
        comp.payment.delay = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(20);
    }));

    it('calculate() should return payment.sum = 75$', fakeAsync(() => {
        comp.payment.broken = true;
        comp.payment.rewind = true;
        comp.payment.delay = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(75);
    }));

    it('calculate() should return payment.sum = 65$', fakeAsync(() => {
        comp.payment.broken = true;
        comp.payment.rewind = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(65);
    }));

    it('calculate() should return payment.sum = 70$', fakeAsync(() => {
        comp.payment.broken = true;
        comp.payment.delay = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(70);
    }));

    it('calculate() should return payment.sum = 25$', fakeAsync(() => {
        comp.payment.rewind = true;
        comp.payment.delay = true;
        comp.calculate();
        tick();
        fixture.detectChanges();
        expect(comp.payment.sum).toBe(25);
    }));

});


describe('TapesComponent test for returnTape method', function () {

    let comp: TapesRentedComponent;
    let fixture: ComponentFixture<TapesRentedComponent>;
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
                { id: 11, title: 'Gwiezdne wojny IV', date: '1977.02.20', rating: 5, description: 'desc', photo: './app/photo/gwiezdnewojnyIV.jpg', category: 'komedia', rent: false }
            ])
        },

        update(tape: Tape) {
            return Promise.resolve(null)
        },

    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
            declarations: [TapesRentedComponent], 
        })
            .overrideComponent(TapesRentedComponent, {
                set: {
                    templateUrl: '/base/src/app/tapes.component.html',
                    styleUrls: ['/base/src/app/tapes.component.css']
                }
            })
            .overrideComponent(TapesRentedComponent, {
                add: {
                    providers: [{ provide: TapeService, useValue: tapeServiceStub }]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TapesRentedComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h2'));
        el = de.nativeElement;
    });

    it('should change value of rent to be false and delete from tapes list rented', fakeAsync(() => {
        comp.ngOnInit();
        tick();
        let tapeToReturn = new Tape(11, 'Gwiezdne wojny IV', '1977.02.20', 5, 'desc', './app/photo/gwiezdnewojnyIV.jpg', 'komedia', true);

        comp.returnTape(tapeToReturn);
        tick();
        fixture.detectChanges();
        expect(comp.tapes.length).toBe(5);
    }));

});



