import React from 'react';


const Marquee = () => {
    const marqueeItems = [
        { text: 'Free shipping on all orders over $20.00', icon: 'icon-lightning-line' },
        { text: 'Returns are free within 14 days', icon: 'icon-lightning-line' },
        // Repeat the items as needed
    ];

    // Duplicate the items to create a continuous effect
    const itemsToDisplay = [...marqueeItems, ...marqueeItems, ...marqueeItems];

    return (
        <section className="tf-marquee">
            <div className="marquee-wrapper">
                <div className="initial-child-container">
                    {itemsToDisplay.map((item, index) => (
                        <div className="marquee-child-item" key={index}>
                            <p className="text-btn-uppercase">{item.text}</p>
                            <span className={`icon ${item.icon}`}></span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Marquee;