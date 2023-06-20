// frontend/src/components/UpdateSpotModal/UpdateSpotForm.js
import    React, { useEffect, useState }    from "react";
import  { useDispatch, useSelector }        from "react-redux";
import  { useParams }                       from "react-router-dom";
import  { updateSpotThunk }                 from "../../../store/spots";
import                                           "./UpdateSpotFormModal.css";

const UpdateSpotForm = ({setShowModal}) => {
    const dispatch                          = useDispatch();
    const { spotId }                        = useParams();

    const spot = useSelector(state => state.spots[parseInt(spotId)]);

    const [address, setAddress]             = useState(spot.address);
    const [city, setCity]                   = useState(spot.city);
    const [state, setState]                 = useState(spot.state);
    const [country, setCountry]             = useState(spot.country);
    const [name, setName]                   = useState(spot.name);
    const [description, setDescription]     = useState(spot.description);
    const [price, setPrice]                 = useState(spot.price);
    // const [imageURL, setimageURL]           = useState(spot.imageURL);

    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (!address || address.length < 5 || address.length > 30) {
            errors.push('Please enter valid address. Address must be more than 5 and less than 30 characters.');
        }

        if (!city || city.length < 2 || city.length > 30) {
            errors.push('Please enter valid city. City must be more than 2 and less than 30 characters.');
        }

        if (!state || state.length < 1 || state.length > 30) {
            errors.push('Please enter valid state. State must be more than 1 and less than 30 characters.');
        }
        if (!country || country.length < 2 || country.length > 30) {
            errors.push('Please enter valid country. Country must be more than 2 and less than 30 characters.');
        }

        if (!name || name.length < 5 || name > 40) {
            errors.push('Please enter valid name. Name must be more than 5 and less than 40 characters.');
        }
        if (!description || description.length < 5 || description.length > 256) {
            errors.push('Please enter valid description. Description must be more than 5 and less than 256 characters.');
        }
        if (!price || !Number(price) || price < 50) {
            errors.push('Please enter valid price. Price must be a number and greater than 50.');
        }

        // if (!imageURL || !imageURL.match(/\/{2}.+?\.(jpg|png|gif|jpeg)/gm)) {
        //     errors.push('Please enter valid image url.');
        // }
        setValidationErrors(errors);
    }, [address, city, state, country, name, description, price]);
    // }, [address, city, state, country, name, description, price, imageURL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return

        let updatedSpotFormInputs = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        };

        await dispatch(updateSpotThunk(updatedSpotFormInputs, spotId));
        setShowModal(false);
    };

return (
    <form
        className='update-spot-form'
        onSubmit={handleSubmit}
        >

      <div className='errors-update-spot-form'>
        {validationErrors.length > 0 && (
            <ul className='update-spot-errors'>
                {validationErrors.map(e => (
                    <li key={e}>{e}</li>
                ))}
            </ul>
        )}
      </div>

        <label id="update-spot-title">UPDATE YOUR SPOT</label>

        <label id="update-spot-input-title">Address</label>
            <input id="update-spot-input"
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            />

        <label id="update-spot-input-title">City</label>
            <input id="update-spot-input"
            type="text"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            />

        <label id="update-spot-input-title">State</label>
            <input id="update-spot-input"
            type="text"
            name="state"
            value={state}
            onChange={e => setState(e.target.value)}
            />

        <label id="update-spot-input-title">Country</label>
            <input id="update-spot-input"
            type="text"
            name="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            />

        <label id="update-spot-input-title">Name</label>
            <input id="update-spot-input"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            />

        <label id="update-spot-input-title">Description</label>
            <input id="update-spot-input"
            type="text"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

        <label id="update-spot-input-title">Price</label>
            <input id="update-spot-input"
            type="text"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            />

        <button id="update-spot-submit" type="submit">Update Spot</button>

        </form>
    )
};

export default UpdateSpotForm;
