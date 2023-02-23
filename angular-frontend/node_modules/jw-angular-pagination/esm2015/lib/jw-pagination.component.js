import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import paginate from 'jw-paginate';
let JwPaginationComponent = class JwPaginationComponent {
    constructor() {
        this.changePage = new EventEmitter(true);
        this.initialPage = 1;
        this.pageSize = 10;
        this.maxPages = 10;
        this.pager = {};
    }
    ngOnInit() {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    }
    ngOnChanges(changes) {
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
    }
    setPage(page) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    }
};
__decorate([
    Input()
], JwPaginationComponent.prototype, "items", void 0);
__decorate([
    Output()
], JwPaginationComponent.prototype, "changePage", void 0);
__decorate([
    Input()
], JwPaginationComponent.prototype, "initialPage", void 0);
__decorate([
    Input()
], JwPaginationComponent.prototype, "pageSize", void 0);
__decorate([
    Input()
], JwPaginationComponent.prototype, "maxPages", void 0);
JwPaginationComponent = __decorate([
    Component({
        selector: 'jw-pagination',
        template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item first-item">
        <a (click)="setPage(1)" class="page-link">First</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item previous-item">
        <a (click)="setPage(pager.currentPage - 1)" class="page-link">Previous</a>
    </li>
    <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}" class="page-item number-item">
        <a (click)="setPage(page)" class="page-link">{{page}}</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item next-item">
        <a (click)="setPage(pager.currentPage + 1)" class="page-link">Next</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item last-item">
        <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
    </li>
</ul>`
    })
], JwPaginationComponent);
export { JwPaginationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianctcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9qdy1hbmd1bGFyLXBhZ2luYXRpb24vIiwic291cmNlcyI6WyJsaWIvanctcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQXVCbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFBbEM7UUFFYyxlQUFVLEdBQUcsSUFBSSxZQUFZLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDMUMsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFdkIsVUFBSyxHQUFRLEVBQUUsQ0FBQztJQTBCcEIsQ0FBQztJQXhCRyxRQUFRO1FBQ0osc0NBQXNDO1FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsd0NBQXdDO1FBQ3hDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3RSx5Q0FBeUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkYsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSixDQUFBO0FBaENZO0lBQVIsS0FBSyxFQUFFO29EQUFtQjtBQUNqQjtJQUFULE1BQU0sRUFBRTt5REFBMEM7QUFDMUM7SUFBUixLQUFLLEVBQUU7MERBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFO3VEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7dURBQWU7QUFMZCxxQkFBcUI7SUFyQmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztNQWdCUjtLQUNMLENBQUM7R0FFVyxxQkFBcUIsQ0FpQ2pDO1NBakNZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgcGFnaW5hdGUgZnJvbSAnanctcGFnaW5hdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2p3LXBhZ2luYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPHVsICpuZ0lmPVwicGFnZXIucGFnZXMgJiYgcGFnZXIucGFnZXMubGVuZ3RoXCIgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gMX1cIiBjbGFzcz1cInBhZ2UtaXRlbSBmaXJzdC1pdGVtXCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKDEpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj5GaXJzdDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCIgY2xhc3M9XCJwYWdlLWl0ZW0gcHJldmlvdXMtaXRlbVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSAtIDEpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj5QcmV2aW91czwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlci5wYWdlc1wiIFtuZ0NsYXNzXT1cInthY3RpdmU6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2V9XCIgY2xhc3M9XCJwYWdlLWl0ZW0gbnVtYmVyLWl0ZW1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZSlcIiBjbGFzcz1cInBhZ2UtbGlua1wiPnt7cGFnZX19PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZXIudG90YWxQYWdlc31cIiBjbGFzcz1cInBhZ2UtaXRlbSBuZXh0LWl0ZW1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIuY3VycmVudFBhZ2UgKyAxKVwiIGNsYXNzPVwicGFnZS1saW5rXCI+TmV4dDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCIgY2xhc3M9XCJwYWdlLWl0ZW0gbGFzdC1pdGVtXCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLnRvdGFsUGFnZXMpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj5MYXN0PC9hPlxuICAgIDwvbGk+XG48L3VsPmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBKd1BhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgaXRlbXM6IEFycmF5PGFueT47XG4gICAgQE91dHB1dCgpIGNoYW5nZVBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4odHJ1ZSk7XG4gICAgQElucHV0KCkgaW5pdGlhbFBhZ2UgPSAxO1xuICAgIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XG4gICAgQElucHV0KCkgbWF4UGFnZXMgPSAxMDtcblxuICAgIHBhZ2VyOiBhbnkgPSB7fTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBzZXQgcGFnZSBpZiBpdGVtcyBhcnJheSBpc24ndCBlbXB0eVxuICAgICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5pdGlhbFBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAvLyByZXNldCBwYWdlIGlmIGl0ZW1zIGFycmF5IGhhcyBjaGFuZ2VkXG4gICAgICAgIGlmIChjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5pbml0aWFsUGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICAvLyBnZXQgbmV3IHBhZ2VyIG9iamVjdCBmb3Igc3BlY2lmaWVkIHBhZ2VcbiAgICAgICAgdGhpcy5wYWdlciA9IHBhZ2luYXRlKHRoaXMuaXRlbXMubGVuZ3RoLCBwYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLm1heFBhZ2VzKTtcblxuICAgICAgICAvLyBnZXQgbmV3IHBhZ2Ugb2YgaXRlbXMgZnJvbSBpdGVtcyBhcnJheVxuICAgICAgICB2YXIgcGFnZU9mSXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKHRoaXMucGFnZXIuc3RhcnRJbmRleCwgdGhpcy5wYWdlci5lbmRJbmRleCArIDEpO1xuXG4gICAgICAgIC8vIGNhbGwgY2hhbmdlIHBhZ2UgZnVuY3Rpb24gaW4gcGFyZW50IGNvbXBvbmVudFxuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UuZW1pdChwYWdlT2ZJdGVtcyk7XG4gICAgfVxufSJdfQ==