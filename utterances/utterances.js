const utterances = {
  hello: /hello|howdy|hi|hey|yo|wassup|sup|hola|hiya|ciao|aloha|shalom|hullo/i,
  yes: /yes|sure|ok|okay|yeah|affirmative|uh huh|all right|very well|of course|by all means|certainly|absolutely|indeed|right|agreed|roger|aye aye|yep|yup|ya|uh-huh|okey-dokey|okey-doke|yea|aye/i,
  no: /no|not interested|negative|nope|naw|absolutely not|most certainly not|of course not|under no circumstances|by no means|not at all|negative|never|not really|nope|uh-uh|nah|not on your life|no way|no way José|no way jose|ixnay|nay/i,
  stop: /stop|cancel|cease|abort|end/i,
  greeting: /good morning|good afternoon|good evening/i,
  feelsGood: /good|fine|nice|sweet|hanging in there|chillin|chilling|happy|great|ok|alright|all right|love|gr8/i,
  feelsBad: /bad|terrible|not good|not great|meh|depressed|sad|upset|mad|angry|furious|frustrated|hate/i,
  goodDescriptors: /good|nice|lovely|friendly|love|care very much for|deep affection|hold dear|adore|think the world of|be devoted to|dote on|idolize|worship|be in love with|be infatuated with|be smitten with|be besotted with|mad|crazy about|wild about|have a crush on/i,
  badDescriptors: /bad|hate|dislike|loathe|detest|despise|dislike|abhor|execrate|repulsed|repelled|unable to bear|stand|intolerable|recoil from|shrink from/i
}

module.exports = utterances
