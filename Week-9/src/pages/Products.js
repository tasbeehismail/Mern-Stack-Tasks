import React, { useState } from "react";

const products = [
  { id: 1, title: "Floral Hair Clips", price: 10, category: "Accessories" },
  { id: 2, title: "Sparkly Headband", price: 15, category: "Accessories" },
  { id: 3, title: "Cute Backpack", price: 40, category: "Bags" },
  { id: 4, title: "Colorful Scrunchies", price: 8, category: "Accessories" },
  { id: 5, title: "Glitter Phone Case", price: 12, category: "Accessories" },
  { id: 6, title: "Unicorn Notebook", price: 7, category: "Stationery" },
  { id: 7, title: "Rainbow Socks", price: 6, category: "Clothing" },
  { id: 8, title: "Starry Night Lamp", price: 25, category: "Home Decor" },
  { id: 9, title: "Bubblegum Lip Gloss", price: 5, category: "Beauty" },
  { id: 10, title: "Butterfly Earrings", price: 12, category: "Jewelry" },
  { id: 11, title: "Pink Water Bottle", price: 10, category: "Accessories" },
  { id: 12, title: "Cute Stickers Pack", price: 4, category: "Stationery" },
  { id: 13, title: "Fluffy Slippers", price: 18, category: "Footwear" },
  { id: 14, title: "Glow-in-the-Dark Stars", price: 9, category: "Home Decor" },
  { id: 15, title: "Pastel Nail Polish Set", price: 14, category: "Beauty" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("asc");

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.category === category
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="container">
      <h1>Our Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Accessories">Accessories</option>
          <option value="Bags">Bags</option>
          <option value="Stationery">Stationery</option>
          <option value="Clothing">Clothing</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Beauty">Beauty</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Footwear">Footwear</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;