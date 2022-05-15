let plates = require("../data/plates.json")
const { v4: uuidv4 } = require('uuid')

module.exports.findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(plates)
    })
}

module.exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        const plate = plates.find((p) => p.id === id)
        resolve(plate)
    })
}

// function create(product) {
//     return new Promise((resolve, reject) => {
//         const newProduct = {id: uuidv4(), ...product}
//         products.push(newProduct)
//         if (process.env.NODE_ENV !== 'test') {
//             writeDataToFile('./data/products.json', products);
//         }
//         resolve(newProduct)
//     })
// }

// function update(id, product) {
//     return new Promise((resolve, reject) => {
//         const index = products.findIndex((p) => p.id === id)
//         products[index] = {id, ...product}
//         if (process.env.NODE_ENV !== 'test') {
//             writeDataToFile('./data/products.json', products);
//         }
//         resolve(products[index])
//     })
// }

// function remove(id) {
//     return new Promise((resolve, reject) => {
//         products = products.filter((p) => p.id !== id)
//         if (process.env.NODE_ENV !== 'test') {
//             writeDataToFile('./data/products.json', products);
//         }
//         resolve()
//     })
// }