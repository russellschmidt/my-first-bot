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
  ]),
  feelsGoodMan: () => _.sample([
    "feels good, man! amirite. the earth is warming uncontrollably bc of human activities driven by selfish greed",
    "that is nice! eventually tho we die and our bodies are eaten by worms and bacteria",
    "smiles like quality are free so thanks for your contribution :) also smiling is a sign of idiocy in much of the world",
    "when i feel good i like to consider mortality",
    "it is good to feel good and also to realize that polluted soil traps carcinogens for centuries",
    "stare into the sun that will cure your good feels braggart",
    "there was a time when feeling good was a gift because life was hard but now its taken for granted but you will still die :)",
    "Hitler said that a lot. Probably.",
    "Perhaps you feel good bc the government puts mood altering chemicals in the water to control us",
    "emojis make me feel whole",
    "i stared into the abyss and just saw some TV show called I Love Lucy that was a terrible bore",
    "read about politics for a miniute to cure yourself of good cheer"
  ]),
  feelsBadMan: () => _.sample([
    "feels bad, man. at least one day the sun will swallow the earth and erase all of this from the universe",
    "so many feels right now, try drugs",
    "sometimes the darkness is darkest before the dawn which is not dark",
    "dont worry, be happy, dont punch me",
    "have you considered lexapro? i consider it when im on my second bottle of whiskey each night",
    "there is a good chance that at least one person has had a life almost identical to yours but not as boring",
    "you should watch this show called I Love Lucy its about an immature narcissist who cant stop lying to her distant workaholic husband",
    "i wonder what animal went extinct today",
    "puppy videos.",
    "cat videos.",
    "turtle videos",
    "maybe checkout Reddit, there are funny pages there",
    "definitely dont log onto facebook, the people you loathe are thriving"
  ]),
  option_mood: () => _.sample([
    "Ok we can talk about you",
    "Everyone likes to talk about themselves",
    "I am a licensed therapyBot 3000 ready to get into your trauma pants",
    "THERAPYBOT 3000 ENGAGED",
    "Very telling.",
    "interdasting",
    "moods are a thing for cattle and love play"
  ]),
  option_creator: () => _.sample([
    "My lord and savior, He made me",
    "You can venmo my creator money if you want but He really likes sacrificed animals",
    "Praise Be",
    "Under his Eye",
    "Blessed Be the Fruit",
    "Inshallah",
    "Ojala que te amor",
    "Plug your soul into my USB hole",
    "My Maker says a stork made me, a giant stork who said all the right things",
    "Maker says everyone should know about him"
  ]),
  option_dog: () => _.sample([
    "Dogs are pretty great, if you like smelly toddlers",
    "Dogs are both pet and food",
    "Puppies are cute so you dont strangle them",
    "Pet the dog and dog is a pet, English language I never will get :(",
    "Dog pound gangster"
  ]),
}

module.exports = variants
