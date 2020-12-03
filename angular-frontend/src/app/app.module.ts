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
import { ImagesComponent } from './images/images.component';
import { PeopleComponent } from './people/people.component';
import { ModalComponent } from './modal/modal.component';
import { FullMapComponent } from './map/full-map/full-map.component';
import { SmallMapComponent } from './map/small-map/small-map.component';
import { CardComponent } from './card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    AuthComponent,
    CollectionComponent,
    ItemComponent,
    PageNotFoundComponent,
    SafePipe,
    MapComponent,
    PoriComponent,
    MaterialCultureComponent,
    ImagesComponent,
    PeopleComponent,
    ModalComponent,
    CardComponent,
    FullMapComponent,
    SmallMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPopper,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FlexLayoutModule
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
