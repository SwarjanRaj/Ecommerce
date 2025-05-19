const BASE_URL = "https://lqo22sllk8.execute-api.ap-south-1.amazonaws.com/Prod/api/Astrashwa/";
const AUTH_URL = "https://lqo22sllk8.execute-api.ap-south-1.amazonaws.com/Prod/api/";

const API_ENDPOINTS = {
    REGISTER: `${AUTH_URL}customer/register`,
    LOGIN: `${AUTH_URL}customer/login`,
    GETUSERBYID: `${AUTH_URL}customer/id`,
    UPDATEUSERBYID: `${AUTH_URL}customer/id`,
    COUPON: `${AUTH_URL}coupon/apply`,

    PASSWORD: `${AUTH_URL}customer/update-password`,

    // ORDER
    ORDER: `${AUTH_URL}checkout/order`,
    RETURN: `${AUTH_URL}checkout/request-return`,
    GETCOUPON: `${BASE_URL}coupons`,
    RETURNORDER: `${AUTH_URL}customer/request-return`,


    CATEGORYLIST:`${BASE_URL}category/website/headers`,
    SUBCATEGORYLIST: `${BASE_URL}sub-category/website/get-subcategories`,
    CATEGORYLISTHOME : `${BASE_URL}category/website/get-all-categories-with-images`,
    PRODUCTSWITHCATEGORY : `${BASE_URL}website/home/get-products-with-all-category`,
    CATEGORYSLUGPRODUCTS : `${BASE_URL}product/website/product-by-category-slug`,
    CATEGORYIDPRODUCTS : `${BASE_URL}product/website/product-by-category-id/`,
    PRODUCTSWITHSLUG : `${BASE_URL}website/product`,
    SUBCATEGORIESBYCATEGORY:`${BASE_URL}website/home/sub-category/`,
    BESTSELLER: `${BASE_URL}website/product/best-sellers`,
    NEWLAUNCH: `${BASE_URL}website/product/new-launch`,
    SUBCATEGORIESPRODUCT:`${BASE_URL}product/website/product-by-sub-category-slug`,

    // Cart
    GETCART :`${AUTH_URL}cart`,
    CARTPRODUCTINCREASE:`${AUTH_URL}cart/increase-quantity`,
    CARTPRODUCTDECREASE:`${AUTH_URL}cart/reduce-quantity`,
    CHECKOUTDATA:`${AUTH_URL}checkout`,
    GETCARTNOTOKEN:`${BASE_URL}get-cart`,

    //cms
    BANNERS:`${BASE_URL}cms/banner`,

};

export { BASE_URL, API_ENDPOINTS };
