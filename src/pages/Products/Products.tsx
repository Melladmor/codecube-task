import DataTable from "../../components/DataTable/DataTable";
import type { Column, DataTableRef } from "../../components/DataTable/type";
import { useMemo, useRef, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import type { Product, ProductFormRef } from "./type";
import { useApi } from "../../hooks/usePost";
import { useToaster } from "../../context/ToasterProvider";
import ProductForm from "./components/PorductForm";
import { getLocalStorageItem } from "../../utils";
import type { UserT } from "../Auth/components/type";
import DeleteModal from "../../components/Modal/DeleteModal";

const Products = () => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [isDeletOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const formRef = useRef<ProductFormRef>(null);
  const tableRef = useRef<DataTableRef>(null);
  const user: UserT | null = getLocalStorageItem("user");
  const hasPermission: boolean = user?.role === "Editor" ? true : false;
  const { error, loading, request, success } = useApi();
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
      renderCell: (row) => {
        return row?.value ? new Date(row.value).toLocaleString() : "-";
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      sortable: true,
      renderCell: (row) => {
        return row?.value ? new Date(row.value).toLocaleString() : "-";
      },
    },
  ];
  const handleSubmitAdd = async (values: Product | null) => {
    await request("products", values);
  };

  const handleSubmitEdit = async (values: Product | null) => {
    if (!values) return;

    const updatedProduct: Product = {
      ...values,
      updatedAt: new Date().toISOString(),
    };
    await request(`products/${values.id}`, updatedProduct, { method: "PUT" });
  };

  const handleSubmitDelete = async () => {
    await request(`products/${deleteId}`, undefined, { method: "DELETE" });
  };

  const handleEditData = (values: Product) => {
    setEditValues(values);
    setEditOpen(true);
  };

  const handleDeleteData = async (id: string) => {
    setIsDeleteOpen(true);
    setDeleteId(id);
  };

  useMemo(() => {
    if (success) {
      toaster("Saved successfully", "success");
      formRef?.current?.reset();
      setIsAddOpen(false);
      setEditOpen(false);
      setIsDeleteOpen(false);
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
      {isAddOpen && (
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
      )}

      {isEditOpen && (
        <Drawer
          isOpen={isEditOpen}
          title="Edit Product"
          toggleDrawer={() => {
            setEditOpen((prev: boolean) => !prev);
            setEditValues(null);
          }}>
          <ProductForm
            onSubmit={handleSubmitEdit}
            loading={loading}
            ref={formRef}
            initialValues={editValues}
          />
        </Drawer>
      )}

      <DeleteModal
        isOpen={isDeletOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleSubmitDelete}
      />
    </div>
  );
};

export default Products;
