import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import paginate from 'jw-paginate';
var JwPaginationComponent = /** @class */ (function () {
    function JwPaginationComponent() {
        this.changePage = new EventEmitter(true);
        this.initialPage = 1;
        this.pageSize = 10;
        this.maxPages = 10;
        this.pager = {};
    }
    JwPaginationComponent.prototype.ngOnInit = function () {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    };
    JwPaginationComponent.prototype.ngOnChanges = function (changes) {
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
    };
    JwPaginationComponent.prototype.setPage = function (page) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // call change page function in parent component
        this.changePage.emit(pageOfItems);
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
            template: "<ul *ngIf=\"pager.pages && pager.pages.length\" class=\"pagination\">\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\" class=\"page-item first-item\">\n        <a (click)=\"setPage(1)\" class=\"page-link\">First</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\" class=\"page-item previous-item\">\n        <a (click)=\"setPage(pager.currentPage - 1)\" class=\"page-link\">Previous</a>\n    </li>\n    <li *ngFor=\"let page of pager.pages\" [ngClass]=\"{active:pager.currentPage === page}\" class=\"page-item number-item\">\n        <a (click)=\"setPage(page)\" class=\"page-link\">{{page}}</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\" class=\"page-item next-item\">\n        <a (click)=\"setPage(pager.currentPage + 1)\" class=\"page-link\">Next</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\" class=\"page-item last-item\">\n        <a (click)=\"setPage(pager.totalPages)\" class=\"page-link\">Last</a>\n    </li>\n</ul>"
        })
    ], JwPaginationComponent);
    return JwPaginationComponent;
}());
export { JwPaginationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianctcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9qdy1hbmd1bGFyLXBhZ2luYXRpb24vIiwic291cmNlcyI6WyJsaWIvanctcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQXVCbkM7SUFBQTtRQUVjLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUMxQyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUV2QixVQUFLLEdBQVEsRUFBRSxDQUFDO0lBMEJwQixDQUFDO0lBeEJHLHdDQUFRLEdBQVI7UUFDSSxzQ0FBc0M7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5Qix3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCx1Q0FBTyxHQUFQLFVBQVEsSUFBWTtRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdFLHlDQUF5QztRQUN6QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVuRixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQS9CUTtRQUFSLEtBQUssRUFBRTt3REFBbUI7SUFDakI7UUFBVCxNQUFNLEVBQUU7NkRBQTBDO0lBQzFDO1FBQVIsS0FBSyxFQUFFOzhEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTsyREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzJEQUFlO0lBTGQscUJBQXFCO1FBckJqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsOGdDQWdCUjtTQUNMLENBQUM7T0FFVyxxQkFBcUIsQ0FpQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWpDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHBhZ2luYXRlIGZyb20gJ2p3LXBhZ2luYXRlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqdy1wYWdpbmF0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYDx1bCAqbmdJZj1cInBhZ2VyLnBhZ2VzICYmIHBhZ2VyLnBhZ2VzLmxlbmd0aFwiIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCIgY2xhc3M9XCJwYWdlLWl0ZW0gZmlyc3QtaXRlbVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZSgxKVwiIGNsYXNzPVwicGFnZS1saW5rXCI+Rmlyc3Q8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiIGNsYXNzPVwicGFnZS1pdGVtIHByZXZpb3VzLWl0ZW1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIuY3VycmVudFBhZ2UgLSAxKVwiIGNsYXNzPVwicGFnZS1saW5rXCI+UHJldmlvdXM8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgcGFnZXIucGFnZXNcIiBbbmdDbGFzc109XCJ7YWN0aXZlOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlfVwiIGNsYXNzPVwicGFnZS1pdGVtIG51bWJlci1pdGVtXCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2UpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj57e3BhZ2V9fTwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCIgY2xhc3M9XCJwYWdlLWl0ZW0gbmV4dC1pdGVtXCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLmN1cnJlbnRQYWdlICsgMSlcIiBjbGFzcz1cInBhZ2UtbGlua1wiPk5leHQ8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiIGNsYXNzPVwicGFnZS1pdGVtIGxhc3QtaXRlbVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci50b3RhbFBhZ2VzKVwiIGNsYXNzPVwicGFnZS1saW5rXCI+TGFzdDwvYT5cbiAgICA8L2xpPlxuPC91bD5gXG59KVxuXG5leHBvcnQgY2xhc3MgSndQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xuICAgIEBPdXRwdXQoKSBjaGFuZ2VQYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KHRydWUpO1xuICAgIEBJbnB1dCgpIGluaXRpYWxQYWdlID0gMTtcbiAgICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xuICAgIEBJbnB1dCgpIG1heFBhZ2VzID0gMTA7XG5cbiAgICBwYWdlcjogYW55ID0ge307XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gc2V0IHBhZ2UgaWYgaXRlbXMgYXJyYXkgaXNuJ3QgZW1wdHlcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmluaXRpYWxQYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgLy8gcmVzZXQgcGFnZSBpZiBpdGVtcyBhcnJheSBoYXMgY2hhbmdlZFxuICAgICAgICBpZiAoY2hhbmdlcy5pdGVtcy5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuaXRlbXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5pdGlhbFBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgLy8gZ2V0IG5ldyBwYWdlciBvYmplY3QgZm9yIHNwZWNpZmllZCBwYWdlXG4gICAgICAgIHRoaXMucGFnZXIgPSBwYWdpbmF0ZSh0aGlzLml0ZW1zLmxlbmd0aCwgcGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5tYXhQYWdlcyk7XG5cbiAgICAgICAgLy8gZ2V0IG5ldyBwYWdlIG9mIGl0ZW1zIGZyb20gaXRlbXMgYXJyYXlcbiAgICAgICAgdmFyIHBhZ2VPZkl0ZW1zID0gdGhpcy5pdGVtcy5zbGljZSh0aGlzLnBhZ2VyLnN0YXJ0SW5kZXgsIHRoaXMucGFnZXIuZW5kSW5kZXggKyAxKTtcblxuICAgICAgICAvLyBjYWxsIGNoYW5nZSBwYWdlIGZ1bmN0aW9uIGluIHBhcmVudCBjb21wb25lbnRcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlLmVtaXQocGFnZU9mSXRlbXMpO1xuICAgIH1cbn0iXX0=