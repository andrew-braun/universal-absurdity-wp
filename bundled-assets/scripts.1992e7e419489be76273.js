!function(t){function e(e){for(var r,i,l=e[0],o=e[1],c=e[2],u=0,d=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&d.push(n[i][0]),n[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);for(h&&h(e);d.length;)d.shift()();return a.push.apply(a,c||[]),s()}function s(){for(var t,e=0;e<a.length;e++){for(var s=a[e],r=!0,l=1;l<s.length;l++){var o=s[l];0!==n[o]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=s[0]))}return t}var r={},n={0:0},a=[];function i(e){if(r[e])return r[e].exports;var s=r[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=r,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/wp-content/themes/fictional-university-theme/bundled-assets/";var l=window.webpackJsonp=window.webpackJsonp||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var h=o;a.push([2,1]),s()}([,function(t,e,s){},function(t,e,s){"use strict";s.r(e);s(1);var r=class{constructor(){document.querySelectorAll(".acf-map").forEach(t=>{this.new_map(t)})}new_map(t){var e=t.querySelectorAll(".marker"),s={zoom:16,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.ROADMAP},r=new google.maps.Map(t,s);r.markers=[];var n=this;e.forEach((function(t){n.add_marker(t,r)})),this.center_map(r)}add_marker(t,e){var s=new google.maps.LatLng(t.getAttribute("data-lat"),t.getAttribute("data-lng")),r=new google.maps.Marker({position:s,map:e});if(e.markers.push(r),t.innerHTML){var n=new google.maps.InfoWindow({content:t.innerHTML});google.maps.event.addListener(r,"click",(function(){n.open(e,r)}))}}center_map(t){var e=new google.maps.LatLngBounds;t.markers.forEach((function(t){var s=new google.maps.LatLng(t.position.lat(),t.position.lng());e.extend(s)})),1==t.markers.length?(t.setCenter(e.getCenter()),t.setZoom(16)):t.fitBounds(e)}};var n=class{constructor(){this.menu=document.querySelector(".site-header__menu"),this.openButton=document.querySelector(".site-header__menu-trigger"),this.events()}events(){this.openButton.addEventListener("click",()=>this.openMenu())}openMenu(){this.openButton.classList.toggle("fa-bars"),this.openButton.classList.toggle("fa-window-close"),this.menu.classList.toggle("site-header__menu--active")}},a=s(0);var i=class{constructor(){if(document.querySelector(".hero-slider")){const t=document.querySelectorAll(".hero-slider__slide").length;let e="";for(let s=0;s<t;s++)e+=`<button class="slider__bullet glide__bullet" data-glide-dir="=${s}"></button>`;document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend",e),new a.a(".hero-slider",{type:"carousel",perView:1,autoplay:5e3}).mount()}}};var l=class{constructor(){this.addSearchHTML(),this.searchOpen=document.querySelectorAll(".js-search-trigger"),this.searchClose=document.querySelector(".search-overlay__close"),this.searchOverlay=document.querySelector(".search-overlay"),this.searchTerm=document.querySelector("#search-term"),this.searchResults=document.querySelector("#search-overlay__results"),this.events(),this.typingTimer,this.isOverlayOpen=!1,this.isSpinnerVisible=!1,this.previousSearchValue}openOverlay(){return this.searchOverlay.classList.add("search-overlay--active"),document.querySelector("body").classList.add("body-no-scroll"),this.searchTerm.value="",setTimeout(()=>this.searchTerm.focus(),400),this.isOverlayOpen=!0,!1}closeOverlay(){this.searchOverlay.classList.remove("search-overlay--active"),document.querySelector("body").classList.remove("body-no-scroll"),this.isOverlayOpen=!1}addSearchHTML(){const t=document.createElement("div");t.innerHTML='\n\t\t<div class="search-overlay">\n\n\t\t\t<div class="search-overlay__top">\n\t\t\t\t<div class="container">\n\t\t\t\t<i class="fa fa-search search-overlay__icon aria-hidden="true"></i>\n\t\t\t\t\t<input type="text" class="search-term" placeholder="Everybody\'s looking for something" id="search-term"/>\n\t\t\t\t\t<i class="fa fa-window-close search-overlay__close aria-hidden="true"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="container">\n\t\t\t\t<div id="search-overlay__results">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>',document.querySelector("body").appendChild(t)}keyPressHandler(t){const e=document.activeElement;"s"!==t.key||!1!==this.isOverlayOpen||["input","select","button","textarea"].includes(e.tagName.toLowerCase())||this.openOverlay(),"Escape"===t.key&&!0===this.isOverlayOpen&&this.closeOverlay()}searchHandler(t){console.log("1: "+t.key),/^([\w]){1}$/i.test(t.key)&&(console.log("2: "+t.key),this.searchTerm.value!==this.previousSearchValue?(clearTimeout(this.typingTimer),this.searchTerm.value&&(this.isSpinnerVisible||(this.searchResults.innerHTML="<div class='spinner-loader'></div>",this.isSpinnerVisible=!0),this.typingTimer=setTimeout(()=>this.getSearchResults(),400),this.previousSearchValue=this.searchTerm.value)):(this.searchResults.innerHTML="",this.isSpinnerVisible=!1))}getSearchResults(){const t=t=>{this.searchResults.innerHTML=`\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="one-third">\n\t\t\t\t\t\t<h2 class="search-overlay__section-title">General Information</h2>\n\t\t\t\t\t\t${t.generalInfo.length?`<ul class="link-list min-list">${t.generalInfo.map(t=>`<li><a href=${t.permalink}>${t.title}</a> ${"post"==t.postType?"by "+t.author:""}</li>`).join("")}</ul>`:""}\n\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="one-third">\n\t\t\t\t\t\t<h2 class="search-overlay__section-title">Programs</h2>\n\t\t\t\t\t\t${t.program.length?`<ul class="link-list min-list">${t.program.map(t=>`<li><a href="${t.permalink}">${t.title}</a> </li>`).join("")}</ul>`:`<a href="${universalData.root_url}/programs">View all programs</a>`}\n\n\t\t\t\t\t\t<h2 class="search-overlay__section-title">Professors</h2>\n\t\t\t\t\t\t${t.professor.length?`<ul class="professor-cards">${t.professor.map(t=>`\n\t\t\t\t\t\t\t\t\t\t\t\t<li class="professor-card__list-item">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a class="professor-card" href="${t.permalink}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class="professor-card__image" src="${t.image}" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="professor-card__name">${t.title}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t`).join("")}</ul>`:""}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="one-third">\n\t\t\t\t\t\t<h2 class="search-overlay__section-title">Campuses</h2>\n\t\t\t\t\t\t${t.campus.length?`<ul class="link-list min-list">${t.campus.map(t=>`<li><a href=${t.permalink}>${t.title}</a></li>`).join("")}</ul>`:`<a href="${universalData.root_url}/campuses">View all campuses</a>`}\n\n\t\t\t\t\t\t<h2 class="search-overlay__section-title">Events</h2>\n\t\t\t\t\t\t${t.event.length?`<ul class="link-list min-list">${t.event.map(t=>`\n\t\t\t\t\t\t\t\t\t\t<div class="event-summary">\n\t\t\t\t\t\t\t\t\t\t<a class="event-summary__date t-center" href="${t.permalink}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="event-summary__month">${t.month}</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="event-summary__day">${t.day}</span>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<div class="event-summary__content">\n\t\t\t\t\t\t\t\t\t\t\t<h5 class="event-summary__title headline headline--tiny"><a href="${t.link}">${t.title}</a></h5>\n\t\t\t\t\t\t\t\t\t\t\t<p> ${t.description}\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="${t.permalink}" class="nu gray"> Learn more</a></p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t`).join("")}</ul>`:`<a href="${universalData.root_url}/events">View all events</a>`}\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t`},e=()=>{this.searchResults.innerHTML='\n\t\t\t<div class="search-result">\n\t\t\t\t<p class="search-overlay__section-title">Uh-oh! You crashed the simulation. Your memory has been wiped, and you may try your search again.</p>\n\t\t\t</div>'};return async function(s){try{const e=await fetch(`${universalData.root_url}/wp-json/content/v1/search?term=${s}`),r=await e.json();t(r)}catch(t){e(),console.log(t)}}(this.searchTerm.value)}events(){this.searchOpen.forEach(t=>t.addEventListener("click",t=>{t.preventDefault(),this.openOverlay()})),this.searchClose.addEventListener("click",this.closeOverlay.bind(this)),document.addEventListener("keyup",this.keyPressHandler.bind(this)),this.searchTerm.addEventListener("keyup",this.searchHandler.bind(this))}};new r(""),new n,new i,new l}]);