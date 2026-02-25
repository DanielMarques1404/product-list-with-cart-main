export type ProductImage = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export type Product = {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
};

export type ProductInCart = {
  product: Product;
  qty: number;
};
