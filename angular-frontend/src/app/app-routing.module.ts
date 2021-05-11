import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CollectionsComponent } from './collections/collections.component';
// import { DistrictsComponent } from './districts/districts.component';
import { ImagesComponent } from './images/images.component';
import { OralHistoriesComponent } from './oral-histories/oral-histories.component';
import { MaterialCultureComponent } from './material-culture/material-culture.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { MapComponent } from './map/map.component';
import { PoriComponent } from './pori/pori.component';
import { PeopleComponent } from './people/people.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { KeywordPageComponent } from './keyword-page/keyword-page.component';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { NewsTagComponent } from './news/news-tag/news-tag.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component: HomeComponent},
{path:'about',component: AboutComponent},
{path:'collections',component: CollectionsComponent},
// {path:'districts',component: DistrictsComponent},
{path:'oral-histories',component: OralHistoriesComponent},
{path:'news',component: NewsComponent},
{path:'news/news-article/:newsArticleID',component: NewsArticleComponent},
{path:'news/news-tag/:newsTagID',component: NewsTagComponent},
{path:'images',component: ImagesComponent},
{path:'material-culture',component: MaterialCultureComponent},
{path:'items/:itemID', component: ItemComponent},
{path:'collections/:collectionID', component: CollectionComponent},
{path:'map', component: MapComponent},
{path:'pori', component: PoriComponent},
{path:'pori/:poriID', component: PoriComponent},
{path:'people', component: PeopleComponent},
{path:'people', component: PeopleComponent},
{path:'search-result', component: SearchResultComponent},
{path:'keyword-page/:keyword', component: KeywordPageComponent},
{path:'terms-and-conditions', component: TermsConditionsComponent},
// Keep this one last, so it catches everything else
{path:'**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
