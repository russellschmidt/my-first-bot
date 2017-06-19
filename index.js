const Promise = require('bluebird')
const greetingTemplate = require('./templates/greetingTemplate')
const utterances = require('./utterances/utterances')
const variants = require('./utterances/variants')
const quickReplies = require('./utterances/quickReplies')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear({
    type: 'message',
    platform: 'facebook',
    text: utterances.hello
  }, (event, next) => {
    const {id, first_name, last_name} = event.user
    const txt = text => bp.messenger.createText(id, text, {typing: true})
    const tmplt = template => bp.messenger.sendTemplate(id, template, {typing: 1000} )
    const quick = (message, quick_reply) => bp.messenger.createText(id, message, quick_reply)

    bp.convo.start(event, convo => {

      convo.messageTypes = ['message', 'postback', 'quick_reply', 'text']



      convo.threads['default'].addMessage(txt(`Hello ${first_name}`))
      convo.threads['default'].addQuestion(txt('Want to learn about my creator?'), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt(variants.service_yes()))
            convo.switchTo('learnMore')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt(variants.service_no()))
            convo.say(txt('Alrighty then'))
            convo.switchTo('chitchat')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Apologies. No comprendo.'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('learnMore')
      convo.threads['learnMore'].addQuestion(quick('Want to see my maker\'s home page?', quickReplies), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt(variants.service_yes()))
            convo.say(bp.messenger.sendTemplate(id, greetingTemplate, {typing: 1000}))
            convo.switchTo('default')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt(variants.service_no()))
            convo.switchTo('default')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Me no understand :-/ '))
            convo.repeat()
          }
        }
      ])

      convo.createThread('chitchat')
      convo.threads['chitchat'].addQuestion(txt("How are you today?"), [
        {
          
        },
        {

        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Hmm. Not sure I understand that.'))
            convo.repeat()
          }
        }
      ])

      convo.on('done', () => {
        convo.say(txt('okee dokey we are all done now I guess.'))
      })

      convo.on('aborted', () => {
         convo.say(txt('Conversation abortion complete. Byeee drivah'))
      })

      bp.hear(utterances.stop, (event, next) => {
        const convo = bp.convo.find(event)
        convo && convo.stop('aborted')
      })

// end bp.convo.start
    })

  })

}
