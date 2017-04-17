import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { TapesComponent } from './tapes.component';
import { TapesRentedComponent } from './tapes-rented.component';
import { TapeDetailComponent } from './tape-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/gallery', pathMatch: 'full' },
    { path: 'gallery', component: GalleryComponent },
    { path: 'detail/:id', component: TapeDetailComponent },
    { path: 'tapes', component: TapesComponent },
      { path: 'tapes-rented', component: TapesRentedComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
