import ProductList from "../components/ProductList";
import SearchMenu from '../components/SearchMenu'

const Search = () => {
    return (
        <div>
            <h3>Search for a Product</h3>
            <SearchMenu />
            <ProductList />
        </div>
    )

}
// filter options
// price range
// sale ??
// category
//recomended

// sort options
// price
// newest/oldest

// on click current category is updated
// products are then filtered based on current category

export default Search;