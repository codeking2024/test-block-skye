import { GridColDef } from "@mui/x-data-grid";
import "./products.scss";
import { products as initialProducts } from "../../data";
import DataTable from "../../components/dataTable/DataTable";
import { useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 250,
    },
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
    },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      type: "boolean",
    },
  ];

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button>Add New Product</button>
      </div>
      <DataTable 
        slug="products" 
        columns={columns} 
        rows={products} 
        onDelete={handleDelete}
      />
    </div>
  );
};
