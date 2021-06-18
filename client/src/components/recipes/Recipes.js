
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from '../recipe/Recipe';
import Pagination from '../shared/Pagination';
import Loading from '../shared/Loading';
import { cleanFilterByDiets, filterByDiets, startGetRecipesByName, startGetRecipesOrder } from '../../actions/recipes';

import { BsSearch } from 'react-icons/bs';

import './recipes.css';


export default function Recipes({ history, location }) {

    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    const filter = params.get('filter') || '';
    const order = params.get('order') || 'Date';

    const dispatch = useDispatch();

    const { dietsLoaded: diets } = useSelector(state => state.diets)
    const { recipesLoaded, filtered, recipesSearchByName } = useSelector(state => state.recipes);
    const { recipes, total } = recipesLoaded;

    const [recipesShow, setRecipesShow] = useState([]);
    const [input, setInput] = useState(name);
    const [searchedTerm, setSearchedTerm] = useState(name);
    const [orderCriteria, setOrderCriteria] = useState(order);
    const [filterCriteria, setFilterCriteria] = useState(filter);
    const [showSelectOrder, setShowSelectOrder] = useState(false);
    const [showFilterDiets, setShowFilterDiets] = useState(false);


    // useEffect(() => {
    //     setSearchedTerm(name)
    // }, [name]);

    // useEffect(() => {
    //     setFilterCriteria(filter)
    // }, [filter]);

    // useEffect(() => {
    //     setOrderCriteria(order)
    // }, [order]);


    useEffect(() => {
        if (searchedTerm) {
            setRecipesShow(recipesSearchByName)
        } else {
            setRecipesShow(recipes)
        }
    }, [searchedTerm, recipesSearchByName, recipes, filtered]);


    useEffect(() => {
        if ((filtered.length > 0 && filterCriteria) || (filtered.length === 0 && filterCriteria) || (searchedTerm && filterCriteria)) {
            setRecipesShow(filtered)
        }
    }, [filtered, filterCriteria, recipesSearchByName, searchedTerm]);


    // useEffect(() => {
    //     if (filtered.length === 0 && !name && !filterCriteria) {
    //         setRecipesShow(recipes)
    //     }
    // }, [recipes, name, filterCriteria, filtered]);


    useEffect(() => {
        window.addEventListener('click', openCloseListListener);
        return () => window.removeEventListener('click', openCloseListListener);
    }, []);

    const openCloseListListener = (event) => {
        if (event.target.className !== 'openOrderBtn') {
            setShowSelectOrder(false);
            setShowFilterDiets(false);
        }
    };


    function handleSearchSubmit(e) {
        e.preventDefault();
        // if (!input || input === name) return;
        if (!input) return;

        setSearchedTerm(input)

        params.set('name', input)

        history.push({ search: params.toString() })

        dispatch(startGetRecipesByName(input));

        setFilterCriteria('');
    }

    function cleanSearchedTerm() {
        setSearchedTerm('');
        setInput('');
        params.delete('name');
        history.push({ search: params.toString() });

        if (filterCriteria) {
            handleCleanFilter();
        }
    }


    function handleOrder(e) {
        params.set('order', e.target.value)
        dispatch(startGetRecipesOrder(0, e.target.value));
        setOrderCriteria(e.target[e.target.selectedIndex].innerText);
        history.push(`?order=${e.target.value}`)
        // setShowSelectOrder(false);
        cleanSearchedTerm();
        handleCleanFilter();
    }


    function handleFilter(e) {
        dispatch(filterByDiets(e.target.value))
        setFilterCriteria(e.target.value)
        setShowFilterDiets(false);

        params.set('filter', e.target.value);
        history.push({ search: params.toString() })
    }

    function handleCleanFilter() {
        dispatch(cleanFilterByDiets())
        setFilterCriteria('');
        params.delete('filter');
        history.push({ search: params.toString() });
    }



    return (

        <div className="container">

            {
                (!searchedTerm && !total) ?
                    <h1>Choose a recipe!</h1>
                    :
                    <h1>{`Choose a recipe from ${!searchedTerm ? total : (recipesShow?.length ? recipesShow?.length : `...${searchedTerm}? Try another search`)}!`}</h1>
            }


            <div className="searchOptionsContainer">

                <div className="orderContainer">
                    <p className="openOrderBtn" onClick={() => setShowFilterDiets(!showFilterDiets)}>
                        Filter by {filterCriteria} {filterCriteria && `(${filtered.length})`} {filterCriteria && <span onClick={() => handleCleanFilter()}>X</span>}
                    </p>

                    {showFilterDiets && <select onChange={(e) => handleFilter(e)} size={diets.length}>
                        {diets && diets.map(d =>
                            <option disabled={d.name === filterCriteria} key={d.id} value={d.name}>{d.name}</option>
                        )}

                    </select>}

                </div>

                <div className="searchContainer">

                    <form className="searchWithBtnForm" onSubmit={(handleSearchSubmit)}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} className="searchInput" placeholder="..or already one in mind?"></input>
                        <button type="submit"><BsSearch className="btnLens">  </BsSearch> </button>
                    </form>

                </div>

                <div className="orderContainer">
                    <p className="openOrderBtn" onClick={() => setShowSelectOrder(!showSelectOrder)}>Order by {orderCriteria} <span>&#8651;</span></p>

                    {showSelectOrder && <select onChange={handleOrder} size="4">
                        <option disabled={orderCriteria === 'A-z'} value="A-z">A-z</option>
                        <option disabled={orderCriteria === 'Z-a'} value="Z-a">Z-a</option>
                        <option disabled={orderCriteria === 'Min score'} value="Min score">Min score</option>
                        <option disabled={orderCriteria === 'Max score'} value="Max score">Max score</option>
                    </select>}

                </div>

            </div>

            {searchedTerm &&
                <div className="searchResultTerm">
                    <p>Search results for: <span onClick={cleanSearchedTerm} className="searchedTerm">{searchedTerm} X</span></p>
                </div>
            }

            {
                !recipesShow?.length && !filterCriteria && !searchedTerm ?

                    <Loading></Loading>
                    :
                    <div className="cardsPagination">

                        <div className="cardContainer">
                            {(recipesShow?.length) ? recipesShow.map(r =>
                                <Recipe key={r.id} {...r} handleFilter={handleFilter}></Recipe>
                            )
                                :
                                <h3>No recipes found</h3>
                            }

                        </div>

                        {((recipesShow?.length > 0 && !searchedTerm) && (filtered.length < 1 || !filter)) && <Pagination></Pagination>}

                    </div>

            }
        </div >
    );
}