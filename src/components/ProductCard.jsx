
import {
  ShoppingCart,
  Star
} from "lucide-react";

export default function ProductCard({
  product,
  onAdd
}) {
  return (
    <article className="product-card">

      <div className="product-image-wrap">

        <span className="product-category">
          {product.category}
        </span>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
        />

      </div>

      <div className="product-info">

        <div className="rating">
          <Star size={14} fill="currentColor" />

          {product.rating?.rate ?? "New"}

          <span>
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <h3>{product.title}</h3>

        <div className="product-bottom">

          <strong>
            ${Number(product.price).toFixed(2)}
          </strong>

          <button
            className="add-button"
            onClick={() => onAdd(product)}
          >
            <ShoppingCart size={17} />
            Add
          </button>

        </div>

      </div>
    </article>
  );
}
