const greetingTemplate = {
  template_type: 'generic',
  elements: [{
    title: 'Visit my homepage',
    item_url: 'http://russellschmidt.net',
    image_url: 'http://static.boredpanda.com/blog/wp-content/uploads/2015/04/bulldog-puppy-cute-dog-photography-5__605.jpg',
    buttons: [{
        type: 'web_url',
        title: 'Czech me out',
        url: 'http://russellschmidt.net'
      },
      {
        type: 'element_share'
      },
      {
        type: 'phone_number',
        title: 'Call me',
        payload: '+12137096969'
      }
    ]
  }]
}

module.exports = greetingTemplate
