import { Comparable } from '../app/interface/comparable';
// The GoogleMapMarker class is the basic class that will be drawn on the map.  It is intended to be extended
//     to support other map icons.
export class GoogleMapMarker implements Comparable {
    clickable: boolean;
    dragable: boolean;
    openInfoWindow: boolean;
    lat: number;
    lng: number;
    title: string;
    label: string;
    visible: boolean;
    animation: string;

    _id: string;
    customImgUrl: SVGIcon;

    public constructor(lat: number, lng: number, title: string, label: string, _id: string) {
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.label = label;
        this._id = _id;
        this.animation = ""
    }

    compare(other: GoogleMapMarker): number {
        return this.title
            .toLocaleLowerCase()
            .localeCompare(other.title.toLocaleLowerCase());
    }

    filter(args:string[]): boolean {   
        return true;
    }

}

export class SVGIcon {
    icon:any;

    public constructor(Curl:string, Cwidth:number, Cheight:number) {
        this.icon = {
            url: Curl,
            scaledSize: {
                width: Cwidth,
                height: Cheight
            }
        };
    }
}

enum ObjectPhoto {
    'Object' = 'OB',
    'Photo' = 'PO',
    'Both' = 'BO',
    'None' = 'NA'
}

enum SVGMap {
    'ARCH' = '../../assets/svg/tourist/archaeological.svg',
    'ARTS' = '../../assets/svg/tourist/art_gallery.svg',
    'ATTR' = '../../assets/svg/tourist/attraction.svg',
    'MONT' = '../../assets/svg/tourist/monument.svg',
    'MUES' = '../../assets/svg/tourist/museum.svg',
    'NULL' = 'NULL'
}

// Extends GoogleMapMarker to include the data needed for the search and sorting of the objects in realtime
//      The svg is set to 15x15 by default, can be changed below.
export class CrowMapMarker extends GoogleMapMarker {
    crow_material: boolean;
    digital_collection: boolean;
    replied_to_contact: boolean;
    name: string;
    obj_photos: string;
    street: string;
    city: string;
    province: string;
    country: string;
    continent: string;
    url: string;
    code: string;

    static boolFilters:string[] = ['Crow Material', 'Digital Collection'];
    static dropDownFilters:Array<[string, string[]]> = new Array<[string, string[]]>(['Continent', ['North America', 'South America', 'Europe',
    'Africa', 'Asia', 'Antartica', 'Oceana']]);    

    public constructor(lat: number,
        lng: number,
        name: string,
        crow_material: boolean,
        digital: boolean,
        replied: boolean,
        obj_photo: string,
        street: string,
        city: string,
        province: string,
        country: string,
        continent: string,
        code: string,
        url: string,
        svg: string) {
        super(lat, lng, name + ': ' + province + ', ' + country, 'Label To Be Filled Later', 'ID To Be Filled Later');
        this.crow_material = crow_material;
        this.digital_collection = digital;
        this.replied_to_contact = replied;
        this.obj_photos = obj_photo;
        this.street = street;
        this.city = city;
        this.country = country;
        this.continent = continent;
        this.code = code;
        this.url = url;
        try {
            this.customImgUrl = new SVGIcon(SVGMap[svg], 20, 20);
        }
        catch (e) {
            console.error("sgv param of " + svg + "invalid.");
            this.customImgUrl = new SVGIcon('NULL', 20, 20);
        }
    }

    filter(args:string[]):boolean {
        console.log(this);
        return true;
    }

    private _objectsPhotosBoth(str:string): boolean {
        let status: boolean;
        switch(str) {
            case 'OB':
                status = (this.obj_photos == 'OB');
                break;
            case 'PO':
                break;
            case 'BO':
                break;
            case 'NA':
                break;
        }
        return false;
    }
}
