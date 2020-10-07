import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopper } from 'angular-popper'
import { NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
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
<<<<<<< HEAD
import { ModalComponent } from './modal/modal.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FullMapComponent } from './map/full-map/full-map.component';
import { SmallMapComponent } from './map/small-map/small-map.component';
import { CardComponent } from './card/card.component';
import { KeywordPageComponent } from './keyword-page/keyword-page.component';
=======
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
>>>>>>> here goes nothing

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
    SearchResultComponent,
    CardComponent,
    FullMapComponent,
    SmallMapComponent,
    KeywordPageComponent,
 
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
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
