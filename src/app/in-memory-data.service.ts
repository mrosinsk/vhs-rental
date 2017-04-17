import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {

        let tapes = [
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
        ];
        return { tapes };
    }
}
