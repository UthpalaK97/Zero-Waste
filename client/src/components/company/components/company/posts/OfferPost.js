import './AcceptedOffers.css';
import React, {useEffect, useState} from "react";
import "./Modal.css";
import axios from "axios";
import moment from "moment";
import {useHistory, useParams} from "react-router-dom";
import '../../../../buyer/posts/LoadingRing.css';

function OfferPost() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);


      const companyId=(localStorage.getItem("userId"));
      console.log(companyId);

        const { postId } = useParams();
        console.log(postId);

      const [offers, setOffers] = useState([]);

      useEffect(()=>{
        getAllOffers();
      }, []);

      const getAllOffers = async () => {
          setIsLoading(true)
          try{
        await axios.get(`/viewPendingCompanyOffersForCompany`)
            .then ((response)=>{
              const allNotes=response.data.existingOffers;
              setOffers(allNotes);
                setIsLoading(false)
            })
          }catch (error) {
              console.error(`Error: ${error}`)
              setHasError(true)
          }
      }
      console.log(offers);

      const date2 = new Date();
      date2.setDate(date2.getDate());

        const wasteItem2 = offers?.filter(wasteItem2 =>
            wasteItem2.status==='accepted' &&
            wasteItem2.companyId===companyId &&
            wasteItem2.postId===postId
        );
        console.log(wasteItem2);

        const len = wasteItem2.length;
        console.log(len);

      const wasteItem = offers?.filter(
          wasteItem => wasteItem.status==='pending' &&
          wasteItem.companyId===companyId &&
          new Date(wasteItem.expiryDate)>=date2 &&
          wasteItem.postId===postId &&
          len === 0
      );
      console.log(wasteItem);

        const history = useHistory();

        const acceptOffer = (id) => {
            const data = {
                status:'accepted'
            };
            axios.patch(`/editCompanyOfferStatus/${id}`, data)
                .then((result) => {
                    history.push('/company/ongoingp');
                });
        };

        const rejectOffer = (id) => {
            const data = {
                status:'rejected'
            };
            axios.patch(`/editCompanyOfferStatus/${id}`, data)
                .then((result) => {
                    history.push('/company/ongoingp');
                });
        };

      return(
          <>
              {
                  isLoading ?
                      <div className="tables-c">
                          <div className="lds-ring">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                          </div>
                      </div> : hasError ?
                          <div className="tables-c">
                              <h1>Error Occurred</h1>
                          </div> :
                      <div className="tables-c">
                        <div className="tables__container-c">
                          <h1>Offers</h1>
                          <table className="table-c">
                            <thead>
                              <tr>
                                  <th>Offer ID</th>
                                  <th>Buyer Name</th>
                                  <th>Collecting Date</th>
                                  <th>Expiry Date</th>
                                  <th>Quantity (Kg)</th>
                                  <th>Value (Rs)</th>
                                  <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                            {wasteItem.map((note,index)=> (
                              <tr>
                                <td data-label="Offer ID">{index + 1}</td>
                                <td data-label="Buyer Name">{note.buyerName}</td>
                                <td data-label="Collecting Date">{moment(note.collectingDate).fromNow()}</td>
                                <td data-label="Expiry Date">{moment(note.expiryDate).fromNow()}</td>
                                <td data-label="Quantity (Kg)">{note.quantity}</td>
                                <td data-label="Value (Rs)">{note.value}</td>
                                <td data-label="Action">
                                  <span className="action_btn-c">
                                    <button onClick={() => {
                                        acceptOffer(note._id)
                                    }}>Accept</button>
                                    <button onClick={() => {
                                        rejectOffer(note._id)
                                    }}>Reject</button>
                                  </span>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                          }

          </>
      );
    }

export default OfferPost;