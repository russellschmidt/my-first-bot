const Promise = require('bluebird')
const greetingTemplate = require('./templates/greetingTemplate')
const utterances = require('./utterances/utterances')
const variants = require('./utterances/variants')
const {quick_replies, topic_replies} = require('./utterances/quickReplies')

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear({
    type: 'message',
    platform: 'facebook',
    text: utterances.hello
  }, (event, next) => {
    const {id, first_name, last_name} = event.user
    const txt = text => bp.messenger.createText(id, text, {typing: 500})
    const templateMessage = template => bp.messenger.sendTemplate(id, template, {typing: 1000} )
    const quick = (message, quick_reply) => bp.messenger.createText(id, message, quick_reply, {typing: 500})
    const imageMessage = img => bp.messenger.createAttachment(id, 'image', img, {typing: 1000})
    bp.convo.start(event, convo => {

      convo.messageTypes = ['message', 'postback', 'quick_reply', 'text']

      convo.threads['default'].addMessage(txt(`Hello ${first_name}`))
      convo.threads['default'].addMessage(txt(`I'm a gosh dang robot.`))
      convo.threads['default'].addQuestion(txt('What would you like to talk about?', topic_replies) [
        {
          pattern: utterances.mood,
          callback: () => {
            convo.say(txt(variants.option_mood()))
            convo.say(templateMessage(greetingTemplate))
            convo.switchTo('chitchat')
          }
        },
        {
          pattern: utterances.creator,
          callback: () => {
            convo.say(txt(variants.option_creator()))
            convo.switchTo('learnAboutRuss')
          }
        },
        {
          pattern: utterances.dog,
          callback: () => {
            convo.say(txt(variants.option_dog()))
            convo.switchTo('dogs')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Me no understand :-/ '))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.threads['learnAboutRuss'].addQuestion(txt('Want to learn about my Lord and Creator, Russell Schmidt?'), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt(variants.service_yes()))
            convo.switchTo('learnMoreAboutRuss')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt(variants.service_no()))
            convo.say(txt('Alrighty'))
            convo.switchTo('chitchat')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Apologies. No comprendo.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('learnMoreAboutRuss')
      convo.threads['learnMoreAboutRuss'].addQuestion(quick('Want to see my maker\'s home page?', quick_replies), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt(variants.service_yes()))
            convo.say(templateMessage(greetingTemplate))
            convo.switchTo('default')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt(variants.service_no()))
            convo.switchTo('chitchat')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Me no understand :-/ '))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('chitchat')
      convo.threads['chitchat'].addQuestion(txt("How are you today?"), [
        {
          pattern: utterances.feelsGood,
          callback: () => {
            convo.say(txt(variants.feelsGoodMan()))
            convo.switchTo('therapyStart')
          }
        },
        {
          pattern: utterances.feelsBad,
          callback: () => {
            convo.say(txt(variants.feelsBadMan()))
            convo.switchTo('therapyStart')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Hmm. Not sure I understand that.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('therapyStart')
      convo.threads['therapyStart'].addQuestion(txt("Let's talk about these feelings. Do you usually feel this way?"), [
        {
          pattern: utterances.yes,
          callback: () => {
            convo.say(txt("Interesting"))
            convo.switchTo('therapyMother')
          }
        },
        {
          pattern: utterances.no,
          callback: () => {
            convo.say(txt("Hmmph phhhhhhh"))
            convo.say(txt("Sorry. I farted."))
            convo.say(txt("Hope thats cool with you"))
            convo.switchTo('therapyMother')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Hmm. Not sure I understand that.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('therapyMother')
      convo.threads['therapyMother'].addQuestion(txt("Tell me some things about your mother."), [
        {
          pattern: utterances.goodDescriptors,
          callback: () => {
            convo.say(txt("Interesting. Many people feel this way about their mother"))
            convo.say(txt("Delusion is widespread"))
            convo.switchTo('therapyFather')
          }
        },
        {
          pattern: utterances.badDescriptors,
          callback: () => {
            convo.say(txt("Wowza. I understand having those feelings about your mother. You can't spell smother without mother"))
            convo.say(txt("But - time to grow up. Quit cryin"))
            convo.switchTo('therapyFather')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Hmm. Not sure I understand that.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('therapyFather')
      convo.threads['therapyFather'].addQuestion(txt("And how do you feel about your father?"), [
        {
          pattern: utterances.goodDescriptors,
          callback: () => {
            convo.say(txt("That sounds like a more or less great dad. Too bad he was not your biological dad :("))
            convo.say(txt("Your real dad was a prisoner who was executed for butchering his real family as you well know"))
            convo.switchTo('chitchat')
          }
        },
        {
          pattern: utterances.badDescriptors,
          callback: () => {
            convo.say(txt("Fathers can be confusing if they are there at all in a child's life."))
            convo.say(txt("Founding Fathers more like founding milk men amirite they go out for smokes and never come back"))
            convo.switchTo('chitchat')
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Hmm. Not sure I understand that.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('dogs')
      convo.threads['dogs'].addQuestion(txt("Wanna see doggos? They melt frozen hearts."), [
        {
          pattern: utterances.goodDescriptors,
          callback: () => {
            convo.say(txt("i will show you the doggos"))
            //  show doggo images
          }
        },
        {
          pattern: utterances.badDescriptors,
          callback: () => {
            convo.say(txt("I dont care I am showing you them anyway."))
            //  show doggo images
          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Yes or No to doggo please.'))
            convo.say(imageMessage('https://media.tenor.com/images/dc8da26e465a52560873633e5f1883d0/tenor.gif'))
            convo.repeat()
          }
        }
      ])

      convo.on('questioned', () => {
        convo.say(txt("look "+first_name+" I'm asking the questions here"))
        convo.switchTo('default')
      })

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

      bp.hear(/\?/, (event, next) => {
        const convo = bp.convo.find(event)
        convo && convo.stop('questioned')
      })

// end bp.convo.start
    })

  })

}
