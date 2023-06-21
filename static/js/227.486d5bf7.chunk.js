"use strict";(self.webpackChunkjourney_sick=self.webpackChunkjourney_sick||[]).push([[227],{227:function(e,t,a){a.r(t),a.d(t,{default:function(){return B}});var i=a(1413),r=a(74165),n=a(15861),s=a(4942),o=a(29439),d=a(4567),c=a(88588),l=a(64554),m=a(30035),u=a(5849),p=a(45363),h=a(81153),Z=a(62861),x=a(82626),v=a(84701),g=a(93006),b=a(7792),f=a(60222),j=a(71652),S=a(71285),T=a(97892),E=a.n(T),L=a(83027),N=a.n(L),D=a(22339),y=a(27169),C=a(72791),P=a(57689),I=a(75985),k=a(8007),w=a(80184);function B(){var e,t=(0,P.s0)(),a=(0,P.UO)().tripId,T=Boolean(a),L=(0,C.useState)((e={tripName:"",tripDescription:"",estimateStartDate:"",estimateEndDate:"",estimateStartTime:"",estimateEndTime:"",tripPresenter:"",startLocationName:"",endLocationName:""},(0,s.Z)(e,"startLocationName",""),(0,s.Z)(e,"startLatitude",""),(0,s.Z)(e,"startLongitude",""),(0,s.Z)(e,"endLocationName",""),(0,s.Z)(e,"endLatitude",""),(0,s.Z)(e,"endLongitude",""),(0,s.Z)(e,"distance",""),(0,s.Z)(e,"tripStatus","ACTIVE"),(0,s.Z)(e,"tripId",""),e)),N=(0,o.Z)(L,2),B=N[0],O=N[1],q=(0,C.useState)([{userId:"",email:"",fullname:""}]),M=(0,o.Z)(q,2),F=M[0],A=M[1];function V(){t("/admin/tripList")}(0,C.useEffect)((function(){(0,n.Z)((0,r.Z)().mark((function e(){var i,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.BG.getAll({pageIndex:0,pageSize:99999999,userName:""});case 2:if(i=e.sent,A(i.listOfUser),a){e.next=6;break}return e.abrupt("return");case 6:return e.prev=6,e.next=9,S.YO.getById(a);case 9:null!=(n=e.sent)&&""!=n?(n.estimateEndDate=E().utc(n.estimateEndDate),n.estimateStartDate=E().utc(n.estimateStartDate),O(n)):t("/admin/tripList"),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(6),console.log("Failed to fetch trip details",e.t0),401==e.t0.response.status&&(localStorage.removeItem("access_token"),t("/auth/login"));case 17:case"end":return e.stop()}}),e,null,[[6,13]])})))()}),[]);for(var W=function(e){O((0,i.Z)((0,i.Z)({},B),{},{distance:e.distance.toString(),endLatitude:e.endLatitude.toString(),endLocationName:e.endLocationName,endLongitude:e.endLongitude.toString(),startLatitude:e.startLatitude.toString(),startLocationName:e.startLocationName,startLongitude:e.startLongitude.toString()}))},_=k.Ry().shape({tripName:k.Z_("Enter Trip Name").required("Trip Name is required"),tripDescription:k.Z_("Enter Trip Description").required("Trip Description is required"),estimateStartDate:k.Z_("Enter Estimate Start Time").required("Estimate Start Time is required"),estimateEndDate:k.Z_("Enter Estimate End Time").required("Estimate End Time is required"),tripPresenter:k.Z_("Enter Trip Presenter").required("Trip Presenter is required")}),G=[],R=0;R<24;R++)G.push(R);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(d.Z,{variant:"h4",gutterBottom:!0,color:"primary",children:T?"Update Trip":"Create Trip"}),(0,w.jsx)(D.J9,{initialValues:B,enableReinitialize:!0,validationSchema:_,onSubmit:function(){var e=(0,n.Z)((0,r.Z)().mark((function e(a,i){var n,s,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.setErrors,s=i.setStatus,e.prev=1,s({success:!1}),!T){e.next=9;break}return e.next=6,S.YO.update(a);case 6:o=e.sent,e.next=12;break;case 9:return e.next=11,S.YO.create(a);case 11:o=e.sent;case 12:e.t0=o.Code,e.next="G001"===e.t0?15:"U001"===e.t0?16:"I001"===e.t0?17:18;break;case 15:case 16:case 17:return e.abrupt("return",I.Am.error(o.Message));case 18:t("/admin/tripList"),T?I.Am.success("Update Trip Successed!"):I.Am.success("Create Trip Successed!");case 20:e.next=26;break;case 22:e.prev=22,e.t1=e.catch(1),s({success:!1}),n({submit:e.t1.message});case 26:case"end":return e.stop()}}),e,null,[[1,22]])})));return function(t,a){return e.apply(this,arguments)}}(),children:function(e){var t=e.errors,a=e.touched,i=e.handleChange,r=e.handleSubmit,n=e.values,s=e.setFieldValue;return(0,w.jsxs)("form",{onSubmit:r,children:[(0,w.jsxs)(h.ZP,{container:!0,children:[(0,w.jsx)(h.ZP,{item:!0,xs:12,sm:3,children:(0,w.jsxs)(c.Z,{sx:{padding:2,gap:2},children:[(0,w.jsx)(l.Z,{paddingBottom:2,children:(0,w.jsx)(d.Z,{variant:"h5",children:"Basic Information"})}),(0,w.jsxs)(h.ZP,{container:!0,spacing:3,children:[(0,w.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,w.jsx)(g.Z,{id:"tripName",name:"tripName",label:"Trip Name",fullWidth:!0,variant:"outlined",value:n.tripName,onChange:i,error:Boolean(a.tripName&&t.tripName)}),a.tripName&&t.tripName&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-text-TripName",children:t.tripName})]}),(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsxs)(p.Z,{sx:{minWidth:"100%"},children:[(0,w.jsx)(Z.Z,{id:"TripPresenter",children:"Trip Presenter"}),(0,w.jsx)(v.Z,{labelId:"TripPresenter",id:"tripPresenter",value:n.tripPresenter,label:"TripPresenter",onChange:i,name:"tripPresenter",children:F.map((function(e){return(0,w.jsxs)(x.Z,{value:e.userId,children:[e.fullname," (",e.email,")"]})}))}),a.tripPresenter&&t.tripPresenter&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-TripPresenter",children:t.tripPresenter})]})}),(0,w.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,w.jsx)(g.Z,{id:"tripDescription",name:"tripDescription",label:"Trip Description",fullWidth:!0,autoComplete:"",variant:"outlined",value:n.tripDescription,onChange:i,error:Boolean(a.tripDescription&&t.tripDescription)}),a.tripDescription&&t.tripDescription&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-TripDescription",children:t.tripDescription})]}),(0,w.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,w.jsx)(j._,{dateAdapter:b.y,dateLibInstance:E().utc,children:(0,w.jsx)(f.M,{required:!0,sx:{"& .MuiInputBase-root":{paddingY:1,paddingX:3},"& .MuiFormLabel-root":{paddingY:1}},label:"Estimate Start Date",id:"estimateStartDate",name:"estimateStartDate",fullWidth:!0,value:n.estimateStartDate,onChange:function(e){s("estimateStartDate",e)},error:Boolean(a.estimateStartDate&&t.estimateStartDate)})}),a.estimateStartDate&&t.estimateStartDate&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-EstimateStartDate",children:t.estimateStartDate})]}),(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsxs)(p.Z,{sx:{minWidth:250},children:[(0,w.jsx)(Z.Z,{id:"EstimateStartTime",children:"Estimate Start Time"}),(0,w.jsx)(v.Z,{labelId:"EstimateStartTime",id:"estimateStartTime",value:n.estimateStartTime,label:"EstimateStartTime",onChange:i,name:"estimateStartTime",children:G.map((function(e){return(0,w.jsx)(x.Z,{value:e,children:e})}))}),a.estimateStartTime&&t.estimateStartTime&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-EstimateStartTime",children:t.estimateStartTime})]})}),(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsxs)(j._,{dateAdapter:b.y,dateLibInstance:E().utc,children:[(0,w.jsx)(f.M,{required:!0,sx:{"& .MuiInputBase-root":{paddingY:1,paddingX:3},"& .MuiFormLabel-root":{paddingY:1}},id:"estimateEndDate",name:"estimateEndDate",label:"Estimate End Date",fullWidth:!0,value:n.estimateEndDate,onChange:function(e){return s("estimateEndDate",e)},error:Boolean(a.estimateEndDate&&t.estimateEndDate)}),a.estimateEndDate&&t.estimateEndDate&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-estimateEndDate",children:t.estimateEndDate})]})}),(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsxs)(p.Z,{sx:{minWidth:250},children:[(0,w.jsx)(Z.Z,{id:"EstimateEndTime",children:"Estimate End Time"}),(0,w.jsx)(v.Z,{labelId:"EstimateEndTime",id:"estimateEndTime",value:n.estimateEndTime,label:"estimateEndTime",onChange:i,name:"estimateEndTime",children:G.map((function(e){return(0,w.jsx)(x.Z,{value:e,children:e})}))}),a.estimateEndTime&&t.estimateEndTime&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-EstimateEndTime",children:t.estimateEndTime})]})}),T?(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsxs)(p.Z,{sx:{mt:1,minWidth:200},children:[(0,w.jsx)(Z.Z,{id:"TripStatus",children:"Status"}),(0,w.jsxs)(v.Z,{labelId:"TripStatus",id:"tripStatus",value:n.tripStatus,label:"TripStatus",onChange:i,name:"TripStatus",children:[(0,w.jsx)(x.Z,{value:"ACTIVE",children:"Active"}),(0,w.jsx)(x.Z,{value:"INACTIVE",children:"Inactive"}),(0,w.jsx)(x.Z,{value:"BANNED",children:"Banned"})]}),a.tripStatus&&t.tripStatus&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-TripStatus",children:t.tripStatus})]})}):(0,w.jsx)(w.Fragment,{}),(0,w.jsx)(h.ZP,{item:!0,xs:12,children:(0,w.jsx)(d.Z,{variant:"h5",children:"Location Information"})}),(0,w.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,w.jsx)(g.Z,{id:"startLocationName",name:"startLocationName",label:"Trip Start Location Name",fullWidth:!0,variant:"outlined",value:n.startLocationName,onChange:i,InputProps:{readOnly:!0},error:Boolean(a.startLocationName&&t.startLocationName)}),a.startLocationName&&t.startLocationName&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-StartLocationName",children:t.startLocationName})]}),(0,w.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,w.jsx)(g.Z,{id:"endLocationName",name:"endLocationName",label:"Trip Destination Location Name",fullWidth:!0,variant:"outlined",value:n.endLocationName,onChange:i,InputProps:{readOnly:!0},error:Boolean(a.endLocationName&&t.endLocationName)}),a.endLocationName&&t.endLocationName&&(0,w.jsx)(m.Z,{error:!0,id:"standard-weight-helper-EndLocationName",children:t.endLocationName})]})]})]})}),(0,w.jsx)(h.ZP,{item:!0,xs:12,sm:9,paddingLeft:1,children:(0,w.jsx)(y.Z,{getReturnData:W,passToProps:B})})]}),(0,w.jsxs)(h.ZP,{container:!0,marginTop:2,children:[(0,w.jsx)(h.ZP,{item:!0,xs:6,children:(0,w.jsx)(u.Z,{variant:"outlined",onClick:V,children:"Return to List"})}),(0,w.jsx)(h.ZP,{item:!0,xs:6,textAlign:"right",children:(0,w.jsx)(u.Z,{type:"submit",variant:"contained",children:T?"Update":"Create"})})]})]})}})]})}E().extend(N())},82626:function(e,t,a){var i=a(4942),r=a(63366),n=a(87462),s=a(72791),o=a(28182),d=a(94419),c=a(12065),l=a(66934),m=a(31402),u=a(66199),p=a(53915),h=a(40162),Z=a(42071),x=a(90133),v=a(96014),g=a(29849),b=a(71498),f=a(80184),j=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],S=(0,l.ZP)(p.Z,{shouldForwardProp:function(e){return(0,l.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,r=e.ownerState;return(0,n.Z)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,i.Z)(t,"&.".concat(b.Z.selected),(0,i.Z)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(b.Z.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),(0,i.Z)(t,"&.".concat(b.Z.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),(0,i.Z)(t,"&.".concat(b.Z.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),(0,i.Z)(t,"&.".concat(b.Z.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),(0,i.Z)(t,"& + .".concat(x.Z.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),(0,i.Z)(t,"& + .".concat(x.Z.inset),{marginLeft:52}),(0,i.Z)(t,"& .".concat(g.Z.root),{marginTop:0,marginBottom:0}),(0,i.Z)(t,"& .".concat(g.Z.inset),{paddingLeft:36}),(0,i.Z)(t,"& .".concat(v.Z.root),{minWidth:36}),t),!r.dense&&(0,i.Z)({},a.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,(0,i.Z)({},"& .".concat(v.Z.root," svg"),{fontSize:"1.25rem"})))})),T=s.forwardRef((function(e,t){var a=(0,m.Z)({props:e,name:"MuiMenuItem"}),i=a.autoFocus,c=void 0!==i&&i,l=a.component,p=void 0===l?"li":l,x=a.dense,v=void 0!==x&&x,g=a.divider,T=void 0!==g&&g,E=a.disableGutters,L=void 0!==E&&E,N=a.focusVisibleClassName,D=a.role,y=void 0===D?"menuitem":D,C=a.tabIndex,P=a.className,I=(0,r.Z)(a,j),k=s.useContext(u.Z),w=s.useMemo((function(){return{dense:v||k.dense||!1,disableGutters:L}}),[k.dense,v,L]),B=s.useRef(null);(0,h.Z)((function(){c&&B.current&&B.current.focus()}),[c]);var O,q=(0,n.Z)({},a,{dense:w.dense,divider:T,disableGutters:L}),M=function(e){var t=e.disabled,a=e.dense,i=e.divider,r=e.disableGutters,s=e.selected,o=e.classes,c={root:["root",a&&"dense",t&&"disabled",!r&&"gutters",i&&"divider",s&&"selected"]},l=(0,d.Z)(c,b.K,o);return(0,n.Z)({},o,l)}(a),F=(0,Z.Z)(B,t);return a.disabled||(O=void 0!==C?C:-1),(0,f.jsx)(u.Z.Provider,{value:w,children:(0,f.jsx)(S,(0,n.Z)({ref:F,role:y,tabIndex:O,component:p,focusVisibleClassName:(0,o.Z)(M.focusVisible,N),className:(0,o.Z)(M.root,P)},I,{ownerState:q,classes:M}))})}));t.Z=T},71498:function(e,t,a){a.d(t,{K:function(){return n}});var i=a(75878),r=a(21217);function n(e){return(0,r.Z)("MuiMenuItem",e)}var s=(0,i.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.Z=s}}]);
//# sourceMappingURL=227.486d5bf7.chunk.js.map