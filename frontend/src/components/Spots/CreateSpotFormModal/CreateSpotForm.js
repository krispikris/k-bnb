import    React, { useEffect, useState }            from "react";
import  { useDispatch }                             from "react-redux";
import  { useHistory }                              from "react-router-dom";
import  { createSpotThunk, createSpotImageThunk, getOneSpotThunk }   from "../../../store/spots";
import                                                   "./CreateSpotFormModal.css";

const CreateSpotForm = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress]             = useState('');
    const [city, setCity]                   = useState('');
    const [state, setState]                 = useState('');
    const [country, setCountry]             = useState('');
    const [name, setName]                   = useState('');
    const [description, setDescription]     = useState('');
    const [price, setPrice]                 = useState('');
    const [imageURL, setimageURL]           = useState('');

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

        if (!imageURL || !imageURL.match(/\/{2}.+?\.(jpg|png|gif|jpeg)/gm)) {
            errors.push('Please enter valid image url.');
        }
        setValidationErrors(errors);
    }, [address, city, state, country, name, description, price, imageURL]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return
            const spotFormInputs = {
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price
            };


        const newSpot = await dispatch(createSpotThunk(spotFormInputs));

        // console.log('THIS IS THE NEW SPOT SHOULD BE AN OBJECT :', newSpot);

        if (newSpot) {
            const img = ({
                url: imageURL,
                preview: true
            })

            await dispatch(createSpotImageThunk(img, newSpot.id))
            await dispatch(getOneSpotThunk(newSpot.id))
            setShowModal(false)
            return history.push(`/spots/${newSpot.id}`);
        };
    };

return (
    <form
        className='create-new-spot-form'
        onSubmit={handleSubmit}
        >

      <div className='errors-create-spot-form'>
        {validationErrors.length > 0 && (
            <ul className='create-spot-errors'>
                {validationErrors.map(e => (
                    <li key={e}>{e}</li>
                ))}
            </ul>
        )}
      </div>

      <label id='become-a-host-form-title'>BECOME A HOST</label>
      <label id="welcome-back-to-treebnb-host">Welcome back to Treebnb!</label>

        <label id="host-input-title">Address</label>
            <input id="host-form-inputs"
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            />

        <label id="host-input-title">City</label>
            <input id="host-form-inputs"
            type="text"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            />

        <label id="host-input-title">State</label>
            <input id="host-form-inputs"
            type="text"
            name="state"
            value={state}
            onChange={e => setState(e.target.value)}
            />

        <label id="host-input-title">Country</label>
            <input id="host-form-inputs"
            type="text"
            name="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            />

        <label id="host-input-title">Name</label>
            <input id="host-form-inputs"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            />

        <label id="host-input-title">Description</label>
            <input id="host-form-inputs"
            type="text"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

        <label id="host-input-title">Price</label>
            <input id="host-form-inputs"
            type="text"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            />

        <label id="host-input-title">Upload Image URL</label>
            <input id="host-form-inputs"
            type="url"
            name="imageURL"
            value={imageURL}
            onChange={e => setimageURL(e.target.value)}
            />

        <button className='host-submit-button' type="submit">Become a Host</button>

        </form>
    )
}

export default CreateSpotForm;
