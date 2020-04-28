export interface Collection {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    public: boolean;
    // Not sure how the API represnts dates
    modified_on: any;
    created_on: any;
}
