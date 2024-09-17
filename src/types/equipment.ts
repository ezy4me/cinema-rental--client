export interface Equipment {
  id: number;
  name: string;
  description: string;
  pricePerDay: string;
  quantity: number;
  statusId: number;
  brandId: number;
  categoryId: number;
  fileId: number;
  image?: string;
}

export interface Filter {
  id: number;
  name: string;
}
