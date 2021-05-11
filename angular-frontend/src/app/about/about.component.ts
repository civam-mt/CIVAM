import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private api: ApiService, private route:ActivatedRoute) { }

  public missionCollapsed = true;
  public originCollapsed = true;
  public peopleCollapsed = true;
  public historyCollapsed = true;
  public resourcesCollapsed = true;

  public selected_tab;

  public siteTextIDs = ['ABOUT', 'MISSION', 'ORIGINS', 'PEOPLE1',
                        'PEOPLE2', 'PEOPLE3', 'PEOPLE4', 'CONTACT'];
  public siteTexts = {};
  
  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      if (fragment == 'mission') this.selected_tab = 0;
      else if (fragment == 'origin') this.selected_tab = 1;
      else if (fragment == 'people') this.selected_tab = 2;
      else if (fragment == 'contact') this.selected_tab = 3;
      else this.selected_tab = 0;
  })
    this.getSiteTexts();
    
  }
  getSiteTexts() {
    for (var i = 0; i < this.siteTextIDs.length; i++) {
      this.api.getSiteTextByLocation(this.siteTextIDs[i]).subscribe((data) => {
        this.siteTexts[data["location"]] = data["content"];
      });
    }
  }
}




