(()=>{"use strict";var e={174:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},953:(e,t,n)=>{e.exports=n.p+"37d8aaa587b660f11253.svg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.b=document.baseURI||self.location.href,(()=>{var e=n(174),t=n.n(e),r=new URL(n(953),n.b);t()(r);var o,c={baseUrl:"https://nomoreparties.co/v1/".concat("plus-cohort-16"),headers:{authorization:"604a1865-9670-49d6-afd1-eae792e4450f","Content-Type":"application/json"}};function a(e){void 0===e.status?console.log("Неизвестная ошибка"):console.log("Ошибка ".concat(e.status))}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r={method:t,headers:c.headers};return n&&(r.body=JSON.stringify(n)),fetch("".concat(c.baseUrl,"/").concat(e),r).then((function(e){return e.ok?e.json():Promise.reject(e)}))}var i,l=document.querySelectorAll(".popup");function s(e){"Escape"===e.key&&f(document.querySelector(".popup_opened"))}function d(e){document.addEventListener("keydown",s),e.classList.add("popup_opened")}function f(e){document.removeEventListener("keydown",s),e.classList.remove("popup_opened")}function p(e,t,n,r){var c=t.querySelector(".card").cloneNode(!0),l=c.querySelector(".card__heading"),s=c.querySelector(".card__likes-count-text"),p=c.querySelector(".card__like-button"),_=c.querySelector(".card__delete-button");l.textContent=e.name;var m=c.querySelector(".card__image");m.src=e.link,m.alt=e.name,m.addEventListener("click",(function(){return n(e.name,e.link)})),s.textContent=e.likes.length,function(e){return e.likes.some((function(e){return e._id===o}))}(e)&&p.classList.add("card__like-button_active"),p.addEventListener("click",(function(t){var n;t.target.classList.contains("card__like-button_active")?(n=e._id,u("cards/likes/".concat(n),"DELETE")).then((function(e){t.target.classList.toggle("card__like-button_active"),s.textContent=e.likes.length})).catch(a):function(e){return u("cards/likes/".concat(e),"PUT")}(e._id).then((function(e){t.target.classList.toggle("card__like-button_active"),s.textContent=e.likes.length})).catch(a)}));var v=e.owner._id;return o!==v?_.classList.add("card__delete-button_hidden"):_.addEventListener("click",(function(){d(r),i=function(){var t;(t=e._id,u("cards/".concat(t),"DELETE")).then((function(){c.remove(),f(r)})).catch(a)}})),c}function _(e,t,n){e.forEach((function(e){return e.setCustomValidity("")})),function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.add(n.inactiveButtonClass),t.disabled=!0):(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)}function m(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove("form__input-error_active"),r.textContent=""}function v(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){return m(e,n,t)}))}document.querySelector(".popup_type_delete-card"),l.forEach((function(e){return e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&f(e)}))}));var y={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__error_visible"},S=document.querySelector(".profile__name-text"),h=document.querySelector(".profile__description"),q=document.querySelector(".profile__image-container"),b=document.querySelector(".profile__image"),g=document.querySelector(".profile__edit-button"),C=document.querySelector(".popup_type_profile"),L=C.querySelector(y.formSelector),E=L.querySelector("#name"),k=L.querySelector("#about"),x=L.querySelector(y.submitButtonSelector),T=document.querySelector(".popup_type_image"),A=T.querySelector(".popup__image"),B=T.querySelector(".popup__image-heading"),P=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_card"),D=w.querySelector(y.formSelector),j=D.querySelector("#place-heading"),M=D.querySelector("#link"),O=D.querySelector(y.submitButtonSelector),U=document.querySelector(".popup_type_avatar"),N=U.querySelector(y.formSelector),V=N.querySelector("#avatar-link"),H=N.querySelector(y.submitButtonSelector),R=document.querySelector(".popup_type_delete-card"),z=document.querySelector(".cards__list"),G=document.querySelector("#card").content,I=1e3;function J(e,t){A.src=t,A.alt=e,B.textContent=e,d(T)}g.addEventListener("click",(function(){E.value=S.textContent,k.value=h.textContent,v(L,y),_([E,k],x,y),d(C)})),L.addEventListener("submit",(function(e){var t,n;e.preventDefault(),x.textContent="Сохранение...",(t=E.value,n=k.value,u("users/me","PATCH",{name:t,about:n})).then((function(e){S.textContent=e.name,h.textContent=e.about,f(C)})).catch((function(e){return console.log("Ошибка ".concat(e.status))})).finally((function(){return setTimeout((function(){return x.textContent="Сохранить"}),I)}))})),P.addEventListener("click",(function(){D.reset(),v(D,y),_([j,M],O,y),d(w)})),D.addEventListener("submit",(function(e){var t,n;e.preventDefault(),O.textContent="Создание...",(t=j.value,n=M.value,u("cards","POST",{name:t,link:n})).then((function(e){var t=p(e,G,J,R);z.prepend(t),f(w)})).catch(a).finally((function(){return setTimeout((function(){return O.textContent="Создать"}),I)}))})),q.addEventListener("click",(function(){N.reset(),v(N,y),_([V],H,y),d(U)})),N.addEventListener("submit",(function(e){var t;e.preventDefault(),H.textContent="Сохранение...",(t=V.value,u("users/me/avatar","PATCH",{avatar:t})).then((function(e){b.src=e.avatar,f(U)})).catch(a).finally((function(){setTimeout((function(){return H.textContent="Сохранить"}),I)}))})),R.addEventListener("submit",(function(e){e.preventDefault(),i()})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);_(n,r,t),n.forEach((function(o){return o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,n):function(e,t,n,r){t.classList.add(r.inputErrorClass);var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,o.classList.add("form__input-error_active")}(e,t,t.validationMessage,n)}(e,o,t),_(n,r,t)}))}))}(t,e)}))}(y),Promise.all([u("users/me"),u("cards")]).then((function(e){var t;t=e[0]._id,o=t,S.textContent=e[0].name,h.textContent=e[0].about,b.src=e[0].avatar,e[1].reverse().forEach((function(e){var t=p(e,G,J,R);z.prepend(t)}))})).catch(a)})()})();