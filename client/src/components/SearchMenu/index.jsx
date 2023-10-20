
import { useStoreContext } from '../../utils/GlobalState';

import {
    UPDATE_SORT_OPTION,
  } from '../../utils/actions';

function SearchMenu() {
    const [state, dispatch] = useStoreContext();
    // filter options
    // price range
    // sale ??
    // category
    //recomended
    const handleSubmit = () => {

    }

    // sort options
    // price
    // newest/oldest
    // updates the state.sort to the specified string
    const handleSort = (option) => {
        dispatch({
            type: UPDATE_SORT_OPTION,
            sort: option,
        });
        // sort by option string given
        // switch (option) {
        //     case 'asc':
        //         break;
        //     case 'desc':
        //         break;
        //     case 'new':
        //         break;
        //     case 'old':
        //         break;
        //     default:
        //         break;
        // }

    }


    return (
        <div className="container">
            <h3>This is the search menu</h3>
            {/* need a handle form submit function */}
            <form>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label for="vehicle1"> I have a bike</label> <br />
                <button type="submit" onClick={() => {
                    handleSubmit();
                }}>Search</button>

            </form>

            {/*  add onclick events to sorting options */}
            <form>
                <p>Sorting options</p>
                <button
                    onClick={() => {
                        handleSort('asc');
                    }}>Price Ascending</button>
                <button
                    onClick={() => {
                        handleSort('desc');
                    }}>Price Descending</button>
                <button
                    onClick={() => {
                        handleSort('new');
                    }}>Newest</button>
                <button
                    onClick={() => {
                        handleSort('old');
                    }}>Oldest</button>
            </form>
        </div>
    )
}

export default SearchMenu;