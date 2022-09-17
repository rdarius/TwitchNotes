(()=>{"use strict";var t={144:(t,e,n)=>{n.d(e,{Z:()=>s});var o=n(81),i=n.n(o),r=n(645),a=n.n(r)()(i());a.push([t.id,".twitch-notes_button{z-index:var(--z-index-default) !important;position:relative !important;background-color:var(--color-background-button-primary-default);color:var(--color-text-button-primary);text-decoration:none;cursor:pointer;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;vertical-align:middle;overflow:hidden;white-space:nowrap;user-select:none;font-weight:var(--font-weight-semibold);border-radius:var(--border-radius-medium);font-size:var(--button-text-default);height:var(--button-size-default);padding:0 var(--button-padding-x)}.twitch-notes_button__outline{background:rgba(0,0,0,0);border:2px solid var(--color-text-button-primary)}.twitch-notes_close-button{cursor:default;text-transform:none;text-indent:0;text-shadow:none;letter-spacing:normal;text-rendering:auto;appearance:auto;writing-mode:horizontal-tb !important;box-sizing:border-box;margin:0;font:inherit;border:none;font-size:var(--button-text-default);font-weight:var(--font-weight-semibold);vertical-align:middle;overflow:hidden;text-decoration:none;white-space:nowrap;position:absolute;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;user-select:none;border-radius:var(--border-radius-medium);height:calc(var(--button-size-default) - 1rem);width:calc(var(--button-size-default) - 1rem);background-color:var(--color-background-button-text-default);color:var(--color-fill-button-icon);top:1rem;right:1rem}.twitch-notes_close-button .twitch-notes_x-button{position:absolute;left:0;width:calc(var(--button-size-default) - 1rem);height:calc(var(--button-size-default) - 1rem);top:0;fill:currentcolor}.twitch-notes-floating-container{position:fixed;z-index:1000000;width:320px;height:240px;background:var(--color-background-base);border:var(--border-width-default) solid var(--color-border-base) !important}.twitch-notes-container{position:fixed;z-index:1000000;min-width:500px;max-width:95vw;min-height:240px;max-height:50vh;background:var(--color-background-base);border:var(--border-width-default) solid var(--color-border-base) !important}.twitch-notes-container-header{width:100%;height:calc(var(--button-size-default) + 1rem);line-height:calc(var(--button-size-default) + 1rem);border-bottom:var(--border-width-default) solid var(--color-border-base) !important;position:relative}.twitch-notes-container-header-title{color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important;margin-left:calc((32px - var(--font-size-6))/2);width:calc(100% - 2rem)}.twitch-notes-container-content{display:grid;grid-template-columns:240px 1fr}.twitch-notes-container-content-user-list{border-right:1px solid rgba(255,255,255,.0980392157);height:100%;min-width:240px;overflow-y:auto;overflow-x:hidden}.twitch-notes-container-content-user-list-item{padding:1rem;border-bottom:var(--border-width-default) solid var(--color-border-base) !important;cursor:pointer;width:100%;color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important}.twitch-notes-container-content-user-list-item-search{background:rgba(0,0,0,0);outline:none;color:var(--color-fill-button-icon)}.twitch-notes-container-content-note-container-note{min-width:420px;min-height:320px;display:block;margin:1rem;border:var(--border-width-default) solid var(--color-border-base) !important;padding:1rem}.twitch-notes-container-content-note-container-controls{padding:1rem;display:flex;align-content:center}.twitch-notes-container-content-note-container-controls-saved{color:green;padding-left:1rem;line-height:var(--button-size-default)}.twitch-notes-container-footer{display:grid;grid-template-columns:1fr 1fr 1fr;width:100%;border-top:var(--border-width-default) solid var(--color-border-base) !important;padding:1rem;text-align:center}.twitch-notes-header{width:100%;height:32px;line-height:32px;border-bottom:var(--border-width-default) solid var(--color-border-base) !important;position:relative;cursor:move}.twitch-notes--container-header-title{color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important;padding-left:calc((32px - var(--font-size-6))/2)}.twitch-notes-title{color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important;padding-left:calc((32px - var(--font-size-6))/2)}.twitch-notes-close-button{position:absolute;right:5px;top:5px;width:22px;height:22px;line-height:22px;text-align:center;aspect-ratio:1;color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important;cursor:pointer}.twitch-notes-content{position:absolute;top:32px;left:0;right:0;bottom:32px;background:rgba(0,0,0,0);color:var(--color-text-base) !important;font-family:var(--font-base);vertical-align:baseline;outline:none;overflow:auto;padding:calc((32px - var(--font-size-6))/2)}.twitch-notes-save-button{position:absolute;bottom:0;left:0;right:0;height:32px;border-top:var(--border-width-default) solid var(--color-border-base) !important;cursor:pointer;color:var(--color-text-alt) !important;font-size:var(--font-size-6) !important;font-weight:var(--font-weight-semibold) !important;text-transform:uppercase !important;text-align:center;line-height:32px}.twitch-notes-x-button{position:absolute;left:0;width:100%;min-height:100%;top:0;fill:currentcolor}.twitch-notes-blurred-background{position:fixed;inset:0 0 0 0;z-index:2000000;background:rgba(0,0,0,.4);backdrop-filter:blur(2px)}.twitch-notes-center-floating-container{background:var(--color-background-base);border:var(--border-width-default) solid var(--color-border-base) !important;position:fixed;top:50vh;left:50vw;transform:translate(-50%, -50%);min-height:320px;min-width:300px;max-height:90vh;max-width:90vw;overflow:auto}.twitch-notes-link{display:inline-block;-webkit-line-clamp:2;-webkit-box-orient:vertical;color:var(--color-text-link) !important;line-height:var(--line-height-heading) !important;overflow:hidden !important;text-overflow:ellipsis !important;white-space:normal !important;font-weight:var(--font-weight-semibold) !important}.twitch-notes-link:hover{text-decoration:underline;cursor:pointer}.twitch-notes-grid-col-2{display:grid;grid-template-columns:1fr 1fr;width:100%}",""]);const s=a},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",o=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),o&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),o&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,o,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);o&&a[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),e.push(d))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,o=0;o<e.length;o++)if(e[o].identifier===t){n=o;break}return n}function o(t,o){for(var r={},a=[],s=0;s<t.length;s++){var c=t[s],l=o.base?c[0]+o.base:c[0],d=r[l]||0,u="".concat(l," ").concat(d);r[l]=d+1;var p=n(u),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var m=i(h,o);o.byIndex=s,e.splice(s,0,{identifier:u,updater:m,references:1})}a.push(u)}return a}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var r=o(t=t||[],i=i||{});return function(t){t=t||[];for(var a=0;a<r.length;a++){var s=n(r[a]);e[s].references--}for(var c=o(t,i),l=0;l<r.length;l++){var d=n(r[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=c}}},569:t=>{var e={};t.exports=function(t,n){var o=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,i&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={id:o,exports:{}};return t[o](r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{var t=n(379),e=n.n(t),o=n(795),i=n.n(o),r=n(569),a=n.n(r),s=n(565),c=n.n(s),l=n(216),d=n.n(l),u=n(589),p=n.n(u),h=n(144),m={};m.styleTagTransform=p(),m.setAttributes=c(),m.insert=a().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=d(),e()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;var v="twitch-note-all-users-list",f="twitch-note-";const g=function(){function t(){}return t.addContainer=function(e,n){t.containers[e]||(t.containers[e]=n)},t.removeContainer=function(e){t.containers[e]&&(t.containers[e].remove(),delete t.containers[e])},t.activeContainer=null,t.containers={},t}();var b=function(){return b=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},b.apply(this,arguments)};const w=function(){function t(){}return t.setupListeners=function(){t.listenersSetUp||(document.addEventListener("mousemove",t.handleMouseMove),document.addEventListener("mouseup",t.handleMouseUp),t.listenersSetUp=!0)},t.handleMouseUp=function(){g.activeContainer=null,t.isMouseDown=!1},t.updateMousePosition=function(e,n){t.lastMousePosition=b({},this.mousePosition),t.mousePosition={x:e,y:n}},t.handleMouseMove=function(e){if(t.isMouseDown&&g.activeContainer){var n=t.mousePosition.x-t.lastMousePosition.x,o=t.mousePosition.y-t.lastMousePosition.y;g.containers[g.activeContainer].setStyles({top:parseInt(g.containers[g.activeContainer].getElement().style.top)+o+"px",left:parseInt(g.containers[g.activeContainer].getElement().style.left)+n+"px"})}t.updateMousePosition(e.clientX,e.clientY)},t.isMouseDown=!1,t.mousePosition={x:0,y:0},t.lastMousePosition={x:0,y:0},t.listenersSetUp=!1,t}(),y=function(){function t(){}return t.getSavedUserList=function(){return JSON.parse(localStorage.getItem(v)||"[]")},t.getNote=function(t){return localStorage.getItem(f+t)||""},t.addUserToSavedList=function(t){var e=this.getSavedUserList();e.includes(t)||(e.push(t),localStorage.setItem(v,JSON.stringify(e)))},t.removeUserFromSavedList=function(t){var e=this.getSavedUserList();(e=e.filter((function(e){return e!==t}))).length?localStorage.setItem(v,JSON.stringify(e)):localStorage.removeItem(v)},t.saveNote=function(t,e){this.addUserToSavedList(t),localStorage.setItem(f+t,e)},t.deleteNote=function(t){this.removeUserFromSavedList(t),localStorage.removeItem(f+t)},t.exportNotes=function(){var t=this,e={users:this.getSavedUserList(),notes:this.getSavedUserList().map((function(e){return{user:e,note:t.getNote(e)}})),settings:{}},n=JSON.stringify(e),o=new Blob([n],{type:"text/json"}),i=window.document.createElement("a");i.href=window.URL.createObjectURL(o),i.download="twitch-notes-"+Date.now()+".json",document.body.appendChild(i),i.click(),document.body.removeChild(i)},t.clearData=function(){for(var t=0,e=this.getSavedUserList();t<e.length;t++){var n=e[t];this.deleteNote(n)}},t.inputData={users:[],notes:[],settings:{}},t}(),x=function(){function t(t){var e;this.element=document.createElement(t.element),this.setId(null!==(e=t.id)&&void 0!==e?e:t.element+"-custom-element-"+Math.floor(1e6*Math.random())),t.class&&this.setClasses(t.class),t.attributes&&this.setAttributes(t.attributes),t.style&&this.setStyles(t.style),t.mouseClickEvent&&this.setMouseClickListener(t.mouseClickEvent),t.mouseMoveEvent&&this.setMouseMoveListener(t.mouseMoveEvent),t.mouseDownEvent&&this.setMouseDownListener(t.mouseDownEvent),t.mouseUpEvent&&this.setMouseUpListener(t.mouseUpEvent),t.keyUpEvent&&this.setKeyUpListener(t.keyUpEvent),t.changeListener&&this.setChangeListener(t.changeListener),t.content&&this.setContent(t.content)}return t.prototype.setId=function(t){this.element.id=t},t.prototype.setClasses=function(t){if("string"==typeof t)this.addClass(t);else for(var e=0,n=t;e<n.length;e++){var o=n[e];this.addClass(o)}},t.prototype.addClass=function(t){this.element.classList.add(t)},t.prototype.setAttributes=function(t){for(var e in t)t[e]&&this.addAttribute(e,t[e])},t.prototype.addAttribute=function(t,e){this.element.setAttribute(t,e)},t.prototype.setStyles=function(t){for(var e in t)this.addStyle(e,t[e]||"")},t.prototype.addStyle=function(t,e){this.element.style.setProperty(t,e)},t.prototype.setMouseClickListener=function(t){this.element.addEventListener("click",(function(){return t()}))},t.prototype.setContent=function(t){for(var e=0,n=t;e<n.length;e++){var o=n[e];this.addContent(o)}},t.prototype.addContent=function(e){if("string"==typeof e)this.element.innerHTML+=e;else if(e instanceof HTMLElement)this.element.appendChild(e);else{var n=new t(e);this.element.appendChild(n.element)}},t.prototype.setMouseMoveListener=function(t){this.element.addEventListener("mousemove",(function(){return t()}))},t.prototype.setMouseDownListener=function(t){this.element.addEventListener("mousedown",(function(){return t()}))},t.prototype.setMouseUpListener=function(t){this.element.addEventListener("mouseup",(function(){return t()}))},t.prototype.setKeyUpListener=function(t){var e=this;this.element.addEventListener("keyup",(function(){return t(e.element.innerHTML)}))},t.prototype.setChangeListener=function(t){this.element.addEventListener("change",(function(e){return t(e)}))},t.prototype.getElement=function(){return this.element},t.prototype.remove=function(){this.element.remove()},t}(),C=function(){function t(t,e,n){if(void 0===e&&(e="default"),void 0===n&&(n=""),this.element=document.createElement("button"),this.element.textContent=t,this.element.classList.add("twitch-notes_button"),"outline"===e&&this.element.classList.add("twitch-notes_button__outline"),n)if("string"==typeof n)this.element.classList.add(n);else for(var o=0,i=n;o<i.length;o++){var r=i[o];this.element.classList.add(r)}}return t.prototype.onClick=function(t){this.element.addEventListener("click",(function(){return t()}))},t}(),L=function(){function t(t){if(void 0===t&&(t=""),this.element=document.createElement("button"),this.element.innerHTML='<svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" class="twitch-notes_x-button">\n            <g>\n                <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path>\n            </g>\n        </svg>',this.element.classList.add("twitch-notes_close-button"),t)if("string"==typeof t)this.element.classList.add(t);else for(var e=0,n=t;e<n.length;e++){var o=n[e];this.element.classList.add(o)}}return t.prototype.onClick=function(t){this.element.addEventListener("click",(function(){return t()}))},t}(),E=function(){function t(){this.element=document.createElement("div")}return t.prototype.create=function(t,e,n){var o=this;this.element||(this.element=document.createElement("div")),this.element.innerHTML="",this.element.classList.add("twitch-notes-blurred-background");var i=new L;i.onClick((function(){o.close()}));var r=document.createElement("div");r.classList.add("twitch-notes-center-floating-container");var a=document.createElement("div");a.classList.add("twitch-notes-container-header");var s=document.createElement("div");s.classList.add("twitch-notes-container-header-title"),s.textContent="Resolve note ("+t+") conflict",a.appendChild(s),r.appendChild(a),a.insertAdjacentElement("beforeend",i.element);var c=document.createElement("div");c.classList.add("twitch-notes-container-content"),c.style.display="block",c.style.padding="1rem",r.appendChild(c),c.appendChild(function(t,e,n,o){var i={minWidth:"320px",padding:"6px",border:"1px solid #FFFFFF19",outline:"none"},r={contentEditable:"true"},a=new x({element:"div",content:["<strong>Select which note to keep for <em>"+t+"</em></strong><br /><em>You can modify notes to merge them and keep updated one</em><br /><br />",{element:"div",class:"twitch-notes-grid-col-2",style:{width:"100%"},content:[{element:"div",content:[{element:"p",content:["<strong>Locally saved note</strong>",{element:"div",style:i,attributes:r,id:"local-value-container",content:[y.getNote(t)]},"<br />",{element:"button",class:"twitch-notes_button",content:["Save this"],mouseClickEvent:function(){var i,r=(null===(i=document.getElementById("local-value-container"))||void 0===i?void 0:i.innerHTML)||"";y.inputData.notes=y.inputData.notes.map((function(e){return e.user===t?{user:e.user,note:r,resolved:!0}:e})),a.remove(),e.remove(),k(n,o)}}]}]},{element:"div",content:[{element:"p",content:["<strong>Locally saved note</strong>",{element:"div",style:i,attributes:r,id:"import-value-container",content:[y.inputData.notes.filter((function(e){return e.user===t}))[0].note||""]},"<br />",{element:"button",class:"twitch-notes_button",content:["Save this"],mouseClickEvent:function(){var i,r=(null===(i=document.getElementById("import-value-container"))||void 0===i?void 0:i.innerHTML)||"";y.inputData.notes=y.inputData.notes.map((function(e){return e.user===t?{user:e.user,note:r,resolved:!0}:e})),a.remove(),e.remove(),k(n,o)}}]}]}]}]});return a.getElement()}(t,this.element,e,n)),this.element.appendChild(r),document.body.appendChild(this.element)},t.prototype.close=function(){this.element&&this.element.remove(),this.element=void 0},t.open=function(e,n,o){t.instance=new t,t.instance.create(e,n,o)},t}();function k(t,e,n){for(var o,i,r,a=[],s=[],c=[],l=function(t){y.getNote(t)?(null===(o=y.inputData.notes.find((function(e){return e.user===t})))||void 0===o?void 0:o.resolved)||y.getNote(t)!==(null===(i=y.inputData.notes.find((function(e){return e.user===t})))||void 0===i?void 0:i.note)?s.push(t):c.push(t):a.push(t)},d=0,u=y.inputData.users;d<u.length;d++)l(u[d]);var p=new x({element:"div",style:{padding:"1rem"}});if(s.length){for(var h=new x({element:"div",content:["<strong>Note conflicts found for:</strong><br />"],style:{marginTop:"1rem"}}),m=function(n){var o=null===(r=y.inputData.notes.find((function(t){return t.user===n})))||void 0===r?void 0:r.resolved;h.addContent({element:"div",content:[n+" ",{element:"a",content:[o?"[update]":"[resolve]"],style:{cursor:"pointer"},mouseClickEvent:function(){E.open(n,t,e)}}],style:{color:o?"green":"red"}})},v=0,f=s;v<f.length;v++)m(f[v]);p.addContent(h.getElement())}a.length&&p.addContent({element:"div",content:["<strong>Note will be added for:</strong><br />"+a.join("<br />")],style:{marginTop:"1rem",color:"white"}}),c.length&&p.addContent({element:"div",content:["<strong>No changes for:</strong><br />"+c.join("<br />")],style:{marginTop:"1rem",color:"gray"}}),p.addContent({element:"div",style:{height:"24px"}}),s=s.filter((function(t){var e;return!(null===(e=y.inputData.notes.find((function(e){return e.user===t})))||void 0===e?void 0:e.resolved)}));var g=new C("Complete import");s.length>0&&(g.element.style.background="gray"),s.length>0&&g.element.setAttribute("disabled","true"),p.addContent(g.element),s.length>0?p.addContent({element:"div",content:["<em>Import cannot be completed while there are unresolved conflicts</em>"],style:{color:"gray"}}):g.element.addEventListener("click",(function(){for(var t=0,o=y.inputData.notes;t<o.length;t++){var i=o[t];y.saveNote(i.user,i.note)}e.remove(),y.inputData={users:[],notes:[],settings:{}},n&&n()})),t.innerHTML="",t.appendChild(p.getElement())}const M=function(){function t(){this.element=document.createElement("div")}return t.prototype.create=function(){var e=this;this.element||(this.element=document.createElement("div")),this.element.innerHTML="",this.element.classList.add("twitch-notes-blurred-background");var n=new L;n.onClick((function(){e.close()}));var o=document.createElement("div");o.classList.add("twitch-notes-center-floating-container");var i=document.createElement("div");i.classList.add("twitch-notes-container-header");var r=document.createElement("div");r.classList.add("twitch-notes-container-header-title"),r.textContent="Import Notes",i.appendChild(r),o.appendChild(i),i.insertAdjacentElement("beforeend",n.element);var a=document.createElement("div");a.classList.add("twitch-notes-container-content"),a.style.display="block",a.style.padding="1rem",o.appendChild(a),a.innerHTML="\n        <strong>WARNING!</strong> <em>This action might override existing data!</em><br />\n        <br />\n        Select exported twitch notes file<br />\n        ";var s=this.element,c=document.createElement("input");c.classList.add("twitch-notes-file-input"),c.setAttribute("type","file"),c.setAttribute("accept","json"),c.addEventListener("change",(function(){if(c.files){var e=c.files.item(0);if(e){var n=new FileReader;n.readAsText(e,"UTF-8"),n.onload=function(e){var n;(null===(n=null==e?void 0:e.target)||void 0===n?void 0:n.result)&&(y.inputData=JSON.parse(e.target.result.toString()),y.inputData&&(c.style.display="none",k(o,s,t.resolveCallback)))},n.onerror=function(){console.error("error reading file")}}}})),a.appendChild(c),this.element.appendChild(o),document.body.appendChild(this.element)},t.prototype.close=function(){this.element&&this.element.remove(),this.element=void 0},t.update=function(){var e;null===(e=t.instance)||void 0===e||e.create()},t.open=function(e){t.resolveCallback=e,t.instance=new t,t.instance.create()},t.close=function(){var e,n;null===(n=null===(e=t.instance)||void 0===e?void 0:e.element)||void 0===n||n.remove(),t.instance=void 0},t}(),N=function(){function t(){this.element=document.createElement("div")}return t.prototype.buildContent=function(t){var e=this;t.innerHTML="";var n=[];this.userList=document.createElement("div"),this.userList.classList.add("twitch-notes-container-content-user-list");var o=document.createElement("div");o.classList.add("twitch-notes-container-content-user-list-item"),o.textContent="+ Add New Note",o.addEventListener("click",(function(){e.newNote(l,n)})),this.userList.appendChild(o);var i=document.createElement("input");i.classList.add("twitch-notes-container-content-user-list-item"),i.classList.add("twitch-notes-container-content-user-list-item-search"),i.placeholder="Search...",i.addEventListener("keyup",(function(){for(var t,e=0,o=n;e<o.length;e++){var r=o[e];""!==i.value?(null===(t=r.textContent)||void 0===t?void 0:t.includes(i.value))?r.style.display="block":r.style.display="none":r.style.display="block"}})),this.userList.appendChild(i);for(var r=function(t){var o=document.createElement("div");o.classList.add("twitch-notes-container-content-user-list-item"),o.textContent=t,n.push(o),a.userList.appendChild(o),o.addEventListener("click",(function(){e.openNote(l,t,n,o)}))},a=this,s=0,c=y.getSavedUserList();s<c.length;s++)r(c[s]);var l=document.createElement("div");if(l.classList.add("twitch-notes-container-content-note-container"),y.getSavedUserList().length)n[0].click();else{l.textContent="";var d=document.createElement("div");d.classList.add("twitch-notes-container-content-note-container-note"),d.innerHTML="You have not notes yet...",l.appendChild(d)}t.appendChild(this.userList),t.appendChild(l)},t.prototype.newNote=function(t,e){var n=this;t.innerHTML="";for(var o=0,i=e;o<i.length;o++)i[o].style.background="transparent";var r=document.createElement("input");r.classList.add("twitch-notes-container-header-title"),r.classList.add("twitch-notes-container-content-user-list-item-search"),r.style.marginTop="1rem",r.placeholder="Note title or username",t.appendChild(r);var a=document.createElement("div");a.classList.add("twitch-notes-container-content-note-container-note"),a.setAttribute("contentEditable","true"),a.innerHTML="",t.appendChild(a);var s=document.createElement("div");s.classList.add("twitch-notes-container-content-note-container-controls"),t.appendChild(s);var c=new C("Save");s.appendChild(c.element);var l=document.createElement("span");l.classList.add("twitch-notes-container-content-note-container-controls-saved"),l.textContent="Note Saved!",l.style.opacity="0",s.appendChild(l),c.onClick((function(){var o,i=r.value.trim().toLowerCase(),s=document.createElement("div");s.classList.add("twitch-notes-container-content-user-list-item"),s.textContent=i,e.push(s),null===(o=n.userList)||void 0===o||o.appendChild(s),s.addEventListener("click",(function(){n.openNote(t,i,e,s)})),e.push(s),y.saveNote(i,a.innerHTML),n.openNote(t,i,e,s)}))},t.prototype.openNote=function(t,e,n,o){t.innerHTML="";for(var i=0,r=n;i<r.length;i++)r[i].style.background="transparent";o.style.background="var(--color-twitch-purple-5)";var a=document.createElement("div");a.classList.add("twitch-notes-container-header-title"),a.textContent=e,a.style.marginTop="1rem",t.appendChild(a);var s=document.createElement("div");s.classList.add("twitch-notes-container-content-note-container-note"),s.setAttribute("contentEditable","true"),s.innerHTML=y.getNote(e),t.appendChild(s);var c=document.createElement("div");c.classList.add("twitch-notes-container-content-note-container-controls"),t.appendChild(c);var l=new C("Save");c.appendChild(l.element);var d=document.createElement("span");d.classList.add("twitch-notes-container-content-note-container-controls-saved"),d.textContent="Note Saved!",d.style.opacity="0",c.appendChild(d),l.onClick((function(){y.saveNote(e,s.innerHTML),d.style.opacity="1"}))},t.prototype.create=function(){var e=this;this.element||(this.element=document.createElement("div")),this.element.innerHTML="",this.element.classList.add("twitch-notes-blurred-background");var n=new L;n.onClick((function(){e.close()}));var o=document.createElement("div");o.classList.add("twitch-notes-center-floating-container");var i=document.createElement("div");i.classList.add("twitch-notes-container-header");var r=document.createElement("div");r.classList.add("twitch-notes-container-header-title"),r.textContent="Twitch Notes",i.appendChild(r),o.appendChild(i),i.insertAdjacentElement("beforeend",n.element);var a=document.createElement("div");a.classList.add("twitch-notes-container-content"),o.appendChild(a),this.buildContent(a);var s=document.createElement("div");s.classList.add("twitch-notes-container-footer"),o.appendChild(s);var c=document.createElement("span");c.classList.add("twitch-notes-link"),c.textContent="Export Notes",c.addEventListener("click",(function(){y.exportNotes()})),s.appendChild(c);var l=document.createElement("span");l.classList.add("twitch-notes-link"),l.textContent="Import Notes",l.addEventListener("click",(function(){M.open((function(){t.update()}))})),s.appendChild(l);var d=document.createElement("span");d.classList.add("twitch-notes-link"),d.textContent="Clear Notes",d.addEventListener("click",(function(){var t;t=new x({element:"div",class:"twitch-notes-blurred-background",content:[{element:"div",class:"twitch-notes-center-floating-container",style:{padding:"1rem"},content:["<strong>This action will delete all saved notes!</strong><br /><br /><em>Consider exporting notes before performing this action in case you will need to use notes again</em>",{element:"div",style:{height:"24px"}},{element:"button",class:"twitch-notes_button",content:["DELETE ALL NOTES"],style:{background:"red"},mouseClickEvent:function(){y.clearData(),t.remove(),N.update()}},{element:"button",class:"twitch-notes_button",content:["Cancel"],mouseClickEvent:function(){t.remove()}}]}]}),document.body.appendChild(t.getElement())})),s.appendChild(d),this.element.appendChild(o),document.body.appendChild(this.element)},t.prototype.close=function(){this.element&&this.element.remove(),this.element=void 0},t.update=function(){var e;null===(e=t.instance)||void 0===e||e.create()},t.toggle=function(){if(!t.instance)return t.instance=new t,void t.instance.create();t.instance.element?t.instance.close():t.instance.create()},t}();var S=function(){function t(){}return t.prototype.init=function(t){var e=this;this.chatContainerNode=t,this.startObserver(t),this.addNotesButton(),setTimeout((function(){e.addUserNoteBadges()}),1e3)},t.prototype.startObserver=function(t){var e=this;this.observer&&this.observer.disconnect();var n=!1;this.observer=new MutationObserver((function(t){if(!n)for(var o=0,i=t;o<i.length;o++)"childList"===i[o].type&&(n=!0,e.addUserNoteBadges(),n=!1)})),this.observer.observe(t,{attributes:!0,childList:!0,subtree:!0})},t.prototype.addNotesButton=function(){var t=this,e=document.querySelector(".".concat("chat-input__buttons-container"));if(e){var n=new C("Notes","outline");n.onClick(N.toggle),e.lastChild?e.lastChild.insertBefore(n.element,e.lastChild.lastChild):e.appendChild(n.element)}else setTimeout((function(){return t.addNotesButton()}),100)},t.prototype.addUserNoteBadges=function(){for(var t=document.getElementsByClassName("chat-line__message"),e=function(e){var n=t.item(e);if(!n)return"continue";var o=n.querySelector(".chat-author__display-name");if(!o)return"continue";var i=n.querySelector(".chat-line__username-container");if(!i)return"continue";var r=o.getAttribute("data-a-user");if(r&&!i.querySelector(".twitch-note")){var a=new x({element:"span",class:"twitch-note",style:{cursor:"pointer"},mouseClickEvent:function(){return function(t){if(!g.containers[t]){var e=y.getNote(t),n={element:"div",class:"twitch-notes-floating-container",style:{left:w.mousePosition.x+"px",top:w.mousePosition.y+10+"px"},content:[{element:"div",class:"twitch-notes-header",mouseDownEvent:function(){g.activeContainer=t,w.isMouseDown=!0},content:[{element:"span",class:"twitch-notes-close-button",content:['<svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" class="twitch-notes-x-button">\n        <g>\n            <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path>\n        </g>\n    </svg>'],mouseClickEvent:function(){return g.removeContainer(t)}},{element:"span",class:"twitch-notes-title",content:[t]}]},{element:"div",class:"twitch-notes-content",content:[y.getNote(t)],attributes:{contentEditable:"true"},keyUpEvent:function(t){e=t}},{element:"div",class:"twitch-notes-save-button",content:["SAVE"],mouseClickEvent:function(){y.saveNote(t,e),g.removeContainer(t)}}]},o=new x(n);document.body.appendChild(o.getElement()),g.addContainer(t,o)}}(r)},content:[{element:"img",style:{height:"18px",paddingRight:"4px"},attributes:{src:"https://cdn.rdarius.lt/icons/32-id-card.png"}}]});i.insertBefore(a.getElement(),i.firstChild)}},n=0;n<t.length;n++)e(n)},t}(),T=new S,z=!1,U="";setInterval((function(){var t=window.location.href;if(U!==t)return U=t,void(z=!1);var e=document.querySelector(".".concat("chat-scrollable-area__message-container"));e?(z||(T.init(e),w.setupListeners()),z=!0):z=!1}),1e3)})()})();