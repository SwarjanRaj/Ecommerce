import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if the body has the class "preload-wrapper"
        if (document.body.classList.contains("preload-wrapper")) {
            const timer = setTimeout(() => {
                setIsLoading(false); // Hide the preloader after 100ms
            }, 100);

            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {isLoading && (
                <div className="preload preload-container">
                    <div className="preload-logo">
                        <div className="spinner"></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Preloader;