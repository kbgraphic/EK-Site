$(document).ready(function(){$("#basic-search").on({focus:function(){$(this).addClass("expanded");var e=this.value,t=$(this);t.val("");setTimeout(function(){t.val(e)},1)},blur:function(){$(this).removeClass("expanded")}},"input");$("#feature .carousel").carousel({interval:2e4}).on({slide:function(e){var t=e.relatedTarget||$(this).find(".item:first").get(0),n=$($(t).data("description"));n.siblings().removeClass("active");n.addClass("active")},slid:function(e){var t=$(this),n=t.find(".item.active").index(),r=t.find(".carousel-indicator li");r.removeClass("active");r.eq(n).addClass("active")}});$(".carousel-indicator").on({click:function(e){var t=$(e.target),n=t.data("slide_to");t.parents(".carousel").carousel(n)}},"a");$("ul#carousel-section-nav > li").on({click:function(e){var t=$(this);$("#carousel-section-nav > li").removeClass("active");t.parent("li").addClass("active");$(".carousel-section-content").removeClass("active");$(t.data("section")).addClass("active");$("#feature .carousel").removeClass("active").carousel("pause");$(t.data("carousel")).addClass("active").carousel("cycle")}},"a");$("#view-controls").on({click:function(e){e.preventDefault();var t=$(e.target),n=t.data("action"),r=t.data("target")||"#post-list";typeof viewControls[n]=="function"&&viewControls[n](r)}},"a");$("#cat-filters").on({click:function(e){$(e.target).attr("id")=="close-cat-filters"?$("#view-controls #cat-filter a").trigger("click"):$(this).parent("li").toggleClass("selected")}},"a");var e=$("#related-artists .post-list"),t=e.find(".post:first").outerWidth();$("#related-artists .post").width(t);var n=e.find(".post:first").outerWidth(!0)*3;$("#related-artists").on({click:function(r){var i=$(r.target),s=e.data("cur_page"),o=e.data("max_page");if(i.hasClass("prev")){console.log(n);e.css("left","+="+n);e.data("cur_page",s-1);s-1==1&&i.css("visibility","hidden")}else if(i.hasClass("next"))if(s==o){var u=(new Spinner({color:"#fff",length:2,width:3,lines:9,radius:6,corners:0,trail:20,speed:1,left:-10})).spin(i.parent().get(0));$.post(ajaxurl,{action:"ek_load_posts",nonce:e.data("nonce"),query:{posts_per_page:3,paged:e.data("max_page")+1,category__in:[e.data("cats")]}},function(r){u.stop();e.css({width:"+="+n,left:"-="+n});e.append($(r).find(".span4").width(t));e.data("max_page",e.data("max_page")+1);e.data("cur_page",e.data("cur_page")+1);e.data("nonce",$(r).filter("#nonce").text());i.prev(".prev").css("visibility","visible")})}else{e.css("left","-="+n);e.data("cur_page",e.data("cur_page")+1);i.prev(".prev").css("visibility","visible")}}},"a.prev, a.next")});var viewControls={gridView:function(e){this.switchView("list","grid",e)},listView:function(e){this.switchView("grid","list",e)},switchView:function(e,t,n){$(n).removeClass(e).addClass(t)},showCatFilters:function(){$("#cat-filters").slideToggle()}};!function(e,t,n){function r(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function i(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function s(e,t,n,r){var i=["opacity",t,~~(e*100),n,r].join("-"),s=.01+n/r*100,o=Math.max(1-(1-e)/t*(100-s),e),u=h.substring(0,h.indexOf("Animation")).toLowerCase(),a=u&&"-"+u+"-"||"";return c[i]||(p.insertRule("@"+a+"keyframes "+i+"{"+"0%{opacity:"+o+"}"+s+"%{opacity:"+e+"}"+(s+.01)+"%{opacity:1}"+(s+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+o+"}"+"}",p.cssRules.length),c[i]=1),i}function o(e,t){var r=e.style,i,s;if(r[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(s=0;s<l.length;s++){i=l[s]+t;if(r[i]!==n)return i}}function u(e,t){for(var n in t)e.style[o(e,n)||n]=t[n];return e}function a(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function f(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var l=["webkit","Moz","ms","O"],c={},h,p=function(){var e=r("style",{type:"text/css"});return i(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=a(e||{},m.defaults,d)};v.defaults={},a(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,i=t.el=u(r(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),s=n.radius+n.length+n.width,o,a;e&&(e.insertBefore(i,e.firstChild||null),a=f(e),o=f(i),u(i,{left:(n.left=="auto"?a.x-o.x+(e.offsetWidth>>1):parseInt(n.left,10)+s)+"px",top:(n.top=="auto"?a.y-o.y+(e.offsetHeight>>1):parseInt(n.top,10)+s)+"px"})),i.setAttribute("aria-role","progressbar"),t.lines(i,t.opts);if(!h){var l=0,c=n.fps,p=c/n.speed,d=(1-n.opacity)/(p*n.trail/100),v=p/n.lines;(function m(){l++;for(var e=n.lines;e;e--){var r=Math.max(1-(l+e*v)%p*d,n.opacity);t.opacity(i,n.lines-e,r,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/c))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function n(e,n){return u(r(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:n,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*o+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var o=0,a;for(;o<t.lines;o++)a=u(r(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:h&&s(t.opacity,t.trail,o,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&i(a,u(n("#000","0 0 4px #000"),{top:"2px"})),i(e,i(a,n(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return r("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=u(r("group"),{behavior:"url(#default#VML)"});!o(t,"transform")&&t.adj?(p.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function r(){return u(e("group",{coordsize:a+" "+a,coordorigin:-o+" "+ -o}),{width:a,height:a})}function s(t,s,a){i(l,i(u(r(),{rotation:360/n.lines*t+"deg",left:~~s}),i(u(e("roundrect",{arcsize:n.corners}),{width:o,height:n.width,left:n.radius,top:-n.width>>1,filter:a}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var o=n.length+n.width,a=2*o,f=-(n.width+n.length)*2+"px",l=u(r(),{position:"absolute",top:f,left:f}),c;if(n.shadow)for(c=1;c<=n.lines;c++)s(c,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(c=1;c<=n.lines;c++)s(c);return i(t,l)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):h=o(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);