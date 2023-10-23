import { useStoreContext } from '../../utils/GlobalState';
import { FILTER_SORT_PRODUCTS } from '../../utils/actions';

// import {
//     UPDATE_SORT_OPTION,
// } from '../../utils/actions';

function SearchMenu() {
    const [state, dispatch] = useStoreContext();
    const categoryList = [

    ];

    // on submit update state vars for filter, sort, min, max
    const handleSubmit = () => {
        // filter options: price range, category
        // sale, recomended ???

        // sort options: price, newest/oldest
        let filterMethod = '';
        if (this.categoryNode != '' && categoryList.includes(this.categoryNode.value)) {
            filterMethod = this.categoryNode;
        } else if (this.maxNode && this.minNode) {
            filterMethod = 'price';
        } else {
            alert('Pick a sorting method');
        }

        // retrieve sort method
        let sortMethod = '';
        if (this.ascNode) {
            sortMethod = 'asc';
        } else if (this.descNode) {
            sortMethod = 'desc';
        } else if (this.newNode) {
            sortMethod = 'new';
        } else if (this.oldNode) {
            sortMethod = 'old';
        }

        dispatch({
            type: FILTER_SORT_PRODUCTS,
            filter: filterMethod,
            sort: sortMethod,
            min: this.minNode,
            max: this.maxNode,
        })

    }

    return (
        <div className="container">
            <form>
                <p>Filter Options</p>

                <label>Category:</label><br />
                <input type="text" id="category" name="category"
                    ref={node => (this.categoryNode = node)}
                /><br />
                <label>Price Min:</label><br />
                <input type="text" id="maxPrice" name="maxPrice"
                    ref={node => (this.maxNode = node)}
                /><br />
                <label>Price Max:</label><br />
                <input type="text" id="minPrice" name="minPrice"
                    ref={node => (this.minNode = node)}
                /><br />


                <p>Sorting options</p>

                <input type="checkbox" id="asc" name="asc"
                    ref={node => (this.ascNode = node)}
                />
                <label>Price Ascending</label> <br />

                <input type="checkbox" id="desc" name="desc"
                    ref={node => (this.descNode = node)}
                />
                <label>Price Descending</label> <br />

                <input type="checkbox" id="new" name="new"
                    ref={node => (this.newNode = node)}
                />
                <label>Newest</label> <br />

                <input type="checkbox" id="old" name="old"
                    ref={node => (this.oldNode = node)}
                />
                <label>Oldest</label> <br />
                <button type="submit" onClick={() => {
                    handleSubmit();
                }}>Search</button>

            </form>

        </div>
    )
}

export default SearchMenu;