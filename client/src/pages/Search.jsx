import SearchList from "../components/SearchList";
import SearchMenu from '../components/SearchMenu'
import {useState} from 'react'

const Search = () => {
    return (
        <div>
            <h3>Search for a Product</h3>
            <SearchMenu/>
            <SearchList />
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