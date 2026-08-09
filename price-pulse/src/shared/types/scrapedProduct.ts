export interface ScrapedProduct {
  title: string;
  price: number | null;
  url: string;
  website: string;
  image?: string;
}