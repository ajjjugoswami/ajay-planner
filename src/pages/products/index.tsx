import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function DashboardPage() {
  const [showProducts, setShowProducts] = useState<boolean | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Load toggle state from localStorage on client side only
  useEffect(() => {
    const saved = localStorage.getItem("showProducts");
    setShowProducts(saved === "true");
  }, []);

  // Save toggle state to localStorage on change
  useEffect(() => {
    if (showProducts !== null) {
      localStorage.setItem("showProducts", showProducts.toString());
    }
  }, [showProducts]);

  // Fetch users
  const fetchUsers = () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch((err) => {
        setErrorUsers(err.message);
        setLoadingUsers(false);
      });
  };

  // Fetch products
  const fetchProducts = () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    return fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoadingProducts(false);
      })
      .catch((err) => {
        setErrorProducts(err.message);
        setLoadingProducts(false);
      });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  // Sync handler
  const handleSync = async () => {
    setSyncing(true);
    try {
      if (showProducts) {
        await fetchProducts();
      } else {
        await fetchUsers();
      }
    } finally {
      setSyncing(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showProducts === null) {
    return (
      <p style={{ textAlign: "center", padding: 20, fontSize: 18 }}>
        Loading...
      </p>
    );
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        {showProducts ? "Products" : "Users"} Dashboard
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setShowProducts((prev) => !prev)}
          style={{
            padding: "10px 25px",
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            backgroundColor: showProducts ? "#0070f3" : "#ccc",
            color: showProducts ? "#fff" : "#333",
            transition: "background-color 0.3s ease",
          }}
          aria-pressed={showProducts}
          disabled={syncing}
        >
          {showProducts ? "Show Users" : "Show Products"}
        </button>

        <button
          onClick={handleSync}
          disabled={syncing}
          title="Sync current data"
          style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            cursor: syncing ? "not-allowed" : "pointer",
            backgroundColor: syncing ? "#999" : "#28a745",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          aria-busy={syncing}
        >
          {syncing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "auto", background: "none", display: "block" }}
              width="20"
              height="20"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              className="lds-spinner"
            >
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#fff"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;502"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dasharray"
                  values="150.6 100.4;1 250;150.6 100.4"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          ) : (
            "Sync"
          )}
        </button>
      </div>

      <input
        type="text"
        placeholder={`Search ${showProducts ? "products" : "users"}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 400,
          margin: "0 auto 2rem auto",
          padding: "10px 15px",
          fontSize: 16,
          borderRadius: 6,
          border: "1.5px solid #ccc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        disabled={syncing}
      />

      {showProducts ? (
        loadingProducts ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : errorProducts ? (
          <p style={{ textAlign: "center", color: "red" }}>
            Error: {errorProducts}
          </p>
        ) : filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No products found.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 20,
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
                <h2 style={{ margin: "0 0 8px 0", color: "#0070f3" }}>
                  {product.title}
                </h2>
                <p style={{ fontWeight: "bold" }}>Price: ₹{product.price}</p>
              </div>
            ))}
          </div>
        )
      ) : loadingUsers ? (
        <p style={{ textAlign: "center" }}>Loading users...</p>
      ) : errorUsers ? (
        <p style={{ textAlign: "center", color: "red" }}>Error: {errorUsers}</p>
      ) : filteredUsers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No users found.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "1rem",
                borderRadius: 8,
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.2s",
              }}
              tabIndex={0}
              onFocus={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onBlur={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 style={{ margin: "0 0 8px 0", color: "#0070f3" }}>
                {user.name}
              </h2>
              <p style={{ margin: "4px 0" }}>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Website:</strong>{" "}
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
