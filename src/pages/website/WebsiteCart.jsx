import React, { useEffect, useState,useRef  } from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import CartPage from "../../components/cart/CartPage";
import { CARTDATA, increaseQuantity, decreaseQuantity, DeleteCartProduct ,POSTCATACART  } from "../../API/cart";

const WebsiteCart = () => {
  const toastRef = useRef();

  const [CartProducts, setCartProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;
  const [amount , setAmount] = useState({})

  const loadProduct = async () => {
    try {
      const res = await CARTDATA();
      setCartProducts(res.data);
      setAmount(res.Amount);
    } catch (err) {
      console.error("Error loading cart data", err);
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

  const handleIncreaseQuantity = async (productId, size , stockCount) => {
    const maxStock = 10;
    const updatedCart = CartProducts.map((item) => {
      if (item.productId === productId && item.size === size) {
        const currentQty = Number(item.quantity) || 0;
        return {
          ...item,
          quantity: Math.min(currentQty + 1, maxStock),
        };
      }
      return item;
    });

    setCartProducts(updatedCart);

    if (isLoggedIn) {
      await increaseQuantity(productId, size);
      await loadProduct(); // Fetch updated cart and amount

    } else {
      updateLocalStorage(updatedCart);
    }
  };

  const handleDecreaseQuantity = async (productId, size) => {
    const updatedCart = CartProducts.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );

    setCartProducts(updatedCart);

    if (isLoggedIn) {
      await decreaseQuantity(productId, size);
      await loadProduct(); // Fetch updated cart and amount

    } else {
      updateLocalStorage(updatedCart);
    }
  };

  const handleRemoveItem = async (productId, size) => {
    const updatedCart = CartProducts.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    setCartProducts(updatedCart);
  
    if (isLoggedIn) {
      await DeleteCartProduct(productId, size);
      await loadProduct(); // Fetch updated cart and amount

    } else {
      updateLocalStorage(updatedCart);
    }
  };
  

  return (
    <>
      <Navbar />
      <Innerpagebaner image="../assets/images/innerbg.png" category="Shopping Cart" />
      <CartPage
        cart={CartProducts}
        amount={amount}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
        toastRef={toastRef}
        isLoggedIn={isLoggedIn}
      />
      <CartPop />
      <FooterToolbar />
      <Footer />
    </>
  );
};

export default WebsiteCart;
