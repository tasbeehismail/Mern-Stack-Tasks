import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../pages/cartSlice";

const products = [
  {
    id: 1,
    title: "Floral Hair Clips",
    price: 10,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/51HzPYdodPL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 2,
    title: "Sparkly Headband",
    price: 15,
    category: "Accessories",
    image: "https://cdn-img.prettylittlething.com/4/6/b/0/46b0dd06f5282bd98768054f5355398255649a54_CNI6559_1_brushworks_black_cloud_headband.jpg?imwidth=2048",
  },
  {
    id: 3,
    title: "Cute Backpack",
    price: 40,
    category: "Bags",
    image: "https://i.etsystatic.com/18280119/r/il/b4d407/6640108606/il_680x540.6640108606_ob67.jpg",
  },
  {
    id: 4,
    title: "Colorful Scrunchies",
    price: 8,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/61yI32jv+ML._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 5,
    title: "Glitter Phone Case",
    price: 12,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/71pllkJ892L._AC_UY436_FMwebp_QL65_.jpg",
  },
  {
    id: 6,
    title: "Unicorn Notebook",
    price: 7,
    category: "Stationery",
    image: "https://m.media-amazon.com/images/I/715rBqSVAVL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 7,
    title: "Rainbow Socks",
    price: 6,
    category: "Clothing",
    image: "https://i.pinimg.com/474x/44/5a/a7/445aa70d92c367c895686253b81f87eb.jpg",
  },
  {
    id: 8,
    title: "Starry Night Lamp",
    price: 25,
    category: "Home Decor",
    image: "https://i5.walmartimages.com/asr/9919e268-64dc-4615-a3ae-2c485eab2ca7.adbf9bfacee1171c56e79e30ae984d6b.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    id: 9,
    title: "Bubblegum Lip Gloss",
    price: 5,
    category: "Beauty",
    image: "https://m.media-amazon.com/images/I/71Er45aMybL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 10,
    title: "Butterfly Earrings",
    price: 12,
    category: "Jewelry",
    image: "https://m.media-amazon.com/images/I/81Tcnspjl-L._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 11,
    title: "Pink Water Bottle",
    price: 10,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/51bhuWp4FbL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 12,
    title: "Cute Stickers Pack",
    price: 4,
    category: "Stationery",
    image: "https://m.media-amazon.com/images/I/81WeGF07shL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 13,
    title: "Fluffy Slippers",
    price: 18,
    category: "Footwear",
    image: "https://m.media-amazon.com/images/I/71H7zu5rntL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 14,
    title: "Glow-in-the-Dark Stars",
    price: 9,
    category: "Home Decor",
    image: "https://m.media-amazon.com/images/I/81LL6W7areS._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 15,
    title: "Pastel Nail Polish Set",
    price: 14,
    category: "Beauty",
    image: "https://m.media-amazon.com/images/I/61QuHj799jL._SX679_.jpg",
  },
];


const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("asc");
  const dispatch = useDispatch();

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.category === category
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
    alert(`${product.title} added to cart!`);
  };

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
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;