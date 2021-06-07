//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Diet, conn } = require('./src/db.js');

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
conn.sync().then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    // const promises = [];

    // let glutenFree = Diet.create({
    //   name: 'Gluten Free'
    // })
    // let ketogenic = Diet.create({
    //   name: 'Ketogenic'
    // })
    // let vegetarian = Diet.create({
    //   name: 'Vegetarian'
    // })
    // let lactoVegetarian = Diet.create({
    //   name: 'Lacto-Vegetarian'
    // })
    // let ovoVegetarian = Diet.create({
    //   name: 'Ovo-Vegetarian'
    // })
    // let vegan = Diet.create({
    //   name: 'Vegan'
    // })
    // let pescetarian = Diet.create({
    //   name: 'Pescetarian'
    // })
    // let paleo = Diet.create({
    //   name: 'Paleo'
    // })
    // let primal = Diet.create({
    //   name: 'Primal'
    // })
    // let whole30 = Diet.create({
    //   name: 'Whole30'
    // })

    // promises.push(glutenFree, ketogenic, vegetarian, lactoVegetarian, ovoVegetarian, vegan, pescetarian, paleo, primal, whole30)

    // Promise.all(promises).then(() => console.log('Diets preloaded'));

  });
});
