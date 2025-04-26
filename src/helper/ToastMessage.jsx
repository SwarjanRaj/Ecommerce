import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const ToastMessage = forwardRef((_, ref) => {
    const toast = useRef(null);

    useImperativeHandle(ref, () => ({
        showSuccess: (message) => {
            toast.current.show({ severity: "success", summary: "Success", detail: message, life: 3000 });
        },
        showError: (message) => {
            toast.current.show({ severity: "error", summary: "Error", detail: message, life: 3000  });
        },
        showMultipleErrors: (errors) => {
            const errorMessages = errors.map((error, index) => ({
                severity: "error",
                summary: `Error ${index + 1}`,
                detail: error,
                life: 4000,
            }));
            toast.current.show(errorMessages);
        },
    }));

    return <Toast ref={toast} />;
});

export default ToastMessage;
