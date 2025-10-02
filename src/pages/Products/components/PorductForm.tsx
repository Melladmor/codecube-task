import {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import Button from "../../../components/Buttons/Button";
import FieldRender from "../../../components/inputs/FieldRender";
import type { Product, ProductFormProps, ProductFormRef } from "../type";
import style from "./style.module.css";
import Spinner from "../../../components/Spinner/Spinner";

const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ onSubmit, initialValues = {}, loading }, ref) => {
    const [values, setValues] = useState<Product>({
      id: initialValues?.id || "",
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      price: initialValues?.price || 0,
      stock: initialValues?.stock || 0,
      brand: initialValues?.brand || "",
      createdAt: initialValues?.createdAt || new Date().toISOString(),
      updatedAt: initialValues?.updatedAt || "",
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(values);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValues({
          id: "",
          title: "",
          description: "",
          price: 0,
          stock: 0,
          brand: "",
          createdAt: new Date().toISOString(),
          updatedAt: "",
        });
      },
    }));
    useEffect(() => {
      if (
        initialValues &&
        JSON.stringify(initialValues) !== JSON.stringify(values)
      ) {
        setValues(initialValues);
      }
    }, [initialValues]);
    return (
      <form className={style.add_product_form} onSubmit={handleSubmit}>
        <FieldRender
          fieldType="text"
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />

        <FieldRender
          fieldType="textarea"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />

        <FieldRender
          fieldType="text"
          label="Price"
          name="price"
          value={String(values.price)}
          onChange={handleChange}
        />

        <FieldRender
          fieldType="text"
          label="Stock"
          name="stock"
          value={String(values.stock)}
          onChange={handleChange}
        />

        <FieldRender
          fieldType="text"
          label="Brand"
          name="brand"
          value={values.brand}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Save Product"}
        </Button>
      </form>
    );
  }
);

export default ProductForm;
