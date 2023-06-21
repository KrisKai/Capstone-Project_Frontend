"use strict";(self.webpackChunkjourney_sick=self.webpackChunkjourney_sick||[]).push([[668],{58668:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});var i=a(74165),r=a(15861),n=a(29439),s=a(89164),o=a(88588),c=a(30035),d=a(5849),l=a(45363),u=a(81153),m=a(62861),p=a(82626),g=a(84701),h=a(93006),v=a(4567),Z=a(71285),x=a(22339),y=a(72791),b=a(57689),f=a(75985),I=a(8007),j=a(80184);function C(){var e=(0,b.s0)(),t=(0,b.UO)().itemId,a=Boolean(t),C=(0,y.useState)({itemName:"",itemDescription:"",itemUsage:"",categoryId:"",priceMin:"",quantity:""}),k=(0,n.Z)(C,2),q=k[0],M=k[1],N=(0,y.useState)([{userId:"",email:"",fullname:""}]),w=(0,n.Z)(N,2),S=(w[0],w[1]),O=(0,y.useState)([{categoryId:"",categoryName:""}]),U=(0,n.Z)(O,2),D=U[0],P=U[1];function B(){e("/admin/itemList")}(0,y.useEffect)((function(){(0,r.Z)((0,i.Z)().mark((function a(){var r,n,s;return(0,i.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Z.BG.getAll({pageIndex:0,pageSize:99999999,userName:""});case 2:return r=a.sent,S(r.listOfUser),a.next=6,Z.OY.getAll({pageIndex:0,pageSize:99999999});case 6:if(n=a.sent,P(n.listOfCategory),t){a.next=10;break}return a.abrupt("return");case 10:return a.prev=10,a.next=13,Z.zg.getById(t);case 13:null!=(s=a.sent)&&""!=s?M(s):e("/admin/itemList"),a.next=21;break;case 17:a.prev=17,a.t0=a.catch(10),console.log("Failed to fetch item details",a.t0),401==a.t0.response.status&&(localStorage.removeItem("access_token"),e("/auth/login"));case 21:case"end":return a.stop()}}),a,null,[[10,17]])})))()}),[t]);var R=I.Ry().shape({itemName:I.Z_("Enter Item Name").required("Item Name is required"),itemDescription:I.Z_("Enter Item Description").required("Item Description is required"),categoryId:I.Z_("Choose Category").required("Category is required"),priceMin:I.Z_("Enter Price Min").required("Price Min is required"),quantity:I.Rx().min(1).required("Quantity is required")});return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(v.Z,{variant:"h4",gutterBottom:!0,color:"primary",children:a?"Update Item":"Create Item"}),(0,j.jsx)(s.Z,{children:(0,j.jsx)(x.J9,{initialValues:q,enableReinitialize:!0,validationSchema:R,onSubmit:function(){var t=(0,r.Z)((0,i.Z)().mark((function t(r,n){var s,o,c;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=n.setErrors,o=n.setStatus,t.prev=1,o({success:!1}),!a){t.next=9;break}return t.next=6,Z.zg.update(r);case 6:c=t.sent,t.next=12;break;case 9:return t.next=11,Z.zg.create(r);case 11:c=t.sent;case 12:t.t0=c.Code,t.next="G001"===t.t0?15:"U001"===t.t0?16:"I001"===t.t0?17:18;break;case 15:case 16:case 17:return t.abrupt("return",f.Am.error(c.Message));case 18:e("/admin/itemList"),a?f.Am.success("Update Item Successed!"):f.Am.success("Create Item Successed!");case 20:t.next=26;break;case 22:t.prev=22,t.t1=t.catch(1),o({success:!1}),s({submit:t.t1.message});case 26:case"end":return t.stop()}}),t,null,[[1,22]])})));return function(e,a){return t.apply(this,arguments)}}(),children:function(e){var t=e.errors,i=e.touched,r=e.handleChange,n=e.handleSubmit,s=e.values;e.setFieldValue;return(0,j.jsx)("form",{onSubmit:n,children:(0,j.jsx)(o.Z,{sx:{padding:8,gap:2},children:(0,j.jsxs)(u.ZP,{container:!0,spacing:3,children:[(0,j.jsxs)(u.ZP,{item:!0,xs:12,sm:6,children:[(0,j.jsx)(h.Z,{id:"itemName",name:"itemName",label:"Item Name *",fullWidth:!0,variant:"outlined",value:s.itemName,onChange:r,error:Boolean(i.itemName&&t.itemName)}),i.itemName&&t.itemName&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-text-ItemName",children:t.itemName})]}),(0,j.jsxs)(u.ZP,{item:!0,xs:12,sm:6,children:[(0,j.jsx)(h.Z,{id:"priceMin",name:"priceMin",label:"Price *",fullWidth:!0,variant:"outlined",value:s.priceMin,onChange:r,error:Boolean(i.priceMin&&t.priceMin)}),i.priceMin&&t.priceMin&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-text-PriceMin",children:t.priceMin})]}),(0,j.jsx)(u.ZP,{item:!0,xs:12,sm:6,children:(0,j.jsxs)(l.Z,{sx:{minWidth:530},children:[(0,j.jsx)(m.Z,{id:"categoryId",children:"Category *"}),(0,j.jsx)(g.Z,{labelId:"categoryId",id:"categoryId",value:s.categoryId,label:"Role",onChange:r,name:"categoryId",children:D.map((function(e){return(0,j.jsx)(p.Z,{value:e.categoryId,children:e.categoryName})}))}),i.categoryId&&t.categoryId&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-categoryId",children:t.categoryId})]})}),(0,j.jsxs)(u.ZP,{item:!0,xs:12,sm:6,children:[(0,j.jsx)(h.Z,{id:"quantity",name:"quantity",label:"Quantity *",type:"number",fullWidth:!0,variant:"outlined",value:s.quantity,onChange:r,error:Boolean(i.quantity&&t.quantity)}),i.quantity&&t.quantity&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-Quantity",children:t.quantity})]}),(0,j.jsxs)(u.ZP,{item:!0,xs:12,children:[(0,j.jsx)(h.Z,{id:"itemDescription",name:"itemDescription",label:"Item Description *",fullWidth:!0,autoComplete:"",variant:"outlined",multiline:!0,maxRows:4,value:s.itemDescription,onChange:r,error:Boolean(i.itemDescription&&t.itemDescription)}),i.itemDescription&&t.itemDescription&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-ItemDescription",children:t.itemDescription})]}),(0,j.jsxs)(u.ZP,{item:!0,xs:12,children:[(0,j.jsx)(h.Z,{id:"itemUsage",name:"itemUsage",label:"Item Usage",fullWidth:!0,variant:"outlined",multiline:!0,maxRows:4,value:s.itemUsage,onChange:r,error:Boolean(i.itemUsage&&t.itemUsage)}),i.itemUsage&&t.itemUsage&&(0,j.jsx)(c.Z,{error:!0,id:"standard-weight-helper-ItemUsage",children:t.itemUsage})]}),(0,j.jsx)(u.ZP,{item:!0,xs:12,sm:6,children:(0,j.jsx)(d.Z,{variant:"outlined",onClick:B,children:"Return to List"})}),(0,j.jsx)(u.ZP,{item:!0,xs:12,sm:6,textAlign:"right",children:(0,j.jsx)(d.Z,{type:"submit",variant:"contained",children:a?"Update":"Create"})})]})})})}})})]})}},82626:function(e,t,a){var i=a(4942),r=a(63366),n=a(87462),s=a(72791),o=a(28182),c=a(94419),d=a(12065),l=a(66934),u=a(31402),m=a(66199),p=a(53915),g=a(40162),h=a(42071),v=a(90133),Z=a(96014),x=a(29849),y=a(71498),b=a(80184),f=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],I=(0,l.ZP)(p.Z,{shouldForwardProp:function(e){return(0,l.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,r=e.ownerState;return(0,n.Z)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,i.Z)(t,"&.".concat(y.Z.selected),(0,i.Z)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(y.Z.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,d.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),(0,i.Z)(t,"&.".concat(y.Z.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,d.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),(0,i.Z)(t,"&.".concat(y.Z.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),(0,i.Z)(t,"&.".concat(y.Z.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),(0,i.Z)(t,"& + .".concat(v.Z.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),(0,i.Z)(t,"& + .".concat(v.Z.inset),{marginLeft:52}),(0,i.Z)(t,"& .".concat(x.Z.root),{marginTop:0,marginBottom:0}),(0,i.Z)(t,"& .".concat(x.Z.inset),{paddingLeft:36}),(0,i.Z)(t,"& .".concat(Z.Z.root),{minWidth:36}),t),!r.dense&&(0,i.Z)({},a.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,(0,i.Z)({},"& .".concat(Z.Z.root," svg"),{fontSize:"1.25rem"})))})),j=s.forwardRef((function(e,t){var a=(0,u.Z)({props:e,name:"MuiMenuItem"}),i=a.autoFocus,d=void 0!==i&&i,l=a.component,p=void 0===l?"li":l,v=a.dense,Z=void 0!==v&&v,x=a.divider,j=void 0!==x&&x,C=a.disableGutters,k=void 0!==C&&C,q=a.focusVisibleClassName,M=a.role,N=void 0===M?"menuitem":M,w=a.tabIndex,S=a.className,O=(0,r.Z)(a,f),U=s.useContext(m.Z),D=s.useMemo((function(){return{dense:Z||U.dense||!1,disableGutters:k}}),[U.dense,Z,k]),P=s.useRef(null);(0,g.Z)((function(){d&&P.current&&P.current.focus()}),[d]);var B,R=(0,n.Z)({},a,{dense:D.dense,divider:j,disableGutters:k}),F=function(e){var t=e.disabled,a=e.dense,i=e.divider,r=e.disableGutters,s=e.selected,o=e.classes,d={root:["root",a&&"dense",t&&"disabled",!r&&"gutters",i&&"divider",s&&"selected"]},l=(0,c.Z)(d,y.K,o);return(0,n.Z)({},o,l)}(a),G=(0,h.Z)(P,t);return a.disabled||(B=void 0!==w?w:-1),(0,b.jsx)(m.Z.Provider,{value:D,children:(0,b.jsx)(I,(0,n.Z)({ref:G,role:N,tabIndex:B,component:p,focusVisibleClassName:(0,o.Z)(F.focusVisible,q),className:(0,o.Z)(F.root,S)},O,{ownerState:R,classes:F}))})}));t.Z=j},71498:function(e,t,a){a.d(t,{K:function(){return n}});var i=a(75878),r=a(21217);function n(e){return(0,r.Z)("MuiMenuItem",e)}var s=(0,i.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.Z=s}}]);
//# sourceMappingURL=668.29418a07.chunk.js.map