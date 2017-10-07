var VOC = VOC || {};


VOC.Base = {

	'elems': {
		'base':     $('.voc-base'),
		'noSpeech': $('.voc-base__no-speech'),
		'noVoices': $('.voc-base__no-voices'),
		'form':   $('.voc-base__form'),
		'voices':   $('.voc-base__form__voices'),
		'textarea': $('.voc-base__form__textarea'),
		'button':   $('button[name="read-it"]'),
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

	'populateVoicesMenu': function() {
		this.vars.voices = this.vars.synth.getVoices();
		for (var i = 0; i < this.vars.voices.length; i++)
			this.elems.voices.append($('<option>', { value: i, text: this.vars.voices[i]['voiceURI'] }));
	},

	'speak': function() {
		this.vars.utter.lang   = "en-GB";
		this.vars.utter.voice  = this.vars.voices[this.elems.voices.val()];
		this.vars.utter.volume = this.elems.volume.val();
		this.vars.utter.pitch  = this.elems.pitch.val();
		this.vars.utter.rate   = this.elems.rate.val();
		this.vars.utter.text   = this.elems.textarea.val();
		this.vars.synth.speak(this.vars.utter);
	},

	'init': function() {

		var self = this;

		if (!Modernizr.speechsynthesis) {
			this.elems.noSpeech.show();
			return;
		}
		else
		if (!this.hasVoices()) {
			this.elems.noVoices.show();
			return;			
		}

		this.elems.form.show();
		this.populateVoicesMenu();
		if (this.vars.synth.onvoiceschanged !== undefined && this.vars.voices.length == 0)
			this.vars.synth.onvoiceschanged = this.populateVoicesMenu;

		this.elems.button.click(function(e) {
			e.preventDefault();
			self.speak();
		});		
	}
}


/* -------------------------------------------------------------------------- */


$(document).ready(function() {
	VOC.Base.init();
});