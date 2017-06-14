const Promise = require('bluebird')
const greetingTemplate = require('./templates/greetingTemplate')
const utterances = require('./utterances/utterances')
const variants = require('./utterances/variants')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear({
    type: 'message',
    platform: 'facebook',
    text: utterances.hello
  }, (event, next) => {
    const {id, first_name, last_name} = event.user
    const txt = txt => bp.messenger.createText(id, txt)
    const quick = (message, quick_reply) => bp.messenger.createText(id, message, quick_reply)

    bp.convo.start(event, convo => {

      convo.messageTypes = ['message', 'postback', 'quick_reply', 'text']
      convo.threads['default'].addMessage(txt(`Hello ${first_name}`))
      convo.threads['default'].addQuestion(txt('Want to learn about my creator?'), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt(variants.service_yes()))
            convo.switchTo('service')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt(variants.service_no()))
            convo.say(txt('Alrighty then'))
            convo.switchTo('default')
          }
        },
        {
          default: true
          callback: () => {
            convo.say(txt('Apologies. No comprendo.'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('service')
      convo.threads['service'].addQuestion

    })




    // bp.messenger.sendText(id, `Hello, ${first_name}!`).then(Promise.delay(1000))
    // .then(() => {
    //   bp.messenger.sendText(id, 'Check out my home page').then(() => {
    //     bp.messenger.sendTemplate(id, greetingTemplate)
    //   })
    // })


  })




}
