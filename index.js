const Promise = require('bluebird')
const greetingTemplate = require('./templates/greetingTemplate')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear({
    type: 'message',
    platform: 'facebook',
    text: /\b(hello)|(hi)|(hey)|(yo)|(test)|(hola)|(holla)\b/i
  }, (event, next) => {
    const {id, first_name, last_name} = event.user

    bp.messenger.sendText(id, `Hello, ${first_name}!`).then(Promise.delay(1000))
    .then(() => {
      bp.messenger.sendText(id, 'Check out my home page').then(() => {
        bp.messenger.sendTemplate(id, greetingTemplate)
      })
    })


  })




}
