//////////////////////////////////////////////////
// Front Actions
//////////////////////////////////////////////////

export function filterByDiets(diet) {
    return function (dispatch, getState) {

        const recipes = getState().recipes; // con getState voy a buscar el estado de las recetas/pokemon, como un useSelector

        // const query = new URLSearchParams(window.location.search);
        // const name = query.get('name') || '';

        let filteredA = [];


        // (name ? recipes.recipesSearchByName : recipes.recipesLoaded.recipes).forEach(rd => {   ***Este es porque yo filtraba los buscados por nombre o los que traia sin filtrar
        recipes.recipesLoaded.recipes.forEach(rd => {
            rd.diets.filter(d => {
                if (!d.hasOwnProperty('name') ? d === diet.toLowerCase() : d.name === diet.toLowerCase()) {
                    return filteredA.push(rd);
                } else {
                    return ''
                }
            })
        })
        dispatch({ type: FILTER_BY_DIETS, payload: filteredA });
    }
}


// Este lo hice para limpiar los filtrados 
export function cleanFilterByDiets() {
    return function (dispatch) {
        dispatch({ type: CLEAN_FILTER_BY_DIETS, payload: [] });
    }
}



//////////////////////////////////////////////////
// Reducer state
//////////////////////////////////////////////////

const initialState = {
    recipesLoaded: [],
    recipesSearchByName: [],
    filtered: [],
}

// Switch

        case FILTER_BY_DIETS:
                
            return {
                ...state,
                filtered: action.payload
            }

        case CLEAN_FILTER_BY_DIETS:

            return {
                ...state,
                filtered: action.payload
            }










//////////////////////////////////////////////////
// Componente, html 
//////////////////////////////////////////////////


// Funcion que va en el onChange del select

function handleFilter(e) {
    dispatch(filterByDiets(e.target.value))
    // setFilterCriteria(e.target.value)
    // setShowFilterDiets(false);

    // params.set('filter', e.target.value);
    // history.push({ search: params.toString() })
}



//// HTML


                    {<select onChange={(e) => handleFilter(e)} size={diets.length}>
                        {diets && diets.map(d =>
                            <option disabled={d.name === filterCriteria} key={d.id} value={d.name}>{d.name}</option>
                        )}

                    </select>}




const validate = (line) => {

    if (line.split('.').length === 4 && line.split('.').every((li) => (li >= 0) && (li <= 255) && li.toString().length > 0 && li.toString().length < 4)) return console.log('IPv4');

    // if (line.split(':').length === 8 && line.split(':').every((li) => (li >= 0) && (li <= 255) && li.toString().length > 0 && li.toString().length < 4)) return console.log('IPv6');

    console.log('Neither');
};



input = input.split('\n');
    input.shift();

    input.forEach(line => {
        if (line.split('.').length === 4 && line.split('.').every((li) => (li >= 0) && (li <= 255) && li.length > 0 && li.length < 4)) { console.log('IPv4') }
        else if (line.split(':').length === 8 && line.split(':').every(li=> li.length >= 0 && li.length < 5 && !/[^0-9a-fA-F]/.test(li))) { console.log('IPv6') }

       else console.log('Neither');


    });
