// NG and Package Imports
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopper } from 'angular-popper'
import { NgForm } from '@angular/forms';
import { SafePipe } from './Safepipe.pipe';

// Module imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module'
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JwPaginationModule } from 'jw-angular-pagination';


// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CollectionsComponent } from './collections/collections.component';
import { DistrictsComponent } from './districts/districts.component';
import { ExploreComponent } from './explore/explore.component';
import { OralHistoriesComponent } from './oral-histories/oral-histories.component';
import { CollectionComponent } from './collection/collection.component';
import { ItemComponent } from './item/item.component';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapComponent } from './map/map.component';
import { PoriComponent } from './pori/pori.component';
import { MaterialCultureComponent } from './material-culture/material-culture.component';
import { ImagesComponent } from './images/images.component';
import { PeopleComponent } from './people/people.component';
import { ModalComponent } from './modal/modal.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CardComponent } from './card/card.component';
import { KeywordPageComponent } from './keyword-page/keyword-page.component';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { NewsTagComponent } from './news/news-tag/news-tag.component';


// Service imports
import { UsernameService } from './auth/username.service';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
    ExploreComponent,
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
    NewsComponent,
    NewsArticleComponent,
    NewsTagComponent,
    KeywordPageComponent,
    FooterComponent,
    TermsConditionsComponent
  ],
  imports:[
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPopper,
    HttpClientModule,
    MatTabsModule,
    FlexLayoutModule,
    JwPaginationModule,
    NgxAudioPlayerModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
    	apiKey: 'AIzaSyCKsC8YlYs6bkPacj3Sd_Jf2SAvMWGJMy8'
    })
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
