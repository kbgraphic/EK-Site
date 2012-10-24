$(document).ready(function(){
	$('#basic-search').on({
		focus: function(){
			$(this).addClass('expanded');
			var val = this.value;
			var $this = $(this);
			$this.val("");
			setTimeout(function () {
			    $this.val(val);
			}, 1);
		},
		blur: function(){
			$(this).removeClass('expanded')
		}
	}, 'input')
	
	$('#feature .carousel').carousel({
		interval: 20000
	}).on({
		slide: function(e){
			// e.relatedTarget slide coming in, but it's broken when the first slide is the one coming in
			var nextSlide = e.relatedTarget || $(this).find('.item:first').get(0);
			
			// activate the description element in the carousel sidebar
			var $descriptionEl = $($(nextSlide).data('description'));
			$descriptionEl.siblings().removeClass('active');
			$descriptionEl.addClass('active');
		}, 
		slid: function(e){
			var $this = $(this);
			var index = $this.find('.item.active').index();
			var $indicators = $this.find('.carousel-indicator li');
			
			// update the blue square indicator
			$indicators.removeClass('active');
			$indicators.eq(index).addClass('active');
		}
	});
	
	$('.carousel-indicator').on({
		click: function(e) {
			var $indicator = $(e.target);
			var index = $indicator.data('slide_to');
			$indicator.parents('.carousel').carousel(index);
		}
	}, 'a');
	
	$('ul#carousel-section-nav > li').on({
		click: function(e){

			var $this = $(this);
			
			// switch the selected carousel section nav
			$('#carousel-section-nav > li').removeClass('active');
			$this.parent('li').addClass('active');
			
			// switch the selected carousel section content
			$('.carousel-section-content').removeClass('active');
			$($this.data('section')).addClass('active');
			
			// switch the selected carousel
			$('#feature .carousel').removeClass('active').carousel('pause');
			$($this.data('carousel')).addClass('active').carousel('cycle');
		}
	}, 'a');
	
	$('#view-controls').on({
		click: function(e) {
			e.preventDefault();
			var $clicked = $(e.target);
			var action = $clicked.data('action');
			var target = $clicked.data('target') || '#post-list';
			if (typeof viewControls[action] == 'function') {
				viewControls[action](target);
			}
		}
	}, 'a');
	
	$('#cat-filters').on({
		click: function(e) {
			if ($(e.target).attr('id') == 'close-cat-filters') {
				$('#view-controls #cat-filter a').trigger('click');
			} else {
				$(this).parent('li').toggleClass('selected');
			}
		}
	}, 'a')

	var $slider = $('#related-artists .post-list');
	var relatedArtistPostWidth = $slider.find('.post:first').outerWidth();
	$('#related-artists .post').width(relatedArtistPostWidth);
	var slideDistance = $slider.find('.post:first').outerWidth(true)*3;

	$('#related-artists').on({
		click: function(e) {
			var $clicked = $(e.target);
			var curPage = $slider.data('cur_page');
			var maxPage = $slider.data('max_page');
			if ($clicked.hasClass('prev')) {
				console.log(slideDistance);
				$slider.css('left', '+='+slideDistance);
				$slider.data('cur_page', curPage-1)
				if (curPage-1 == 1) {
					$clicked.css('visibility', 'hidden');
				}
			} else if ($clicked.hasClass('next')) {
				if (curPage == maxPage) {
					var spinner = new Spinner({
						color:'#fff', 
						length: 2,
						width: 3,
						lines: 9,
						radius: 6,
						corners: 0,
						trail: 20,
						speed: 1.0,
						left: -10
					}).spin($clicked.parent().get(0));
					$.post(ajaxurl, {
						action: 'ek_load_posts',
						nonce: $slider.data('nonce'),
						query: {
							posts_per_page: 3,
							paged: $slider.data('max_page')+1,
							category__in: [$slider.data('cats')]
						}
					}, function(result){
						spinner.stop();
						$slider.css({
							'width': '+='+slideDistance,
							'left': '-='+slideDistance
						});
						$slider.append($(result).find('.span4').width(relatedArtistPostWidth));
						$slider.data('max_page', $slider.data('max_page')+1);
						$slider.data('cur_page', $slider.data('cur_page')+1);
						$slider.data('nonce', $(result).filter('#nonce').text());
						$clicked.prev('.prev').css('visibility', 'visible');
					})
				} else {
					$slider.css('left', '-='+slideDistance);
					$slider.data('cur_page', $slider.data('cur_page')+1)
					$clicked.prev('.prev').css('visibility', 'visible');
				}
			}
		}
	}, 'a.prev, a.next')

})

var viewControls = {
	gridView: function(target) {
		this.switchView('list', 'grid', target);
	},

	listView: function(target) {
		this.switchView('grid', 'list', target);
	},

	switchView: function(from, to, target) {
		$(target).removeClass(from).addClass(to);
	},
	
	showCatFilters: function() {
		$('#cat-filters').slideToggle();
	}
}


//fgnass.github.com/spin.js#v1.2.7
!function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",a.cssRules.length),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style",{type:"text/css"});return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},h(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):parseInt(n.left,10)+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):parseInt(n.top,10)+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;(function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return o("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=c(o("group"),{behavior:"url(#default#VML)"});!l(t,"transform")&&t.adj?(a.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function s(){return c(e("group",{coordsize:i+" "+i,coordorigin:-r+" "+ -r}),{width:i,height:i})}function l(t,i,o){u(a,u(c(s(),{rotation:360/n.lines*t+"deg",left:~~i}),u(c(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:o}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,i=2*r,o=-(n.width+n.length)*2+"px",a=c(s(),{position:"absolute",top:o,left:o}),f;if(n.shadow)for(f=1;f<=n.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=n.lines;f++)l(f);return u(t,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):s=l(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);
