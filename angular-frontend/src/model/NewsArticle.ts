import { stringify } from "@angular/compiler/src/util";

export class NewsArticle {

    private _article_id:number;
    private _title:string;
    private _cover_url:string;
    private _content:string;
    private _published_on:Date;
    private _tags:[[number, string]]    // Array of tags, (tag_id, text)
    private _author:string;

    public constructor(article_id:number, title:string, cover_url:string,
        content:string, published_on:Date, tags:[[number, string]], author:string) {
        this._article_id = article_id;
        this._author = author;
        this._content = content;
        this._cover_url = cover_url;
        this._published_on = published_on;
        this._tags = tags;
        this._title = title;
    }

    public getArticleID():number {
        return this._article_id;
    }

    public getAuthor():string {
        return this._author;
    }

    public getContent():string {
        return this._content;
    }

    public getContentBounded(bound:number = 512):string {
        return  this._content.length <= bound ? this._content : this._content.substring(0,bound).concat(' ...');
    }

    public getCoverURL():string {
        return this._cover_url;
    }

    public getPublishedOn():Date {
        return this._published_on;
    }

    public getTags():[[number, string]] {
        return this._tags;
    }

    public getNewsDate():string {
        return this._published_on.getDay() + ' / ' + 
            this._published_on.getMonth() + ' / ' + 
            this._published_on.getFullYear() + ' ' + 
            this._published_on.getHours() + ':' +
            this._published_on.getMinutes() + ':' +
            this._published_on.getSeconds();
    }

    public getTagsText():string[] {
        let tmp_str:Array<string> = new Array<string>();
        this._tags.forEach((e:[number, string]) => {
            tmp_str.push(e[1]);
          });
        return tmp_str;
    }

    public getTitle():string {
        return this._title;
    }

    public getElement(str:string):any {
        switch(str) {
            case 'article_id':
                return this.getArticleID();
            case 'author':
                return this.getAuthor();
            case 'content':
                return this.getContent();
            case 'content.bounded':
                    return this.getContentBounded();
            case 'cover_url':
                return this.getCoverURL();
            case 'published_on':
                return this.getPublishedOn();
            case 'tags':
                return this.getTags();
            case 'tags.text':
                return this.getTagsText();
            case 'title':
                return this.getTitle();
            default:
                return null;
        }
    }

    public static convertJSONToTag(x:any):[number, string] {
        return [x['id'], x['name']];
    }

}