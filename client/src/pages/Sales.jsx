import ProductList from "../components/ProductList";

// display all products with a sale tag
// product have an array of tags with object id
// tag[3]._id -> sale tag
const Sales = () => {
    return (
        <>
        
        <h2>Current Sales</h2>
        <div className="container">
            <ProductList />
        </div>
        </>
    )

}

export default Sales;