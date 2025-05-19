import React, { useEffect, useState } from "react";
import Innerpagebaner from "../../components/Innerpagebaner";
import CartPage from "../../components/cart/CartPage";
import {
  CARTDATA,
  increaseQuantity,
  decreaseQuantity,
  DeleteCartProduct,
} from "../../API/cart";
import { useToast } from "../../helper/ToastMessage";
const WebsiteCart = () => {
  const { showSuccess, showError } = useToast();

  const [CartProducts, setCartProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;
  const [amount, setAmount] = useState();
  const [cartId, setCartId] = useState('');

  const loadProduct = async () => {
    try {
      const res = await CARTDATA();
      setCartProducts(res.data);
      setAmount(res.Amount);
      if (res.data?.length) {
        setCartId(res.data[0].SK);
      }
    } catch (err) {
      console.error("Error loading cart data", err);
      showError("Cart Empty");
    }
  };

  useEffect(() => {
    loadProduct();
  }, [isLoggedIn]);

  const updateLocalStorage = (cart) => {
    const minimalCart = cart.map(({ productId, size, quantity }) => ({
      productId,
      size,
      quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(minimalCart));
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.pricing.finalPrice * item.quantity, 0);
  };

  const handleQuantityChange = async (productId, size, stockCount, action) => {
    const updatedCart = CartProducts.map((item) => {
      if (item.productId === productId && item.size === size) {
        let newQty = Number(item.quantity) || 1;
  
        if (action === "increase") {
          newQty = Math.min(newQty + 1, stockCount);
        } else {
          console.log(newQty,"0")
          newQty = Math.max(newQty - 1, 1);
          console.log(newQty,"0")
        }
  
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartProducts(updatedCart);
    const newTotal = calculateTotal(updatedCart);
    setAmount((prevAmount) => ({
      ...prevAmount,
      cartTotal: newTotal,
      discountTotal: 0,
    }));

    if (isLoggedIn) {
      try {
        if (action === "increase") {
        const res= await increaseQuantity(productId, size);
          console.log(res)
        } else  {
          await decreaseQuantity(productId, size);
        }
        await loadProduct();
      } catch (err) {
        showError("Failed to update quantity. Please try again.");
      }
    } else {
      updateLocalStorage(updatedCart);
    }
  };

  const handleRemoveItem = async (productId, size) => {
    const updatedCart = CartProducts.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    setCartProducts(updatedCart);
    const newTotal = calculateTotal(updatedCart);
    setAmount((prevAmount) => ({
      ...prevAmount,
      cartTotal: newTotal,
      discountTotal: 0,
    }));

    if (isLoggedIn) {
      try {
        await DeleteCartProduct(productId, size);
        await loadProduct();
      } catch (err) {
        showError("Failed to remove item. Please try again.");
      }
    } else {
      updateLocalStorage(updatedCart);
    }
  };
console.log(amount)
  return (
    <>
      <Innerpagebaner image="../assets/images/1.png" category="Shopping Cart" />
      <CartPage
        cart={CartProducts}
        amount={amount}
        setAmount={setAmount}
                onIncreaseQuantity={(productId, size, stockCount) =>
          handleQuantityChange(productId, size, stockCount, "increase")
        }
        onDecreaseQuantity={(productId, size) =>
          handleQuantityChange(productId, size, "decrease")
        }
        onRemoveItem={handleRemoveItem}
        isLoggedIn={isLoggedIn}
        cartId={cartId}
      />
    </>
  );
};

export default WebsiteCart;
