(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var c=t(17),a=t.n(c),r=t(8),u=t(3),i=t(1),o=t(0),d=function(e){var n=e.handleChange,t=e.value;return Object(o.jsxs)("div",{children:["Filter names: ",Object(o.jsx)("input",{onChange:n,value:t})]})},l=function(e){var n=e.id,t=e.name,c=e.number,a=e.handleDelete;return Object(o.jsxs)("p",{children:[t," ",c," ",Object(o.jsx)("button",{onClick:function(){return a(n)},children:"delete"})]})},s=function(e){var n=e.persons,t=e.filter,c=e.handleDelete,a=n.map((function(e){return Object(o.jsx)(l,{id:e.id,name:e.name,number:e.number,handleDelete:c},e.id)}));return""===t?a:a.filter((function(e){return e.props.name.toLowerCase().includes(t.toLowerCase())}))},b=function(e){var n=e.handleSubmit,t=e.handleChange,c=e.handleNumberChange;return Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{onChange:t})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{onChange:c})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},j=t(4),f=t.n(j),h="/api/persons",m={getAll:function(){return f.a.get(h).then((function(e){return e.data}))},add:function(e){return f.a.post(h,e).then((function(e){return e.data}))},remove:function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(n){return e}))},update:function(e){return f.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))}},O=function(e){var n=e.message,t=e.success;if(null===t)return null;var c=!0===t?"green":"red",a={color:c,background:"lightgray",border:"solid 2px ".concat(c),padding:5,margin:"20px 0",width:"fit-content",borderRadius:5};return null===n?null:Object(o.jsx)("div",{style:a,children:n})},g=function(){var e=Object(i.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(i.useState)(""),l=Object(u.a)(a,2),j=l[0],f=l[1],h=Object(i.useState)(""),g=Object(u.a)(h,2),p=g[0],v=g[1],x=Object(i.useState)(""),C=Object(u.a)(x,2),w=C[0],S=C[1],D=Object(i.useState)(""),k=Object(u.a)(D,2),y=k[0],A=k[1],N=Object(i.useState)(null),E=Object(u.a)(N,2),J=E[0],L=E[1];Object(i.useEffect)((function(){m.getAll().then((function(e){c(e)})).catch((function(e){return console.log(e)}))}),[]);var R=function(e,n){L(e),A(n),setTimeout((function(){L(null),A("")}),5e3)};return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:"Phonebook"}),Object(o.jsx)(O,{message:y,success:J}),Object(o.jsx)(d,{handleChange:function(e){S(e.target.value)},value:w}),Object(o.jsx)("h2",{children:"Add new"}),Object(o.jsx)(b,{handleSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===j}));if(n){if(!window.confirm("Update number for ".concat(n.name,"?")))return;m.update(Object(r.a)(Object(r.a)({},n),{},{number:p})).then((function(n){c(t.map((function(e){return e.id!==n.id?e:n}))),R(!0,"Updated contact ".concat(n.name)),f(""),v(""),e.target.reset()})).catch((function(a){c(t.filter((function(e){return e.id!==n.id}))),R(!1,"Contact ".concat(n.name," was already deleted from database, updating list...")),f(""),v(""),e.target.reset()}))}else{var a={name:j,number:p};m.add(a).then((function(n){c(t.concat(n)),R(!0,"Added new contact: ".concat(n.name)),f(""),v(""),e.target.reset()})).catch((function(e){return console.log(e)}))}},handleChange:function(e){var n=e.target.value;f(n)},handleNumberChange:function(e){var n=e.target.value;v(n)}}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(s,{persons:t,filter:w,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&m.remove(e).then((function(e){c(t.filter((function(n){return n.id!==e}))),R(!0,"Removed contact: ".concat(n.name))})).catch((function(e){console.log(e)}))}})]})};a.a.render(Object(o.jsx)(g,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.fb93d921.chunk.js.map