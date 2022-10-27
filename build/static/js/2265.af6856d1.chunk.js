"use strict";(self.webpackChunkcmp=self.webpackChunkcmp||[]).push([[2265],{2265:function(e,s,n){n.r(s),n.d(s,{default:function(){return T}});var a=n(2791),r=n(6871),t=n(4165),i=n(5861),o=n(1413),l=n(885),c=n(1134),u=n(1188),d=n(9434),p=n(8497),m=n(8422),h=n(2771),x=n(2884),f=n(5463),j=n(184);var g=function(){var e=[{id:f.Hu,name:"Google"},{id:f.dW,name:"Apple"},{id:f.tb,name:"Meta"},{id:f.yW,name:"Twitter"}],s=(0,d.I0)(),n=(0,r.s0)(),t=(0,d.v9)((function(e){return(0,o.Z)({},e.logIn)})).isAuthSns;return(0,a.useEffect)((function(){console.log("isAuthSns",t),t&&window.addEventListener("message",(function(e){if("passport-login-success"===e.data.message&&"platform-login-api"===e.data.source){var a,r=e.data.data,t=r.platforms,i=r.authToken;(0,x.p)("accessToken",i),"true"!==(0,x.c)(null===(a=t[0])||void 0===a?void 0:a.type)?n("/signup/complete"):s((0,p.gP)(e.data.data))}}))}),[t]),(0,j.jsx)("div",{className:"sns_login",children:e.map((function(e){return(0,j.jsx)("button",{type:"button",className:"sns btn_".concat(e.id),onClick:function(){return a=e.id,void("true"===(0,x.c)(a)?s((0,p.eC)(a)):n("/signup/terms/".concat(a)));var a},"aria-hidden":"true",children:(0,j.jsx)("span",{className:"a11y",children:e.name})},e.id)}))})},v=n(7058),b=n(6405),_=n(1694),w=n.n(_);function y(){return(0,j.jsx)("div",{className:"dot success",children:(0,j.jsx)("span",{className:"a11y",children:"\uc131\uacf5"})})}function N(e){var s=e.errors,n=e.isFocus,a=e.inputVal;return n||!a||s?null:(0,j.jsx)(y,{})}var C=function(e){var s=e.isFocus,n=e.setIsFocus,r=e.errors,t=e.inputVal,i=e.placeholder,l=e.register;return(0,a.useEffect)((function(){}),[s]),(0,j.jsxs)("div",{className:w()("form_wrap",{msg:r||!r&&t},{error:r},{success:!r&&t}),onBlur:function(){return n(!1)},onFocus:function(){return n(!0)},children:[(0,j.jsxs)("span",{className:"form_cell form_input input_lg",children:[(0,j.jsx)("input",(0,o.Z)({type:"text","aria-invalid":"false",placeholder:i},l)),(0,j.jsx)(N,{errors:r,isFocus:s,inputVal:t})]}),r&&(0,j.jsx)("span",{className:"error_txt msg",id:"input_error",children:r.message})]})},S=n(5303);var Z=function(e){var s=e.errors,n=e.isViewPwd,a=e.setIsViewPwd,r=e.register;return(0,j.jsxs)("div",{className:w()("form_wrap","msg",{error:s}),children:[(0,j.jsxs)("span",{className:"form_cell form_input input_lg",children:[(0,j.jsx)("input",(0,o.Z)({id:"password",type:n?"text":"password",placeholder:"Password"},r)),(0,j.jsx)(S.Z,{status:n,statusFunc:function(){return a(!n)}})]}),s&&(0,j.jsx)("span",{className:"error_txt msg",id:"input_error",children:s.message})]})};var k=function(e){var s=e.setStatus,n=e.onHide,r=(0,c.cI)({mode:"onChange"}),t=r.getValues,i=r.register,o=r.setValue,d=r.control,p=r.formState.errors,m=(0,u.$)().t,h=(0,a.useState)(!1),x=(0,l.Z)(h,2),f=x[0],g=x[1],v=(0,c.qo)({control:d,name:"email",defaultValue:""});return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:"bg_con",children:[(0,j.jsxs)("div",{className:"search_title",children:[(0,j.jsx)("span",{className:"step",children:"STEP 01"}),(0,j.jsx)("span",{className:"title_text",children:"Search ID"})]}),(0,j.jsxs)("div",{className:"search_text",children:["Please enter the email you first registered when signed up",(0,j.jsx)("br",{}),"to find your account."]}),(0,j.jsx)(C,{isFocus:f,setIsFocus:g,errors:p.email,inputVal:t("email"),placeholder:"E-mail",resetFunc:function(){return o("email","")},register:i("email",{required:m("validation.require",{require:"email"}),pattern:{value:/\S+@\S+\.\S+/,message:m("validation.emailauth.email")}})})]}),(0,j.jsxs)("div",{className:"popup_btn_wrap right",children:[(0,j.jsx)("button",{type:"button",className:"btn default button_lg btn_close",onClick:n,children:(0,j.jsx)("span",{children:"Cancel"})}),(0,j.jsx)("button",{type:"button",className:"btn primary button_lg btn_close",disabled:p.email||!v,onClick:function(){s(2)},children:(0,j.jsx)("span",{children:"Next"})})]})]})},F=n(9993);var E=function(e){var s=e.setStatus,n=e.onHide,a=(0,d.v9)((function(e){return(0,o.Z)({},e.authCode)})).isConfirm;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:"bg_con",children:[(0,j.jsxs)("div",{className:"search_title",children:[(0,j.jsx)("span",{className:"step",children:"STEP 02"}),(0,j.jsx)("span",{className:"title_text",children:"Account Authenticate"})]}),(0,j.jsxs)("div",{className:"search_text",children:["Please select the means to receive the authentication code",(0,j.jsx)("br",{}),"and proceed with the authentication."]}),(0,j.jsx)("div",{className:"radio_button",children:(0,j.jsxs)("div",{className:"radio_wrap half",children:[(0,j.jsxs)("span",{className:"form_cell btn_radio size_lg",children:[(0,j.jsx)("input",{type:"radio",id:"radio1",defaultChecked:!0}),(0,j.jsx)("label",{htmlFor:"radio1",children:(0,j.jsx)("span",{children:"E-mail"})})]}),(0,j.jsxs)("span",{className:"form_cell btn_radio size_lg",children:[(0,j.jsx)("input",{type:"radio",id:"radio2",disabled:!0}),(0,j.jsx)("label",{htmlFor:"radio2",children:(0,j.jsx)("span",{children:"Cellphone"})})]})]})}),(0,j.jsx)("span",{className:"shadow_line popup"}),(0,j.jsx)(F.Z,{verifyType:f.lb})]}),(0,j.jsxs)("div",{className:"popup_btn_wrap right",children:[(0,j.jsx)("button",{type:"button",className:"btn default button_lg btn_close",onClick:n,children:(0,j.jsx)("span",{children:"Cancel"})}),(0,j.jsx)("button",{className:"btn primary button_lg btn_close",disabled:!a,onClick:function(){s(3)},children:(0,j.jsx)("span",{children:"Next"})})]})]})},P=n(68),I=n(7703),V=n(6156);var q=function(e){var s=e.onHide,n=(0,c.cI)({mode:"onChange"}),r=n.register,t=n.trigger,i=n.control,l=n.formState.errors,u=(0,d.v9)((function(e){return(0,o.Z)({},e.authCode)})).code,p=(0,d.v9)((function(e){return(0,o.Z)({},e.authEmail)})).email,h=(0,d.v9)((function(e){return(0,o.Z)({},e.changePassword)})).isSuccess,x=(0,d.v9)((function(e){return(0,o.Z)({},e.popup)})).isConfirm,g=(0,c.qo)({control:i,name:"password",defaultValue:""}),v=(0,d.I0)();return(0,a.useEffect)((function(){console.log("code::",u),console.log("email::",p),console.log("isConfirm::",x),u&&x&&(console.log("isConfirm",x),v((0,I.YB)({email:p,password:(0,m.rQ)(g),verify_source:f.TN,verify_type:f.lb,code:u,username:p})))}),[g,x]),(0,a.useEffect)((function(){v((0,V.mc)())}),[]),(0,a.useEffect)((function(){h&&(v((0,V.U)({type:f.I7,contents:"Password has been changed."})),v((0,I.mc)()),s())}),[h]),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:"bg_con",children:[(0,j.jsxs)("div",{className:"search_title",children:[(0,j.jsx)("span",{className:"step",children:"STEP 03"}),(0,j.jsx)("span",{className:"title_text",children:"Change Password"})]}),(0,j.jsx)("div",{className:"search_text nopadding",children:"Please enter 8 to 16 digits using a combination of English\u2019s uppercase letters, lowercase letters, numbers, and special characters."}),(0,j.jsxs)("div",{className:"security_guide",children:[(0,j.jsx)("button",{type:"button",className:"open_tip",children:(0,j.jsx)("span",{children:"Security Guide"})}),(0,j.jsxs)("div",{className:"tooltip password",children:[(0,j.jsx)("h4",{children:"Strong Password"}),(0,j.jsx)("span",{children:"Enter a password that contains 8 - 16 characters from at least three of the following categories: uppercase/lowercase letters, numbers, and special characters."}),(0,j.jsx)("span",{children:"Repeated or sequence characters and letters, birthday, contact number, and other passwords that are easy to predict or are related to personal information are vulnerable due to weak security strength."}),(0,j.jsx)("span",{children:"Using a password that you use in other websites can also endanger the account security."})]})]}),(0,j.jsx)(P.Z,{control:i,register:r,trigger:t,errors:l})]}),(0,j.jsx)("div",{className:"popup_btn_wrap full",children:(0,j.jsx)("button",{className:"btn primary button_lg btn_close",disabled:!g||l.password,onClick:function(){v((0,V.U)({type:f.RE,isDim:!0,contents:"Are you sure you want to change your password?"}))},children:(0,j.jsx)("span",{children:"Change Password"})})})]})};var A=function(e){var s=e.isShowModal,n=e.setIsShowModal,r=(0,a.useState)(1),t=(0,l.Z)(r,2),i=t[0],o=t[1],c=function(){n(!1)};return(0,j.jsxs)("div",{style:{display:s?"inline-block":"none"},children:[(0,j.jsx)("div",{id:"modal"}),(0,j.jsx)("div",{className:"modal_popup modal_text id_search",children:(0,j.jsxs)("div",{className:"modal_con member",children:[(0,j.jsx)("button",{type:"button",className:"close",onClick:c}),(0,j.jsx)("h2",{className:"modal_title",children:"Find Password"}),1===i&&(0,j.jsx)(k,{setStatus:o,onHide:c}),2===i&&(0,j.jsx)(E,{setStatus:o,onHide:c}),3===i&&(0,j.jsx)(q,{onHide:c})]})})]})};var L=function(){var e="true"===(0,x.c)("autoLogin"),s=(0,a.useState)(!1),n=(0,l.Z)(s,2),_=n[0],w=n[1],y=(0,a.useState)(!1),N=(0,l.Z)(y,2),S=N[0],k=N[1],F=(0,a.useState)(!1),E=(0,l.Z)(F,2),P=E[0],I=E[1],V=(0,a.useState)(e),q=(0,l.Z)(V,2),L=q[0],T=q[1],H=(0,a.useState)(!0),U=(0,l.Z)(H,2),M=U[0],B=U[1],R=(0,a.useState)(!1),W=(0,l.Z)(R,2),z=W[0],D=W[1],G=(0,d.v9)((function(e){return(0,o.Z)({},e.logIn)})),Q=G.user,$=G.loginFailCnt,O=(0,d.I0)(),Y=(0,r.s0)(),J=(0,c.cI)({mode:"onBlur"}),K=J.getValues,X=J.setValue,ee=J.register,se=J.trigger,ne=J.setError,ae=J.control,re=J.formState.errors,te=(0,c.qo)({control:ae,name:"email",defaultValue:""}),ie=(0,c.qo)({control:ae,name:"password",defaultValue:""}),oe=(0,u.$)().t,le=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var s,n,a,r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r={username:K("email"),password:(0,m.rQ)(K("password"))},!($>=f._U)||S){e.next=4;break}return ne("verifyCapcha",{type:"custom",message:oe("validation.recapcha")}),e.abrupt("return");case 4:if(!(null!==(s=re.email)&&void 0!==s&&s.type||null!==(n=re.password)&&void 0!==n&&n.type||null!==(a=re.verifyCapcha)&&void 0!==a&&a.type)&&r.username&&r.password){e.next=6;break}return e.abrupt("return");case 6:O((0,p.Cd)({username:K("email"),password:K("password"),navigate:Y,dispatch:O}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ce=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,se(["email","password"]);case 2:$>=f._U&&!S&&ne("verifyCapcha",{type:"custom",message:oe("validation.recapcha")});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,a.useEffect)((function(){(0,x.p)("autoLogin",L)}),[L]),(0,a.useEffect)((function(){"true"===(0,x.c)("autoLogin")&&(X("email",(0,x.c)("username")),X("password",(0,x.c)("password")))}),[]),(0,a.useEffect)((function(){var e,s,n;null!==(e=re.email)&&void 0!==e&&e.type||null!==(s=re.password)&&void 0!==s&&s.type||null!==(n=re.verifyCapcha)&&void 0!==n&&n.type||!te||!ie||B(!1)}),[te,ie,S]),(0,a.useEffect)((function(){console.log("user",Q),console.log("loginFailCnt:",$)}),[Q,$]),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{id:"wrap",children:[(0,j.jsx)(b.Z,{}),(0,j.jsxs)("div",{id:"main",children:[(0,j.jsx)("div",{id:"container",children:(0,j.jsxs)("div",{className:"login_wrap",children:[(0,j.jsx)("div",{className:"login_logo"}),(0,j.jsxs)("div",{className:"login_input",children:[(0,j.jsx)(C,{isFocus:_,setIsFocus:w,errors:re.email,inputVal:K("email"),placeholder:"E-mail",register:ee("email",{required:oe("validation.require",{require:"email"}),pattern:{value:/\S+@\S+\.\S+/,message:oe("validation.emailauth.email")}})}),(0,j.jsx)(Z,{errors:re.password,isViewPwd:P,setIsViewPwd:I,register:ee("password",{required:oe("validation.require",{require:"password"})})}),(0,j.jsx)("div",{className:"form_wrap",children:(0,j.jsxs)("span",{className:"form_cell form_check",children:[(0,j.jsx)("input",{id:"autoLogin",name:"autoLogin",defaultChecked:e,type:"checkbox",onClick:function(){return T(!e)}}),(0,j.jsx)("label",{htmlFor:"autoLogin",className:"checkbox",children:(0,j.jsx)("span",{children:oe("label.staylogin")})})]})}),$>=f._U&&(0,j.jsx)(h.Z,{setIsCapcha:k}),re.verifyCapcha&&(0,j.jsx)("span",{className:"error_msg",children:re.verifyCapcha.message}),(0,j.jsx)("div",{className:"page_btn_wrap full",children:(0,j.jsx)("button",{type:"button",className:"btn primary button_xl",onClick:function(){return le()},onBlur:function(){return ce()},disabled:M,children:(0,j.jsx)("span",{children:"Login"})})}),(0,j.jsxs)("div",{className:"login_text_link",children:[(0,j.jsx)("button",{type:"button",onClick:function(){return D(!0)},children:(0,j.jsx)("span",{children:"Find Password"})}),(0,j.jsx)("button",{type:"button",onClick:function(){return Y("/signup")},children:(0,j.jsx)("span",{children:"Register Account"})})]}),(0,j.jsx)("div",{className:"login_line",children:(0,j.jsx)("span",{children:"OR"})}),(0,j.jsx)(g,{})]})]})}),(0,j.jsx)(v.Z,{})]})]}),(0,j.jsx)(A,{isShowModal:z,setIsShowModal:D})]})};var T=function(){return(0,j.jsx)(r.Z5,{children:(0,j.jsx)(r.AW,{path:"/*",element:(0,j.jsx)(L,{})})})}}}]);
//# sourceMappingURL=2265.af6856d1.chunk.js.map