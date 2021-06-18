import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { startGetRecipesOrder } from '../../actions/recipes';

import './pagination.css';


export default function Pagination() {

    const location = useLocation();
    const query = new URLSearchParams(location?.search);
    const order = query.get('order') || '';

    const dispatch = useDispatch();
    const { recipesLoaded, loading } = useSelector(state => state.recipes);

    const { total = 0, page } = recipesLoaded;

    const pages = Array.from(Array(Math.ceil(total / 10)).keys());

    const moveToPage = (p) => {
        if (page === p) return;
        dispatch(startGetRecipesOrder(p, order));
        window.scrollTo({ top: 300, behavior: 'smooth' })
    };

    return (<div className="pagContainer">
        {loading && <p>asd</p>}
        <button className="firstLastBtn" disabled={page === 0} onClick={() => dispatch(startGetRecipesOrder(0, order))}>First</button>
        <button className="firstLastBtn" disabled={page === 0} onClick={() => dispatch(startGetRecipesOrder(page - 1, order))}>{'<<'}</button>

        {page > 3 && <span>...</span>}
        <ul>
            {pages.map(p => {
                if (p > page - 4 && p < page + 4) {
                    return (<li className={page === p ? 'pageSelected' : ''} onClick={() => moveToPage(p)} key={p}>{p + 1}</li>)
                } else {
                    return '';
                }
            })}
        </ul>

        {(pages.length - page > 4) && <span>...</span>}

        <button className="firstLastBtn" disabled={page === pages.length - 1} onClick={() => dispatch(startGetRecipesOrder(page + 1, order))}>{'>>'}</button>
        <button className="firstLastBtn" disabled={page === pages.length - 1} onClick={() => dispatch(startGetRecipesOrder(pages.length - 1, order))}>Last</button>

    </div>

    );
}