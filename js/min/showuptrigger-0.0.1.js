!function(t){var n={init:function(n){var r=t.extend({trigger:"#showuptrigger",callback:function(){}},n);return this.each(function(){var n=e.createInstance(this,r);n.observe(),t(this).data("showuptrigger",n)})},off:function(){return this.each(function(){var n=t(this).data("showuptrigger");n.stopObserving()})}};t.fn.showuptrigger=function(e){return n[e]?n[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.tooltip"):n.init.apply(this,arguments)};var e=function(){var t={};return t.createInstance=function(t,n){return t===window?new r(n):new i(t,n)},t.prototype={observe:function(){this.eventId=this.generateId();var t=this;this.$container.on("scroll."+this.eventId,function(n){t.calcVisibleBottom()>t.calcTriggerTop()&&(t.$container.off("."+t.eventId),t.settings.callback())})},stopObserving:function(){this.$container.off("."+this.eventId)},generateId:function(){var t=Math.floor(1e3*Math.random()),n=(new Date).getTime();return t+n.toString()}},t}(),r=function(){var n=function(n){this.settings=n,this.$container=t(window),this.$trigger=t(n.trigger)};return t.extend(n.prototype,e.prototype,{calcVisibleBottom:function(){return this.$container.scrollTop()+this.$container.height()},calcTriggerTop:function(){return this.$trigger.offset().top}}),n}(),i=function(){var n=function(n,e){this.settings=e,this.$container=t(n),this.$trigger=t(e.trigger)};return t.extend(n.prototype,e.prototype,{calcVisibleBottom:function(){return this.$container.scrollTop()+this.$container.height()+this.$container.offset().top},calcTriggerTop:function(){return this.$trigger.offset().top+this.$container.scrollTop()}}),n}()}(jQuery);