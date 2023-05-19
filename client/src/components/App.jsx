/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import React, { useState, useEffect, createContext } from 'react';
import ProductDetail from './product_detail/Product_detail_main.jsx';
import RelatedItems from './related_items/RelatedItems.jsx';
import QA from './questions_and_answers/Q&A.jsx'
import ReviewRating from './reviews_ratings/components/ReviewRating.jsx'

export const ProductContext = createContext(null);
/* using useContext instruction:
  import React, { useContext } from 'react';
  import { ProductContext } from '../App.jsx';
  const { product, setProduct } = useContext(ProductContext);
*/

const axios = require('axios');

function App(props) {
  const [product, setProduct] = useState([]);
  const [styles, setStyles] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [metaData, setMetaData] = useState(null)

  // const [productId, setProductId] = useState('40344')
  // const [productName, setProductName] = useState('Camo Onesie');
  // const [productId, setProductId] = useState('40344')
  // const [productName, setProductName] = useState('Camo Onesie');

  const fetchDataById = async (id = 40344) => {
    try {
      setLoading(true); // clear the prev state
      // fetching Product data
      const productResponse = await fetch(`/api/products/${id}`);
      const productData = await productResponse.json();
      setProduct(productData);
      console.log('productData: ', productData);

      // fetching Product Styles data
      const styleResponse = await fetch(`/api/products/${id}/styles`);
      const styleData = await styleResponse.json();
      setStyles(styleData);
      console.log('styleData: ', styleData);

      // fetching Product Related data
      const relatedResponse = await fetch(`/api/products/${id}/related`);
      const relatedData = await relatedResponse.json();
      setRelated(relatedData);
      console.log('relatedData: ', relatedData);

      setLoading(false);
    } catch (err) {
      console.log('Error occurs in fetching data: ', err);
    }
  };

  const handleRelatedItemClick = (itemId) => {
    console.log(itemId, ' is clicked!');
    fetchDataById(itemId);
  };

  useEffect(() => {
    fetchDataById();
  }, []);

  useEffect(() => {
    if(product){
      axios.get(`/api/reviews/meta?product_id=${product.id}`)
        .then(response => {
          setMetaData(response.data)
        })
    }
  }, [product])

  return (
    <div>
      {
        loading ? (
          <div> loading...</div>
        ) : (
          <div>
            <ProductContext.Provider value={{ product, setProduct }}>
              <div className='product-detail'>
                <ProductDetail product={product} styles={styles} />
              </div>
              <div className="related-items">
                <RelatedItems key={product.id} currProduct={product} currPhotoURL={styles.results[0].photos[0].thumbnail_url} IDlist={related} handleRelatedItemClick={handleRelatedItemClick} />
              </div>
              <div className="Q&A">
                <QA productID={product.id} />
              </div>
              <div className="rating-review">
                <ReviewRating productId={product.id}
                  metaData={metaData}
                  productName={product.name}/>
              </div>
            </ProductContext.Provider>
          </div>
        )
      }
    </div>

  );
};

// {/* <ProductDetail /> */}
export default App;


// {related.map((item) => <div key={item} onClick={() => handleRelatedItemClick(item)}>{item}</div>)}
