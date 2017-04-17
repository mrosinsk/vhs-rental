import { Component, OnInit } from '@angular/core';
import { Tape } from './tape';
import { TapeService } from './tape.service';

@Component({
    selector: 'my-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']

})
export class GalleryComponent implements OnInit {
    tapes: Tape[] = [];

    constructor(private tapeService: TapeService) { }

    ngOnInit(): void {
        this.tapeService.getTapes().then(tapes =>
            this.tapes = tapes);
    }
}