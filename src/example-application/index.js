requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  },
});

require([
    'ramda',
    'jquery',
  ],
  function (_, $) {

    ///////////////////////////////////////////
    // UTILS

    const url = term =>
      `https://api.flickr.com/services/feeds/photos_public.gne?tags=${term}&format=json&jsoncallback=?`

    const trace = _.curry(function (tag, x) {
      console.log(tag, x)
      return x
    })

    const img = url => $('<img />', { src: url })

    const Impure = {
      getJSON: _.curry((callback, url) => {
        $.getJSON(url, callback)
      }),

      setHtml: _.curry((sel, html) => {
        $(sel).html(html)
      })
    }

    //////////////////////////////////////////
    // PREVIOUS
    //
    // const mediaUrl = _.compose(_.prop('m'), _.prop('media'))
    //
    // const srcs = _.compose(_.map(mediaUrl), _.prop('items'))
    //
    // const images = _.compose(_.map(img), srcs)

    const mediaUrl = _.compose(_.prop('m'), _.prop('media'))

    //////////////////////////////////////////
    // REFACTOR START
    // since var law = compose(map(f), map(g)) === map(compose(f, g));
    // so first we line up our maps:

    //    const images = _.compose(_.map(img), _.map(mediaUrl), _.prop('items'))

    // then we apply the law:

    //    const images = _.compose(_.map(_.compose(img, mediaUrl)), _.prop('items'))

    // Finally we extract the function to make it more readable

    const mediaToImg = _.compose(img, mediaUrl)

    const images = _.compose(_.map(mediaToImg), _.prop('items'))

    // REFACTOR ENDS
    //////////////////////////////////////////

    const renderImages = _.compose(Impure.setHtml('body'), images)

    const app = _.compose(Impure.getJSON(renderImages), url)

    app('Nacho')
  })

