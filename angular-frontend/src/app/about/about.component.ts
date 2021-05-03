import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private api: ApiService) { }

  public missionCollapsed = true;
  public originCollapsed = true;
  public peopleCollapsed = true;
  public historyCollapsed = true;
  public resourcesCollapsed = true;

  public siteTextIDs = ['ABOUT', 'MISSION', 'ORIGINS', 'PEOPLE1',
                        'PEOPLE2', 'PEOPLE3', 'PEOPLE4', 'CONTACT'];
  public siteTexts = {};
  
  ngOnInit(): void {
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




