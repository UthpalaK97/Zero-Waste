import React, {useEffect, useState} from "react";
import '../posts/Form.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Slide, toast, ToastContainer} from "react-toastify";
import emailjs from "emailjs-com";
import StarRating from "../posts/Ratings"
import StartRating from "../posts/Ratings";

function CompanyForms() {

    const { postId, companyId } = useParams();
    console.log(postId, companyId);

    const buyerId=(localStorage.getItem("userId"));
    const buyerName=(localStorage.getItem("userName"));
    console.log(buyerId, buyerName);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingCompanyOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId);
    console.log(wasteItem);

    const wasteItemLength = wasteItem.length;
    console.log(wasteItemLength);

    let quantity=0;

    for (let i = 0; i < wasteItemLength; i++) {
        quantity += wasteItem[i].quantity
    }

    console.log(quantity);

    const [posts, setPosts] = useState({});

    const userName=(localStorage.getItem("userName"));
    const userEmail=(localStorage.getItem("userEmail"));
    console.log(userName);
    console.log(userEmail);

    useEffect(()=>{
        getOnePost();
    }, []);

    const getOnePost = async () => {
        try {
            const response = await axios.get(`/buyerGetOneCompanyPost/${postId}`)
            console.log(response);
            const allPost=response.data.onePost;
            setPosts(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(posts);

    const apiUrl = '/addCompanyOffer';
    const initialValues = {
        value: '',
        expiryDate: '',
        collectingDate: '',
        collectingTime: '',
        quantity: '',
        status:'',
        buyerId: '',
        postId:'',
        companyId:'',
        companyName:'',
        buyerName:''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    const submitForm = () => {
        const data = {
            value:formValues.value,
            expiryDate:formValues.expiryDate,
            collectingDate:formValues.collectingDate,
            collectingTime:formValues.collectingTime,
            quantity:formValues.quantity,
            status:'pending',
            buyerId:buyerId,
            postId:postId,
            companyId:posts.companyId,
            companyName:posts.companyName,
            buyerName:buyerName
        };
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                //sendEmail();
                toastNotification();
                //history.push(`/buyer/viewpostdetails/${id}`);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const date = new Date();
    date.setDate(date.getDate() + 28);

    const date2 = new Date();
    date2.setDate(date2.getDate());

    const newQuantity= posts?.quantity - quantity;
    console.log(newQuantity);

    const validate = (values) => {
        let errors = {};
        const regex = /^[0-9]+$/;
        const d1 = new Date(values.expiryDate);
        const d3 = new Date(values.collectingDate);
        console.log(d1);

        if (!values.value) {
            errors.value = "Cannot be blank";
        }else if (!regex.test(values.value)) {
            errors.value = "Invalid value format";
        }else if (values.value<=0) {
            errors.value = "Invalid value format";
        }
        if (!values.expiryDate) {
            errors.expiryDate = "Cannot be blank";
        }else if (date<=d1) {
            errors.expiryDate = "Expiry date should not be longer than a month.";
        }else if (d1<=date2) {
            errors.expiryDate = "Expiry date should not be a past date.";
        }
        if (!values.collectingDate) {
            errors.collectingDate = "Cannot be blank";
        }else if (d3<=date2) {
            errors.collectingDate = "Collecting date should not be a past date.";
        }
        if (!values.collectingTime) {
            errors.collectingTime = "Cannot be blank";
        }
        if (!values.quantity) {
            errors.quantity = "Cannot be blank";
        }else if (!regex.test(values.quantity)) {
            errors.quantity = "Invalid quantity format";
        }else if (values.quantity<=0) {
            errors.quantity = "Invalid quantity format";
        }else if (newQuantity<values.quantity) {
            errors.quantity = "You can not add more than post's quantity";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    const clear = () => {
        setFormValues({
            value: '',
            expiryDate: '',
            collectingDate: '',
            collectingTime: '',
            quantity: '',
            status:'',
            buyerId: '',
            postId:'',
            companyId:'',
            companyName:'',
            buyerName:''
        });
    };

    const toastNotification = () => {
        toast.info("You're added offer successfully !", {
            transition: Slide
        })
    };

    const [seller, setSeller] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${companyId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setSeller(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(seller);
    const sellerEmail=seller.email;
    const sellerName=seller.username;
    console.log(sellerEmail);
    console.log(sellerName);

    const templateParams = {
        from_name: 'Zero-Waste',
        to_name: sellerName,
        message: 'Your post has been given an offer by a buyer! Please visit our site for more details.',
        reply_to: 'zerowasteproject3@gmail.com',
        user_email:sellerEmail,
        project_email:'zerowasteproject3@gmail.com'
    };

    const sendEmail = () => {
        emailjs.send('service_34ny3hp', 'template_91bru6e', templateParams, 'user_pzyBOo0Td3FLgOvuNU4mq')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    };

    const sellerId=companyId;
    const selId = {sellerId};

    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b" style={{marginBottom:"150px"}}>
                    <div className="title-b">Make Offer for Company</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Offer Value (Rs)</span>
                                    <input type="text" name="value" id="value" placeholder="Enter value" value={formValues.value}
                                           onChange={handleChange}
                                           className={formErrors.value && "input-error"}></input>
                                    {formErrors.value && (
                                        <span className="error" style={{color:'red'}}>{formErrors.value}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Offer Expiry Date</span>
                                    <input type="date" name="expiryDate" id="expiryDate" placeholder="Enter date" value={formValues.expiryDate}
                                           onChange={handleChange}
                                           className={formErrors.expiryDate && "input-error"}></input>
                                    {formErrors.expiryDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.expiryDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Date</span>
                                    <input type="date" name="collectingDate" id="collectingDate" placeholder="Enter date" value={formValues.collectingDate}
                                           onChange={handleChange}
                                           className={formErrors.collectingDate && "input-error"}></input>
                                    {formErrors.collectingDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Approximate Time</span>
                                    <input type="time" name="collectingTime" id="collectingTime" placeholder="Enter time" value={formValues.collectingTime}
                                           onChange={handleChange}
                                           className={formErrors.collectingTime && "input-error"}></input>
                                    {formErrors.collectingTime && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingTime}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Quantity (Kg)</span>
                                    <input type="text" name="quantity" id="quantity" placeholder="Enter quantity" value={formValues.quantity}
                                           onChange={handleChange}
                                           className={formErrors.quantity && "input-error"}></input>
                                    {formErrors.quantity && (
                                        <span className="error" style={{color:'red'}} >{formErrors.quantity}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Send Offer"></input>
                                <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                            </div>
                        </form>
                    </div>
                </div>
                <StartRating sId={selId}/>
            </div>
        </div>
    );
}

export default CompanyForms;