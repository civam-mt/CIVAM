export interface Item {
    id: number;
    name: string;
    description: string;
    collection_id: number;
    created_by_id: number;
    modified_by_id: number;
    image: string;
    // Not sure how the API represnts dates
    created_on: any;
    modified_on: any;
}
