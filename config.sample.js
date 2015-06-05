
module.exports = {

  server : {
    port: 8000
  },

  db: {
    host: 'mongodb://localhost:27017/',
    name: 'instagram'
  },

  instagram: {
    ACCESS_TOKEN : 'INSTAGRAM ACCESS TOKEN',
    CLIENT_ID    : 'INSTAGRAM CLIENT ID',
    CLIENT_SECRET: 'INSTAGRAM CLIENT SECRET',
    ID: {
      name: "id" // key and id map
    }
  }
}
