import { useState, useEffect, useContext } from "react";
import { useToast } from "../../helper/ToastMessage";
import Preloader from "../../helper/pre";
import AddressForm from "../../components/Dashboard/AddressForm";
const Address = () => {
    const { showSuccess, showError } = useToast();
    const [loading, setLoading] = useState(false); // loading state added
    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <div className="w-100">
                    <AddressForm/>
                </div>
            )}
        </>
    );
};

export default Address;
