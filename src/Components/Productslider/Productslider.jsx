import { useRef ,useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import StarRating from '../StarRating/StarRating';
export default function Productslider() {
    const navigate=useNavigate()
    let {addtoCart,addLove,showPurchaseAlert,slideBarRef, XIconRef, hideSlideBar }=useContext(ApiContext)
    const [clothes,setClothes]=useState({});
    const [clothesShowAll,setClothesAhowAll]=useState(false)
    const [Shoes,setShoes]=useState({});
    const [shoesShowAll,setShoesAhowAll]=useState(false)
    const [Accessories,setAccessories]=useState({});
    const [accessoriesShowAll,setAccessoriesAhowAll]=useState(false)
    const [newProducts,setNewProducts]=useState({});
    async function getDataApi() {
  try {
    let res = await axios.get("https://emergancy-api-kqk9.vercel.app/getNewProducts");
    setNewProducts(res.data.products);

    let clothesData = await axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Clothes');
    if (clothesData.data.data.length > 4) {
      setClothes(clothesData.data.data.slice(0, 4));
      setClothesAhowAll(true);
    } else {
      setClothes(clothesData.data.data);
      setClothesAhowAll(false);
    }

    let shoesData = await axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Shoes');
    if (shoesData.data.data.length > 4) {
      setShoes(shoesData.data.data.slice(0, 4));
      setShoesAhowAll(true);
    } else {
      setShoes(shoesData.data.data);
      setShoesAhowAll(false);
    }

    let accessoriesData = await axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Accessories');
    if (accessoriesData.data.data.length > 4) {
      setAccessories(accessoriesData.data.data.slice(0, 4));
      setAccessoriesAhowAll(true);
    } else {
      setAccessories(accessoriesData.data.data);
      setAccessoriesAhowAll(false);
    }
  } catch (err) {
    console.error("Data fetching error:", err);
  }
}
    //This function handles adding a product to the user's cart.
    async function getProductData(id,title,price){
        let response= await addtoCart(id,title,price)
        if(response){
            showPurchaseAlert('👍 You Add Product successfully !')
        }else{
            navigate("/login")
        }
    }
    //This function handles adding a product to the user's "Loved" (favorites) list.
    async function loveProduct(id){
        await addLove(id);
            showPurchaseAlert('👍 You Add Product Loved successfully ! ')
    }
    //useEffect runs once on mount: it fetches product data and sets up accordion toggle behavior with cleanup on unmount.
    useEffect(()=>{
        getDataApi()
        const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
        const accordions = document.querySelectorAll('[data-accordion]');
        accordionBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
            const isAlreadyActive = this.nextElementSibling.classList.contains('active');

            accordions.forEach((acc, i) => {
                if (isAlreadyActive) return;

                if (acc.classList.contains('active')) {
                acc.classList.remove('active');
                accordionBtns[i].classList.remove('active');
                }
            });

            this.nextElementSibling.classList.toggle('active');
            this.classList.toggle('active');
            });
        });
  

  return () => {
    accordionBtns.forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true)); // quick way to remove all event listeners
    });
  };
    },[])
    
  return (
    <div>
        
        <div className="overlay"  ref={XIconRef}  data-overlay></div>
        <div className='product-container'>
        <div className="container">
                    <div className="sidebar  has-scrollbar" ref={slideBarRef} data-mobile-menu> 
                        <div className="sidebar-category">

                            <div className="sidebar-top">
                            <h2 className="sidebar-title">Category</h2>

                            <button onClick={hideSlideBar} className="sidebar-close-btn" data-mobile-menu-close-btn>
                            <i className="fa-solid fa-xmark"></i>
                            </button>
                            </div>

                            <ul className="sidebar-menu-category-list">

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601097/dress_p1hxcd.svg" alt="clothes" width="20" height="20"
                                    className="menu-title-img"/>

                                    <p className="menu-title mt-3">Clothes</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                    <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                    <Link to="/cardList/Shirt">
                                    <span className="sidebar-submenu-title" >
                                    <p className="product-name">Shirt</p>
                                    </span>
                                    </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Shorts">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">shorts&jeans</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Jacket">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">jacket</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Dress">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">dress & frock</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601102/shoes_sxeioj.svg" alt="footwear" className="menu-title-img" width="20"
                                    height="20"/>

                                    <p className="menu-title menu-title mt-3">Footwear</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Sports">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Sports</p>
                                    </span>
                                </Link>
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Formal">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Formal</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Casual">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Casual</p>
                                    </span>
                                </Link>
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Safety Shoes">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Safety Shoes</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601101/jewelry_hopkpk.svg" alt="clothes" className="menu-title-img" width="20"
                                    height="20"/>

                                    <p className="menu-title menu-title mt-3">Jewelry</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Earrings">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Earrings</p>
                                    </span>
                                </Link>
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Couple Rings">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Couple Rings</p>
                                    </span>
                                </Link>
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Necklace">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Necklace</p>
                                    </span>
                                </Link>
                                </li>

                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601100/perfume_teyckx.svg" alt="perfume" className="menu-title-img" width="20"
                                    height="20"/>

                                    <p className="menu-title menu-title mt-3">Perfume</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Clothes Perfume">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Clothes Perfume</p>
                                    </span>
                                </Link>
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Deodorant">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Deodorant</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Jacket">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">jacket</p>
                                    </span>
                                </Link>
                                </li>
                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601096/cosmetics_ds8mag.svg" alt="cosmetics" className="menu-title-img" width="20"
                                    height="20"/>

                                    <p className="menu-title menu-title mt-3">Cosmetics</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Shampoo">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Shampoo</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Sunscreen">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Sunscreen</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Body Wash">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Body Wash</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Makeup Kit">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Makeup Kit</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749601099/glasses_dz5bzl.svg" alt="glasses" className="menu-title-img" width="20"
                                    height="20"/>

                                    <p className="menu-title menu-title mt-3">Glasses</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Sunglasses">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Sunglasses</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Lenses">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Lenses</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                </ul>

                            </li>

                            <li className="sidebar-menu-category">

                                <button className="sidebar-accordion-menu" data-accordion-btn>

                                <div className="menu-title-flex">
                                    <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600984/bag_v5824n.svg" alt="bags" className="menu-title-img" width="20" height="20"/>

                                    <p className="menu-title menu-title mt-3">Bags</p>
                                </div>

                                <div>
                                    <i className="fa-solid fa-plus add-icon"></i>
                                <i className="fa-solid fa-minus remove-icon"></i>
                                </div>

                                </button>

                                <ul className="sidebar-submenu-category-list" data-accordion>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Lenses">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Shopping Bag</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Lenses">
                                    <span className="sidebar-submenu-title">
                                    <p className="product-name">Gym Backpack</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Purse">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Purse</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                <li className="sidebar-submenu-category">
                                <Link to="/cardList/Wallet">
                                <span className="sidebar-submenu-title">
                                    <p className="product-name">Wallet</p>
                                    </span>
                                </Link>
                                    
                                </li>

                                </ul>

                            </li>

                            </ul>

                        </div>
                    </div>
                    <div className="product-box">
                            <div className="product-minimal">
                                <div className="product-showcase">
                                    <h2 className="title"  >Clothes</h2>
                                    <div className="showcase-wrapper has-scrollbar">
                                        <div className="showcase-container">
                                            { clothes.length>1?(clothes.map((ele,index)=>{
                                                return <div key={index} className="showcase ">
                                                    <Link to={`/cardItem/${ele._id}`} className='my-2'>
                                                        <div  className="showcase-img-box">
                                                            <img src={ele.imageUrls[0]} alt="girls pink embro design top" className="showcase-img" width="70"/>
                                                        </div>
                                                        </Link>
                                                        
                                                        <div className="showcase-content">
                                                            
                                                            <h4 className="showcase-title ">{ele.title}</h4>
                                                            <div className='d-flex justify-content-between w-75 mt-1'>
                                                            <p  className="showcase-category">{ele.category}</p>
                                                            </div>
                                                            <StarRating rating={ele.rating} StarSize="12px"/>
                                                            
                                                            <div className="price-box">
                                                                {ele.discount?(<>
                                                                <p className="price">${Math.ceil(ele.price-(ele.price*ele.price/100))}</p>
                                                                <p><del>${ele.price}</del></p>
                                                                </>)
                                                                :<p className="price">${ele.price}</p>
                                                                }
                                                            </div>
                                                            
                                                            <div className='d-flex mb-1'>
                                                                <i className="fa-regular fa-heart border border-1 rounded-1 p-1 m-1" onClick={()=>loveProduct(ele._id)}></i>
                                                                <Link to={`/cardItem/${ele._id}`} className='text-dark'>
                                                                <i className="fa-regular fa-eye border border-1 rounded-1 p-1 m-1"></i>
                                                                </Link>
                                                            </div>
                                                            <button className='btn btn-primary w-75' onClick={()=>getProductData(ele._id,ele.title,ele.price)} >add to <i className="fa-solid fa-cart-shopping "></i></button>
                                                        </div>
                                                    </div>
                                                 
                                            })):<div className='position-relative w-100 text-center'><i className='fas fa-spinner fa-spin fa-4x '></i></div>}
                                        </div> 
                                    </div>
                                    {clothesShowAll?
                                    <Link to='/cardList/Clothes'>
                                    <div className=' text-center'>
                                        <div className='category-btn'> show all <i class="fa-solid fa-arrow-right"></i> </div>
                                    </div>
                                    </Link>
                                    :null}
                                    
                                
                                </div>
                                <div className="product-showcase">
                                
                                    <h2 className="title">Shoes</h2>
                                
                                    <div className="showcase-wrapper  has-scrollbar">
                                
                                        <div className="showcase-container">
                                
                                        { Shoes.length>1?(Shoes.map((ele,index)=>{
                                                return <div key={index} className="showcase ">
                                                    <Link to={`/cardItem/${ele._id}`} className='my-2'>
                                                        <div  className="showcase-img-box">
                                                            <img src={ele.imageUrls[0]} alt="girls pink embro design top" className="showcase-img" width="70"/>
                                                        </div>
                                                        </Link>
                                                       
                                                        <div className="showcase-content">
                                                            <h4 className="showcase-title">{ele.title}</h4>
                                                            <p  className="showcase-category">{ele.category}</p> 
                                                            <StarRating rating={ele.rating} StarSize="12px"/>                                                   
                                                            <div className="price-box">
                                                                {ele.discount?(<>
                                                                <p className="price">${Math.ceil(ele.price-(ele.price*ele.price/100))}</p>
                                                                <p><del>${ele.price}</del></p>
                                                                </>)
                                                                :<p className="price">${ele.price}</p>
                                                                }
                                                            </div>
                                                            <div className='d-flex mb-1'>
                                                                <i className="fa-regular fa-heart border border-1 rounded-1 p-1 m-1" onClick={()=>loveProduct(ele._id)}></i>
                                                                <Link to={`/cardItem/${ele._id}`} className='text-dark'>
                                                                <i className="fa-regular fa-eye border border-1 rounded-1 p-1 m-1"></i>
                                                                </Link>
                                                            </div>
                                                            <button className='btn btn-primary w-75' onClick={()=>getProductData(ele._id,ele.title,ele.price)} >add to <i className="fa-solid fa-cart-shopping "></i></button>
                                                        </div>
                                                    </div>
                                            })):<div className='position-relative w-100 text-center'><i className='fas fa-spinner fa-spin fa-4x '></i></div>}
                                
                                    </div>                                
                                    </div>
                                    {shoesShowAll?
                                        <Link to='/cardList/Shoes'>
                                        <div className=' text-center'>
                                            <div className='category-btn'> show all <i class="fa-solid fa-arrow-right"></i> </div>
                                        </div>
                                        </Link>
                                    :null}
                                </div>
                                <div className="product-showcase">
                                
                                    <h2 className="title">Accessories</h2>
                                
                                    <div className="showcase-wrapper  has-scrollbar">
                                
                                    <div className="showcase-container">
                                
                                    { Accessories.length>1?(Accessories.map((ele,index)=>{
                                                return <div key={index} className="showcase ">
                                                    <Link to={`/cardItem/${ele._id}`} className='my-2'>
                                                        <div  className="showcase-img-box">
                                                            <img src={ele.imageUrls[0]} alt="girls pink embro design top" className="showcase-img" width="70"/>
                                                        </div>
                                                        </Link>
                                                        <div className="showcase-content">
                                                            <h4 className="showcase-title">{ele.title}</h4>
                                                            <p  className="showcase-category">{ele.category}</p>  
                                                            <StarRating rating={ele.rating} StarSize="12px"/>                                                   
                                                            <div className="price-box">
                                                                {ele.discount?(<>
                                                                <p className="price">${Math.ceil(ele.price-(ele.price*ele.price/100))}</p>
                                                                <p><del>${ele.price}</del></p>
                                                                </>)
                                                                :<p className="price">${ele.price}</p>
                                                                }
                                                            </div>
                                                            <div className='d-flex mb-1'>
                                                                <i className="fa-regular fa-heart border border-1 rounded-1 p-1 m-1" onClick={()=>loveProduct(ele._id)}></i>
                                                                <Link to={`/cardItem/${ele._id}`} className='text-dark'>
                                                                <i className="fa-regular fa-eye border border-1 rounded-1 p-1 m-1"></i>
                                                                </Link>
                                                            </div>
                                                            <button className='btn btn-primary w-75' onClick={()=>getProductData(ele._id,ele.title,ele.price)} >add to <i className="fa-solid fa-cart-shopping "></i></button>
                                                        </div>
                                                    </div>
                                            })):<div className='position-relative w-100 text-center'><i className='fas fa-spinner fa-spin fa-4x '></i></div>}
                                    </div>
                                                                
                                    </div>
                                    {accessoriesShowAll?
                                        <Link to='/cardList/Accessories'>
                                        <div className=' text-center'>
                                            <div className='category-btn'> show all <i class="fa-solid fa-arrow-right"></i> </div>
                                        </div>
                                        </Link>
                                    :null}
                                </div>
                            </div>
                            <div className="product-main">
                            <h2 className="title">New Products</h2>
                           <div className="product-grid" style={{ position: "relative", minHeight: "100vh" }}>
                                {newProducts.length > 1 ? (
                                    newProducts.map((ele, index) => (
                                    <div key={index} className="showcase">
                                        <div className="showcase-banner">
                                        <img id="Image1" src={ele.imageUrls[0]} alt="Mens Winter Leathers Jackets" width="300" style={{ height: "150px" }} className="product-img default" />
                                        <img id="Image2" src={ele.imageUrls[1] || ele.imageUrls[0]} alt="Mens Winter Leathers Jackets" width="300" style={{ height: "200px" }} className="product-img hover" />

                                        {ele.discount > 0 && (
                                            <p className="showcase-badge">{ele.discount}%</p>
                                        )}

                                        <div className="showcase-actions">
                                            <button className="btn-action">
                                            <i className="fa-regular fa-heart" onClick={() => loveProduct(ele._id)}></i>
                                            </button>

                                            <Link to={`/cardItem/${ele._id}`}>
                                            <button className="btn-action">
                                                <i className="fa-regular fa-eye"></i>
                                            </button>
                                            </Link>

                                            <button className="btn-action">
                                            <i className="fa-solid fa-cart-shopping" onClick={() => getProductData(ele._id, ele.title, ele.price)}></i>
                                            </button>
                                        </div>
                                        </div>

                                        <div className="showcase-content">
                                        <a href="#" className="showcase-category">{ele.category}</a>

                                        <a href="#">
                                            <h3 className="showcase-title">{ele.title}</h3>
                                        </a>

                                        <StarRating rating={ele.rating} size="12px" />

                                        <div className="price-box">
                                            {ele.discount ? (
                                            <>
                                                <p className="price">${Math.ceil(ele.price - (ele.price * ele.discount) / 100)}</p>
                                                <p><del>${ele.price}</del></p>
                                            </>
                                            ) : (
                                            <p className="price">${ele.price}</p>
                                            )}
                                        </div>
                                        </div>
                                    </div>
                                    ))
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center"
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                                    <i className="fas fa-spinner fa-spin fa-4x"></i>
                                    </div>
                                )}
                            </div>

                
                        </div>
                    </div>
        
        </div>
        </div>
    
        
    </div>
  )
}
