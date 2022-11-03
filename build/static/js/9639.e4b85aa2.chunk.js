"use strict";(self.webpackChunkcmp=self.webpackChunkcmp||[]).push([[9639],{73:function(t,n,e){e.d(n,{_:function(){return a},g:function(){return i}});var i=function(t){if("number"===typeof t&&t>=1e3){var n=t.toString(),e=n.length,i=(e-1)%3+1,a=Math.floor(e-1);return("0"===n[e-1]?n.slice(0,i):"".concat(n.slice(0,i),".").concat(n.slice(i,i+1)))+["","k","m","b","t"][a]}return t},a=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if("number"===typeof t){if(0===t)return"0";var e=1024,i=["byte","kb","mb","gb","tb","pb","eb","zb","yb"],a=Math.floor(Math.log(t)/Math.log(e));return"".concat(parseFloat((t/Math.pow(e,a)).toFixed(n))," ").concat(i[a])}return t}},99639:function(t,n,e){e.r(n),e.d(n,{default:function(){return d}});var i=e(72791),a=e(59434),c=e(16871),o=e(73),s=e(15152),r=e(80184),l="admin-dashboard";var d=function(){var t=(0,a.I0)(),n=(0,a.v9)((function(t){return t.commonAdmin.club})).id,e=void 0===n?-1:n,c=(0,a.v9)((function(t){return t.dashboardAdmin.dashboard})),d=(0,a.v9)((function(t){return t.dashboardAdmin.dashboardLoading}));(0,i.useLayoutEffect)((function(){return e&&t((0,s.jk)({id:e})),function(){t((0,s.YB)())}}),[e]);var v=(0,i.useMemo)((function(){return[{title:"Visits",total:(0,o.g)(null===c||void 0===c?void 0:c.view_count),today:(0,o.g)(null===c||void 0===c?void 0:c.daily_view_count)},{title:"Posts",total:(0,o.g)(null===c||void 0===c?void 0:c.post_count),today:(0,o.g)(null===c||void 0===c?void 0:c.daily_post_count)},{title:"Comments",total:(0,o.g)(null===c||void 0===c?void 0:c.comment_count),today:(0,o.g)(null===c||void 0===c?void 0:c.daily_comment_count)},{title:"Members",total:(0,o.g)(null===c||void 0===c?void 0:c.member_count),today:(0,o.g)(null===c||void 0===c?void 0:c.daily_member_count)}]}),[c]),h=(0,i.useMemo)((function(){return[{title:"Statistics",desc:"Plan your club's future with statistics",path:"statistics"},{title:"Boards",desc:"Manage bulletin boards and bulletin board groups in the menu",path:"boards"},{title:"Reports",desc:"\uc2e0\uace0 \uc124\uba85 \ud544\uc694",path:"reports"},{title:"Member",desc:"Manage your staff and members",path:"member"},{title:"Permissions",desc:"Manage staff privileges for convenient operation",path:"permissions"},{title:"Information",desc:"Manage your club's information",path:"information"},{title:"Design",desc:"Design your club to attract attention",path:"design"},{title:"Operation",desc:"Make important decisions for your club",path:"operation"}]}),[]);return d?null:(0,r.jsxs)("div",{className:"".concat(l),children:[(0,r.jsxs)("div",{className:"".concat(l,"-section"),children:[(0,r.jsx)("div",{className:"".concat(l,"-title"),children:"Statistics"}),(0,r.jsx)("div",{className:"".concat(l,"-item-wrapper"),children:v.map((function(t){return(0,r.jsx)(u,{data:t},t.title)}))})]}),(0,r.jsxs)("div",{className:"".concat(l,"-section"),children:[(0,r.jsx)("div",{className:"".concat(l,"-title"),children:"Menu"}),(0,r.jsx)("div",{className:"".concat(l,"-item-wrapper"),children:h.map((function(t){return(0,r.jsx)(m,{data:t},t.path)}))})]})]})};function u(t){var n=t.data;return(0,r.jsxs)("div",{className:"".concat(l,"-item"),children:[(0,r.jsx)("div",{className:"".concat(l,"-item-title"),children:n.title}),(0,r.jsxs)("div",{className:"".concat(l,"-statistic-value-container"),children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"".concat(l,"-statistic-value"),children:n.total}),(0,r.jsx)("div",{className:"".concat(l,"-statistic-value-label"),children:"Total"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"".concat(l,"-statistic-value"),children:n.today}),(0,r.jsx)("div",{className:"".concat(l,"-statistic-value-label"),children:"Today"})]})]})]})}function m(t){var n=t.data,e=(0,c.s0)(),i=(0,c.TH)(),a=function(){e("".concat(i.pathname.split("/").slice(0,-1).join("/"),"/").concat(n.path))};return(0,r.jsxs)("div",{className:"".concat(l,"-menu-item"),onClick:a,onKeyDown:function(t){return"Enter"===t.key?a():{}},tabIndex:0,role:"button",children:[(0,r.jsx)("div",{className:"".concat(l,"-menu-item-title"),children:n.title}),(0,r.jsx)("div",{className:"".concat(l,"-menu-item-desc"),children:n.desc})]})}}}]);
//# sourceMappingURL=9639.e4b85aa2.chunk.js.map