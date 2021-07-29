import React from 'react';
// import { useParams } from 'react-router';

// import '@testing-library/jest-dom';
import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import RecipeDetail from '../components/recipeDetail/RecipeDetail';
import { getRecipe } from '../functions/recipes';

import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider, useDispatch, useSelector } from 'react-redux';

import store from '../store/index';
import * as redux from 'react-redux'
import Loading from '../components/shared/Loading';

jest.setTimeout(7000)

const renderWithRouter = (component) => {

    const history = createMemoryHistory({
        initialEntries: ["/recipes/500"],
    });
    const Wrapper = ({ children }) => (
        <Provider store={store}>
            <Router history={history}>
                <RecipeDetail path="/recipes/:id/">{children}</RecipeDetail>
            </Router>
        </Provider>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    };
};

const mockHistoryGoBack = jest.fn();
const mockHistoryReplace = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        goBack: mockHistoryGoBack,
        replace: mockHistoryReplace
    }),
}));




const { recipe } = renderWithRouter(<RecipeDetail></RecipeDetail>);



describe('Recipe Detail page', () => {
    describe('getRecipe function', () => {
        test('should fetch the proper recipe by the given id', (done) => {
            getRecipe('500')
                .then(({ data }) => {
                    expect(typeof data.recipe).toBe('object')
                    expect(data.recipe.id).toBe(500);
                    // expect(data.recipe.title).toBe('Acciugata Di Renato'); //id 500
                    expect(data.recipe.title).toBe('Acciugata Di Renato');
                    done()
                }).catch(done)
        })
        test('should return 404 if no recipe was found', (done) => {
            const { history } = renderWithRouter(<RecipeDetail></RecipeDetail>);
            getRecipe("NotA-Valid_Id")
                .then(({ data }) => {
                    done()
                }).catch((error) => {
                    // expect(true).toBe(false)
                    expect(error.response.status).toBe(404)
                    done()
                })
        });

    });
    describe('html', () => {
        test('should render Loading component with an image if recipe did not load yet', () => {
            if (!recipe) {
                const { container } = render(<Loading></Loading>)
                const loading = container.querySelector('svg')
                expect(loading).toBeInTheDocument()
            }
        })
        test('should show Health Score:', () => {
            if (recipe) {
                const { getByText } = renderWithRouter(<RecipeDetail></RecipeDetail>);
                const healthScore = screen.getByText('Health Score:');
                expect(healthScore).toBeInTheDocument();
            }
        });
        test('should have an image', () => {
            if (recipe) {
                const { container } = renderWithRouter(<RecipeDetail></RecipeDetail>);
                const image = container.querySelector('img');
                expect(image).toBeInTheDocument();
            }

        });
        test('button back', () => {
            if (recipe) {
                const { getByRole } = renderWithRouter(<RecipeDetail></RecipeDetail>);
                fireEvent.click(getByRole('button'));
                expect(mockHistoryGoBack).toHaveBeenCalled()
            }
        });
    });
});