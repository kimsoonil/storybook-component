"use strict";(self.webpackChunkcmp=self.webpackChunkcmp||[]).push([[2949],{2949:function(e,t,a){a.r(t),a.d(t,{default:function(){return V}});var s=a(2982),i=a(1413),r=a(885),n=a(6459),l=(a(6720),a(2791)),c=a(9434),o=a(6871),d=(a(1759),a(9500)),u=a(2853),m=a(9974),p=(a(9855),a(902)),x=a(4017),v=a(73),f=a(1430),g=a(1186),h=a(9575),j=a(5333),b=a(9642),S=a(290),N=a(184),C=function(){var e=(0,c.I0)(),t=(0,c.v9)((function(e){var t;return null===(t=e.adminModal.modifyClub)||void 0===t?void 0:t.visible})),a=(0,c.v9)((function(e){var t;return null===(t=e.adminModal.modifyClub)||void 0===t?void 0:t.data})),s=(0,l.useCallback)((function(){e((0,S.aF)({id:a.id,data:a,actionList:[{type:S.lx.type,payload:{id:a.id}}]})),e((0,b.VG)({type:"modifyClub"}))}),[a]);return(0,N.jsx)(j.ZP,{title:x.AVD.modalText.modifySave,visible:t,onClickSubmit:s})},D=function(){var e=(0,c.I0)(),t=((0,o.s0)(),(0,c.v9)((function(e){var t;return null===(t=e.adminModal.modifyClubCancel)||void 0===t?void 0:t.visible}))),a=(0,c.v9)((function(e){var t;return null===(t=e.adminModal.modifyClubCancel)||void 0===t?void 0:t.data})),s=(0,l.useCallback)((function(){e((0,S.lx)({id:a})),e((0,b.VG)({type:"modifyClubCancel"}))}),[a]);return(0,N.jsx)(j.ZP,{title:x.AVD.modalText.modifyCancel,visible:t,onClickSubmit:s})},y=a(4329),V=function(e){(0,n.Z)(e);(0,o.s0)();var t=(0,c.I0)(),j=(0,o.bx)(),S=j.club,V=j.adminState,Z=j.setAdminState,A=(0,c.v9)((function(e){return e.categories.list})),E=(0,l.useMemo)((function(){return A.map((function(e){return{value:e.id,label:e.title}}))}),[A]),T=(0,c.v9)((function(e){return e.checkClubName})),w=(0,l.useState)(x.IVD.success),k=(0,r.Z)(w,2),R=k[0],z=k[1],O=(0,l.useState)({status:x.loadState.SUCCESS,errorText:" "}),U=(0,r.Z)(O,2),_=U[0],B=U[1],L=function(e){var a=e.target.value;""===a?(z(x.IVD.error),B({status:x.loadState.ERROR,errorText:x.AVD.errorText.name.empty})):t((0,g.g5)({id:null===S||void 0===S?void 0:S.id,data:{title:a}}))};(0,l.useEffect)((function(){T.status===x.loadState.SUCCESS&&(B({status:T.status,errorText:" "}),z(x.IVD.success)),T.status===x.loadState.ERROR&&(B({status:T.status,errorText:T.error}),z(x.IVD.error))}),[T]);var M=(0,c.v9)((function(e){return e.checkClubAddress})),F=(0,l.useState)((null===S||void 0===S?void 0:S.address)||""),K=(0,r.Z)(F,2),G=K[0],H=K[1],P=(0,l.useState)(x.IVD.success),W=(0,r.Z)(P,2),q=W[0],J=W[1],Q=(0,l.useState)({status:x.loadState.SUCCESS,errorText:""}),X=(0,r.Z)(Q,2),Y=X[0],$=X[1],ee=function(e){var a=e.target.value;""===a?(J(x.IVD.error),$({status:x.loadState.ERROR,errorText:x.AVD.errorText.address.empty})):t((0,h.my)({id:null===S||void 0===S?void 0:S.id,data:{address:a}}))};(0,l.useEffect)((function(){M.status===x.loadState.SUCCESS&&($({status:M.status,errorText:" "}),J(x.IVD.success)),M.status===x.loadState.ERROR&&($({status:M.status,errorText:M.error}),J(x.IVD.error))}),[M]);var te=(0,l.useState)(""),ae=(0,r.Z)(te,2),se=ae[0],ie=ae[1],re=(0,l.useState)(x.IVD.success),ne=(0,r.Z)(re,2),le=ne[0],ce=ne[1],oe=(0,l.useState)({status:x.loadState.SUCCESS,errorText:""}),de=(0,r.Z)(oe,2),ue=de[0],me=de[1],pe=function(e){e?(ce(x.IVD.success),me({status:x.loadState.SUCCESS,errorText:""})):(ce(x.IVD.error),me({status:x.loadState.ERROR,errorText:x.AVD.errorText.category.empty}))};(0,l.useEffect)((function(){return console.log("Information useEffect"),null!==A&&void 0!==A&&A[0]?ie({value:null===S||void 0===S?void 0:S.category,label:A.find((function(e){return e.id===(null===S||void 0===S?void 0:S.category)})).title}):t((0,f.EE)()),function(){}}),[A]);var xe=(0,l.useState)(x.IVD.blur),ve=(0,r.Z)(xe,2),fe=ve[0],ge=ve[1],he=(0,l.useState)(""),je=(0,r.Z)(he,2),be=je[0],Se=je[1],Ne=function(){if(be){var e=be.match(/[a-zA-Z0-9\uac00-\ud787\u3131-\u314e\u314f-\u3163\u3041-\u3094\u30a1-\u30f4\u30fc\u3005\u3006\u3024\u4e00-\u9fa5]/g).join("").toLowerCase(),t=e.charAt(0).toUpperCase()+e.slice(1);!V.tags.includes(t)&&Z((function(e){return(0,i.Z)((0,i.Z)({},e),{},{tags:[].concat((0,s.Z)(e.tags),[{title:t}])})})),Se("")}},Ce=(0,l.useCallback)((function(e){Se(e.target.value)}),[]),De=(0,l.useState)(null!==S&&void 0!==S&&S.is_auto_approval?"yes":"no"),ye=(0,r.Z)(De,2),Ve=ye[0],Ie=ye[1],Ze=(0,i.Z)((0,i.Z)((0,i.Z)({id:S.id,title:V.title,address:G,category:se.value},V.bannerImage.data.base64&&{banner_image:V.bannerImage.data.base64}),V.profileImage.data.base64&&{profile_image:V.profileImage.data.base64}),{},{description:V.description,tags:V.tags.map((function(e){return e.title})),is_auto_approval:"yes"===Ve});return(0,N.jsxs)("div",{className:"admin",children:[(0,N.jsxs)("div",{className:"admin-content-wrapper",children:[(0,N.jsx)("div",{className:"h-60"}),(0,N.jsxs)("div",{className:"form-wrapper",children:[(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.name.title,description:x.AVD.name.description,isEssential:!0}),(0,N.jsxs)("div",{className:"name",children:[(0,N.jsx)(d.o,{placeholder:x.AVD.name.placeholder,value:V.title,state:R,onChange:function(e){Z((function(t){return(0,i.Z)((0,i.Z)({},t),{},{title:e.target.value})})),L(e)},onFocus:function(){z(x.IVD.focus)},onBlur:L,maxLength:60}),(0,N.jsxs)("div",{className:"under-text",children:[" ","".concat(V.title.length).concat(x.AVD.name.extraText)]})]})]}),_.status===x.loadState.ERROR&&(0,N.jsx)("div",{className:"form-side-wrapper",children:(0,N.jsxs)("div",{className:"form-side-inner",children:[(0,N.jsx)("img",{src:a(382).Z}),(0,N.jsx)("div",{className:"error-text",children:_.errorText})]})})]}),(0,N.jsxs)("div",{className:"form-wrapper",children:[(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.address.title,description:x.AVD.address.description,isEssential:!0}),(0,N.jsxs)("div",{className:"address",children:[(0,N.jsxs)("div",{className:"url-wrapper",children:[(0,N.jsx)("div",{className:"club-url",children:x.AVD.address.url}),(0,N.jsx)("div",{className:"address-input-wrapper",children:(0,N.jsx)(d.o,{placeholder:x.AVD.address.placeholder,value:G,state:q,onChange:function(e){H(e.target.value),ee(e)},onFocus:function(){J(x.IVD.focus)},onBlur:ee,maxLength:20})})]}),(0,N.jsx)("div",{className:"under-text",children:"".concat(G.length).concat(x.AVD.address.extraText)})]})]}),Y.status===x.loadState.ERROR&&(0,N.jsx)("div",{className:"form-side-wrapper",children:(0,N.jsxs)("div",{className:"form-side-inner",children:[(0,N.jsx)("img",{src:a(382).Z}),(0,N.jsx)("div",{className:"error-text",children:Y.errorText})]})})]}),(0,N.jsxs)("div",{className:"form-wrapper",children:[(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.category.title,description:x.AVD.category.description,isEssential:!0}),(0,N.jsx)("div",{className:"category",children:(0,N.jsx)(y.Z,{options:E,selectedOption:se,setSelectedOption:function(e){ie(e),pe(e)},inputState:le,placeholder:"Select category",onBlur:function(){return pe(se)}})})]}),ue.status===x.loadState.ERROR&&(0,N.jsx)("div",{className:"form-side-wrapper",children:(0,N.jsxs)("div",{className:"form-side-inner",children:[(0,N.jsx)("img",{src:a(382).Z}),(0,N.jsx)("div",{className:"error-text",children:ue.errorText})]})})]}),(0,N.jsx)("div",{className:"form-wrapper",children:(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.profileImages.title,description:x.AVD.profileImages.description}),(0,N.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,N.jsx)(m.Z,{setState:function(e){return Z((function(t){return(0,i.Z)((0,i.Z)({},t),{},{profileImage:(0,i.Z)((0,i.Z)({},t.profileImage),{},{data:e})})}))},tabIndex:0,type:"image",multiple:!0,maxSize:{value:10,unit:"mb"},children:(0,N.jsx)("div",{className:"image-picker",children:V.profileImage.url?(0,N.jsxs)("div",{className:"image-picker-selected-wrapper profile-size",children:[(0,N.jsx)("img",{className:"image-picker-selected profile-size",src:V.profileImage.data.base64||V.profileImage.url}),(0,N.jsx)("div",{className:"image-picker-selected-hover profile-size",children:(0,N.jsx)("img",{src:a(5048).Z})})]}):(0,N.jsx)("div",{className:"image-picker-default profile-size",children:(0,N.jsx)("img",{src:a(5048).Z})})})}),(0,N.jsx)("div",{style:{marginTop:"3px",fontWeight:500,fontSize:"16px",lineHeight:"22px",color:"#808080"},children:"".concat((0,v._)(V.profileImage.data.file.size)||"0").concat(x.AVD.profileImages.extraText)})]})]})}),(0,N.jsx)("div",{className:"form-wrapper",children:(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.bannerImage.title,description:x.AVD.bannerImage.description}),(0,N.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,N.jsx)(m.Z,{setState:function(e){return Z((function(t){return(0,i.Z)((0,i.Z)({},t),{},{bannerImage:(0,i.Z)((0,i.Z)({},t.bannerImage),{},{data:e})})}))},tabIndex:0,type:"image",multiple:!0,maxSize:{value:20,unit:"mb"},children:(0,N.jsx)("div",{className:"image-picker ",children:V.bannerImage.url?(0,N.jsxs)("div",{className:"image-picker-selected-wrapper banner-size",children:[(0,N.jsx)("img",{className:"image-picker-selected banner-size",src:V.bannerImage.data.base64||V.bannerImage.url}),(0,N.jsx)("div",{className:"image-picker-selected-hover banner-size",children:(0,N.jsx)("img",{src:a(5048).Z})})]}):(0,N.jsx)("div",{className:"image-picker-default banner-size",children:(0,N.jsx)("img",{src:a(5048).Z})})})}),(0,N.jsx)("div",{style:{marginTop:"3px",fontWeight:500,fontSize:"16px",lineHeight:"22px",color:"#808080"},children:"".concat((0,v._)(V.bannerImage.data.file.size)||"0").concat(x.AVD.bannerImage.extraText)})]})]})}),(0,N.jsx)("div",{className:"form-wrapper",children:(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.description.title,description:x.AVD.description.description}),(0,N.jsxs)("div",{className:"description-wrapper",children:[(0,N.jsx)("textarea",{className:"description-textarea description-textarea-".concat(fe),placeholder:x.AVD.description.placeholder,value:V.description,maxLength:300,onChange:function(e){Z((function(t){return(0,i.Z)((0,i.Z)({},t),{},{description:e.target.value})}))},onFocus:function(){},onBlur:function(){""===V.description?ge(x.IVD.blur):ge(x.IVD.success)}}),(0,N.jsx)("div",{className:"under-text",children:"".concat(V.description.length).concat(x.AVD.description.extraText)})]})]})}),(0,N.jsx)("div",{className:"form-wrapper",children:(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.tags.title,description:x.AVD.tags.description}),(0,N.jsxs)("div",{className:"tags-wrapper",children:[(0,N.jsxs)("div",{className:"input-tags-wrapper",children:[V.tags.map((function(e,t){return(0,N.jsxs)("button",{className:"input-tags-button",onClick:function(e){Z((function(e){return(0,i.Z)((0,i.Z)({},e),{},{tags:e.tags.filter((function(e,a){return t!==a}))})}))},children:["# ".concat(e.title),(0,N.jsx)("div",{className:"input-tags-button-hover",children:"Delete"})]},t)})),V.tags.length<8&&(0,N.jsx)("input",{className:"input-tags-text",onKeyDown:function(e){"Enter"===e.key&!1===e.nativeEvent.isComposing&&Ne()},type:"text",placeholder:x.AVD.tags.placeholder,value:be,onChange:Ce,onBlur:Ne})]}),(0,N.jsx)("div",{className:"under-text",children:"".concat(V.tags.length).concat(x.AVD.tags.extraText)})]})]})}),(0,N.jsx)("div",{className:"form-wrapper",children:(0,N.jsxs)("div",{className:"form-body",children:[(0,N.jsx)(I,{title:x.AVD.autoApproval.title}),(0,N.jsx)("div",{className:"auto-approval-wrapper",children:(0,N.jsx)(u.Z,{value:Ve,onChange:function(e){Ie(e.target.value)}})})]})}),(0,N.jsxs)("div",{className:"submit-button-wrapper",children:[(0,N.jsx)(p.Z,{label:"Cancel",outline:!0,color:"none",onClick:function(){t((0,b.K4)({type:"modifyClubCancel",data:S.id}))},tabIndex:0}),(0,N.jsx)(p.Z,{label:"Save",onClick:function(){t((0,b.K4)({type:"modifyClub",data:Ze}))},tabIndex:0,disabled:_.status!==x.loadState.SUCCESS||Y.status!==x.loadState.SUCCESS||ue.status!==x.loadState.SUCCESS})]})]}),(0,N.jsx)(C,{}),(0,N.jsx)(D,{})]})},I=function(e){var t=e.title,a=void 0===t?"":t,s=e.description,i=void 0===s?"":s,r=e.isEssential,n=void 0!==r&&r;return(0,N.jsxs)("div",{className:"form-label",children:[(0,N.jsxs)("div",{className:"flex-row",children:[(0,N.jsx)("div",{className:"form-label-title",children:a}),n&&(0,N.jsx)("div",{className:"form-label-essential"})]}),(0,N.jsx)("div",{className:"form-label-description",children:i})]})}}}]);
//# sourceMappingURL=2949.e89027ea.chunk.js.map