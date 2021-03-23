// The GoogleMapMarker class is the basic class that will be drawn on the map.  It is intended to be extended
//     to support other map icons.
export class GoogleMapMarker {
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
    customImgUrl: string;

    public constructor(lat: number, lng: number, title: string, label: string, _id: string) {
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.label = label;
        this._id = _id;
        this.animation = ""
    }

}

enum ObjectPhoto {
    'Object' = 'OB',
    'Photo' = 'PO',
    'Both' = 'BO',
    'None' = 'NA'
}

// Extends GoogleMapMarker to include the data needed for the search and sorting of the objects in realtime
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
        url: string) {
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
    }
}