import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" })); // امسح الخطأ عند التغيير
    };

    const validate = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!values.title.trim()) newErrors.title = "Title is required";
      if (!values.description.trim())
        newErrors.description = "Description is required";
      if (!values.brand.trim()) newErrors.brand = "Brand is required";

      if (values.price < 1) newErrors.price = "Price must be at least 1";
      if (values.stock < 1) newErrors.stock = "Stock must be at least 1";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
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
        setErrors({});
      },
    }));

    useEffect(() => {
      if (initialValues && initialValues?.id) {
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
          error={errors.title}
        />

        <FieldRender
          fieldType="textarea"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
        />

        <FieldRender
          fieldType="number"
          label="Price"
          name="price"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
        />

        <FieldRender
          fieldType="number"
          label="Stock"
          name="stock"
          value={values.stock}
          onChange={handleChange}
          error={errors.stock}
        />

        <FieldRender
          fieldType="text"
          label="Brand"
          name="brand"
          value={values.brand}
          onChange={handleChange}
          error={errors.brand}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Save Product"}
        </Button>
      </form>
    );
  }
);

export default ProductForm;
