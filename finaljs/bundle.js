(()=>{"use strict";!function(){const e="https://21.javascript.pages.academy/kekstagram/data",t="https://21.javascript.pages.academy/kekstagram",n=function(e,t,n){e.responseType="json",e.addEventListener("load",(function(){200===e.status?t(e.response):n("Статус ответа: "+e.status+" "+e.statusText)})),e.addEventListener("error",(function(){n("Произошла ошибка соединения")})),e.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+e.timeout+"мс")})),e.timeout=1e4};window.server={load:function(t,o){const c=new XMLHttpRequest;c.open("GET",e),n(c,t,o),c.send()},upload:function(e,o,c){const i=new XMLHttpRequest;i.open("POST",t),n(i,o,c),i.send(e)}}}(),function(){const e=document.querySelector(".big-picture"),t=e.querySelector(".social"),n=t.querySelector(".social__comments"),o=n.querySelector("li"),c=t.querySelector(".social__comment-count"),i=t.querySelector(".comments-loader"),r=e.querySelector(".big-picture__cancel"),s=t.querySelectorAll("li");c.classList.add("hidden"),i.classList.add("hidden");const d=function(e){const t=document.createDocumentFragment();n.innerHTML="",e.forEach((function(e){const{avatar:c,name:i,message:r}=e,d=o.cloneNode(!0),a=d.querySelector(".social__picture");a.src=c,a.alt=i,a.width=35,a.height=25,d.querySelector(".social__text").textContent=r,t.append(d),n.append(t),console.log(s.length),s.length>5&&o.classList.add("hidden")}))},a=function(e){"Escape"===e.key&&(e.preventDefault(),u())},l=function(e){e.preventDefault(),u()},u=function(){e.classList.add("hidden"),document.removeEventListener("keydown",a),document.body.classList.remove("modal-open"),r.removeEventListener("click",l)};window.bigpicture={openBigPicture:function(t){const{url:n,likes:o,comments:c,description:s}=t;e.querySelector(".big-picture__img img").src=n,e.querySelector(".likes-count").textContent=o,e.querySelector(".comments-count").textContent=c.length,e.querySelector(".social__caption").textContent=s,d(c),e.classList.remove("hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",a),r.addEventListener("click",l),function(){const e=c.slice();e.length>=5?(i.classList.remove("hidden"),e.splice(5),console.log(e),d(e)):i.classList.add("hidden")}(),i.onclick=function(){d(c)}},bigPictureEscPress:a,bigPicture:e}}(),function(){const e=document.querySelector(".pictures"),t=document.querySelector(".img-filters"),n=window.bigpicture.openBigPicture,o=document.querySelector("#picture").content.querySelector(".picture"),c=function(t){const n=document.createDocumentFragment();return t.forEach((function(e){n.appendChild(function(e){const{likes:t,comments:n,url:c}=e,i=o.cloneNode(!0);return i.querySelector(".picture__likes").textContent=t,i.querySelector(".picture__comments").textContent=n.length,i.querySelector("img").src=c,i}(e))})),e.appendChild(n),n},i=function(e){document.querySelectorAll(".picture").forEach((function(t,o){t.addEventListener("click",(function(t){t.preventDefault(),n(e[o])}))}))};window.server.load((function(e){window.cardcreate.cardList=[],window.cardcreate.cardList=e,c(e),i(e),t.classList.remove("img-filters--inactive")}),(function(e){const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)})),window.cardcreate={renderPictures:c,test:i}}(),function(){const e=document.querySelector("#filter-default"),t=document.querySelector("#filter-random"),n=document.querySelector("#filter-discussed");let o;window.debounce=function(e){o&&window.clearTimeout(o),o=window.setTimeout(e,500)};const c=function(){const e=window.cardcreate.cardList;window.cardcreate.renderPictures(e),window.cardcreate.test(e)},i=function(){const e=[];for(let t=0;t<window.cardcreate.cardList.length;t++)e.push(window.cardcreate.cardList[t]);const t=e.sort((function(){return Math.random()-.5}));t.length=10,window.cardcreate.renderPictures(t),window.cardcreate.test(t)},r=function(){const e=[];for(let t=0;t<window.cardcreate.cardList.length;t++)e.push(window.cardcreate.cardList[t]);e.sort((function(e,t){return t.comments.length-e.comments.length})),window.cardcreate.renderPictures(e),window.cardcreate.test(e)},s=function(){document.querySelectorAll(".picture").forEach((e=>{e.remove()}))};e.addEventListener("click",(function(){s(),window.debounce(c)})),t.addEventListener("click",(function(){s(),window.debounce(i)})),n.addEventListener("click",(function(){s(),window.debounce(r)})),t.onclick=function(){e.classList.remove("img-filters__button--active"),n.classList.remove("img-filters__button--active"),t.classList.add("img-filters__button--active")},n.onclick=function(){e.classList.remove("img-filters__button--active"),t.classList.remove("img-filters__button--active"),n.classList.add("img-filters__button--active")},e.onclick=function(){t.classList.remove("img-filters__button--active"),n.classList.remove("img-filters__button--active"),e.classList.add("img-filters__button--active")}}(),function(){const e=document.querySelector(".text__hashtags"),t=/^([#]{1})([0-9a-zа-яё]{1,19})$/;e.addEventListener("keyup",(function(){!function(n){n.forEach(((o,c)=>{const i=o.length;console.log(-1!==n.indexOf(o,c+1)),o.startsWith("#")?i<2?e.setCustomValidity("Минимальное количество знаков 2"):i>20?e.setCustomValidity("Максимальное количество знаков 20"):o.match(t)?n.length>5?e.setCustomValidity("Нет 1"):e.setCustomValidity(""):e.setCustomValidity("Хэштег должен состоять только из букв и цифр"):e.setCustomValidity("Хэштег должен начиться с #"),e.reportValidity()}));for(let t=0;t<n.length;t++)(n[t]===n[t+1]||n[t]===n[t+2]||n[t]===n[t+3]||n[t]===n[t+4])&&e.setCustomValidity("Повторяющиеся хэштеги"),e.reportValidity()}(e.value.trim().toLowerCase().split(" ").filter((e=>""!==e))),e.validity.valid?e.style.outline="none":e.style.outline="2px solid red"})),e.addEventListener("focusin",(function(){document.removeEventListener("keydown",window.modalopenclose.modalEscPress)})),e.addEventListener("focusout",(function(){document.addEventListener("keydown",window.modalopenclose.modalEscPress)}));const n=document.querySelector(".text__description");n.oninput=function(){const e=n.value.length;n.value.length>120?n.setCustomValidity("Удалите "+(120-e)+" симв."):n.setCustomValidity(""),n.reportValidity()},n.addEventListener("focusin",(function(){document.removeEventListener("keydown",window.modalopenclose.modalEscPress)})),n.addEventListener("focusout",(function(){document.addEventListener("keydown",window.modalopenclose.modalEscPress)})),window.validation={hashTagsInput:e},window.validation={commentsField:n}}(),function(){const e=document.querySelector("#upload-file"),t=document.querySelector(".img-upload__overlay"),n=document.querySelector("#upload-cancel"),o=function(e){"Escape"===e.key&&(c(),e.preventDefault())};window.modalopenclose={modalEscPress:o,uploadImageFile:e};const c=function(){t.classList.add("hidden"),document.querySelector("body").classList.remove("modal-open"),document.removeEventListener("keydown",o),e.value="",window.submit.imageDataReset()};e.addEventListener("change",(function(){t.classList.remove("hidden"),document.querySelector("body").classList.add("modal-open"),document.addEventListener("keydown",o)})),n.addEventListener("click",(function(){c()}))}(),function(){const e=document.querySelector(".img-upload__form"),t=document.querySelector(".img-upload__overlay"),n=function(){window.effects.setDefaultDepth(),window.modalopenclose.uploadImageFile.value="",window.scale.imageUploadPreview.style.filter="",window.scale.imageUploadPreview.style.transform="scale(1.00)",window.scale.imageUploadPreview.className="effects__preview--none",window.effects.effectLevel.classList.add("hidden")};e.addEventListener("submit",(function(o){window.server.upload(new FormData(e),(function(){e.reset(),n(),t.classList.add("hidden"),window.success.successUploadHandler()}),(function(){window.error.errorUploadHandler()})),o.preventDefault()})),window.submit={imageDataReset:n}}(),function(){const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),n=t.querySelector(".success__inner"),o=t.querySelector(".success__button"),c=function(){o.removeEventListener("click",i),document.removeEventListener("click",r),document.removeEventListener("keydown",s),e.removeChild(t)},i=function(){c()},r=function(e){e.target!==n&&c()},s=function(e){"Escape"===e.key&&c()};window.success={successUploadHandler:function(){e.insertAdjacentElement("afterbegin",t),o.addEventListener("click",i),document.addEventListener("click",r),document.addEventListener("keydown",s)}}}(),function(){const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),n=t.querySelector(".error__button"),o=t.querySelector(".error__inner"),c=function(){e.removeChild(t),n.removeEventListener("click",i),document.removeEventListener("click",r),document.removeEventListener("keydown",s)},i=function(){c()},r=function(e){e.target!==o&&c()},s=function(e){"Escape"===e.key&&c()};window.error={errorUploadHandler:function(){e.insertAdjacentElement("beforeend",t),n.addEventListener("click",i),document.addEventListener("click",r),document.addEventListener("keydown",s)}}}(),function(){document.querySelector(".effects").addEventListener("click",(function(e){e.target.matches('input[type="radio"]')&&(window.scale.imageUploadPreview.className="",r(),window.scale.imageUploadPreview.className="effects__preview--"+e.target.value)}));const e=[1,2],t=document.querySelector(".effect-level"),n=t.querySelector(".effect-level__pin"),o=t.querySelector(".effect-level__line"),c=t.querySelector(".effect-level__depth"),i=t.querySelector(".effect-level__value"),r=function(){n.style.left="100%",c.style.width="100%",i.value=100,window.scale.imageUploadPreview.style.filter=""};window.effects={setDefaultDepth:r,effectLevel:t},n.addEventListener("mousedown",(function(t){t.preventDefault();const r=o.offsetWidth;let s=t.clientX;const d=function(t){t.preventDefault();const o=s-t.clientX,d=n.offsetLeft-o;if(s=t.clientX,!(d<0||d>r)){const t=d/r;n.style.left=d+"px",i.value=Math.round(100*t),c.style.width=Math.round(100*t)+"%",function(t){const n=t/100;if(window.scale.imageUploadPreview.className.match("effects__preview--"))switch(window.scale.imageUploadPreview.className){case"effects__preview--chrome":window.scale.imageUploadPreview.style.filter=`grayscale(${1*n})`;break;case"effects__preview--sepia":window.scale.imageUploadPreview.style.filter=`sepia(${1*n})`;break;case"effects__preview--marvin":window.scale.imageUploadPreview.style.filter=`invert(${t}%)`;break;case"effects__preview--phobos":window.scale.imageUploadPreview.style.filter=`blur(${3*n}px)`;break;case"effects__preview--heat":window.scale.imageUploadPreview.style.filter=`brightness(${e[1]*n+e[0]})`;break;default:window.scale.imageUploadPreview.style.filter=""}}(i.value)}},a=function(e){e.preventDefault(),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",a)}));const s=document.querySelector(".effects__item:first-child"),d=document.querySelectorAll(".effects__item"),a=document.querySelector(".img-upload__effect-level");a.classList.add("hidden"),d.forEach((function(e){e.addEventListener("click",(function(){a.classList.remove("hidden")}))})),s.addEventListener("click",(function(){a.classList.add("hidden")}))}(),function(){const e=document.querySelector(".scale__control--smaller"),t=document.querySelector(".scale__control--bigger"),n=document.querySelector(".scale__control--value"),o=document.querySelector(".img-upload__preview img");e.addEventListener("click",(function(){let e=parseInt(n.value,10);e<=100&&e>25&&(e-=25),c(e)})),t.addEventListener("click",(function(){let e=parseInt(n.value,10);e>=25&&e<100&&(e+=25),c(e)}));const c=function(e){switch(e){case 25:o.style.transform="scale(0.25)",n.value=e+"%";break;case 50:o.style.transform="scale(0.50)",n.value=e+"%";break;case 75:o.style.transform="scale(0.75)",n.value=e+"%";break;case 100:o.style.transform="scale(1.00)",n.value=e+"%"}};window.scale={imageUploadPreview:o}}()})();