import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  API_URL = environment.apiUrl;
  item;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getItemByCollectionIDItemID(params.get('collectionID'), params.get('itemID'));
    });
  }
  getItemByCollectionIDItemID(collectionID : string, itemID : string) {
      this.api.getItemByCollectionIDItemID(collectionID, itemID).subscribe((data) => {
        console.log(data);
        this.item = data;
    });
  }
}
