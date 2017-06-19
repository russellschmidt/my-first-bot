const _ = require('lodash')

const variants = {
  service_yes: () => _.sample([
    '<Tony the Tiger voice> That is grrrrrrrreat!',
    'Wünderbar',
    'Happy to hear that',
    'It gives me much pleasure to see you type that',
    'Thank you for your interest',
    ':)',
    'Radicool!',
    '=)',
  ]),
  service_no: () => _.sample([
    ':/',
    ':(',
    'Sorry to hear that',
    'Hope we are not enemigos but instead remain amigos por vida',
    'I don\'t believe it!',
    'OK',
    'Back to the drawing board'
  ])
}

module.exports = variants
