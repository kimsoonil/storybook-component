"use strict";(self.webpackChunkcmp=self.webpackChunkcmp||[]).push([[2517],{4283:function(e,s,i){var c=i(885),n=i(2791),l=i(9434),t=i(290),r=i(6871),a=i(3922),d=i(1430),u=(i(6827),i(8134)),o=i(1806),m=i(184);s.Z=function(e){var s=(0,l.I0)(),x=(0,r.s0)(),f=(0,a.lr)(),h=(0,c.Z)(f,2),v=h[0],j=(h[1],(0,l.v9)((function(e){return e.club}))),g=j.clubs,N=j.clubList,b=j.moreLoading,p=(0,l.v9)((function(e){return e.categories})),w=p.isLoading,_=p.list,k=(0,n.useState)(""),E=(0,c.Z)(k,2),C=E[0],Z=E[1],L=(0,n.useState)(!0),T=(0,c.Z)(L,2),S=(T[0],T[1]),y=(0,n.useState)(!1),z=(0,c.Z)(y,2),H=z[0],I=z[1],M=e.limit,A={search:v.get("search"),club_category:C,page_size:M};function K(){var e=document.documentElement.scrollTop,s=document.documentElement.scrollHeight;e+window.innerHeight+50>=s&&I(!0)}return(0,n.useEffect)((function(){s((0,t.IK)({parameters:A})),s((0,d.EE)())}),[s,v,C]),(0,n.useEffect)((function(){S(g.count!==N.length)}),[g.count,N]),(0,n.useEffect)((function(){H&&!b&&(s((0,t.UO)({parameters:A})),I(!1))}),[H,N,s,I,b]),(0,n.useEffect)((function(){if("clubs"===e.searchTab)return window.addEventListener("scroll",K),function(){return window.removeEventListener("scroll",K)}}),[]),"ok"!==g.message?(0,m.jsx)("div",{className:"flex-center",children:(0,m.jsx)(o.a,{})}):(0,m.jsxs)("div",{className:"search-club",children:[(0,m.jsxs)("div",{className:"flex-between",children:[(0,m.jsxs)("div",{className:"search-club-title flex-center",children:[" ",g.count," Clubs"]}),(0,m.jsxs)("div",{className:"list-filter flex-center",children:[(0,m.jsx)("div",{className:"flex-center active",children:"Hot"}),(0,m.jsx)("div",{className:"flex-center",children:"Popular"}),(0,m.jsx)("div",{className:"flex-center",children:"New"})]})]}),(0,m.jsxs)("div",{className:"categories",children:[(0,m.jsx)("div",{className:"item flex-center "+(""===C?"active":""),onClick:function(){return Z("")},children:"All"}),w?(0,m.jsx)("div",{className:"flex-center",children:(0,m.jsx)(o.a,{})}):_.map((function(e,s){if(s<10)return(0,m.jsx)("div",{className:"item flex-center "+(C===e.id?"active":""),onClick:function(){return Z(e.id)},children:e.title},s)}))]}),(0,m.jsx)("div",{className:"content",children:N.length>0?N.map((function(e,s){return(0,m.jsxs)("div",{className:"club-list relative",onClick:function(){return x("/club/".concat(e.id,"/home"))},children:[(0,m.jsx)("div",{className:"list-img",children:(0,m.jsx)("img",{src:e.profile_image_url?e.profile_image_url:i(5723),alt:""})}),(0,m.jsx)("div",{className:"list-item-profile-image",children:(0,m.jsx)("img",{src:e.profile_image_url?e.profile_image_url:i(82)})}),(0,m.jsxs)("div",{className:"list-item",children:[(0,m.jsx)("div",{className:"list-item-name",children:e.title}),(0,m.jsxs)("div",{className:"flex-between",children:[(0,m.jsxs)("div",{className:"list-item-info",children:[(0,m.jsx)("div",{children:(0,m.jsx)("img",{src:i(2483)})}),(0,m.jsxs)("div",{children:[e.member_count," M Sliver"]})]}),(0,m.jsx)("div",{className:"list-item-pin",children:null===e.pin?(0,m.jsx)("img",{src:i(8980)}):e.is_pined?(0,m.jsx)("img",{src:i(3173)}):(0,m.jsx)("img",{src:i(8980)})})]})]})]},s)})):(0,m.jsxs)("div",{className:"no-data flex-center",children:[(0,m.jsx)("div",{children:(0,m.jsx)("img",{src:i(6259),alt:""})}),(0,m.jsx)("div",{className:"no-data-title",children:"No search results found"}),(0,m.jsx)("div",{className:"no-data-content",children:"Try searching with a different keyword."})]})}),"clubs"===e.searchTab?g.count===N.length||N.length<=0?(0,m.jsx)("div",{}):(0,m.jsx)("div",{className:"flex-center",children:(0,m.jsx)(o.a,{})}):g.count>20?(0,m.jsx)("div",{className:"flex-center",children:(0,m.jsx)(u.z,{size:"l",label:"More",width:116,onClick:function(){x("/clubs/search/clubs")}})}):(0,m.jsx)("div",{})]})}},2517:function(e,s,i){i.r(s);i(2791);var c=i(4283),n=i(184);s.default=function(e){var s=window.location.pathname.split("/");return(0,n.jsx)(c.Z,{limit:20,searchTab:s[3]})}},6827:function(){}}]);
//# sourceMappingURL=2517.6e79938e.chunk.js.map