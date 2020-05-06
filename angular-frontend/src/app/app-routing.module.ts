import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CollectionsComponent } from './collections/collections.component';
import { DistrictsComponent } from './districts/districts.component';
import { PictureCollectionsComponent } from './picture-collections/picture-collections.component';
import { OralHistoriesComponent } from './oral-histories/oral-histories.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component: HomeComponent},
{path:'about',component: AboutComponent},
{path:'collections',component: CollectionsComponent},
{path:'districts',component: DistrictsComponent},
{path:'oral-histories',component: OralHistoriesComponent},
{path:'picture-collections',component: PictureCollectionsComponent},
{path:'artifacts',component: ArtifactsComponent},
{path:'collections/:collectionID/:itemID', component: ItemComponent},
{path:'collections/:collectionID', component: CollectionComponent},
  
// Keep this one last, so it catches everything else
{path:'**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
