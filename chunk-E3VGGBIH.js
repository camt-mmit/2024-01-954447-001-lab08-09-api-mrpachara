import{a as Ae,b as Ge,c as j,d as q,e as U,f as Ie,g as $,h as Le,i as K,j as ze,k as B,l as V,m as Q,n as Fe}from"./chunk-3QBXWS2Q.js";import{$ as b,Ba as Pe,C as se,Ca as xe,D as ce,E as ye,Ea as C,F as _e,Ga as Ee,Ha as L,J as O,K as x,Ka as we,M as I,N as be,Na as Oe,O as p,Oa as z,Ta as F,U as y,Ua as Re,Va as S,Wa as N,Xa as Me,Y as _,a as d,b as v,c as pe,ca as h,d as T,ea as Ce,fa as Te,g as me,ga as i,h as ae,ha as r,ia as f,j as re,l as ue,la as le,ma as g,n as fe,na as E,o as G,p as ie,q as ge,ra as s,sa as M,ta as De,u as w,ua as Se,va as ke,w as he,x as l,y as ve}from"./chunk-B4KX26PA.js";var H=class n{data=x();disabled=x(!1,{transform:xe});formSubmit=O();formCancel=O();fb=l(B).nonNullable;createFormGroup=e=>this.fb.group({summary:this.fb.control(e?.summary??"",{updateOn:"blur"}),description:this.fb.control(e?.description??"",{updateOn:"blur"}),start:this.fb.group({dateTime:this.fb.control(e?.start?.dateTime??"",{updateOn:"blur"}),timeZone:this.fb.control(Intl.DateTimeFormat().resolvedOptions().timeZone)}),end:this.fb.group({dateTime:this.fb.control(e?.start?.dateTime??"",{updateOn:"blur"}),timeZone:this.fb.control(Intl.DateTimeFormat().resolvedOptions().timeZone)})});formGroup=C(()=>this.createFormGroup(this.data()));constructor(){Ee(()=>{this.disabled()?this.formGroup().enabled&&this.formGroup().disable({onlySelf:!0}):this.formGroup().disabled&&this.formGroup().enable({onlySelf:!0})})}normalizeDateTimeLocal(e){let[t,o]=e.split("T"),a=o.split(":");for(;a.length<3;)a.push("00");return`${t}T${a.join(":")}`}onSubmit(){if(this.formGroup().valid){let e=this.formGroup().getRawValue();e.start.dateTime=this.normalizeDateTimeLocal(e.start.dateTime),e.end.dateTime=this.normalizeDateTimeLocal(e.end.dateTime),this.formSubmit.emit(e)}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-event-form"]],inputs:{data:[1,"data"],disabled:[1,"disabled"]},outputs:{formSubmit:"formSubmit",formCancel:"formCancel"},decls:27,vars:2,consts:[["ngNativeValidate","",3,"ngSubmit","formGroup"],[1,"app-cmp-data-form","-cl-container",3,"disabled"],[1,"app-cl-field"],[1,"app-cl-title"],["type","text","formControlName","summary","required","",1,"app-cl-control"],["formGroupName","start",1,"app-cl-field"],["type","datetime-local","formControlName","dateTime","required","",1,"app-cl-control"],["formGroupName","end",1,"app-cl-field"],["formControlName","description","rows","5",1,"app-cl-control"],[1,"-cmp-actions-bar"],["type","submit",1,"app-cl-button","app-cl-primary"],[1,"material-symbols-outlined"],["type","button",1,"app-cl-button","app-cl-warn","-cl-meta",3,"click"]],template:function(t,o){t&1&&(i(0,"form",0),g("ngSubmit",function(){return o.onSubmit()}),i(1,"fieldset",1)(2,"label",2)(3,"b",3),s(4,"Summary*"),r(),f(5,"input",4),r(),i(6,"label",5)(7,"b",3),s(8,"Start*"),r(),f(9,"input",6),r(),i(10,"label",7)(11,"b",3),s(12,"End*"),r(),f(13,"input",6),r(),i(14,"label",2)(15,"b",3),s(16,"Description"),r(),f(17,"textarea",8),r(),i(18,"div",9)(19,"button",10)(20,"i",11),s(21,"send"),r(),s(22," Create "),r(),i(23,"button",12),g("click",function(){return o.formCancel.emit()}),i(24,"i",11),s(25,"cancel"),r(),s(26," Cancel "),r()()()()),t&2&&(b("formGroup",o.formGroup()),p(),b("disabled",o.formGroup().disabled))},dependencies:[V,j,q,U,ze,$,K,Le],styles:["[_nghost-%COMP%]{box-sizing:border-box;display:block}.-cl-container[_ngcontent-%COMP%]{box-sizing:border-box;display:block;margin:0;padding:0;border:none}.-cmp-actions-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;padding:1em 0;column-gap:8px}.-cmp-actions-bar[_ngcontent-%COMP%] > .-cl-meta[_ngcontent-%COMP%]{margin-left:auto}"],changeDetection:0})};function Ne(n,e=!1){let o=new Uint8Array(n).reduce((c,m)=>`${c}${String.fromCharCode(m)}`,""),a=btoa(o);return e?Ze(a):a}function Ze(n){return n.replaceAll(/\+/g,"-").replaceAll(/\//g,"_").replace(/=/g,"")}function We(n){return n.replaceAll(/_/g,"/").replaceAll(/-/g,"+")}function de(n){let e=new Uint32Array(n/2);return crypto.getRandomValues(e),Array.from(e,t=>`0${t.toString(16)}`.slice(-2)).join("")}async function je(n){let t=new TextEncoder().encode(n);return crypto.subtle.digest("SHA-256",t)}function qe(n){let[,e]=n.split(".");return JSON.parse(atob(We(e)))}var J=class extends Error{name=this.constructor.name;constructor(e="Access Token not Found!!!",t){super(e,t)}},Y=class extends Error{name=this.constructor.name;constructor(e,t){super(`State token '${e}' is not found or expired!!`,t)}};var Z=class n{async get(e){let t=localStorage.getItem(e);return JSON.parse(t??"null")}async set(e,t){let o=JSON.stringify(t);return localStorage.setItem(e,o)}async remove(e){return localStorage.removeItem(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})};var Xe=54,et=32,tt=10*60*1e3,nt=10*1e3,Ue=new he("oauth-configuration");function $e(n){return ve([{provide:Ue,useValue:n},D])}var D=class n{config=l(Ue);storage=l(Z);http=l(z);storedRefreshTokenDataKey=`oauth-${this.config.name}-refresh-token`;storedIdTokenDataKey=`oauth-${this.config.name}-id-token`;storedParsedIdTokenDataKey=`oauth-${this.config.name}-parsed-id-token`;storedAccessTokenDataKey=`oauth-${this.config.name}-access-token`;storedStateDataKey=`oauth-${this.config.name}-states`;accessTokenResource=L({loader:async()=>(await this.getAccessTokenData())?.access_token??null});accessToken=C(this.accessTokenResource.value,{equal:(e,t)=>typeof t>"u"||Object.is(e,t)});ready=C(()=>{let e=this.accessToken();return typeof e>"u"?void 0:e!==null});storedIdTokenResource=L({loader:async()=>await this.fetchIdTokenData()});idToken=C(this.storedIdTokenResource.value,{equal:(e,t)=>typeof t>"u"||Object.is(e,t)});async storeRefreshTokenData(e){return await this.storage.set(this.storedRefreshTokenDataKey,e),e}async fetchRefreshTokenData(){return await this.storage.get(this.storedRefreshTokenDataKey)}async removeRefreshTokenData(){await this.storage.remove(this.storedRefreshTokenDataKey)}async storeIdTokenData(e){return await this.storage.set(this.storedIdTokenDataKey,e),await this.storage.set(this.storedParsedIdTokenDataKey,d(d({},await this.storage.get(this.storedParsedIdTokenDataKey)),qe(e))),this.storedIdTokenResource.set(e),e}async fetchIdTokenData(){return await this.storage.get(this.storedIdTokenDataKey)}async removeIdTokenData(){await this.storage.remove(this.storedParsedIdTokenDataKey),await this.storage.remove(this.storedIdTokenDataKey),this.storedIdTokenResource.set(null)}async fetchParsedIdTokenData(){return await this.storage.get(this.storedParsedIdTokenDataKey)}async storeAccessTokenData(e){let m=e,{refresh_token:t,id_token:o}=m,a=T(m,["refresh_token","id_token"]);t&&await this.storeRefreshTokenData(t),o&&await this.storeIdTokenData(o);let c=v(d({},a),{expiredAt:Date.now()+a.expires_in*1e3-nt});return await this.storage.set(this.storedAccessTokenDataKey,c),this.accessTokenResource.set(c.access_token),c}async fetchAccessTokenData(){return await this.storage.get(this.storedAccessTokenDataKey)}async removeAccessTokenData(){await this.storage.remove(this.storedAccessTokenDataKey),this.accessTokenResource.set(null)}async refreshAccessTokenData(){let e=await this.fetchRefreshTokenData();if(e){let t=await ae(this.http.post(this.config.accessTokenUrl,{client_id:this.config.clientId,client_secret:this.config.clientSecret,grant_type:"refresh_token",refresh_token:e}).pipe(fe(o=>(console.error(o?.error??o),me(null)))));if(t)return await this.storeAccessTokenData(t)}return null}async getAccessTokenData(){let e=await await this.fetchAccessTokenData();return e&&e.expiredAt>=Date.now()?e:await this.refreshAccessTokenData()}async getAuthorizationHeaders(){let e=await this.getAccessTokenData();if(e){let{token_type:t,access_token:o}=e;return{Authorization:`${t[0].toUpperCase()}${t.slice(1)} ${o}`}}throw new J}async fetchStateData(e){let t=await this.storage.get(this.storedStateDataKey)??{},o=Date.now(),a=Object.entries(t),c=a.filter(([,u])=>u.expiredAt>=o),m=Object.fromEntries(c);return a.length!==c.length&&await this.storage.set(this.storedStateDataKey,m),m[e]??null}async storeStateData(e,t){let o=await this.storage.get(this.storedStateDataKey)??{};return o[e]=v(d({},t),{expiredAt:Date.now()+tt}),await this.storage.set(this.storedStateDataKey,o)}async removeStateData(e){let c=await this.storage.get(this.storedStateDataKey)??{},{[e]:o}=c,a=T(c,[pe(e)]);Object.keys(a).length===0?await this.clearStateData():await this.storage.set(this.storedStateDataKey,a)}async clearStateData(){await this.storage.remove(this.storedStateDataKey)}async createStateData(e){let t=de(et),o=de(Xe),a=Ne(await je(o),!0);return await this.storeStateData(t,{codeVerifier:o,state:e}),{stateToken:t,codeChallenge:a}}async getAuthorizationUrl(e,{state:t={},additionalParams:o={}}={}){let a=this.config.authorizationCodeUrl;if(a){let{stateToken:c,codeChallenge:m}=await this.createStateData(t),u=new URL(a);return u.searchParams.set("client_id",this.config.clientId),u.searchParams.set("response_type","code"),u.searchParams.set("scope",e.join(" ")),u.searchParams.set("state",c),u.searchParams.set("code_challenge",m),u.searchParams.set("code_challenge_method","S256"),u.searchParams.set("redirect_uri",this.config.redirectUri),Object.entries(o).forEach(([He,Je])=>u.searchParams.set(He,Je)),u}else return null}async exchangeAuthorizationcode(e,t){let o=await this.fetchStateData(t);if(o===null)throw new Y(t,{cause:{authorizaitonCode:e}});return await this.storeAccessTokenData(await ae(this.http.post(this.config.accessTokenUrl,{client_id:this.config.clientId,client_secret:this.config.clientSecret,code:e,code_verifier:o.codeVerifier,grant_type:"authorization_code",redirect_uri:this.config.redirectUri}))),await this.removeStateData(t),o.state}parsedIdToken=L({request:this.idToken,loader:async()=>await this.fetchParsedIdTokenData()}).value.asReadonly();computedParsedIdToken(e,t){let{computation:o,options:a}=typeof e=="function"?{computation:e,options:t}:{computation:void 0,options:typeof e<"u"?e:t};return C(()=>typeof o=="function"?o(this.parsedIdToken()):this.parsedIdToken(),a)}async clear(){await Promise.all([this.removeRefreshTokenData(),this.removeIdTokenData(),this.removeAccessTokenData(),this.storage.remove(this.storedStateDataKey)])}static \u0275fac=function(t){return new(t||n)};static \u0275prov=w({token:n,factory:n.\u0275fac})};var Ke="https://www.googleapis.com/calendar/v3/calendars/primary/events",ot={eventTypes:["default","fromGmail"]},P=class n{http=l(z);oauthService=l(D);getAll(e,{injector:t=void 0}={}){return Ge({request:e,loader:({request:o,abortSignal:a})=>re(()=>this.oauthService.getAuthorizationHeaders()).pipe(ie(c=>this.http.get(Ke,{headers:d({},c),params:d(v(d({},ot),{timeMin:(()=>{let m=new Date;return m.setFullYear(m.getFullYear()-1),m.toISOString()})()}),o)})),ge(ue(a,"abort").pipe(G(1)))),injector:t})}create(e){return re(()=>this.oauthService.getAuthorizationHeaders()).pipe(ie(t=>this.http.post(Ke,e,{headers:d({},t)})))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})};var W=class n{service=l(P);disabled=I(!1);location=l(we);navigationBack=Fe();onFormSubmit(e){this.disabled.set(!0),this.service.create(e).pipe(G(1)).subscribe({complete:()=>this.navigationBack(),error:()=>this.disabled.set(!1)})}router=l(S);onFormCancel(){this.navigationBack()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-event-create-page"]],decls:1,vars:1,consts:[[1,"app-cl-main-content",3,"formSubmit","formCancel","disabled"]],template:function(t,o){t&1&&(i(0,"app-gl-event-form",0),g("formSubmit",function(c){return o.onFormSubmit(c)})("formCancel",function(){return o.onFormCancel()}),r()),t&2&&b("disabled",o.disabled())},dependencies:[H],encapsulation:2,changeDetection:0})};function rt(n){return typeof n.date<"u"}function X(n){return typeof n.dateTime<"u"}function it(n){if(X(n)){let e=n,{dateTime:o}=e,a=T(e,["dateTime"]);return v(d({},a),{dateTime:new Date(o)})}else{let t=n,{date:o}=t,a=T(t,["date"]);return v(d({},a),{date:new Date(`${o}T00:00:00`)})}}function st(n){let c=n,{start:e,end:t}=c,o=T(c,["start","end"]);function a(m,u){return typeof u>"u"?{}:{[m]:d({},it(u))}}return d(d(d({},o),a("start",e)),a("end",t))}function Ve(n){return v(d({},n),{items:(n?.items||[]).map(st)})}function Be(n){let[e,t]=(X(n)?n.dateTime:n.date).toISOString().split("T");return{date:e,time:rt(n)?null:t}}function R(n){if(X(n)){let{dateTime:e}=n;return e.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}else{let{date:e}=n;return e.toLocaleDateString(void 0,{dateStyle:"medium"})}}function ct(n){return(X(n)?n.dateTime:n.date).toLocaleTimeString(void 0,{timeStyle:"short"})}function Qe(n){let{start:e,end:t}=n;if(e&&t){let o=Be(e),a=Be(t);return o.date===a.date?o.time===a.time?R(e):`${R(e)} - ${ct(t)}`:`${R(e)} to ${R(t)}`}else return e?R(e):t?R(t):"Unknown"}var lt=(n,e)=>e.id;function dt(n,e){n&1&&f(0,"app-loading")}function pt(n,e){if(n&1&&s(0),n&2){let t=E().$implicit;De(" ",t.description," ")}}function mt(n,e){n&1&&(s(0," ["),i(1,"i"),s(2,"No description"),r(),s(3,"] "))}function ut(n,e){if(n&1&&(i(0,"section",9)(1,"details")(2,"summary")(3,"h3"),s(4),r()(),i(5,"p"),_(6,pt,1,1)(7,mt,4,0),r()(),i(8,"footer"),s(9),r()()),n&2){let t=e.$implicit;p(4),M(t.summary),p(2),h(t.description?6:7),p(3),M(t.displayDateTime)}}function ft(n,e){if(n&1&&(i(0,"div",8),Ce(1,ut,10,3,"section",9,lt),r()),n&2){let t=E();p(),Te(t.items)}}function gt(n,e){n&1&&(i(0,"p"),s(1,"Not found!!"),r())}function ht(n,e){n&1&&_(0,ft,3,0,"div",8)(1,gt,2,0,"p"),n&2&&h(e.items.length>0?0:1)}function vt(n){let a=Ve(n),{items:t}=a,o=T(a,["items"]);return v(d({},o),{items:t.map(c=>v(d({},c),{displayDateTime:Qe(c)}))})}var ee=class n{data=x.required();queryParams=x({});isLoading=x(!1);queryParamsChange=O();reload=O();parsedData=C(()=>this.data()?vt(this.data()):void 0,{equal:(e,t)=>typeof t>"u"||Object.is(e,t)});fb=l(B).nonNullable;formGroup=C(()=>this.fb.group({q:this.fb.control(this.queryParams().q??"",{updateOn:"submit"})}));onSubmit(){this.queryParamsChange.emit(this.formGroup().getRawValue())}clear(){this.queryParamsChange.emit({})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-events-list"]],inputs:{data:[1,"data"],queryParams:[1,"queryParams"],isLoading:[1,"isLoading"]},outputs:{queryParamsChange:"queryParamsChange",reload:"reload"},decls:15,vars:3,consts:[[1,"-cmp-search-box",3,"ngSubmit","formGroup"],[1,"-cl-field"],["type","text","inputmode","search","enterkeyhint","search","formControlName","q",1,"-cl-control"],["type","button",1,"app-cl-button","app-cl-warn",3,"click"],[1,"material-symbols-outlined"],[1,"-cmp-actions-bar"],[1,".-cl-actions-group","-cl-meta"],["type","button",1,"app-cl-button",3,"click"],[1,"-cmp-resoures-list"],[1,"-cmp-resource"]],template:function(t,o){if(t&1&&(i(0,"form",0),g("ngSubmit",function(){return o.onSubmit()}),i(1,"label",1)(2,"b"),s(3,"Search"),r(),f(4,"input",2),r(),i(5,"button",3),g("click",function(){return o.clear()}),i(6,"i",4),s(7,"close"),r()()(),i(8,"div",5),_(9,dt,1,0,"app-loading"),i(10,"div",6)(11,"button",7),g("click",function(){return o.reload.emit()}),i(12,"i",4),s(13,"sync"),r()()()(),_(14,ht,2,1)),t&2){let a;b("formGroup",o.formGroup()),p(9),h(o.isLoading()?9:-1),p(5),h((a=o.parsedData())?14:-1,a)}},dependencies:[V,Ie,j,q,U,$,K,Q],styles:["[_nghost-%COMP%]{box-sizing:border-box;display:block}.-cl-hidden[_ngcontent-%COMP%]{display:none!important}.-cl-number-data[_ngcontent-%COMP%]{display:inline-block;width:3ch}.-cmp-search-box[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:stretch;margin-top:1em;margin-bottom:1em}.-cmp-search-box[_ngcontent-%COMP%] > .-cl-field[_ngcontent-%COMP%]{box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:baseline;flex:1 0 auto}.-cmp-search-box[_ngcontent-%COMP%] > .-cl-field[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{box-sizing:border-box;height:100%}.-cmp-search-box[_ngcontent-%COMP%] > .-cl-field[_ngcontent-%COMP%] > .-cl-control[_ngcontent-%COMP%]{flex:1 0 auto}.-cmp-actions-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:8px;align-items:center}.-cmp-actions-bar[_ngcontent-%COMP%] > .-cl-actions-group[_ngcontent-%COMP%]{display:flex;flex-direction:row}.-cmp-actions-bar[_ngcontent-%COMP%] > .-cl-meta[_ngcontent-%COMP%]{margin-left:auto}.-cmp-resoures-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:8px;margin-top:1em;padding-bottom:1em}.-cmp-resource[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;padding:8px 3ch;border:1px solid var(--app-primary-color);border-radius:4px}.-cmp-resource[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0;padding:0}.-cmp-resource[_ngcontent-%COMP%] > details[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]{cursor:pointer}.-cmp-resource[_ngcontent-%COMP%] > details[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{display:inline;margin:0;padding:0}.-cmp-resource[_ngcontent-%COMP%] > details[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{white-space:pre-wrap}.-cmp-resource[_ngcontent-%COMP%] > footer[_ngcontent-%COMP%]{margin-top:8px;font-size:smaller}"],changeDetection:0})};var te=class n{service=l(P);activatedRoute=l(F);queryParams$=this.activatedRoute.queryParams;queryParams=Ae(this.queryParams$,{initialValue:{}});resource=this.service.getAll(this.queryParams);router=l(S);onQuery(e){this.router.navigate([],{replaceUrl:!0,queryParams:e})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-events-list-page"]],decls:7,vars:3,consts:[[1,"app-cl-main-content"],["routerLink","create"],["type","button",1,"app-cl-button","app-cl-primary"],[1,"material-symbols-outlined"],[1,"app-cl-main-content",3,"queryParamsChange","reload","data","queryParams","isLoading"]],template:function(t,o){t&1&&(i(0,"div",0)(1,"a",1)(2,"button",2)(3,"i",3),s(4,"add"),r(),s(5," Create "),r()()(),i(6,"app-gl-events-list",4),g("queryParamsChange",function(c){return o.onQuery(c)})("reload",function(){return o.resource.reload()}),r()),t&2&&(p(6),b("data",o.resource.value())("queryParams",o.queryParams())("isLoading",o.resource.isLoading()))},dependencies:[N,ee],encapsulation:2,changeDetection:0})};function yt(n,e){if(n&1&&s(0),n&2){let t=e;Se(" ",t.error,": ",t.error_description,`
`)}}var ne=class n{activatedRoute=l(F);router=l(S);oauthService=l(D);error=I((()=>{let e=this.activatedRoute.snapshot.queryParams.error,t=this.activatedRoute.snapshot.queryParams.error_description;return e||t?{error:e,error_description:t}:void 0})());constructor(){(async()=>{let{code:e,state:t}=this.activatedRoute.snapshot.queryParams;if(e&&t)try{let o=await this.oauthService.exchangeAuthorizationcode(e,t);this.router.navigateByUrl(o.intendedUrl,{replaceUrl:!0})}catch(o){throw o instanceof Oe?this.error.set(o.error):o instanceof Error&&this.error.set({error:o.name,error_description:o.message}),o}else this.error.set({error:"bad_response",error_description:"The response doesn't have 'code' or 'state'"})})()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-authorization-page"]],decls:1,vars:1,template:function(t,o){if(t&1&&_(0,yt,1,2),t&2){let a;h((a=o.error())?0:-1,a)}},encapsulation:2,changeDetection:0})};function _t(n,e){n&1&&f(0,"app-loading")}function bt(n,e){if(n&1){let t=le();i(0,"div",2)(1,"button",3),g("click",function(){se(t);let a=E();return ce(a.login())}),f(2,"div",4),i(3,"div",5)(4,"div",6),ye(),i(5,"svg",7),f(6,"path",8)(7,"path",9)(8,"path",10)(9,"path",11)(10,"path",12),r()(),_e(),i(11,"span",13),s(12,"Continue with Google"),r(),i(13,"span",14),s(14,"Continue with Google"),r()()(),i(15,"p",15),s(16," The content are avaliable after getting access token. "),r()()}}function Ct(n,e){n&1&&f(0,"img",18),n&2&&b("src",e,be)}function Tt(n,e){n&1&&(i(0,"b"),s(1),r()),n&2&&(p(),M(e))}function Dt(n,e){if(n&1&&_(0,Ct,1,1,"img",18)(1,Tt,2,1,"b"),n&2){let t,o,a=e;h((t=a.picture)?0:-1,t),p(),h((o=a.name)?1:-1,o)}}function St(n,e){if(n&1){let t=le();_(0,Dt,2,2),i(1,"button",16),g("click",function(){se(t);let a=E();return ce(a.logout())}),i(2,"i",17),s(3,"delete_forever"),r(),s(4," Remove Token "),r()}if(n&2){let t,o=E();h((t=o.parsedIdToken())?0:-1,t)}}function kt(n,e){n&1&&(i(0,"nav",19)(1,"ul")(2,"li")(3,"a",20),s(4,"Events"),r()()()(),f(5,"router-outlet"))}var Pt=["profile","https://www.googleapis.com/auth/calendar.events"],oe=class n{oauthService=l(D);router=l(S);parsedIdToken=this.oauthService.computedParsedIdToken();async login(){let e=await this.oauthService.getAuthorizationUrl(Pt,{state:{intendedUrl:this.router.url},additionalParams:{prompt:"consent",access_type:"offline"}});e&&(location.href=`${e}`)}async logout(){await this.oauthService.clear()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=y({type:n,selectors:[["app-gl-page"]],decls:7,vars:2,consts:[[1,"app-cl-main-content"],[1,"-cmp-actions-bar"],[1,"-cmp-getting-access-token"],["type","button",1,"gsi-material-button",3,"click"],[1,"gsi-material-button-state"],[1,"gsi-material-button-content-wrapper"],[1,"gsi-material-button-icon"],["version","1.1","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 48 48",0,"xmlns","xlink","http://www.w3.org/1999/xlink",2,"display","block"],["fill","#EA4335","d","M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"],["fill","#4285F4","d","M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"],["fill","#FBBC05","d","M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"],["fill","#34A853","d","M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"],["fill","none","d","M0 0h48v48H0z"],[1,"gsi-material-button-contents"],[2,"display","none"],[1,"-cl-page-message"],["type","button",1,"app-cl-button","app-cl-warn","-cl-meta",3,"click"],[1,"material-symbols-outlined"],["alt","Profile picture",1,"-cl-profile-image",3,"src"],[1,"app-cmp-links"],["routerLink","events","routerLinkActive","app-st-active"]],template:function(t,o){if(t&1&&(ke(0),i(1,"div",0)(2,"div",1),_(3,_t,1,0,"app-loading")(4,bt,17,0,"div",2)(5,St,5,1),r(),_(6,kt,6,0),r()),t&2){let a,c=o.oauthService.ready();p(3),h((a=c)===void 0?3:a===!1?4:5),p(3),h(c?6:-1)}},dependencies:[Re,N,Me,Q],styles:[".-cl-profile-image[_ngcontent-%COMP%]{height:42px}.-cl-page-message[_ngcontent-%COMP%]{text-align:center}.-cmp-actions-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;column-gap:8px;align-items:center;padding:16px 0;justify-content:center}.-cmp-actions-bar[_ngcontent-%COMP%] > .-cl-meta[_ngcontent-%COMP%]{margin-left:auto}.-cmp-getting-access-token[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;row-gap:16px}.gsi-material-button[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none;appearance:none;background-color:#fff;background-image:none;border:1px solid #747775;border-radius:20px;box-sizing:border-box;color:#1f1f1f;cursor:pointer;font-family:Roboto,arial,sans-serif;font-size:14px;height:40px;letter-spacing:.25px;outline:none;overflow:hidden;padding:0 12px;position:relative;text-align:center;transition:background-color .218s,border-color .218s,box-shadow .218s;vertical-align:middle;white-space:nowrap;width:auto;max-width:400px;min-width:min-content}.gsi-material-button[_ngcontent-%COMP%]   .gsi-material-button-icon[_ngcontent-%COMP%]{height:20px;margin-right:12px;min-width:20px;width:20px}.gsi-material-button[_ngcontent-%COMP%]   .gsi-material-button-content-wrapper[_ngcontent-%COMP%]{align-items:center;display:flex;flex-direction:row;flex-wrap:nowrap;height:100%;justify-content:space-between;position:relative;width:100%}.gsi-material-button[_ngcontent-%COMP%]   .gsi-material-button-contents[_ngcontent-%COMP%]{flex-grow:1;font-family:Roboto,arial,sans-serif;font-weight:500;overflow:hidden;text-overflow:ellipsis;vertical-align:top}.gsi-material-button[_ngcontent-%COMP%]   .gsi-material-button-state[_ngcontent-%COMP%]{transition:opacity .218s;inset:0;opacity:0;position:absolute}.gsi-material-button[_ngcontent-%COMP%]:disabled{cursor:default;background-color:#ffffff61;border-color:#1f1f1f1f}.gsi-material-button[_ngcontent-%COMP%]:disabled   .gsi-material-button-contents[_ngcontent-%COMP%]{opacity:38%}.gsi-material-button[_ngcontent-%COMP%]:disabled   .gsi-material-button-icon[_ngcontent-%COMP%]{opacity:38%}.gsi-material-button[_ngcontent-%COMP%]:not(:disabled):active   .gsi-material-button-state[_ngcontent-%COMP%], .gsi-material-button[_ngcontent-%COMP%]:not(:disabled):focus   .gsi-material-button-state[_ngcontent-%COMP%]{background-color:#303030;opacity:12%}.gsi-material-button[_ngcontent-%COMP%]:not(:disabled):hover{box-shadow:0 1px 2px #3c40434d,0 1px 3px 1px #3c404326}.gsi-material-button[_ngcontent-%COMP%]:not(:disabled):hover   .gsi-material-button-state[_ngcontent-%COMP%]{background-color:#303030;opacity:8%}"],changeDetection:0})};var lo=[{path:"",providers:[$e({name:"google",clientId:"209689905225-dj1bo29m0c7or5926cv4bb1nu5aru0cv.apps.googleusercontent.com",clientSecret:"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",authorizationCodeUrl:"https://accounts.google.com/o/oauth2/v2/auth",accessTokenUrl:"https://oauth2.googleapis.com/token",redirectUri:Pe()?"http://localhost:4200/google/authorization":"https://camt-mmit.github.io/2024-01-954447-001-lab08-09-api-mrpachara/google/authorization"})],children:[{path:"authorization",data:{hideNavigation:!0},component:ne},{path:"",component:oe,children:[{path:"",redirectTo:"events",pathMatch:"full"},{path:"events",providers:[P],children:[{path:"",component:te},{path:"create",component:W}]}]}]}];export{lo as default};
