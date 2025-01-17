import React, { useState, useEffect, Component} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../../actions/posts';
import './PostForm.css';
import axios from 'axios';
import e from 'cors';

export default function PublicPost({ currentId, setCurrentId }) {

    const history = useHistory();
    
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "seller")) {
        history.push("/");
    }
   
    const sellerId = (localStorage.getItem("userId"));
    const sellerName = (localStorage.getItem("userName"));
    console.log(sellerName);
    const postType = "public";
    const buyer = "all-buyers";
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState([]);
    const [contact, setContact] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    var wasteItem = {
        wasteType: '',
        item: '',
        avbDate: null,
        quantity: null,
        selectedFile: '',
    };

    //catstste = wasteItemList
    //blankcat= wasteitem

    var [wasteItemList, setWasteItemList] = useState([
        { ...wasteItem }
    ]);
    
    const addWasteItem = () => {
        setWasteItemList([...wasteItemList, { ...wasteItem }]);
        console.log(wasteItemList);
    };

    const handleCatChange = (e,base64) => {
        const updatedCats = [...wasteItemList];
      //  console.log(e);
        if (base64) {
          // console.log(e);
         //   console.log(base64);
            updatedCats[e.target.dataset.idx][e.target.className] = base64;
            setWasteItemList(updatedCats);
        } else {
           // console.log("data")
         //   console.log(e);
            updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
            setWasteItemList(updatedCats);
        }
       
    };
    
  
 
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPostData = {
            sellerId,
            sellerName,
            postType,
            buyer,
            district,
            address,
            location,
            contact,
            thumbnail,
            wasteItemList
        }

        if (currentId === 0) {
            console.log(newPostData);
            axios.post('/sellerAddPost', newPostData).then((res) => {
                console.log(res);
                alert("Post Added Sucessfully!");
            }
            ).catch((err) => {
                alert(err)
            })
      
        } else {
        
        
        }
    };
    

    const getlocation = (e) => {
        e.preventDefault();
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude)
                console.log(position.coords.longitude)
                let locationTp = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                setLocation(locationTp)
            });
        } else {
            console.log("Not Available");
        }
    }

    const deleteWasteItem = (idx) => {
        console.log(wasteItemList);
        console.log(idx);
        if (wasteItemList.length === 1) {
            console.log("error")
            alert("Waste Item List cannot be empty")
        } else {
            wasteItemList = wasteItemList.splice(idx, 1);
            console.log(wasteItemList);
        }
     //   console.log(wasteItemList[idx]);
        
    }
    
    
    return (
                 
        <div className="seller-add-post-background">
        <div className="seller-add-post">
            <div className="seller-add-post-header">
                <h2>Add New Post</h2>
            </div>
            <form className="seller-add-new-post-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <div className="seller-add-post-row">
                    <label className="seller-add-post-label">District</label>
                    <select className="seller-add-post-select" name="option"
                        onChange={(e) => {
                         setDistrict(e.target.value)
                     }}>
                        <option value="Colombo" selected>Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kaluthara">Kaluthara</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Mathale">Mathale</option>
                        <option value="Nuwara-eliya">Nuwara-Eliya</option>
                        <option value="Galle">Galle</option>
                        <option value="Matara">Matara</option>
                        <option value="Hambanthota">Hambanthota</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Vauniya">Vauniya</option>
                        <option value="Mulathivu">Mulathivu</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Ampara">Apmara</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Rathnapura">Rathnapura</option>
                        <option value="Kegalle">Kegalle</option>

                    </select>
                    </div>
                   
                
                    <div className="seller-add-post-row"> 
                    <label className="seller-add-post-label" htmlfor="address">Address</label>
                        <input className="address"
                            id="input"
                            name="address"
                            type="text"
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        required></input>
                </div>
                    
                <div className="seller-add-post-row"> 
                    <label className="seller-add-post-label" htmlfor="contact">Contact Nuber</label>
                        <input className="contact"
                            id="input"
                            name="contact"
                            type="tel"
                           onChange={(e) => setContact(e.target.value)}
                        required></input>
                </div>
                <div className="seller-add-post-row">
                    <label className="seller-add-post-label" for="location">Location</label>
                    <a href="#" onClick={(e) => { getlocation(e) }}>Get Location</a>
                </div>
                <div className="seller-add-post-row">
                        <label className="seller-add-post-label" for="thumbnail_img">Add Thumbnail Image</label>
                        <input className="Selected-file"
                            type="file"
                            accept="image/*"
                            onChange={
                                (e) => {
                                   // console.log(e);
                                    const file = e.target.files[0];
                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(file);
                                    fileReader.onload = () => {
                                   //     console.log(fileReader.result);
                                        let base64 = fileReader.result;
                                        setThumbnail(base64);
                                    }
                                    
                                }
                            }
                          ></input>
                </div>
        {
          wasteItemList.map((val, idx) => {
            const wasteTypeid = `wasteType-${idx}`;
              const itemid = `item-${idx}`;
              const avbDateid = `avbDate-${idx}`;
              const quantityid = `quantity-${idx}`;
              const selectedFileid = `selectedFile-${idx}`;
          return (
              <div key={`Waste Item-${idx}`} className="seller-post-item">
                <div className="seller-add-post-item-header">
                      <h3>{`Waste Item #${idx + 1}`}</h3>
                      <a href="#" className="seller-waste-item-delete-btn" onClick={() => {
                          deleteWasteItem(idx);
                      }}>Delete Item #{idx + 1}</a>
                      
                  </div>
                  <div className="seller-add-post-row">
                      <label className="seller-add-post-label">Select Waste Type</label>
                      <select className="wasteType" name="wastetype" value={val.wasteType} data-idx={idx} onChange={handleCatChange}>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="paper">Paper</option>
                    <option value="polythene">Polythene</option>
                    <option value="organic">Organic</option>
                    <option value="electronic">Electronic</option>
                    <option value="other">Other</option>

                  </select>
                  </div>
                  <div className="seller-add-post-row"> 
                    <label className="seller-add-post-label" htmlFor={itemid}>Item</label>
                    <input className="item"
                        id="input"
                        name={itemid}
                        data-idx={idx}
                        type="text"
                        value={wasteItemList[idx].item}
                        onChange={handleCatChange}
                        
                    ></input>
                </div>
                <div className="seller-add-post-row"> 
                    <label className="seller-add-post-label" htmlFor={quantityid}>Quantity</label>
                    <input className="quantity"
                        id="input"
                          name={quantityid}
                          data-idx={idx}
                          type="text"
                          value={wasteItemList[idx].quantity}
                        onChange={handleCatChange}
                    ></input>
                </div>
                <div className="seller-add-post-row"> 
                    <label className="seller-add-post-label" for={avbDateid}>Available On</label>
                    <input className="avbDate"
                        id="input"
                          name={avbDateid}
                          data-idx={idx}
                          type="date"
                          value={wasteItemList[idx].avbDate}
                        onChange={handleCatChange}
                    ></input>
                </div>
                  
                  <div className="seller-add-post-row">
                      <label className="seller-add-post-label" for={selectedFileid}>Select Image</label>
                      <input className="selectedFile"
                          id="input"
                          name={selectedFileid}
                          data-idx={idx}
                          type="file"
                          accept="image/*"
                      //  value={wasteItemList[idx].selectedFile= target.files[0]}
                        //  onChange={handleCatChange}
                          onChange={
                              (e) => {
                                  console.log(e);
                                  const file = e.target.files[0];
                                  const fileReader = new FileReader();
                                  fileReader.readAsDataURL(file);
                                  fileReader.onload = () => {
                                 //     console.log(fileReader.result);
                                      let base64 = fileReader.result;
                                      handleCatChange(e, base64);
                                  }
                                  
                              }
                          }
                        ></input>
                </div>
             
             
            </div>
          );      
        })
    }
        <a href="#" className="seller-add-waste-item-btn" onClick={addWasteItem}>Add Item</a>
        <button className="seller-post-submit-btn" type="submit">Submit</button>
    </form>
    
          
    </div>
    </div>
    );
}