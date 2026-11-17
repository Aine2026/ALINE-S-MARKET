
import {
  Minus,
  Plus,
  Trash2,
  X
} from "lucide-react";

export default function CartPanel({
  open,
  onClose,
  cart,
  onChangeQty,
  onRemove
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >

      <aside className="cart-panel">

        <div className="cart-heading">

          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <h2>Your cart</h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <span>🛍️</span>
            <h3>Your cart is waiting</h3>

            <p>
              Add something lovely from the shop.
            </p>

            <button
              className="primary-button"
              onClick={onClose}
            >
              Continue shopping
            </button>
          </div>

        ) : (

          <>
            <div className="cart-items">

              {cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="cart-item-info">

                    <h3>{item.title}</h3>

                    <strong>
                      ${item.price.toFixed(2)}
                    </strong>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          onChangeQty(item.id, -1)
                        }
                      >
                        <Minus size={13} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          onChangeQty(item.id, 1)
                        }
                      >
                        <Plus size={13} />
                      </button>

                      <button
                        className="remove-button"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="cart-summary">

              <div>
                <span>Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <p>
                Delivery and payment details are
                confirmed at checkout.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  alert(
                    "Thank you! This is a demo store. Contact Aline to arrange an order."
                  )
                }
              >
                Continue to checkout
              </button>

            </div>
          </>

        )}

      </aside>

    </div>
  );
}
