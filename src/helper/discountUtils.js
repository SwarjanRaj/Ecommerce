import { APPLYCOUPON } from "../API/cart";

export async function applyDiscount({
  discountCode,
  isLoggedIn,
  cartId,
  amount,
  onCouponApplied,
  setMessage,
  setMessageType,
  setCouponApplied,
  setApplying,
}) {
  if (!discountCode) {
    setMessage("Please enter or select a coupon code.");
    setMessageType("error");
    return;
  }
  const payload = isLoggedIn
    ? { couponCode: discountCode, cartId, companyName: "Astrashwa" }
    : { couponCode: discountCode, amount, companyName: "Astrashwa" };
  try {
    setApplying(true);
    console.log("Applying coupon with code:", discountCode); // Debugging line

    const response = await APPLYCOUPON(payload);
    console.log(response);
    if (response?.success && response.data) {
      const couponResponseData = {
        couponDiscount: response.data.couponDiscount,
        deliveryFee: response.data.deliveryFee,
        isApplicable: response.data.isApplicable,
        totalDiscountAmount: response.data.totalDiscountAmount,
        totalPriceWithDiscount: response.data.totalPriceWithDiscount,
        totalPriceWithOutDiscount: response.data.totalPriceWithOutDiscount,
      };
      onCouponApplied?.(couponResponseData);
      setCouponApplied(true);
      setMessage(response?.message);
      setMessageType("success");
      localStorage.setItem("discountCode", discountCode);
    } else {
      setMessage(response?.message);
      setMessageType("error");
      setCouponApplied(false);
      onCouponApplied?.({
        couponDiscount: 0,
        deliveryFee: 0,
        isApplicable: true,
        totalDiscountAmount: 0,
        totalPriceWithDiscount: amount,
        totalPriceWithOutDiscount: amount,
      });
    }
  } catch (error) {
    console.error(error);
    setMessage(error.message || "Something went wrong.");
    setMessageType("error");
    setCouponApplied(false);
    onCouponApplied?.({
      couponDiscount: 0,
      deliveryFee: 0,
      isApplicable: true,
      totalDiscountAmount: 0,
      totalPriceWithDiscount: amount,
      totalPriceWithOutDiscount: amount,
    });
  } finally {
    setApplying(false);
  }
}
