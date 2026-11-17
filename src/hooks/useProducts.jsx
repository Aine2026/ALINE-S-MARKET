
import { useEffect, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts(signal) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);

      setCategories([
        "all",
        ...new Set(data.map((product) => product.category))
      ]);

    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          "Unable to load products. Check your internet connection."
        );
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  function reload() {
    const controller = new AbortController();
    loadProducts(controller.signal);
  }

  return {
    products,
    categories,
    loading,
    error,
    reload
  };
}
