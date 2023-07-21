export interface ProductInterface {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  categoryId?: number;
  brandId: number;
}
