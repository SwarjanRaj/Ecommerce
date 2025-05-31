import React, { useState, useEffect } from 'react';

const AddressForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        label: 'Home',
        line1: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        country: 'India',
    });
    const [formErrors, setFormErrors] = useState({});
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setFormErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.line1) errors.line1 = 'Address Line 1 is required';
        if (!formData.pincode.match(/^\d{6}$/)) errors.pincode = 'Pincode must be 6 digits';
        if (!formData.city) errors.city = 'City is required';
        if (!formData.state) errors.state = 'State is required';
        if (!formData.landmark) errors.landmark = 'Landmark is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log('Submitted Data:', formData);
        setShowForm(false);
    };

    useEffect(() => {
        if (formData.pincode.length === 6) {
            fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
                .then((res) => res.json())
                .then((data) => {
                    const details = data[0];
                    if (details.Status === 'Success') {
                        const location = details.PostOffice[0];
                        setFormData((prev) => ({
                            ...prev,
                            city: location.District,
                            state: location.State,
                        }));
                    }
                })
                .catch((err) => console.error('Pincode API error:', err));
        }
    }, [formData.pincode]);

    const fetchLiveLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    const address = data.address || {};
                    setFormData((prev) => ({
                        ...prev,
                        line1: data.display_name || '',
                        city: address.city || address.town || '',
                        state: address.state || '',
                        country: address.country || 'India',
                        pincode: address.postcode || '',
                    }));
                } catch (error) {
                    console.error('Location fetch error:', error);
                    alert('Error fetching location details. Please try again.');
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                setLoadingLocation(false);
                if (error.code === error.PERMISSION_DENIED) {
                    alert('Location access denied. Please enable it in browser/device settings.');
                    if (navigator.userAgent.includes('Android')) {
                        window.open('intent://settings#Intent;scheme=android.settings.LOCATION_SOURCE_SETTINGS;end');
                    }
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    alert('Location is unavailable. Please enable GPS/location.');
                } else {
                    alert('Failed to get location. Please try again.');
                }
            }
        );
    };


    return (
        <div className="account-address">
            <div className="text-center widget-inner-address">
                <div>
                    {!showForm && (
                        <button
                            className="tf-btn btn-fill radius-4 mb_20 btn-address"
                            onClick={() => setShowForm(true)}
                        >
                            <span className="text text-caption-1">Add a new address</span>
                        </button>
                    )}

                    {showForm && (
                        <form
                            className="show-form-address wd-form-address"
                            onSubmit={handleSubmit}
                            style={{ display: 'block' }}
                        >
                            <div className="title">Add a new address</div>

                            <div className="mb_20">
                                <h6 style={{ textAlign: "left", fontWeight: "bold", fontSize: "16px" }}>
                                    Address Type:
                                </h6>
                                <div className="d-flex gap-20 mt-2">
                                    {['Home', 'Work', 'Other'].map((type) => (
                                        <label key={type}>
                                            <input
                                                type="radio"
                                                className="me-2"
                                                name="label"
                                                value={type}
                                                checked={formData.label === type}
                                                onChange={handleChange}
                                            />{' '}
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="row">
                                <fieldset className="mb_20 col-lg-12">
                                    <input
                                        type="text"
                                        name="line1"
                                        placeholder="Address Line 1"
                                        value={formData.line1}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.line1 ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.line1 && <div className="invalid-feedback">{formErrors.line1}</div>}
                                </fieldset>

                                <fieldset className="mb_20 col-lg-6">
                                    <input
                                        type="text"
                                        name="landmark"
                                        placeholder="Landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.landmark ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.landmark && <div className="invalid-feedback">{formErrors.landmark}</div>}
                                </fieldset>

                                <fieldset className="mb_20 col-lg-6">
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.pincode ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.pincode && <div className="invalid-feedback">{formErrors.pincode}</div>}
                                </fieldset>

                                <fieldset className="mb_20 col-lg-6">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
                                </fieldset>

                                <fieldset className="mb_20 col-lg-6">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.state && <div className="invalid-feedback">{formErrors.state}</div>}
                                </fieldset>

                                <div className="tf-select mb_20 col-lg-6">
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="India">India</option>
                                    </select>
                                </div>
                            </div>


                            <div className="d-flex justify-content-start gap-10 mb_20">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-warning btn-outline radius-4"
                                    onClick={fetchLiveLocation}
                                    disabled={loadingLocation}
                                >
                                    {loadingLocation ? '📍 Fetching Location...' : '📍 Use My Location'}
                                </button>
                            </div>


                            <div className="d-flex align-items-center justify-content-center gap-20">
                                <button type="submit" className="tf-btn btn-fill radius-4">
                                    <span className="text">Add address</span>
                                </button>
                                <span
                                    className="tf-btn btn-fill radius-4 btn-hide-address"
                                    onClick={() => setShowForm(false)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className="text">Cancel</span>
                                </span>
                            </div>
                        </form>
                    )}
                </div>

                {/* Static address list */}
                <div className="list-account-address">
                    <div className="account-address-item">
                        <h6 className="mb_20">Default</h6>
                        <p>themesflat</p>
                        <p>1234 Fashion Street, Suite 567</p>
                        <p>New York</p>
                        <p>themesflat.com</p>
                        <p className="mb_10">(212) 555-1234</p>
                        <div className="d-flex gap-10 justify-content-center">
                            <button className="tf-btn radius-4 btn-fill btn-edit-address">
                                <span className="text">Edit</span>
                            </button>
                            <button className="tf-btn radius-4 btn-outline btn-delete-address">
                                <span className="text">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
