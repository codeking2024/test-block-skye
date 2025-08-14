import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products as initialProducts } from "../../data";
import "./productEdit.scss";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    color: "",
    producer: "",
    price: 0,
    inStock: false,
  });

  const foundProduct = initialProducts.find(p => p.id === Number(id));

  useEffect(() => {
    if (foundProduct) {
      const priceNumber = parseFloat(foundProduct.price.replace('$', '')) || 0;
      setFormData({
        title: foundProduct.title,
        color: foundProduct.color,
        producer: foundProduct.producer,
        price: priceNumber,
        inStock: foundProduct.inStock || false,
      });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log("Input changed:", name, type === 'checkbox' ? checked : value);
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      price: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    
    // Also show the data on the page for debugging
    const debugInfo = `Product ID: ${id}\nForm Data: ${JSON.stringify(formData, null, 2)}`;
    alert(`Product updated successfully!\n\nDebug Info:\n${debugInfo}`);
  };

  if (!foundProduct) {
    return <div className="productEdit">Product not found</div>;
  }

  return (
    <div className="productEdit">
      <div className="header">
        <h1>Edit Product</h1>
        <button onClick={() => navigate("/products")} className="cancelBtn">Cancel</button>
      </div>
      
      <div className="content">
        <div className="productImage">
          <img src={foundProduct.img} alt={foundProduct.title} />
        </div>
        
        <form onSubmit={handleSubmit} className="editForm">
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="producer">Producer</label>
            <input
              type="text"
              id="producer"
              name="producer"
              value={formData.producer}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="price">Price</label>
            <div className="priceInput">
              <span className="pricePrefix">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handlePriceChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <small style={{ color: '#666', fontSize: '12px' }}>
              Enter price as number (e.g., 99.99)
            </small>
          </div>
          
          <div className="formGroup checkbox">
            <label htmlFor="inStock">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
              In Stock
            </label>
          </div>
          
          <div className="formActions">
            <button type="submit" className="saveBtn">Save Changes</button>
            <button type="button" onClick={() => navigate("/products")} className="cancelBtn">Cancel</button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default ProductEdit;
