import { Item } from './item'

export interface Collection {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    public: boolean;
    item_list: Item[];
    // Not sure how the API represnts dates
    modified_on: any;
    created_on: any;
}
