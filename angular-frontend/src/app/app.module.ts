import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopper } from 'angular-popper'
 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CollectionsComponent } from './collections/collections.component';
import { DistrictsComponent } from './districts/districts.component';
import { OralHistoriesComponent } from './oral-histories/oral-histories.component';
import { PictureCollectionsComponent } from './picture-collections/picture-collections.component';
import { CollectionComponent } from './collection/collection.component';
import { ItemComponent } from './item/item.component';

import { AuthComponent } from './auth/auth.component';
import { UsernameService } from './auth/username.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafePipe } from './Safepipe.pipe';
import { MapComponent } from './map/map.component';
import { PoriComponent } from './pori/pori.component';
import { MaterialCultureComponent } from './material-culture/material-culture.component';

// TODO: Fix this so it's functional
// import { ModalServiceModule } from 'modal-service';
// import {ModalModule} from './_modal'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavigationComponent,
    CollectionsComponent,
    DistrictsComponent,
    OralHistoriesComponent,
    PictureCollectionsComponent,
    AuthComponent,
    CollectionComponent,
    ItemComponent,
    PageNotFoundComponent,
    SafePipe,
    MapComponent,
    PoriComponent,
    MaterialCultureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPopper,
    HttpClientModule
    //TODO: fix these so they work (for auth)
    // ModalModule,
    // ModalServiceModule.forRoot()
  ],
  exports: [
    AboutComponent,
    SafePipe
  ],
  providers: [
    UsernameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
