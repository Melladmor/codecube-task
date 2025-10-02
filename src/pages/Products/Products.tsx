import DataTable from "../../components/DataTable/DataTable";
import type { Column } from "../../components/DataTable/type";
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
}

const Products = () => {
  const column: Column<Product>[] = [
    { field: "id", headerName: "ID", width: 70, sortable: true },
    { field: "title", headerName: "Title", width: 200, sortable: true },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 100, sortable: true },
    { field: "stock", headerName: "Stock", width: 100, sortable: true },
    { field: "brand", headerName: "Brand", width: 150 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      sortable: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTable columns={column} url="products" pageSize={8} page={1} />
    </div>
  );
};

export default Products;
