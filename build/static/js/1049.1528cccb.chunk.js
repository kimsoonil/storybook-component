"use strict";(self.webpackChunkcmp=self.webpackChunkcmp||[]).push([[1049],{4193:function(e,s,i){i(2791),i(7687);var l=i(8134),c=i(184);s.Z=function(e){return(0,c.jsx)("div",{className:"popup-shadow flex-center",style:{display:e.open?"flex":"none"},children:(0,c.jsxs)("div",{className:"inputPopup ",children:[(0,c.jsx)("div",{className:"inputPopup-title flex-center",children:"Please enter your password."}),(0,c.jsxs)("div",{className:"inputPopup-content flex-center",children:["Password ",(0,c.jsx)("input",{type:"number",vlaue:e.value,onChange:function(s){return e.setValue(s.target.value)}})]}),(0,c.jsxs)("div",{className:"inputPopup-actions flex-center",children:[(0,c.jsx)(l.z,{label:"Cancel",primary:"cancel",size:"m",width:120,onClick:function(){return e.setOpen(!e.open)}}),(0,c.jsx)(l.z,{label:"Check",size:"m",width:120,onClick:function(){return e.secretPosts()}})]})]})})}},8593:function(e,s,i){i.r(s),i.d(s,{default:function(){return N}});var l=i(2791),c=i(6871),t=i(5024),n=i(885),a=i(9434),r=i(3169),d=i(9802),o=i(7439),m=i(4193),u=i(1806),x=i(184);var v=function(e){var s=(0,a.I0)(),t=(0,c.s0)(),v=(0,l.useState)(""),f=(0,n.Z)(v,2),j=f[0],p=f[1],h=(0,a.v9)((function(e){return e.post})).posts,N=(0,a.v9)((function(e){return e.tag})).tags,b=(0,l.useState)(),g=(0,n.Z)(b,2),_=g[0],y=g[1],k=(0,l.useState)(),C=(0,n.Z)(k,2),w=C[0],I=C[1],P=(0,l.useState)(!1),S=(0,n.Z)(P,2),Z=S[0],M=S[1];return(0,l.useEffect)((function(){s((0,d.VC)({id:e.clubId.data.id,parameters:{tag_title:j}})),s((0,o.yM)())}),[s,j]),(0,l.useEffect)((function(){y("")}),[Z]),(0,x.jsxs)("div",{className:"club-home-content club-posts",children:[(0,x.jsxs)("div",{className:"flex-between",children:[(0,x.jsx)("div",{className:"club-home-title",children:"Posts"}),(0,x.jsx)("div",{className:"see-all",onClick:function(){return t("/clubs/search/posts")},children:"See all"})]}),(0,x.jsx)("div",{className:"club-list-tag",children:(0,x.jsxs)("div",{className:"list-filter flex-center",children:[(0,x.jsx)("div",{className:"flex-center active",children:"Hot"}),(0,x.jsx)("div",{className:"flex-center",children:"Popular"}),(0,x.jsx)("div",{className:"flex-center",children:"New"})]})}),(0,x.jsx)("div",{className:"tags",children:"ok"!==N.message?(0,x.jsx)("div",{className:"flex-center",children:(0,x.jsx)(u.a,{})}):N.data.map((function(e,s){if(s<15)return(0,x.jsxs)("div",{className:"item flex-center "+(j===e.title?"active":""),onClick:function(){return function(e){p(j===e?"":e)}(e.title)},children:["# ",e.title]},s)}))}),(0,x.jsx)("div",{className:"club-post-list",children:"ok"!==h.message?(0,x.jsx)("div",{className:"flex-center",children:(0,x.jsx)(u.a,{})}):(0,x.jsx)("div",{className:"posts-list",children:h.data.map((function(e,s){var l,c,n,a;if(s<8)return(0,x.jsxs)("div",{className:"posts-list-item relative",style:{borderTop:s<2?"0":"1px solid #cdcdd1"},onClick:function(){return function(e){e.is_secret?(M(!Z),I(e)):t("/club/".concat(e.club,"/post/").concat(e.id))}(e)},children:[(0,x.jsxs)("div",{className:"posts-list-item-container",children:[(0,x.jsxs)("div",{className:"posts-list-item-title",children:[e.title,e.is_secret&&(0,x.jsx)("img",{src:i(7494),alt:""})]}),(0,x.jsx)("div",{className:"posts-list-item-content",dangerouslySetInnerHTML:{__html:e.content}}),(0,x.jsxs)("div",{className:"posts-list-item-profile",children:[(0,x.jsx)("div",{className:"posts-list-item-profile-img",children:(0,x.jsx)("img",{src:e.profile.user.profile_image_url?e.profile.user.profile_image_url:i(3026)})}),(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{className:"posts-list-item-nick",children:[e.profile.user.username,null===(null===e||void 0===e||null===(l=e.profile)||void 0===l?void 0:l.staff_title)?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{className:"profile-rating flex-center",children:null===e||void 0===e||null===(c=e.profile)||void 0===c?void 0:c.grade_title}),(0,x.jsxs)("div",{className:"profile-level",children:["LV ",null===e||void 0===e||null===(n=e.profile)||void 0===n?void 0:n.level]})]}):(0,x.jsx)("div",{className:"profile-staff flex-center",children:null===e||void 0===e||null===(a=e.profile)||void 0===a?void 0:a.staff_title})]}),(0,x.jsxs)("div",{className:"posts-list-item-info",children:[(0,x.jsxs)("div",{className:"flex-center",children:[(0,x.jsx)("img",{src:i(3419)})," ",e.view_count]}),(0,x.jsxs)("div",{className:"flex-center",children:[(0,x.jsx)("img",{src:i(9688)})," ",e.comment_count]}),(0,x.jsx)("div",{className:"flex-center",children:(0,r.M)(e.created)})]})]})]})]}),(0,x.jsx)("div",{className:"posts-img ",children:(0,x.jsx)("img",{src:e.thumbnail_image_url,alt:""})})]},s)}))})}),(0,x.jsx)(m.Z,{open:Z,setOpen:M,value:_,setValue:y,secretPosts:function(){_==w.password?t("/club/".concat(w.club,"/post/").concat(w.id)):alert("\ube44\ubc00\ubc88\ud638\uac00 \ub2e4\ub985\ub2c8\ub2e4.")}})]})};var f=function(){return(0,x.jsxs)("div",{className:"club-home-content gallery",children:[(0,x.jsxs)("div",{className:"flex-between",children:[(0,x.jsx)("div",{className:"club-home-title",children:"Galleries"}),(0,x.jsx)("div",{className:"see-all",children:"See all"})]}),(0,x.jsx)("div",{className:"club-list-tag",children:(0,x.jsxs)("div",{className:"list-filter flex-center",children:[(0,x.jsx)("div",{className:"flex-center active",children:"Hot"}),(0,x.jsx)("div",{className:"flex-center",children:"Popular"}),(0,x.jsx)("div",{className:"flex-center",children:"New"})]})}),(0,x.jsxs)("div",{className:"tags",children:[(0,x.jsx)("div",{className:"item flex-center active",children:"#Twice"}),(0,x.jsx)("div",{className:"item flex-center",children:"#Kpop"}),(0,x.jsx)("div",{className:"item flex-center ",children:"#\ud3ec\ud2b8\ub9ac\uc2a4"}),(0,x.jsx)("div",{className:"item flex-center",children:"#Twice_japan"}),(0,x.jsx)("div",{className:"item flex-center",children:"#POPPOP"}),(0,x.jsx)("div",{className:"item flex-center",children:"#Mobile games"}),(0,x.jsx)("div",{className:"item flex-center",children:"#Clan"}),(0,x.jsx)("div",{className:"item flex-center",children:"#Dolphin"})]}),(0,x.jsxs)("div",{className:"club-gallery-list",children:[(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(6730),alt:""})}),(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(7605),alt:""})}),(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(7518),alt:""})}),(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(2588),alt:""})}),(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(6730),alt:""})}),(0,x.jsx)("div",{className:"item",children:(0,x.jsx)("img",{src:i(7605),alt:""})})]})]})};var j=function(e){var s=(0,a.I0)(),t=(0,c.s0)(),n=(0,a.v9)((function(e){return e.post})).eventPosts;return(0,l.useEffect)((function(){s((0,d.VC)({id:e.clubId.data.id,parameters:{is_event:!0},type:"event"}))}),[s]),"ok"!==n.message?(0,x.jsx)("div",{className:"flex-center",children:(0,x.jsx)(u.a,{})}):(0,x.jsxs)("div",{className:"club-home-content club-event",children:[(0,x.jsxs)("div",{className:"flex-between",children:[(0,x.jsx)("div",{className:"club-home-title",children:"Event"}),(0,x.jsx)("div",{className:"see-all",onClick:function(){return t("/club/".concat(e.clubId.data.id,"/board/").concat(e.clubId.data.board_groups[0].boards[2].id))},children:"See all"})]}),(0,x.jsx)("div",{className:"club-event-conent",children:n.data.map((function(e,s){if(s<2)return(0,x.jsxs)("div",{className:"club-event-conent-item",onClick:function(){return t("/club/".concat(e.club,"/post/").concat(e.id))},children:[(0,x.jsx)("img",{src:i(2753)}),(0,x.jsx)("div",{className:"club-event-conent-item-title",children:e.title}),(0,x.jsx)("div",{className:"club-event-conent-item-explain ",dangerouslySetInnerHTML:{__html:e.content}})]},s)}))})]})},p=i(2970);var h=function(e){var s=(0,a.I0)(),i=(0,c.s0)(),t=(0,a.v9)((function(e){return e.post})).noticePosts;return(0,l.useEffect)((function(){s((0,d.VC)({id:e.clubId.data.id,parameters:{is_notice:!0},type:"notion"}))}),[s]),"ok"!==t.message?(0,x.jsx)("div",{className:"flex-center",children:(0,x.jsx)(u.a,{})}):(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:"club-home-content side-box notice",children:[(0,x.jsxs)("div",{className:"flex-between",children:[(0,x.jsx)("div",{className:"side-box-title",children:"Notice"}),(0,x.jsx)("div",{className:"see-all",onClick:function(){return i("/club/".concat(e.clubId.data.id,"/board/").concat(e.clubId.data.board_groups[0].boards[1].id))},children:"See all"})]}),(0,x.jsx)("div",{className:"notice-content",children:t.data.map((function(e,s){if(s<2)return(0,x.jsxs)("div",{className:"notice-content-item",onClick:function(){return i("/club/".concat(e.club,"/post/").concat(e.id))},children:[(0,x.jsx)("div",{className:"notice-content-item-explain",dangerouslySetInnerHTML:{__html:e.content}}),(0,x.jsx)("div",{className:"notice-content-item-date",children:(0,r.M)(e.created)})]},s)}))})]})})};var N=function(){var e=(0,c.bx)();return(0,x.jsxs)("div",{className:" container",children:[(0,x.jsxs)("div",{className:"item",children:[(0,x.jsx)("div",{children:(0,x.jsx)(j,{clubId:e})}),(0,x.jsx)("div",{children:(0,x.jsx)(v,{clubId:e})}),(0,x.jsx)("div",{children:(0,x.jsx)(f,{clubId:e})})]}),(0,x.jsxs)("div",{className:"item",children:[e.data.profile?(0,x.jsx)(t.Z,{userData:e.data.profile,type:"club"}):(0,x.jsx)(t.Z,{type:"logout"}),(0,x.jsx)("div",{className:"chatting",children:(0,x.jsx)("img",{src:i(2671),alt:""})}),(0,x.jsx)(h,{clubId:e}),(0,x.jsx)(p.Z,{})]})]})}},2753:function(e,s,i){e.exports=i.p+"static/media/event.2c782874857cf57d18c3.png"},6730:function(e,s,i){e.exports=i.p+"static/media/gallery1.71e977294d746f624033.png"},7605:function(e,s,i){e.exports=i.p+"static/media/gallery2.29e12956de4534dc70e2.png"},7518:function(e,s,i){e.exports=i.p+"static/media/gallery3.15ae5b3c09ce46e36636.png"},2588:function(e,s,i){e.exports=i.p+"static/media/gallery4.d9ce7bb21478e5ee3d04.png"},2671:function(e,s,i){e.exports=i.p+"static/media/chatting.565b4c13ae60179b933a.png"}}]);
//# sourceMappingURL=1049.1528cccb.chunk.js.map