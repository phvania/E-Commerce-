import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
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
const filteredProdects = saleProducts
   .filter((product)  => product.discountPercentage >= discountFilter)
   .filter((product) => !CategoryMenu || product.CategoryFilter ===CategoryMenu);
   
   return (
    <div>
        
    </div>
   )


    
            

export default Sales;