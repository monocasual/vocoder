var VOC = VOC || {};


VOC.Base = {

	'elems': {
		'base':     $('.voc-base'),
		'noSpeech': $('.voc-base__alert.no-speech'),
		'noVoices': $('.voc-base__alert.no-voices'),
		'form':     $('.voc-base__form'),
		'textarea': $('.voc-base__form__textarea'),
		'status':   $('.voc-base__form__status'),
		'voices':   $('select[name="voices"]'),
		'speak':    $('button[name="speak"]'),
		'pause':    $('button[name="pause"]'),
		'cancel':   $('button[name="cancel"]'),
		'volume':   $('input[name="volume"]'),
		'pitch':    $('input[name="pitch"]'),
		'rate':     $('input[name="rate"]'),
	},

	'vars': {
		'synth': window.speechSynthesis,
		'utter': new SpeechSynthesisUtterance(),
		'voices': Array()
	},

	'hasVoices': function() {
		return this.vars.synth.getVoices().length > 0;
	},

	'loadVoices': function(doneCb) {
		VOC.utils.debug('load voices');
		var self = this;
		var tries = 0;
		var timer = setInterval(function() {
			self.vars.voices = self.vars.synth.getVoices();
			if (self.vars.voices.length > 0 || tries >= 10) {
				clearInterval(timer);
				doneCb();
			}
			tries++;
			VOC.utils.debug('try ' + tries);
		}, 50);
	},

	'populateVoicesMenu': function() {
		for (var i = 0; i < this.vars.voices.length; i++)
			this.elems.voices.append($('<option>', { value: i, text: this.vars.voices[i]['voiceURI'] }));	
	},

	'speak': function() {
		if (this.vars.synth.pending || this.vars.synth.speaking) {
			VOC.utils.debug('Pending voices, killing the queue');
			this.vars.synth.cancel();
		}
		else
			VOC.utils.debug('No pending voices');

		//this.vars.utter.lang   = 'en-GB';
		this.vars.utter.voice  = this.vars.voices[this.elems.voices.val()];
		this.vars.utter.volume = this.elems.volume.val();
		this.vars.utter.pitch  = this.elems.pitch.val();
		this.vars.utter.rate   = this.elems.rate.val();
		this.vars.utter.text   = this.elems.textarea.val();
		this.vars.synth.speak(this.vars.utter);
	},

	'pause': function() {
		if (this.vars.synth.paused)
			this.vars.synth.resume(); 
		else
			this.vars.synth.pause(); 
	},

	'cancel': function() {
		this.vars.synth.cancel(); 
	},

	'init': function() {

		var self = this;

		if (!Modernizr.speechsynthesis) {
			this.elems.noSpeech.show();
			return;
		}

		if (!this.hasVoices()) {
			this.elems.noVoices.show();
			return;			
		}

		this.populateVoicesMenu();

		this.elems.form.show();

		this.elems.speak.click(function(e) {
			self.speak();
		});				
		this.elems.pause.click(function(e) {
			self.pause();
		});
		this.elems.cancel.click(function(e) {
			self.cancel();
		});

		this.vars.utter.onerror = function(e) {
			self.elems.status.html('Error: ' + e.error); 
    	console.log('Speech synthesis error: ' + e.error);
  	}		
  	this.vars.utter.onstart = function(e) {
  		self.elems.status.html('Speaking...'); 
    	console.log('Speech synthesis started');
  	}  
  	this.vars.utter.onpause = function(e) {
  		self.elems.status.html('Paused'); 
    	console.log('Speech synthesis paused');
  	}  
  	this.vars.utter.onend = function(e) {
  		self.elems.status.html('&nbsp;'); 
    	console.log('Speech synthesis ended');
  	}
	}
}


/* -------------------------------------------------------------------------- */


$(document).ready(function() {
	VOC.Base.loadVoices(function() {
		VOC.Base.init();
	});
});