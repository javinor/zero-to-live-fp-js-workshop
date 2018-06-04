const micro = require('micro')

const app = micro((req, res) => "hello world!")

app.listen(4000)