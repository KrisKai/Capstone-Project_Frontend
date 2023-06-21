"use strict";(self.webpackChunkjourney_sick=self.webpackChunkjourney_sick||[]).push([[397],{90397:function(e,t,r){r.r(t),r.d(t,{default:function(){return N}});var i=r(74165),a=r(15861),n=r(29439),s=r(30035),o=r(5849),c=r(45363),d=r(81153),l=r(62861),u=r(82626),p=r(84701),m=r(93006),h=r(4567),g=r(71285),v=r(97892),Z=r.n(v),x=r(83027),y=r.n(x),b=r(22339),f=r(72791),I=r(57689),j=r(75985),C=r(8007),k=r(80184);function N(){var e=(0,I.s0)(),t=(0,I.UO)(),r=t.tripId,v=t.itemId,Z=Boolean(v),x=(0,f.useState)({tripId:r,itemName:"",itemDescription:"",priceMin:"",quantity:"",categoryId:""}),y=(0,n.Z)(x,2),N=y[0],q=y[1],w=(0,f.useState)({TripId:"",TripName:""}),M=(0,n.Z)(w,2),O=(M[0],M[1]),S=(0,f.useState)([{categoryId:"",CategoryName:""}]),D=(0,n.Z)(S,2),P=D[0],B=D[1];function T(){e("/admin/tripItemList/".concat(r))}(0,f.useEffect)((function(){(0,a.Z)((0,i.Z)().mark((function t(){var a,n,s;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.YO.getAll({pageIndex:0,pageSize:99999999,tripName:""});case 2:return a=t.sent,O(a.listOfTrip),t.next=6,g.OY.getAll({pageIndex:0,pageSize:99999999});case 6:if(n=t.sent,B(n.listOfCategory),r&&v){t.next=10;break}return t.abrupt("return");case 10:return t.prev=10,t.next=13,g.e_.getById(v);case 13:null!=(s=t.sent)&&""!=s?q(s):e("/admin/tripItemList/".concat(r)),t.next=21;break;case 17:t.prev=17,t.t0=t.catch(10),console.log("Failed to fetch trip item",t.t0),401==t.t0.response.status&&(localStorage.removeItem("access_token"),e("/auth/login"));case 21:case"end":return t.stop()}}),t,null,[[10,17]])})))()}),[r]);var F=C.Ry().shape({itemName:C.Z_("Enter Item Name").required("Item Name is required"),itemDescription:C.Z_("Enter Item Description").required("Item Description is required"),priceMin:C.Z_("Enter Price").required("Price is required"),categoryId:C.Rx().min(1).required("Category is required"),quantity:C.Rx().min(1).required("Quantity is required")});return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(h.Z,{variant:"h4",gutterBottom:!0,color:"primary",children:Z?"Update Trip Item":"Create Trip Item"}),(0,k.jsx)(b.J9,{initialValues:N,enableReinitialize:!0,validationSchema:F,onSubmit:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(a,n){var s,o,c;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=n.setErrors,o=n.setStatus,t.prev=1,o({success:!1}),!Z){t.next=9;break}return t.next=6,g.e_.update(a);case 6:c=t.sent,t.next=12;break;case 9:return t.next=11,g.e_.create(a);case 11:c=t.sent;case 12:t.t0=c.Code,t.next="G001"===t.t0?15:"U001"===t.t0?16:"I001"===t.t0?17:18;break;case 15:case 16:case 17:return t.abrupt("return",j.Am.error(c.Message));case 18:c>0&&(e("/admin/tripItemList/".concat(r)),Z?j.Am.success("Update Trip Item Successed!"):j.Am.success("Create Trip Item Successed!"));case 19:t.next=25;break;case 21:t.prev=21,t.t1=t.catch(1),o({success:!1}),s({submit:t.t1.message});case 25:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e,r){return t.apply(this,arguments)}}(),children:function(e){var t=e.errors,r=e.touched,i=e.handleChange,a=e.handleSubmit,n=e.values;e.setFieldValue;return(0,k.jsx)("form",{onSubmit:a,children:(0,k.jsxs)(d.ZP,{container:!0,spacing:3,children:[(0,k.jsxs)(d.ZP,{item:!0,xs:12,sm:6,children:[(0,k.jsx)(m.Z,{id:"tripId",name:"tripId",label:"Trip Name",fullWidth:!0,variant:"outlined",value:n.tripId,error:Boolean(r.tripId&&t.tripId)}),r.tripId&&t.tripId&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-TripId",children:t.tripId})]}),(0,k.jsxs)(d.ZP,{item:!0,xs:12,sm:6,children:[(0,k.jsx)(m.Z,{id:"itemName",name:"itemName",label:"Item Name *",fullWidth:!0,variant:"outlined",value:n.itemName,onChange:i,error:Boolean(r.itemName&&t.itemName)}),r.itemName&&t.itemName&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-ItemName",children:t.itemName})]}),(0,k.jsxs)(d.ZP,{item:!0,xs:12,children:[(0,k.jsx)(m.Z,{id:"itemDescription",name:"itemDescription",label:"Item Description *",fullWidth:!0,variant:"outlined",value:n.itemDescription,onChange:i,multiline:!0,maxRows:4,error:Boolean(r.itemDescription&&t.itemDescription)}),r.itemDescription&&t.itemDescription&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-ItemDescription",children:t.itemDescription})]}),(0,k.jsxs)(d.ZP,{item:!0,xs:12,sm:4,children:[(0,k.jsx)(m.Z,{id:"priceMin",name:"priceMin",label:"Price *",fullWidth:!0,variant:"outlined",value:n.priceMin,onChange:i,error:Boolean(r.priceMin&&t.priceMin)}),r.priceMin&&t.priceMin&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-Price",children:t.priceMin})]}),(0,k.jsx)(d.ZP,{item:!0,xs:12,sm:4,children:(0,k.jsxs)(c.Z,{sx:{mt:1,minWidth:400},children:[(0,k.jsx)(l.Z,{id:"categoryId",children:"Category *"}),(0,k.jsx)(p.Z,{labelId:"categoryId",id:"categoryId",value:n.categoryId,label:"categoryId",onChange:i,name:"categoryId",children:P.map((function(e){return(0,k.jsx)(u.Z,{value:e.categoryId,children:e.categoryName})}))}),r.categoryId&&t.categoryId&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-categoryId",children:t.categoryId})]})}),(0,k.jsxs)(d.ZP,{item:!0,xs:12,sm:4,children:[(0,k.jsx)(m.Z,{id:"quantity",name:"quantity",label:"Quantity *",type:"number",fullWidth:!0,variant:"outlined",value:n.quantity,onChange:i,error:Boolean(r.quantity&&t.quantity)}),r.quantity&&t.quantity&&(0,k.jsx)(s.Z,{error:!0,id:"standard-weight-helper-Quantity",children:t.quantity})]}),(0,k.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,k.jsx)(o.Z,{variant:"outlined",onClick:T,children:"Return to List"})}),(0,k.jsx)(d.ZP,{item:!0,xs:12,sm:6,textAlign:"right",children:(0,k.jsx)(o.Z,{type:"submit",variant:"contained",children:Z?"Update":"Create"})})]})})}})]})}Z().extend(y())},82626:function(e,t,r){var i=r(4942),a=r(63366),n=r(87462),s=r(72791),o=r(28182),c=r(94419),d=r(12065),l=r(66934),u=r(31402),p=r(66199),m=r(53915),h=r(40162),g=r(42071),v=r(90133),Z=r(96014),x=r(29849),y=r(71498),b=r(80184),f=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],I=(0,l.ZP)(m.Z,{shouldForwardProp:function(e){return(0,l.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((function(e){var t,r=e.theme,a=e.ownerState;return(0,n.Z)({},r.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:"1px solid ".concat((r.vars||r).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(r.vars||r).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,i.Z)(t,"&.".concat(y.Z.selected),(0,i.Z)({backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity)},"&.".concat(y.Z.focusVisible),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.focusOpacity,"))"):(0,d.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.focusOpacity)})),(0,i.Z)(t,"&.".concat(y.Z.selected,":hover"),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.hoverOpacity,"))"):(0,d.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity)}}),(0,i.Z)(t,"&.".concat(y.Z.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),(0,i.Z)(t,"&.".concat(y.Z.disabled),{opacity:(r.vars||r).palette.action.disabledOpacity}),(0,i.Z)(t,"& + .".concat(v.Z.root),{marginTop:r.spacing(1),marginBottom:r.spacing(1)}),(0,i.Z)(t,"& + .".concat(v.Z.inset),{marginLeft:52}),(0,i.Z)(t,"& .".concat(x.Z.root),{marginTop:0,marginBottom:0}),(0,i.Z)(t,"& .".concat(x.Z.inset),{paddingLeft:36}),(0,i.Z)(t,"& .".concat(Z.Z.root),{minWidth:36}),t),!a.dense&&(0,i.Z)({},r.breakpoints.up("sm"),{minHeight:"auto"}),a.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},r.typography.body2,(0,i.Z)({},"& .".concat(Z.Z.root," svg"),{fontSize:"1.25rem"})))})),j=s.forwardRef((function(e,t){var r=(0,u.Z)({props:e,name:"MuiMenuItem"}),i=r.autoFocus,d=void 0!==i&&i,l=r.component,m=void 0===l?"li":l,v=r.dense,Z=void 0!==v&&v,x=r.divider,j=void 0!==x&&x,C=r.disableGutters,k=void 0!==C&&C,N=r.focusVisibleClassName,q=r.role,w=void 0===q?"menuitem":q,M=r.tabIndex,O=r.className,S=(0,a.Z)(r,f),D=s.useContext(p.Z),P=s.useMemo((function(){return{dense:Z||D.dense||!1,disableGutters:k}}),[D.dense,Z,k]),B=s.useRef(null);(0,h.Z)((function(){d&&B.current&&B.current.focus()}),[d]);var T,F=(0,n.Z)({},r,{dense:P.dense,divider:j,disableGutters:k}),R=function(e){var t=e.disabled,r=e.dense,i=e.divider,a=e.disableGutters,s=e.selected,o=e.classes,d={root:["root",r&&"dense",t&&"disabled",!a&&"gutters",i&&"divider",s&&"selected"]},l=(0,c.Z)(d,y.K,o);return(0,n.Z)({},o,l)}(r),V=(0,g.Z)(B,t);return r.disabled||(T=void 0!==M?M:-1),(0,b.jsx)(p.Z.Provider,{value:P,children:(0,b.jsx)(I,(0,n.Z)({ref:V,role:w,tabIndex:T,component:m,focusVisibleClassName:(0,o.Z)(R.focusVisible,N),className:(0,o.Z)(R.root,O)},S,{ownerState:F,classes:R}))})}));t.Z=j},71498:function(e,t,r){r.d(t,{K:function(){return n}});var i=r(75878),a=r(21217);function n(e){return(0,a.Z)("MuiMenuItem",e)}var s=(0,i.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.Z=s}}]);
//# sourceMappingURL=397.3717bc88.chunk.js.map