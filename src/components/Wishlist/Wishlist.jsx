import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { addToCart } = useContext(CartContext);

  async function fetchWishlist() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      setWishlistItems(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    const toastId = toast.loading('Removing from Wishlist...');
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      setWishlistItems((prevItems) => prevItems.filter(item => item._id !== productId));
      toast.success('Item removed from Wishlist', { id: toastId });
    } catch (error) {
      toast.error('Failed to remove from Wishlist', { id: toastId });
      console.error('Error removing item from wishlist:', error);
    }
  }

  async function addProductToCart(productId) {
    await addToCart(productId);
    removeFromWishlist(productId);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta charSet='utf-8' />
      </Helmet>
      <div className='container mx-auto px-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center my-6">Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <p className='text-center'>Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {wishlistItems.map((product) => (
                  <div key={product._id} className='p-3 border rounded-lg shadow-md transition hover:shadow-lg relative'>
                    <NavLink to={`/productdetails/${product.id}/${product.category.name}`}>
                      <img 
                        src={product.imageCover} 
                        alt={product.title} 
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <h3 className="text-gray-700 font-semibold mt-2 text-sm truncate">{product.category.name}</h3>
                      <p className="text-gray-900 text-base font-medium truncate">{product.title}</p>
                      <div className="text-green-600 font-bold mt-2">EGP {product.price}</div>
                    </NavLink>
                    <button 
                      onClick={() => addProductToCart(product._id)} 
                      className="mt-3 w-full bg-main text-white py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105">
                      Add To Cart
                    </button>
                    <button 
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeFromWishlist(product._id)}
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
