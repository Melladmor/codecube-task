export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormRef {
  reset: () => void;
}

export interface ProductFormProps {
  onSubmit: (product: Product | null) => void;
  initialValues?: Partial<T> | null;
  loading?: boolean;
}
