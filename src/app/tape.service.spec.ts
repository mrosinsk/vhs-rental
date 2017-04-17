import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TapesComponent } from './tapes.component';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { FormsModule, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Tape } from './tape';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { TapeService } from './tape.service';

const makeTapeData = () => [
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
] as Tape[];

describe('Http-HeroService (mockBackend)', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                TapeService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    it('can instantiate service when inject service',
        inject([TapeService], (service: TapeService) => {
            expect(service instanceof TapeService).toBe(true);
        }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new TapeService(http);
        expect(service instanceof TapeService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    describe('when getTapes', () => {
        let backend: MockBackend;
        let service: TapeService;
        let fakeTapes: Tape[];
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new TapeService(http);
            fakeTapes = makeTapeData();
            let options = new ResponseOptions({ status: 200, body: { data: fakeTapes } });
            response = new Response(options);
        }));

        it('should return length of array tapes ', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getTapes()
                .then(tapes => {
                    expect(tapes.length).toBe(fakeTapes.length,
                        'should have expected no. of tapes');
                });
        })));

        it('should return searchTape', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            let searchTape = new Tape(1, 'Rambo I', '1982.01.01', 5, 'desc', './app/photo/rambo_first_blood_original_poster_1982.jpg', 'animowany', false);
            let options = new ResponseOptions({ status: 200, body: { data: searchTape } });
            response = new Response(options);

            service.getTape(1)
                .then(tape => {
                    expect(tape.title).toBe('Rambo I',
                        'should have expected no. of tapes');
                });
        })));

        it('should delete tapes', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            const makeTapeData = () => [
                //{ id: 1, title: 'Rambo I', date: '1982.01.01', rating: 5, description: 'desc', photo: './app/photo/rambo_first_blood_original_poster_1982.jpg', category: 'animowany', rent: false },
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
            ] as Tape[];
            let options = new ResponseOptions({ status: 200, body: { data: makeTapeData() } });
            response = new Response(options);

            service.delete(1);
            service.getTapes().then(tapes => {
                expect(tapes.length).toBe(10,
                    'should have expected no. of tapes');
            });
        })));

        it('should add newTape', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            const makeTapeData = () => [
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
                { id: 11, title: 'Gwiezdne wojny IV', date: '1977.02.20', rating: 5, description: 'desc', photo: './app/photo/gwiezdnewojnyIV.jpg', category: 'komedia', rent: true },
                { id: 12, title: 'Ojciec Chrzestny', date: '1972.02.20', rating: 5, description: 'desc', photo: './app/photo/gwiezdnewojnyIV.jpg', category: 'dramat', rent: true }
            ] as Tape[];
            let options = new ResponseOptions({ status: 200, body: { data: makeTapeData() } });
            response = new Response(options);
            let newTape = new Tape(12, 'Ojciec Chrzestny', '1972.02.20', 5, 'desc', './app/photo/gwiezdnewojnyIV.jpg', 'dramat', true);

            service.create(newTape.title);
            service.getTapes().then(tapes => {
                expect(tapes.length).toBe(12, 'should have expected no. of tapes');
                expect(tapes[11].title).toBe('Ojciec Chrzestny', 'should have expected no. of tapes');
                expect(tapes[11].id).toBe(12, 'should have expected no. of tapes');
                expect(tapes[11].date).toBe('1972.02.20', 'should have expected no. of tapes');
            });
        })));

    });
});



