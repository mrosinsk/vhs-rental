import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery.component';
import { TapesComponent } from './tapes.component';
import { TapesRentedComponent } from './tapes-rented.component';
import { TapeDetailComponent } from './tape-detail.component';
import { TapeService } from './tape.service';
import { FormsModule }   from '@angular/forms';



@NgModule({

  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    GalleryComponent,
    TapeDetailComponent,
    TapesComponent,
    TapesRentedComponent,
  ],
  providers: [TapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


