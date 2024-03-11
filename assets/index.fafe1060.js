import{d as e,j as t,k as a,p as n,b as l,o,e as s,f as i,t as d,h as r,l as u,m as c,c as m,F as p,n as v,q as h,g as f,_ as y,r as b,s as D,w as x}from"./index.3cf4fa6d.js";import{l as T}from"./lodash.8d669c98.js";import"./vendor.1da3d560.js";var g=e({components:{},props:{expend:{type:Number,required:!0,default:0},income:{type:Number,required:!0,default:0},curMonth:{type:Date,default:null,required:!0}},setup:e=>({month:t((()=>a().isSame(e.curMonth,"month")?"当":a(e.curMonth).month()+1))})});const k=r("data-v-4368db0d");n("data-v-4368db0d");const w={class:"dash-board"},M={class:"expend"},_={class:"income"};l();const B=k(((e,t,a,n,l,r)=>(o(),s("div",w,[i("h2",null,d(e.month)+"月支出",1),i("span",M,"-"+d(e.expend),1),i("h3",null,[i("span",null,d(e.month)+"月收入",1),i("span",_,"+"+d(e.income),1)])]))));g.render=B,g.__scopeId="data-v-4368db0d";var A=e({props:{listData:{type:Array,default:null}},components:{},setup(e,t){let n={},l=u([]);c((()=>{var t;if(n={},l.value=[],null==(t=e.listData)?void 0:t.length){const t=T.cloneDeep(e.listData);t.sort(((e,t)=>e.createdAt>t.createdAt?-1:e.createdAt<t.createdAt?1:0)),t.forEach((e=>{const t=a(e.createdAt).format("YYYYMMDD");n[t]?n[t].push(e):n[t]=[e]})),l.value=Object.keys(n).sort(((e,t)=>{const a=Number(e),n=Number(t);return a>n?-1:a<n?1:0})).map((e=>n[e]))}}));const o=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],s=u(!1);return{noBills:"assets/noBills.a90ca5ee.png",result:l,groupTime:e=>a(e).format("MM月DD日")+" "+o[a(e).day()],dailyBalance:e=>{let t=0,a=0,n="";return e.forEach((e=>{"expend"===e.type?t+=e.value:a+=e.value})),a&&(n+=`收入：${a}`),a&&t&&(n+="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"),t&&(n+=`支出：${t}`),n},isExpend:e=>"expend"===e,handleClick:()=>{s.value=!0},moneyPannelVisible:s}}});const C=r("data-v-31304cc9");n("data-v-31304cc9");const V={key:0,class:"bill-list"},L={class:"bill-item"},S={class:"icon-title-wrap"},Y=f(" 一笔流水都没有，赶快"),O=f("记一笔"),E=f("吧~ ");l();const P=C(((e,t,a,n,l,r)=>{var u;const c=m("van-divider"),f=m("svg-icon"),y=m("router-link"),b=m("i-button"),D=m("money-pannel"),x=m("van-empty");return(null==(u=e.result)?void 0:u.length)?(o(),s("div",V,[(o(!0),s(p,null,v(e.result,((t,a)=>(o(),s("ul",{key:a},[i("p",null,[i("span",null,d(e.groupTime(t[0].createdAt)),1),i("span",{innerHTML:e.dailyBalance(t)},null,8,["innerHTML"])]),i(c),(o(!0),s(p,null,v(t,((a,n)=>(o(),s("li",{key:a.createdAt},[i(y,{to:`/billList/detail/${a.id}?from=billList`},{default:C((()=>[i("div",L,[i("div",S,[i(f,{name:a.tag.icon},null,8,["name"]),i("span",null,d(a.tag.name),1)]),i("span",{class:[e.isExpend(a.type)?"expend-color":"income-color"]},d(`${"expend"===a.type?"-":"+"}${a.value}`),3)])])),_:2},1032,["to"]),t[n+1]?(o(),s(c,{key:0,style:{padding:"4px 32px"}})):h("",!0)])))),128))])))),128))])):(o(),s(x,{key:1,class:"custom-image",image:e.noBills},{description:C((()=>[Y,i(b,{onClick:e.handleClick},{default:C((()=>[O])),_:1},8,["onClick"]),E])),default:C((()=>[i(D,{show:e.moneyPannelVisible,"onUpdate:show":t[1]||(t[1]=t=>e.moneyPannelVisible=t)},null,8,["show"])])),_:1},8,["image"]))}));A.render=P,A.__scopeId="data-v-31304cc9";var j=e({components:{DashBoard:g,DatePicker:y,BillList:A},setup(){const e=u(null),n=u(0),l=u(0),o=u([]),s=new Date,i=u(s),d=u(s),r=t((()=>a(i.value).format("YYYY-MM"))),c=u(null),m=u(0),p=b({minDate:null,maxDate:null});D.getTimeSlot().then((e=>{p.minDate=e.minDate,p.maxDate=e.maxDate}));const v=(e,t)=>{const s=a(e).startOf("month").valueOf(),i=a(e).endOf("month").valueOf();D.getListByTimeSlot({startTime:s,endTime:i,listType:t}).then((e=>{o.value=e})),D.getBalanceByTimeSlot({startTime:s,endTime:i}).then((e=>{const{expend:t,income:a}=e;n.value=t,l.value=a}))};v(i.value,m.value);return x(m,(e=>{v(i.value,e)})),{monthlyExpend:n,monthlyIncome:l,timeValue:i,formattedDate:r,datePickerDropdown:e,handleConfirm:t=>{t&&(v(t,m.value),d.value=t),e.value.toggle()},curType:m,listTypeOptions:[{text:"全部",value:0},{text:"支出",value:1},{text:"收入",value:2}],dashBoardMonth:d,detailList:o,listContainer:c,wholeTimeSlot:p}}});const I=r("data-v-ea3eed26");n("data-v-ea3eed26");const $={class:"home-main-wrap"},q={class:"list-wrap"};l();const N=I(((e,t,a,n,l,d)=>{const r=m("van-nav-bar"),u=m("dash-board"),c=m("date-picker"),p=m("van-dropdown-item"),v=m("van-dropdown-menu"),h=m("van-sticky"),f=m("bill-list"),y=m("i-tabbar"),b=m("i-layout");return o(),s(b,null,{header:I((()=>[i(r,{title:"iAccounts"})])),main:I((()=>[i("div",$,[i(u,{curMonth:e.dashBoardMonth,expend:e.monthlyExpend,income:e.monthlyIncome},null,8,["curMonth","expend","income"]),i(h,{"offset-top":45},{default:I((()=>[i(v,null,{default:I((()=>[i(p,{ref:"datePickerDropdown",title:e.formattedDate},{default:I((()=>[i(c,{title:"选择年月","time-value":e.timeValue,"onUpdate:time-value":t[1]||(t[1]=t=>e.timeValue=t),onDateConfirm:e.handleConfirm,wholeTimeSlot:e.wholeTimeSlot},null,8,["time-value","onDateConfirm","wholeTimeSlot"])])),_:1},8,["title"]),i(p,{modelValue:e.curType,"onUpdate:modelValue":t[2]||(t[2]=t=>e.curType=t),options:e.listTypeOptions},null,8,["modelValue","options"])])),_:1})])),_:1}),i("div",q,[i(f,{listData:e.detailList},null,8,["listData"])])])])),footer:I((()=>[i(y)])),_:1})}));j.render=N,j.__scopeId="data-v-ea3eed26";export default j;
