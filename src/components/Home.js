import React from 'react';
import { useHistory } from 'react-router-dom';




const Home = (props) => {

    
    const history = useHistory()
    const {allProducts, setCategory} = props;
    console.log (allProducts)

    function clickedCategory(category) {
        setCategory(category)
        history.push('/category');
        
      }
    
   
    return (<> 
    <div id="home-category-title"> Shop By Category </div>
    <div id="home-category-container">
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("athletic")}>Athletic</div> 
        <div className="home-category-imagediv" onClick={() => clickedCategory("athletic")}>
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/96/01/9/96019_pair_medium.jpg" />
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/98/76/6/98766_pair_medium.jpg" />
   </div>

    </div>
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("casual")}>Casual</div>
        <div className="home-category-imagediv" onClick={() => clickedCategory("casual")}>
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/95/91/3/95913_pair_medium.jpg" />
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/97/16/8/97168_pair_medium.jpg" />
   </div>

    </div>
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("dress")}>Dress</div>
        <div className="home-category-imagediv" onClick={() => clickedCategory("dress")}>
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/97/02/2/97022_pair_medium.jpg" />
   <img className="home-category-image" src="https://www.famousfootwear.com/blob/product-images/20000/70/46/8/70468_pair_medium.jpg" />
   </div>

    </div>
    </div>
   <div id="homeimagediv">
   <img id="homeimage" src={`${process.env.PUBLIC_URL}/images/homepic2.jpg`} />
   </div>

   <div id="home-footer-background1"></div>
   <div id="home-footer-background2"></div>
   <div id="home-footer-background3"></div>
 </>);
    
    
}


export default Home
