let plates = require("../data/plates.json")

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