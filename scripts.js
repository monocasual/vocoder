var VOC=VOC||{};VOC.consts={DEBUG:!0},(VOC=VOC||{}).Base={elems:{base:$(".voc-base"),noSpeech:$(".voc-base__alert.no-speech"),noVoices:$(".voc-base__alert.no-voices"),form:$(".voc-base__form"),textarea:$(".voc-base__form__textarea"),status:$(".voc-base__form__status"),voices:$('select[name="voices"]'),speak:$('button[name="speak"]'),pause:$('button[name="pause"]'),cancel:$('button[name="cancel"]'),volume:$('input[name="volume"]'),pitch:$('input[name="pitch"]'),rate:$('input[name="rate"]')},vars:{synth:window.speechSynthesis,utter:new SpeechSynthesisUtterance,voices:Array()},hasVoices:function(){return this.vars.synth.getVoices().length>0},loadVoices:function(e){VOC.utils.debug("load voices");var s=this,t=0,n=setInterval(function(){s.vars.voices=s.vars.synth.getVoices(),(s.vars.voices.length>0||t>=10)&&(clearInterval(n),e()),t++,VOC.utils.debug("try "+t)},50)},populateVoicesMenu:function(){for(var e=0;e<this.vars.voices.length;e++)this.elems.voices.append($("<option>",{value:e,text:this.vars.voices[e].voiceURI}))},speak:function(){VOC.utils.sendAnalytics("Action","Speak"),this.vars.synth.pending||this.vars.synth.speaking?(VOC.utils.debug("Pending voices, killing the queue"),this.vars.synth.cancel()):VOC.utils.debug("No pending voices"),this.vars.utter.voice=this.vars.voices[this.elems.voices.val()],this.vars.utter.volume=this.elems.volume.val(),this.vars.utter.pitch=this.elems.pitch.val(),this.vars.utter.rate=this.elems.rate.val(),this.vars.utter.text=this.elems.textarea.val(),this.vars.synth.speak(this.vars.utter)},pause:function(){VOC.utils.sendAnalytics("Action","Pause"),this.vars.synth.paused?this.vars.synth.resume():this.vars.synth.pause()},cancel:function(){VOC.utils.sendAnalytics("Action","Cancel"),this.vars.synth.cancel()},init:function(){var e=this;return Modernizr.speechsynthesis?this.hasVoices()?(this.populateVoicesMenu(),this.elems.form.show(),this.elems.speak.click(function(s){e.speak()}),this.elems.pause.click(function(s){e.pause()}),this.elems.cancel.click(function(s){e.cancel()}),this.vars.utter.onerror=function(s){e.elems.status.html("Error: "+s.error),console.log("Speech synthesis error: "+s.error)},this.vars.utter.onstart=function(s){e.elems.status.html("Speaking..."),console.log("Speech synthesis started")},this.vars.utter.onpause=function(s){e.elems.status.html("Paused"),console.log("Speech synthesis paused")},void(this.vars.utter.onend=function(s){e.elems.status.html("&nbsp;"),console.log("Speech synthesis ended")})):(this.elems.noVoices.show(),void VOC.utils.sendAnalytics("API status","API OK, no voices found")):(this.elems.noSpeech.show(),void VOC.utils.sendAnalytics("API status","No speech synthesis API available"))}},$(document).ready(function(){VOC.Base.loadVoices(function(){VOC.Base.init()})}),(VOC=VOC||{}).utils={debug:function(e){},sendAnalytics:function(e,s){ga("send",{hitType:"event",eventCategory:e,eventAction:s})}},function(e,s,t){function n(e,s){return typeof e===s}var i=[],a=[],o={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,s){var t=this;setTimeout(function(){s(t[e])},0)},addTest:function(e,s,t){a.push({name:e,fn:s,options:t})},addAsyncTest:function(e){a.push({name:null,fn:e})}},c=function(){};c.prototype=o,(c=new c).addTest("speechsynthesis","SpeechSynthesisUtterance"in e);var l=s.documentElement,r="svg"===l.nodeName.toLowerCase();(function(){var e,s,t,o,l,r,u;for(var h in a)if(a.hasOwnProperty(h)){if(e=[],(s=a[h]).name&&(e.push(s.name.toLowerCase()),s.options&&s.options.aliases&&s.options.aliases.length))for(t=0;t<s.options.aliases.length;t++)e.push(s.options.aliases[t].toLowerCase());for(o=n(s.fn,"function")?s.fn():s.fn,l=0;l<e.length;l++)r=e[l],1===(u=r.split(".")).length?c[u[0]]=o:(!c[u[0]]||c[u[0]]instanceof Boolean||(c[u[0]]=new Boolean(c[u[0]])),c[u[0]][u[1]]=o),i.push((o?"":"no-")+u.join("-"))}})(),function(e){var s=l.className,t=c._config.classPrefix||"";if(r&&(s=s.baseVal),c._config.enableJSClass){var n=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");s=s.replace(n,"$1"+t+"js$2")}c._config.enableClasses&&(s+=" "+t+e.join(" "+t),r?l.className.baseVal=s:l.className=s)}(i),delete o.addTest,delete o.addAsyncTest;for(var u=0;u<c._q.length;u++)c._q[u]();e.Modernizr=c}(window,document);