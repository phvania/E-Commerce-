import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import filterCriteria from  "../components/models";
import saleProducts from "../components/CategoryMenu"
const Sales = () => {
   return (
        <div>
            <h3> current Sales product</h3>
            <p>salesProductList</p> 
            {/* const { `Image, ProductItem price, quentity`} = ProductItem */}
            <ProductList/>
        </div>
    )

   }
   //filter data,based on the filer criteria /javascript's array method to ahieve this  
const currentsale =  saleProducts.filter((product) => {
return (
    (filterCriteria.CategoryMenu === '' || product.CategoryMenu ===filterCriteria.CategoryMenu) &&
    filterCriteria.priceRange === 'all' ||
    (filterCriteria.priceRange === 'low' && product.price <20) ||
   (filterCriteria.priceRange === 'medium' && product.price >= 20 && product.price < 50) ||
   (filterCriteria.priceRange === 'high' && product.price >= 50) 
)
} )

    
 
  { .filter((product)  => product.discountPercentage >= discountFilter)}
   //.filter((product) => !CategoryMenu || product.CategoryFilter ===CategoryMenu);
 
   
    const Sale = 
        //render filter element
        
          saleProducts.filter((product) => {
       
return (
             <div className="sale-page">
             <h2>on sale!</h2>
            <div className="filter-section">
            <label>Categorymanu:</label>
            <input
            type= "name"
            value={saleProducts}
           onChange={(e) => setSaleProducts(e.target.value)} />
            {/* <label>Category:</label>
            <select
            value={CategoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)} >
                <option value="">All</option>
                <option value= " Romantic Books">Romantic Books</option>
                <option value= "Mystery Books">Mystery</option> */}
            {/* </select> */}
        </div>
        <div className="product-list">
            filteredProducts.map(product) =
                CategoryMenu key={product.id} product={product}
               </div>

        </div>
           );
            }
        )
    

        function  sale(item) {
            const [state, dispatch] = useStoreContext();
          
            const {
              image,
              name,
              _id,
              price,
              quantity
            } = item;
          
            const { sale } = state
          
            const addTosale = () => {
              const itemInSale = sale.find((saleProducts) => saleProducts._id === _id)
              if (itemInSale) {
                dispatch({
                  type: ADD_SALE_QUANTITY,
                  _id: _id,
                  purchaseQuantity: parseInt(itemInSale.purchaseQuantity) + 1
                });
                idbPromise('sale', 'add', {
                  ...itemInSale,
                  purchaseQuantity: parseInt(itemInSale.purchaseQuantity) + 1
                });
              } else {
                dispatch({
                  type: ADD_TO_CART,
                  product: { ...item, purchaseQuantity: 1 }
                });
                idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
              }
            }
          
            return (
              <div className="card px-1 py-1">
                <Link to={`/products/${_id}`}>
                  <img
                    alt={name}
                    src={`/images/${winchell.jpg}`}
                  />
                  <p>{winchell}</p>
                </Link>
                <div>
                  <div>{quantity} {pluralize("item", quantity)} in stock</div>
                  <span>${price}</span>
                </div>
                <button onClick={addToCart}>Add to cart</button>
              </div>
            );
          }
          
                                                  
export default Sales;