import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products as initialProducts } from "../../data";
import "./product.scss";

interface Product {
  id: number;
  img: string;
  title: string;
  color: string;
  producer: string;
  price: string;
  createdAt: string;
  inStock: boolean;
}

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = initialProducts.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        inStock: foundProduct.inStock || false
      });
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (!product) {
    return <div className="product">Product not found</div>;
  }

  return (
    <div className="product">
      <div className="header">
        <h1>Product Details</h1>
        <div className="actions">
          <button onClick={handleEdit} className="editBtn">Edit Product</button>
          <button onClick={handleBack} className="backBtn">Back to Products</button>
        </div>
      </div>
      
      <div className="content">
        <div className="productImage">
          <img src={product.img} alt={product.title} />
        </div>
        
        <div className="productInfo">
          <div className="infoGroup">
            <label>Title:</label>
            <span>{product.title}</span>
          </div>
          
          <div className="infoGroup">
            <label>Color:</label>
            <span>{product.color}</span>
          </div>
          
          <div className="infoGroup">
            <label>Producer:</label>
            <span>{product.producer}</span>
          </div>
          
          <div className="infoGroup">
            <label>Price:</label>
            <span>{product.price}</span>
          </div>
          
          <div className="infoGroup">
            <label>Created At:</label>
            <span>{product.createdAt}</span>
          </div>
          
          <div className="infoGroup">
            <label>In Stock:</label>
            <span className={product.inStock ? "inStock" : "outOfStock"}>
              {product.inStock ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
