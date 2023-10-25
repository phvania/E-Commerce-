import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import AuthService from '../../utils/auth';

const isAdmin = AuthService.checkAdmin();


function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (categoryID) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: categoryID,
    });
  };

  // console.log(categoryData)
  

  

  return (
    <div className='link'>
      {categories.map((item) => (
        <button 
        key={item._id}
          onClick={() => {
           console.log(item._id)
           handleClick(item._id);
          }}
          style={{ margin: '10px' }}
         >
          {item.name}
         </button>
       
       ))}
       <button onClick={() => { handleClick('') }}>
         All
       </button>

      {isAdmin && (
      <button>
        Add Category
      </button>
    )}
    </div>
  );
}

export default CategoryMenu;
