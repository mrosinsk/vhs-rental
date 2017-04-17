import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template:
    `<div class="neon"><img src="./app/photo/neon.gif" ></div>
        <nav>
     <div class="neon"><a routerLink="/gallery" routerLinkActive="active">Gallery</a>
     <a routerLink="/tapes" routerLinkActive="active">Tapes to rent</a>
     <a routerLink="/tapes-rented" routerLinkActive="active">Tapes rented</a></div>
    </nav>
    <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css'],

})

export class AppComponent {}