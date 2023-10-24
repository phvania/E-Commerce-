import { useStoreContext } from '../../utils/GlobalState';
import { FILTER_SORT_PRODUCTS } from '../../utils/actions';

// import {
//     UPDATE_SORT_OPTION,
// } from '../../utils/actions';

function SearchMenu() {
    const [state, dispatch] = useStoreContext();
    const categoryList = [
        'Biography',
        'Romance',
        'Horror',
        'Mystery',
        'Poetry',
    ];

    // on submit update state vars for filter, sort, min, max
    const handleSubmit = async (e) => {
        e.preventDefault()
        // filter options: price range, category
        // sale, recomended ???
        // console.log(e.target.category.value)
        // sort options: price, newest/oldest
        let filterMethod = '';
        if (e.target.category.value != '' && categoryList.includes(e.target.category.value)) {
            filterMethod = e.target.category.value;
        } else if (e.target.maxPrice.value && e.target.minPrice.value) {
            filterMethod = 'price';
        } else {
            alert('Pick a sorting method');
        }

        // retrieve sort method
        let sortMethod = '';
        if (e.target.asc.checked) {
            sortMethod = 'asc';
        } else if (e.target.desc.checked) {
            sortMethod = 'desc';
        } else if (e.target.new.checked) {
            sortMethod = 'new';
        } else if (e.target.old.checked) {
            sortMethod = 'old';
        }
        // console.log('about to dispatch')
        // console.log(filterMethod, sortMethod, e.target.minPrice.value, e.target.maxPrice.value)
        await dispatch({
            type: FILTER_SORT_PRODUCTS,
            filter: filterMethod,
            sort: sortMethod,
            min: e.target.minPrice.value,
            max: e.target.maxPrice.value,
        })
        // console.log(state)

    }

    return (
        <div className="container">
            <form onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <p>Filter Options</p>
                <label>Category: (Biography, Romance, Horror, Mystery, Poetry)</label><br />
                <input type="text" id="category" name="category"
                /><br />
                <label>Price Min:</label><br />
                <input type="text" id="maxPrice" name="maxPrice"
                /><br />
                <label>Price Max:</label><br />
                <input type="text" id="minPrice" name="minPrice"
                /><br />


                <p>Sorting options</p>

                <input type="checkbox" id="asc" name="asc"
                />
                <label>Price Ascending</label> <br />

                <input type="checkbox" id="desc" name="desc"
                />
                <label>Price Descending</label> <br />

                <input type="checkbox" id="new" name="new"
                />
                <label>Newest</label> <br />

                <input type="checkbox" id="old" name="old"
                />
                <label>Oldest</label> <br />
                <button type="submit" >Search</button>

            </form >

        </div>
    )
}

export default SearchMenu;