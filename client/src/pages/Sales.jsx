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
   //filter data,based on the filer criteria /javascript'sarray method to ahieve this  
const filteredProdects =  saleProducts.filter((product) => {
return (
    (filterCriteria.CategoryMenu === '' || product.CategoryMenu ===filterCriteria.CategoryMenu) &&
    (filterCriteria.priceRange === 'all' ||
    (filterCriteria.priceRange === 'low' && product.price <20) ||
    (filterCriteria.priceRange === 'medium' && product.price >= 20 && product.price < 50) ||
    (filterCriteria.priceRange === 'high' && product.price >= 50)
)
);
});
    
 
   //.filter((product)  => product.discountPercentage >= discountFilter)]}
   //.filter((product) => !CategoryMenu || product.CategoryFilter ===CategoryMenu);
 
   
    //const Sale = (
        //render filter element
        
        const filteredProdects =  saleProducts.filter((product) => {
       
return (
             <div className="sale-page">
             <h2>on sale!</h2>
            <div className="filter-section">
            <label>Categorymanu:</label>
            <input
            type= "name"
            value={discountFilter}
           onChange={(e) => setDiscountFilter(e.target.value)} />
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
            };
        )
                          
                    
                      
export default Sales;