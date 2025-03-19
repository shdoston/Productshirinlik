import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import OrderConfirmed from "./OrderConfirmend";
import { confirmOrder, hideOrderConfirmed } from "../app/features/cartSlice";

function YourCart() {
  const dispatch = useDispatch();
  const {
    selectedDesserts: cartItems,
    totalAmount,
    totalPrice,
    orderConfirmed,
  } = useSelector((state) => state.cart);

  const handleCloseModal = () => dispatch(hideOrderConfirmed());
  const handleConfirmOrder = () => dispatch(confirmOrder());

  return (
    <div className="your-cart-container">
      <h2>Your Cart ({totalAmount})</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src="./images/illustration-empty-cart.svg" alt="Empty Cart" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="order-summary">
            <div className="order-total">
              <h3>Order Total</h3>
              <h2 className="order-price">${totalPrice.toFixed(2)}</h2>
            </div>
            <div className="neutral">
              <img
                src="./images/icon-carbon-neutral.svg"
                alt="Carbon Neutral"
              />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <button onClick={handleConfirmOrder} className="order-btn">
              Confirm Order
            </button>
          </div>
        </>
      )}
      {orderConfirmed && (
        <OrderConfirmed
          items={cartItems}
          totalPrice={totalPrice}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default YourCart;
