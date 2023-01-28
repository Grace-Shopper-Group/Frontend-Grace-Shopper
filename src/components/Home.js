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
    <div id="homeimagediv">
   <img className='ui fluid image' src={`${process.env.PUBLIC_URL}/images/homepic2.jpg`} />
   </div>

    <h1 id="centertitle" className="ui blue header">Shop By Category</h1>
    <div id="home-category-container">
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("athletic")}>Athletic</div> 
        <div className="home-category-imagediv" onClick={() => clickedCategory("athletic")}>
   <img className="ui small image" src="https://static.nike.com/a/images/t_default/8c574656-8659-4712-a77e-50421e7e4a68/pegasus-trail-4-gore-tex-mens-waterproof-trail-running-shoes-qdcSR6.png" />
   </div>

    </div>
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("casual")}>Casual</div>
        <div className="home-category-imagediv" onClick={() => clickedCategory("casual")}>
   <img className="ui small image" src="https://static.vecteezy.com/system/resources/previews/010/986/202/non_2x/white-sports-sneakers-cut-out-png.png" />
   </div>

    </div>
    <div className="home-category-box">
        <div className="home-category-title" onClick={() => clickedCategory("dress")}>Dress</div>
        <div className="home-category-imagediv" onClick={() => clickedCategory("dress")}>
   <img className="ui small image" src="https://freepngimg.com/thumb/shoes/24652-8-shoes-clipart.png" />
   </div>
    </div>
    </div>
  

   <div id="home-footer-background1"></div>
   <div id="home-footer-background2"></div>
   <div id="home-footer-background3"></div>
 </>);
    
    
}


export default Home
