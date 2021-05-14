import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { SiteTextSupportService } from '../services/site-text-support.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private api: ApiService, private route:ActivatedRoute, private siteTextSupport:SiteTextSupportService) { }

  public missionCollapsed = true;
  public originCollapsed = true;
  public peopleCollapsed = true;
  public historyCollapsed = true;
  public resourcesCollapsed = true;

  public currentSubPage:string;
  public currentPageUrl:string;
  public allowedSubPage:string[] = ['mission', 'origin', 'people', 'contact'];
  public siteTextIDs = ['ABOUT', 'MISSION', 'ORIGINS', 'PEOPLE1',
                        'PEOPLE2', 'PEOPLE3', 'PEOPLE4', 'CONTACT'];
  public siteTexts = {};
  
  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.currentPageUrl = '';
      url.forEach((urlComp) => {this.currentPageUrl = this.currentPageUrl + '/' + urlComp.path});
    });
    this.route.fragment.subscribe((fragment: string) => {
      this.currentSubPage = this.allowedSubPage.includes(fragment) ? fragment : this.allowedSubPage[0];
    });
    this.getSiteTexts();
    
  }
  getSiteTexts() {
    this.siteTextSupport.getManySiteText(this.siteTextIDs);
    this.siteTextSupport.loadedElements.subscribe((emitter) => {
      if (emitter) {
        var arr = this.siteTextSupport.loadManySiteText(this.siteTextIDs);
        for (var i = 0; i < arr.length; i ++ ) {
          this.siteTexts[arr[i][0]] = arr[i][1];
        }
      }
    });
  }
}




