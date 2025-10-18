import React ,{useState,useEffect}from 'react'
import BarNav from '../components/BarNav'
import Sidebar from '../components/sidebar'
import Login from  '../components/forms/Login'
import Register from '../components/forms/Register'
import { AddFirm } from '../components/forms/AddFirm'
import { AddProduct } from '../components/forms/AddProduct'
import { Welcome } from '../components/Welcome'
import { AllProducts } from '../components/AllProducts'


const LandingPage = () => {
        const [showLogin,setShowLogin] = useState(false)
        const showLoginHandler = ()=>{
          setShowLogin(true)
           setShowRegister(false);
            setShowFirm(false);
            setShowProduct(false);
            setShowWelcome(false);
             setShowAllProducts(false);

            
        }

        const [showRegister ,setShowRegister] = useState(false)
        const showRegisterHandler = ()=>{
          setShowRegister(true);
           setShowLogin(false);
              setShowFirm(false);
              setShowProduct(false);
              setShowWelcome(false);
               setShowAllProducts(false);
        }


        const [showFirm,setShowFirm] = useState(false);

        const showFirmHandler =()=>{

          if(showLogOut){
            setShowFirm(true);
             setShowLogin(false);
              setShowRegister(false);
               setShowProduct(false);
               setShowWelcome(false);
                setShowAllProducts(false);
          }
          else{
            alert("please login");
            setShowLogin(true);
          }
        }


        const [showProduct ,setShowProduct] = useState(false);

        const showProductHandler = ()=>{
          
          
          if(showLogOut){
          setShowProduct(true);

          setShowFirm(false);
             setShowLogin(false);
              setShowRegister(false);
                     setShowWelcome(false);
        setShowAllProducts(false);
       
                    }else{
                       alert("please login");
                      setShowLogin(true);
                    }
                  
                  }



        const [showWelcome, setShowWelcome] = useState(false);

        const showWelcomeHandler=()=>{
          setShowWelcome(true);
           setShowProduct(false);
            setShowFirm(false);
            setShowLogin(false);
            setShowRegister(false);
              setShowAllProducts(false);
        }

        const[showAllProducts,setShowAllProducts] = useState(false);

        const showAllProductsHandler =()=>{
          
          if(showLogOut){
          setShowWelcome(false);
           setShowProduct(false);
            setShowFirm(false);
            setShowLogin(false);
            setShowRegister(false);
            setShowAllProducts(true);

        }else{
           alert("please login");
          setShowLogin(true);
        }
      }


        const [showLogOut,setShowLogOut] = useState(false);


        useEffect(()=>{
          const loginToken = localStorage.getItem('loginToken');

          if(loginToken){
              setShowLogOut(true)
          }
        },[])


        const logOutHandler =()=>{
        const shouldLogout = confirm("Are you sure you want to logout?");
         if (shouldLogout) {
              localStorage.removeItem("loginToken");
              localStorage.removeItem("firmId");
              localStorage.removeItem("firmName");
              setShowLogOut(false);

              setShowFirmTitle(true);
        } }


        const[showFirmTitle,setShowFirmTitle] = useState(true);


      useEffect(()=>{

        const firmName = localStorage.getItem('firmName');

        if(firmName){
          setShowFirmTitle(false)
        }

      },[])







  return (
   <>
   
   <section className='landingSection'>
        <BarNav  showLoginHandler ={showLoginHandler} showRegisterHandler={showRegisterHandler} 
        showLogOut = {showLogOut}   logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
         <Sidebar showFirmHandler={showFirmHandler}  showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler}
         showFirmTitle ={showFirmTitle}
         />
          
          
          {showLogin && <Login  showWelcomeHandler={showWelcomeHandler}/>     }

          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          
          {showFirm && showLogOut &&<AddFirm  />}

          {showProduct &&showLogOut && <AddProduct/>}
          
          {showWelcome && <Welcome/> }
         
         { showAllProducts && showLogOut &&<AllProducts/> }
        </div>
       
   

   </section>
   
   
   </>
  )
}

export default LandingPage