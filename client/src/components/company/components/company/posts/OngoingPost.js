import React, {useEffect, useState} from 'react';
import './Posts.css';
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";
import '../../../../buyer/posts/LoadingRing.css';

function OngoingPost() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getCompanyPostsForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setNotes(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(notes);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingCompanyOffersForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const date2 = new Date();
    date2.setDate(date2.getDate());

    const wasteItem = offers?.filter(wasteItem =>
        wasteItem.status==='pending' &&
        wasteItem.companyId===companyId &&
        new Date(wasteItem.expiryDate)>=date2
    );
    console.log(wasteItem);

    return(
        <>
            {
                isLoading ?
                    <div className="posts-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="posts-c">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="posts-c">
                            <div className="posts__container-c">
                                <div className="title-c"><h1>Ongoing Posts</h1></div>
                                <main className="grid-c">
                                    {notes.map((note,index)=> {
                                        if(wasteItem.find(o=>o.postId === note._id) !== undefined)
                                            return (
                                            <article>
                                                    <div className="text-c">
                                                        <h3>Post ID: {index + 1}</h3>
                                                        <p>Post Type: {note.postType}</p>
                                                        <p>Waste Type: {note.wasteType}</p>
                                                        <p>Waste Item: {note.item}</p>
                                                        <p>Quantity: {note.quantity}</p>
                                                        <p>Available Date: {moment(note.avbDate).fromNow()}</p>
                                                        <div className="companylink-c">
                                                            <Link style={{color: '#fff', textDecoration: 'none'}}
                                                                  to={`/company/offersforposts/${note._id}`}>View Offers <i className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                    </div>
                                            </article>
                                    );
                                    })}
                                </main>
                            </div>
                        </div>
            }

        </>
    );
}

export default OngoingPost;