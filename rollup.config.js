const path = require("path");
const buble = require("@rollup/plugin-buble");
const resolve = (filePath)=> {
    return path.resolve(__dirname, "./"+filePath)
}

module.exports = {
    input: resolve('src/index.ts'),
    output:{
        name: "get-safe-value",
        file: resolve("index.js"),
        format: "umd",
    },
    plugins:[
        buble()
    ]
}