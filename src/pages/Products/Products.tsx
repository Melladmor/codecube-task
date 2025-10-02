import DataTable from "../../components/DataTable/DataTable";
import type { Column, DataTableRef } from "../../components/DataTable/type";
import { useMemo, useRef, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import type { Product, ProductFormRef } from "./type";
import { usePost } from "../../hooks/usePost";
import { useToaster } from "../../context/ToasterProvider";
import ProductForm from "./components/PorductForm";
import { getLocalStorageItem } from "../../utils";
import type { UserT } from "../Auth/components/type";

const Products = () => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<Product | null>(null);
  const formRef = useRef<ProductFormRef>(null);
  const tableRef = useRef<DataTableRef>(null);
  const user: UserT | null = getLocalStorageItem("user");
  const hasPermission: boolean = user?.role === "Editor" ? true : false;
  const { data, error, loading, postData, success } = usePost();
  const toaster = useToaster();
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
  const handleSubmitAdd = async (values: Product | null) => {
    await postData("products", values);
  };

  const handleSubmitEdit = async (values: Product | null) => {
    if (!values) return;

    const updatedProduct: Product = {
      ...values,
      updatedAt: new Date().toISOString(),
    };
    await postData(`products/${values.id}`, updatedProduct, { method: "PUT" });
  };

  const handleEditData = (values: Product) => {
    setEditValues(values);
    setEditOpen(true);
  };

  const handleDeleteData = async (id: string) => {
    console.log(id);
  };

  useMemo(() => {
    if (success) {
      toaster("Product saved successfully", "success");
      setIsAddOpen(false);
      setEditOpen(false);
      formRef?.current?.reset();
      tableRef?.current?.refetch();
    } else if (error) {
      toaster("Something went wrong", "error");
    }
  }, [success, error]);

  return (
    <div>
      <DataTable
        columns={column}
        url="products"
        pageSize={8}
        page={1}
        addAction={() => setIsAddOpen(true)}
        ref={tableRef}
        onDelete={
          hasPermission ? (row) => handleDeleteData(row?.id) : undefined
        }
        onEdit={hasPermission ? (row) => handleEditData(row) : undefined}
      />
      <Drawer
        isOpen={isAddOpen}
        title="Add Product"
        toggleDrawer={() => setIsAddOpen((prev: boolean) => !prev)}>
        <ProductForm
          onSubmit={handleSubmitAdd}
          loading={loading}
          ref={formRef}
        />
      </Drawer>

      <Drawer
        isOpen={isEditOpen}
        title="Edit Product"
        toggleDrawer={() => setEditOpen((prev: boolean) => !prev)}>
        <ProductForm
          onSubmit={handleSubmitEdit}
          loading={loading}
          ref={formRef}
          initialValues={editValues}
        />
      </Drawer>
    </div>
  );
};

export default Products;
