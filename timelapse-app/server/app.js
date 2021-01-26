const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require("fs");
var path = require('path');


const getFiles = async(folder) => {
  let files = {};
  let folders  = readdirSync(folder, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map((el)=>el.name);
  folders.forEach((el,i)=>{
    files[el] = readdirSync(path.join(folder, el), { withFileTypes: true }).filter(dirent => !dirent.isDirectory()).map(file => file.name)
  })

  return files;
}

app.use(bodyParser.json());
app.use(cors())

app.get('/getFiles', async(req, res) => {
  res.send(await getFiles("../public/images/"))
})

app.listen(3001, () => {
  console.log(`Server listening at http://localhost:3001`)
})