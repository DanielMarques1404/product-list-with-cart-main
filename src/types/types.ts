export type ImageType = {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

export type ProductType = {
    image: ImageType;
    name: string;
    category: string;
    price: number;
}