import React from "react";
import { Skeleton } from "primereact/skeleton";  // Ensure you have PrimeReact installed

const Innerpagebaner = ({ image = null, category = null }) => {
    return (
        <div 
            className="page-title bg-cool" 
            style={{ backgroundImage: `url(${image ? image : '../assets/images/1.png'})` }}
        >
            <div className="container-full">
                <div className="row">
                    <div className="col-12">
                        <h3 className="heading text-center">
                            {category ? category.toUpperCase() : <Skeleton width="200px" />}
                        </h3>
                        <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                            <li>
                                <a className="link" href="/">{"Homepage".toUpperCase()}</a>
                            </li>
                            <li>
                                <i className="pi pi-angle-double-right"></i>
                            </li>
                            <li>
                                {category ?category.toUpperCase() : <Skeleton width="150px" />}
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Innerpagebaner;
