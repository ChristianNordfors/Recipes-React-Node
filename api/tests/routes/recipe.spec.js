/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Breaded meat',
  summary: 'Recipe summary',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect('Content-Type', /json/).expect(200)
    );

    it('should get 404 if no results match by given ?name=', () => {
      // Recipe.create({ title: 'chicken', summary: 'summary' })
      agent.get('/recipes?name=bread')
        .expect(200, function (err, res) {
          expect(res.body.ok).to.be.equal(true);
        });
    })

    it('should get 404 if no results match by given ?name=', () => {
      agent.get('/recipes?name=noRecipeWouldBeNamedLikeThis')
        .expect(404, function (err, res) {
          expect(res.body.ok).to.be.equal(false);
        });
    })

    it('GET recipes by page', () => {
      agent.get('/recipes?page=0')
        .expect(200, function (err, res) {
          expect(res.body.ok).to.be.equal(true);
          expect(res.body.recipes).to.be.an('array');
          expect(res.body.page).to.be.equal(0);
        });
    })


    describe('Order', async () => {
      it('GET recipes by A to z', async () => {
        const recipeTestA = await Recipe.create({ title: 'a', summary: 'a' })
        const recipeTestC = await Recipe.create({ title: 'c', summary: 'c' })

        agent.get('/recipes?order=A-z')
          .expect(200, function (err, res) {
            expect(res.body.ok).to.be.equal(true);
            expect(res.body.recipes).to.be.an('array');
            expect(res.body.recipes[1].title).to.be.equal(recipe.title);
            expect(res.body.recipes[0].title).to.be.equal(recipeTestA.title);
            expect(res.body.recipes[2].title).to.be.equal(recipeTestC.title);
          });
      })
      it('GET recipes by order', async () => {
        const recipeTestA = await Recipe.create({ title: 'a', summary: 'a', spoonacularScore: 50  })
        const recipeTestC = await Recipe.create({ title: 'c', summary: 'c', spoonacularScore: 75 })

        agent.get('/recipes?order=Max score')
          .expect(200, function (err, res) {
            expect(res.body.ok).to.be.equal(true);
            expect(res.body.recipes).to.be.an('array');
            expect(res.body.recipes[0].spoonacularScore).to.be.equal(recipeTestC.spoonacularScore);
            expect(res.body.recipes[1].spoonacularScore).to.be.equal(recipeTestA.spoonacularScore);
          });
      })
    });


  });

  describe('POST /recipe', () => {
    it('should get 201 if title and summary', () =>
      agent.post('/recipes/recipe')
        .type('form')
        .send({ title: 'Breaded meat', summary: 'This is a sumamry of the dish' })
        .expect('Content-Type', /json/)
        .expect(201)
    );
    it('should get 400 if there is no title', () =>
      agent.post('/recipes/recipe')
        .type('form')
        .send({ summary: 'This is a sumamry of the dish' })
        .expect(400)
    );
    it('should get 400 if there is no summary', () =>
      agent.post('/recipes/recipe')
        .type('form')
        .send({ title: 'Breaded meat' })
        .expect(400)
    );

    it('should get 500 if health score is lower than 0', () =>
      agent.post('/recipes/recipe')
        .send({ title: 'Breaded meat', summary: 'asdasdas', healthScore: -1 })
        .expect(500)
    );
    it('should get 500 if spoonacular score is greater than 100', () =>
      agent.post('/recipes/recipe')
        .send({ title: 'Breaded meat', summary: 'asdasdas', spoonacularScore: 101 })
        .expect(500)
    );
  });

  describe('GET /recipe:recipeId', () => {
    it('should get 200', () =>
      agent.get('/recipes/recipe/500')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.recipe).to.have.property('id').to.be.equal(500)
        })
    );
    it('should get 404 if no recipe was found by the given id', () =>
      agent.get('/recipes/recipe/thisIsAnImpossibleId')
        .expect('Content-Type', /json/)
        .expect(404)
    );

  });
});
