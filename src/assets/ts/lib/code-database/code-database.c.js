

bundler.define("code-database/0",[],function(e,n){}),bundler.define("code-database/1",[],function(e,n){function r(e,n){return{not:()=>{return u(e,()=>!1,n)}}}function u(o,d,i){return{where:e=>{{var t=o,r=e,u=d;e=i;let n=[];for(let e=0;e<t.length;e++){var a=t[e];r(a,e)==u(a,e)&&n.push(a)}return{...f(e(n))}}},until:e=>{{var t=o,r=e,u=d;e=i;let n=[];for(let e=0;e<t.length;e++){var a=t[e];if(r(a,e)==u(a,e))break;n.push(a)}return f(e(n))}}}}function f(e){return{toList:()=>[e],get:()=>e}}e.select=function(e){return e=e.slice(),t=e,{first:()=>{var e=t,n=e=>e.shift();return{...r(e,n),...u(e,()=>!0,n),...f(e.shift())}},all:()=>{var e=t,n=e=>e;return{...r(e,n),...u(e,()=>!0,n),...f(e)}},last:()=>{var e=t,n=e=>e.pop();return{...r(e,n),...u(e,()=>!0,n),...f(e.pop())}}};var t}}),bundler.define("code-database/2",[],function(e,n){class t extends HTMLElement{constructor(e,n){super(),customElements.define(e,n)}}e.CostumeElements=t}),bundler.define("code-database/3",[],function(e,n){function t(e){return e%1==0}e.rand=function(e,n){return Math.floor(Math.random()*(n-e))+n},e.randF=function(e,n){return Math.floor(Math.random()*(n-e))+n},e.isInt=t,e.isFloat=function(e){return!t(e)}}),bundler.load("code-database/1");

