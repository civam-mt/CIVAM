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

    getElement(str: string): any {
        return this._getElement(str);
    }

    _getElement(str: string): any {
        switch (str.toLowerCase()) {
            case "clickable":
                return this.clickable;
            case "dragable":
                return this.dragable;
            case "openInfoWindow":
                return this.openInfoWindow;
            case "lat":
                return this.lat;
            case "lng":
                return this.lng;
            case "title":
                return this.title;
            case "label":
                return this.label;
            case "visible":
                return this.visible;
            case "animation":
                return this.animation;
            default:
                return null;
        }
    }

    filter(args: string[][]): boolean {
        return true;
    }

}

export class SVGIcon {
    icon: any;

    public constructor(Curl: string, Cwidth: number, Cheight: number) {
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

enum Continent {
    'NA' = 'North America',
    'SA' = 'South America',
    'AF' = 'Africa',
    'EU' = 'Europe',
    'AS' = 'Asia',
    'OS' = 'Oceania',
    'AN' = 'Antartica'
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
    notes: string;

    static boolFilters: string[][] = [['crow_material', 'Crow Material'], ['digital_collection', 'Digital Collection']];
    static dropDownFilters: Array<[string, string[]]> = new Array<[string, string[]]>(['Continent', ['North America', 'South America', 'Europe',
        'Africa', 'Asia', 'Antartica', 'Oceania']]);

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
        svg: string, notes:string) {
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
        this.notes = notes;
        try {
            this.customImgUrl = new SVGIcon(SVGMap[svg], 20, 20);
        }
        catch (e) {
            console.error("sgv param of " + svg + "invalid.");
            this.customImgUrl = new SVGIcon('NULL', 20, 20);
        }
    }

    filter(args: string[][]): boolean {
        let bool = true;
        args.forEach(element => {
            if (element[1].length >= 1) {
                let subbool = false;
                Array.from(element[1]).forEach(subelement => {
                    //console.log(subelement);
                    subbool = subbool || (subelement == this.getElement(element[0]));
                });
                //console.log(subbool);
                bool = subbool && bool;
            }
            else if ((typeof element[1] === 'boolean') && element[1] == true) {
                //console.log(element[0] + ' ' + element[1]);
                bool = bool && this.getElement(element[0]) == element[1];
                //console.log(element[0] + ' ' + this.strToObj(element[0]) + ' \t res =' + bool);
            }
        });

        return bool;
    }

    getElement(str: string): any {
        let ret: any;
        switch (str.toLowerCase()) {
            case "crow_material":
                return this.crow_material;
            case "digital_collection":
                return this.digital_collection;
            case "replied_to_contact":
                return this.replied_to_contact;
            case "name":
                return this.name;
            case "obj_photo":
                return this.obj_photos;
            case "street":
                return this.street;
            case "city":
                return this.city;
            case "province":
                return this.province;
            case "countries":
                return this.country;
            case "continent":
                return this.continent;
            case "code":
                return this.code;
            case "url":
                return this.url;
            case "notes":
                return this.notes;
            default:
                return super.getElement(str);
        }
    }


    private _objectsPhotosBoth(str: string): boolean {
        let status: boolean;
        switch (str) {
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

    static asContinent(arg0: string): string {
        return Continent[arg0];
      }
}
