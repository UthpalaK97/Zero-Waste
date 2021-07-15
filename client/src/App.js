import React from 'react';
import './App.css'
import BuyerHome from './components/buyer/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BuyerServices from './components/buyer/posts/Services';
import BuyerOfferForm from './components/buyer/posts/OfferForm';
import BuyerAOffers from './components/buyer/posts/AOffers';
import BuyerPOffers from './components/buyer/posts/POffers';
import BuyerEditPendingOffers from './components/buyer/posts/EditPendingOffers';
import BuyerCompanyPosts from "./components/buyer/company_posts/CompanyPosts";
import BuyerCompanyOfferForm from "./components/buyer/company_posts/CompanyOfferForm";
import BuyerCompanyAOffers from "./components/buyer/company_posts/CompanyAOffers";
import BuyerCompanyPOffers from "./components/buyer/company_posts/CompanyPOffers";
import BuyerEditCompanyPendingOffers from "./components/buyer/company_posts/EditCompanyPendingOffers";
import BuyerViewCompanyDetails from "./components/buyer/company_posts/ViewCompanyDetails";
import BuyerCompanyNotify from "./components/buyer/company_posts/CompanyNotify";
import BuyerPostsLocation from "./components/buyer/posts/PostsLocation";
import BuyerViewPostDetails from "./components/buyer/posts/ViewPostDetails";
import Home from "./components/home/Home";
import LoginScreen from "./components/home/screens/LoginScreen";
import RegisterScreen from "./components/home/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/home/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/home/screens/ResetPasswordScreen";
import Admin from "./components/home/screens/Admin";


import SellerHome from './components/seller/Home/Home';
import SellerAddPostDirect from './components/seller/Post/AddPostDirect';
import SellerAddPostPublic from './components/seller/Post/AddPostPublic';
import SellerMyPost from './components/seller/viewpost/Services';
import SellerProfile from './components/seller/Profile/Profile';
import SellerBuyersHome from './components/seller/Buyers/SearchBuyerPage';
import SellerViewPost from './components/seller/viewpost/ViewPosts';
import SellerViewBuyer from './components/seller/Buyers/ViewBuyer';


import CompanyHome from './components/company/pages/Home';
import CompanyServices from './components/company/components/company/posts/Services';
import CompanyProfile from './components/company/pages/Profile';
import CompanyDashboard from './components/company/pages/Dashboard';
import CompanyHelpdesk from './components/company/pages/Helpdesk';
import CompanyPost from './components/company/pages/CompanyPost';
import CompanyOffersForPosts from './components/company/pages/OffersForPosts';
import CompanyEditProfile from './components/company/pages/EditProfile';
import CompanyDirectPosts from './components/company/pages/DirectPosts';
import CompanyNotification from './components/company/pages/Notification';
import CompanyOngoingP from './components/company/pages/OngoingP';
import CompanyPreviousP from './components/company/pages/PreviousP';
import CompanyAcceptedP from './components/company/pages/AcceptedP';
import CompanyBuyersInfo from './components/company/pages/BuyersInfo';
import CompanyBuyersContact from './components/company/pages/BuyersContact';


function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/buyer/home' exact component={BuyerHome} />
                    <Route path='/buyer/posts' component={BuyerServices} />
                    <Route path='/buyer/offerforms' component={BuyerOfferForm} />
                    <Route path='/buyer/acceptedoffers' component={BuyerAOffers} />
                    <Route path='/buyer/pendingoffers' component={BuyerPOffers} />
                    <Route path='/buyer/editpendingoffers' component={BuyerEditPendingOffers} />
                    <Route path='/buyer/companyposts' component={BuyerCompanyPosts} />
                    <Route path='/buyer/companyofferforms' component={BuyerCompanyOfferForm} />
                    <Route path='/buyer/companyacceptedoffers' component={BuyerCompanyAOffers} />
                    <Route path='/buyer/companypendingoffers' component={BuyerCompanyPOffers} />
                    <Route path='/buyer/editcompanypendingoffers' component={BuyerEditCompanyPendingOffers} />
                    <Route path='/buyer/viewcompanydetails' component={BuyerViewCompanyDetails} />
                    <Route path='/buyer/notifyaboutwaste' component={BuyerCompanyNotify} />
                    <Route path='/buyer/location' component={BuyerPostsLocation} />
                    <Route path='/buyer/viewpostdetails' component={BuyerViewPostDetails} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/admin" component={Admin} />                   
                    <Route path="/forgotpassword" component={ForgotPasswordScreen}/>
                    <Route path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>


                    
                    <Route path='/seller/publicpost' exact component={SellerAddPostPublic} />
                    <Route path='/seller/directpost' exact component={SellerAddPostDirect} />
                    <Route path='/seller/myposts' exact component={SellerMyPost} />
                    <Route path='/seller/viewposts' exact component={SellerViewPost} />
                    <Route path='/seller/findbuyers' exact component={SellerBuyersHome} />
                    <Route path='/seller/buyer' exact component={SellerViewBuyer} />
                    <Route path='/seller/profile' exact component={SellerProfile} />
                    <Route path='/seller' exact component={SellerHome} />
					
					
					<Route path='/company' exact component={CompanyHome} />
                    <Route path='/posts' component={CompanyServices} />
                    <Route path='/company/profile' component={CompanyProfile} />                 
                    <Route path='/company/dashboard' component={CompanyDashboard} />
                    <Route path='/company/helpdesk' component={CompanyHelpdesk} />
                    <Route path='/company/companypost' component={CompanyPost} />
                    <Route path='/company/offersforposts' component={CompanyOffersForPosts} />
                    <Route path='/company/editprofile' component={CompanyEditProfile} />    
                    <Route path='/company/DirectPosts' component={CompanyDirectPosts} />  
                    <Route path='/company/notification' component={CompanyNotification} /> 
                    <Route path='/company/ongoingp' component={CompanyOngoingP} />
                    <Route path='/company/previousp' component={CompanyPreviousP} />
                    <Route path='/company/acceptedp' component={CompanyAcceptedP} />
                    <Route path='/company/buyersinfo' component={CompanyBuyersInfo} />
                    <Route path='/company/buyerscontact' component={CompanyBuyersContact} />

                </Switch>
            </Router>
        </>
    );
}

export default App;