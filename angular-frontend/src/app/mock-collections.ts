import { Collection } from './collection'
import { Item } from './item'

const BIG_HORN_ITEM: Item = {
    id: 0,
    name: 'Big Horn',
    description: 'A big horn standing above some grass',
    collection_id: 0,
    created_by_id: 0,
    modified_by_id: 0,
    created_on: null,
    modified_on: null,
    image: "https://tse4.mm.bing.net/th?id=OIP.SLTiLjgtGHBZZhXJ8KFvGwHaEL&pid=Api"
};

// Make a list with a bunch of copies of BIG_HORN_ITEM so we have a nice list of items to display
let BIG_HORN_ITEMS: Item[] = [];
for (let i = 0; i < 6; ++i) {
    BIG_HORN_ITEMS.push(BIG_HORN_ITEM);
}

export const DISTRICTS: Collection[] = [
    { 
        id: 0,
        title: 'Big Horn',
        description: 'Pictures from the Big Horn District', 
        // The cover_images are just placeholders from the first page of google cover_image results
        // for each of the district titles, so they can be a little random
        cover_image: 'https://tse1.mm.bing.net/th?id=OIP.nWZRFJ3J0yU83QK1BFnmtwHaFj&pid=Api',
        public: true,
        item_list: BIG_HORN_ITEMS,
        modified_on: null,
        created_on: null
    },{ 
        id: 1,
        title: 'Black Lodge',
        description: 'Pictures from the Black Lodge District', 
        cover_image: 'https://tse4.mm.bing.net/th?id=OIP.2gKxCyFVDLWattvdVcoUMgHaE8&pid=Api',
        public: true,
        item_list: null,
        modified_on: null,
        created_on: null
    },{ 
        id: 2,
        title: 'Lodge Grass',
        description: 'Pictures from the Lodge Grass District', 
        cover_image: 'https://bloximages.chicago2.vip.townnews.com/billingsgazette.com/content/tncms/assets/v3/editorial/5/13/513a9c2f-3fba-50bd-968f-407a4bdf1c48/4ecb4c0a7dbe6.image.jpg', 
        public: true,
        item_list: null,
        modified_on: null,
        created_on: null
    },{ 
        id: 3,
        title: 'Pryor',
        description: 'Pictures from the Pryor District', 
        cover_image: 'http://www.trbimg.com/img-5849a921/turbine/la-me-richard-pryor-20051211',
        public: true,
        item_list: null,
        modified_on: null,
        created_on: null
    },{ 
        id: 4,
        title: 'Reno',
        description: 'Pictures from the Reno District', 
        cover_image: 'https://housely.com/wp-content/uploads/2016/07/Reno-NV.png' ,
        public: true,
        item_list: null,
        modified_on: null,
        created_on: null
    },{ 
        id: 5,
        title: 'Wyola',
        description: 'Pictures from the Wyola District', 
        cover_image: 'http://media6.trover.com/T/55bd9e248e7cb234800036d4/fixedw_large_4x.jpg', 
        public: true,
        item_list: null,
        modified_on: null,
        created_on: null
    }
];
