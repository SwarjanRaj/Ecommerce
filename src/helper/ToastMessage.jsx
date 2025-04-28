import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Create a context
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastMessage = ({ children }) => {
    const toastRef = useRef(null);

    const showSuccess = (message) => {
        toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: message,
            life: 3000,
        });
    };

    const showError = (message) => {
        toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: message,
            life: 3000,
        });
    };

    const showMultipleErrors = (errors) => {
        const errorMessages = errors.map((error, index) => ({
            severity: "error",
            summary: `Error ${index + 1}`,
            detail: error,
            life: 4000,
        }));
        toastRef.current?.show(errorMessages);
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showMultipleErrors }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
};

export default ToastMessage;
