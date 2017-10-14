var VOC = VOC || {};


VOC.utils = {

	'debug': function(s) {
		if (VOC.consts.DEBUG === true)
			console.log(s);
	},

  'sendAnalytics': function(category, action) {
		ga('send', {
			'hitType':       'event',
      'eventCategory': category,
			'eventAction':   action
		});
  }
}
