const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Recipe.sync({ force: true }));
        beforeEach(() => Recipe.sync());
        describe('title', () => {
            it('should not be null', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary' })
                expect(recipe.title).to.not.be.a('null')
            });
            it('should be a string', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary' })
                expect(recipe.title).to.be.a('string')
            });
        });
        describe('summary', () => {
            it('should not be null', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary' })
                expect(recipe.summary).to.not.be.a('null')
            });
            it('should be a string', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary' })
                expect(recipe.summary).to.be.a('string')
            });

        });
        describe('spoonacularScore & healthScore', () => {
            it('should work when its a number between 0 and 100', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary', spoonacularScore: 100, healthScore: 0 })
                expect(recipe.spoonacularScore).to.be.at.least(0)
                expect(recipe.spoonacularScore).to.be.at.below(101)
                expect(recipe.spoonacularScore).to.be.a('number')
                expect(recipe.healthScore).to.be.at.least(0)
                expect(recipe.healthScore).to.be.at.below(101)
                expect(recipe.healthScore).to.be.a('number')
            });
        });
        describe('vegan, vegetarian, glutenFree', () => {
            it('should work when its a boolean', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary', vegan: true, vegetarian: true, glutenFree: false })
                expect(recipe.vegan).to.be.a('boolean')
                expect(recipe.vegetarian).to.be.a('boolean')
                expect(recipe.glutenFree).to.be.a('boolean')
            });
        });
        describe('analyzedInstructions', () => {
            it('should be an array with the following structure', async () => {
                const recipe = await Recipe.create({ title: 'title', summary: 'ex summary', analyzedInstructions: [{ steps: [{ number: 1, step: 'step 1' }] }] })
                expect(recipe.analyzedInstructions).to.be.an('array').to.deep.include({ steps: [{ number: 1, step: 'step 1' }] })
            });
        });
    });
});
