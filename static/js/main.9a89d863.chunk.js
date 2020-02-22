(this.webpackJsonproadgame=this.webpackJsonproadgame||[]).push([[0],{14:function(e,t,a){e.exports=a(22)},19:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(7),i=a.n(s),o=(a(19),a(3)),u=a(2),c=a.n(u),l=a(5),m=a(8),f=a(9),d=a(12),h=a(10),S=a(1),v=a(13),b=a(4),p=a.n(b),y=function(e){var t=e.firstSquare,a=e.row,n=e.col,s=e.partOfRoad,i=e.handleClick,o=e.clickedRoad,u=e.missArray,c=e.index,l="".concat(a).concat(n),m=p()({square:!0,startSquare:t===l||s[s.length-1]===l,drawRoad:s.includes(l)&&s[s.length-1]!==l,hitSquare:o.filter((function(e){return e===l}))[0],missSquare:u.filter((function(e){return e===l}))[0]});return r.a.createElement("div",{className:m,onClick:function(e){return i(l,c,e)}})},g=function(e,t){return e.amountOfSquares*e.time+t},_=function(e){return e.slice(0,e.length)},k=function(e,t,a,n){for(var r=0;r<t.length;r++)if(t[r]==="".concat(a).concat(n)||e==="".concat(a).concat(n))return!0},O=a(11),q=function(e){var t=e.counterTime;console.log(t);var a=Object(n.useState)(t),s=Object(O.a)(a,2),i=s[0],o=s[1];return Object(n.useEffect)((function(){var e=i>0&&setInterval((function(){return o(i-1)}),1e3);return function(){return clearInterval(e)}}),[i]),r.a.createElement("span",{className:"game__parameter game__parameter--counter"},i,"s")},L=function(e){var t=e.handleClick,a=e.nameLevel,n=e.amountOfSquares,s=e.amountOfLives,i=e.time,o=e.counterTime;return r.a.createElement("button",{className:"game__level-button game__button",onClick:function(){return t(n,i,s,o)}},a)},B=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).drawFirstSquare=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.state.board,t=n[Math.round(9*Math.random())][Math.round(9*Math.random())],e.next=3,a.setState({firstSquare:t});case 3:return e.next=5,a.setRoad(a.state.firstSquare);case 5:case"end":return e.stop()}var n}),e)}))),a.setRoad=function(e){var t=[];a.setState({isBusyArray:!1});for(var n=0;n<a.state.amountOfSquares&&!a.state.isBusyArray;n++)a.setSingleSquare(t,e,n);a.state.isBusyArray||a.setState({road:t})},a.handleStart=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.setState({isStartButtonDisabled:!0,isWin:!1,isChangeLevelButtonDisabled:!0});case 2:return e.next=4,a.drawFirstSquare();case 4:return e.next=6,a.setCounter();case 6:return e.next=8,a.unlockSquares();case 8:return e.next=10,a.updateRoad();case 10:return e.next=12,a.hideRoad();case 12:case"end":return e.stop()}}),e)}))),a.setTimeBetweenDraw=function(e,t,n){setTimeout((function(){e.push(t),a.setState({partOfRoad:e})}),n)},a.checkRoad=function(e,t,n){n.preventDefault();var r=a.state,s=r.clickedRoad,i=r.missArray,u=r.road,c=r.areSquaresLocked,l=r.firstSquare,m=r.lastClickedIndex,f=r.isDeletingMiss,d=t.filter((function(e){return"number"==typeof e?e+1:null}))[0];c||s.includes(e)||i.includes(e)||e===l||f||(d==m?a.setState((function(t){return{lastClickedIndex:t.lastClickedIndex+1,clickedRoad:[].concat(Object(o.a)(t.clickedRoad),[e]),topBoxInformation:"Nice shot!",areSquaresLocked:!0}}),(function(){a.state.lastClickedIndex===u.length?a.winRound():a.deleteInformation()})):u.includes(e)&&d!=m?a.setState((function(t){return{miss:t.miss+1,missArray:[].concat(Object(o.a)(i),[e]),topBoxInformation:"Wrong order!",isDeletingMiss:!0,areSquaresLocked:!0}}),(function(){a.state.miss>=a.state.amountOfLives?a.gameOver():(a.deleteMiss(i),a.deleteInformation())})):a.setState((function(t){return{miss:t.miss+1,missArray:[].concat(Object(o.a)(i),[e]),topBoxInformation:"Miss!",areSquaresLocked:!0}}),(function(){a.state.miss>=a.state.amountOfLives?a.gameOver():a.deleteInformation()})))},a.setDifficultyLevel=function(e,t,n,r){a.setState({amountOfSquares:e,amountOfLives:n,time:t,counterTime:r,isStartLayerVisible:!1,isStartButtonDisabled:!1,isCounterVisible:!1}),a.cleanStateOfGame()},a.handleChangeLevel=function(){a.setState({isStartLayerVisible:!0,level:1,amountOfLives:15,miss:0,buttonCaption:"Start"}),a.cleanStateOfGame()},a.state={isChangeLevelButtonDisabled:!1,isStartLayerVisible:!0,isCounterVisible:!1,areSquaresLocked:!0,isStartButtonDisabled:!0,isDeletingMiss:!1,isBusyArray:!1,isGameOver:!1,isWinGame:!1,buttonCaption:"Start",topBoxInformation:"",lastClickedIndex:0,amountOfSquares:3,amountOfLives:15,firstSquare:null,dimension:10,time:500,level:1,miss:0,counterTime:5,clickedRoad:[],partOfRoad:[],missArray:[],busyArray:[],board:[],road:[]},a.handleStart=a.handleStart.bind(Object(S.a)(a)),a.checkRoad=a.checkRoad.bind(Object(S.a)(a)),a}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.setState({board:this.createBoard()})}},{key:"createBoard",value:function(){for(var e=[],t=0;t<this.state.dimension;t++){e[t]=[];for(var a=0;a<this.state.dimension;a++)e[t][a]="".concat(t).concat(a)}return e}},{key:"setBusyState",value:function(e){this.state.busyArray.includes(e)||this.setState({busyArray:[].concat(Object(o.a)(this.state.busyArray),[e])})}},{key:"setSingleSquare",value:function(e,t,a){if(this.state.busyArray.length>3)return this.setState({road:[],busyArray:[],isBusyArray:!0}),this.drawFirstSquare();var n,r,s=this.state.board,i=Math.round(3*Math.random());if(a<1?(n=+t.substr(0,1),r=+t.substr(1,1)):(n=+e[e.length-1].substr(0,1),r=+e[e.length-1].substr(1,1)),0===i){if(!(n-1>=0)||k(this.state.firstSquare,e,n-1,r))return this.setBusyState(i),this.setSingleSquare(e,t,a);t=s[n-1][r],e.push(t),this.setState({busyArray:[]})}else if(1===i){if(!(r+1<=9)||k(this.state.firstSquare,e,n,r+1))return this.setBusyState(i),this.setSingleSquare(e,t,a);t=s[n][r+1],e.push(t),this.setState({busyArray:[]})}else if(2===i){if(!(n+1<=9)||k(this.state.firstSquare,e,n+1,r))return this.setBusyState(i),this.setSingleSquare(e,t,a);t=s[n+1][r],e.push(t),this.setState({busyArray:[]})}else if(3===i){if(!(r-1>=0)||k(this.state.firstSquare,e,n,r-1))return this.setBusyState(i),this.setSingleSquare(e,t,a);t=s[n][r-1],e.push(t),this.setState({busyArray:[]})}}},{key:"unlockSquares",value:function(){var e=this,t=this.state,a=t.amountOfSquares,n=t.time,r=t.counterTime;setTimeout((function(){e.setState({areSquaresLocked:!1})}),g({amountOfSquares:a,time:n},1e3*r))}},{key:"updateRoad",value:function(){var e=this,t=this.state,a=t.road,n=t.board,r=t.time,s=[];n.map((function(t){t.map((function(t){if(t===a.filter((function(e){return e===t?t:null}))[0]){var n=function(e,t,a){return e.map((function(e,n){return e===t?(n+1)*a:null})).filter((function(e){return"number"===typeof e}))[0]}(a,t,r);e.setTimeBetweenDraw(s,t,n)}}))}))}},{key:"hideRoad",value:function(){var e=this,t=this.state,a=t.amountOfSquares,n=t.time,r=t.counterTime;setTimeout((function(){e.setState({partOfRoad:[],isCounterVisible:!1})}),g({amountOfSquares:a,time:n},1e3*r+500))}},{key:"gameOver",value:function(){var e=this;this.setState({areSquaresLocked:!0,isChangeLevelButtonDisabled:!0,isGameOver:!0}),setTimeout((function(){e.setState({isStartLayerVisible:!0,isChangeLevelButtonDisabled:!1,areSquaresLocked:!0,isGameOver:!1,buttonCaption:"Start",topBoxInformation:"",level:1,amountOfLives:15,miss:0}),e.cleanStateOfGame()}),4e3)}},{key:"winRound",value:function(){var e=this;setTimeout((function(){e.setState((function(e){return{level:e.level+1,amountOfSquares:e.amountOfSquares+2,topBoxInformation:""}}),(function(){10==e.state.level&&e.winGame()})),10!=e.state.level?(e.setState({areSquaresLocked:!0,buttonCaption:"Next level"}),e.cleanStateOfGame()):e.setState({areSquaresLocked:!0,buttonCaption:"Start"})}),1e3)}},{key:"winGame",value:function(){var e=this;this.setState({isWinGame:!0,isStartButtonDisabled:!0,isChangeLevelButtonDisabled:!0}),setTimeout((function(){e.setState({areSquaresLocked:!0,isWinGame:!1,buttonCaption:"Start",topBoxInformation:"",level:1,amountOfLives:15,miss:0,isStartLayerVisible:!0,isChangeLevelButtonDisabled:!1}),e.cleanStateOfGame()}),4e3)}},{key:"cleanStateOfGame",value:function(){this.setState({missArray:[],road:[],clickedRoad:[],partOfRoad:[],firstSquare:null,areSquaresLocked:!0,isStartButtonDisabled:!1,lastClickedIndex:0})}},{key:"deleteInformation",value:function(){var e=this;setTimeout((function(){e.setState({topBoxInformation:"",areSquaresLocked:!1})}),500)}},{key:"deleteMiss",value:function(e){var t=this;setTimeout((function(){t.setState({missArray:_(e),isDeletingMiss:!1})}),500)}},{key:"setCounter",value:function(){var e=this,t=this.state,a=t.amountOfSquares,n=t.time;setTimeout((function(){e.setState({isCounterVisible:!0,isChangeLevelButtonDisabled:!1})}),g({amountOfSquares:a,time:n},0))}},{key:"renderBoard",value:function(){var e=this,t=this.state,a=t.firstSquare,n=t.board,s=t.partOfRoad,i=t.clickedRoad,o=t.missArray,u=t.road;return n.map((function(t,n){return t.map((function(t,c){return r.a.createElement(y,{firstSquare:a===t?a:null,partOfRoad:s,clickedRoad:i,missArray:o,key:"".concat(n).concat(c),row:n,col:c,handleClick:e.checkRoad,index:u.map((function(e,a){return e===t?a:null}))})}))}))}},{key:"render",value:function(){var e=this.state,t=e.isStartButtonDisabled,a=e.buttonCaption,n=e.miss,s=e.level,i=e.isCounterVisible,o=e.topBoxInformation,u=e.isGameOver,c=e.isWinGame,l=e.amountOfLives,m=e.isStartLayerVisible,f=e.isChangeLevelButtonDisabled,d=e.counterTime,h=p()({"game__information game__information--correct":"Nice shot!"==this.state.topBoxInformation,"game__information game__information--wrong":"Wrong order!"==this.state.topBoxInformation,"game__information game__information--miss":"Miss!"==this.state.topBoxInformation,"game__information game__information--none":""==this.state.topBoxInformation});return r.a.createElement("div",{className:"game"},m?r.a.createElement("div",{className:"game__start-layer"},r.a.createElement("div",null,r.a.createElement("h1",{className:"game__title"},"Road Game"),r.a.createElement("p",{className:"game__subtitle"},"Chose your path or die!")),r.a.createElement("div",{className:"game__button-box"},r.a.createElement(L,{handleClick:this.setDifficultyLevel,nameLevel:"Easy",amountOfSquares:3,time:1500,amountOfLives:15,counterTime:6}),r.a.createElement(L,{handleClick:this.setDifficultyLevel,nameLevel:"Normal",amountOfSquares:6,time:1e3,amountOfLives:10,counterTime:4}),r.a.createElement(L,{handleClick:this.setDifficultyLevel,nameLevel:"Expert",amountOfSquares:9,time:500,amountOfLives:5,counterTime:2}))):r.a.createElement("div",{className:"game__board-layer"},r.a.createElement("div",{className:"game__board-wrapper"},r.a.createElement("div",{className:"game__top-box"},r.a.createElement("span",{className:"game__parameter"},"Board ",s),!!i&&r.a.createElement(q,{counterTime:d}),r.a.createElement("span",{className:h}," ",o),r.a.createElement("span",{className:"game__parameter"},"\u2764 ",l-n," ")),r.a.createElement("div",{className:"game__board"},r.a.createElement("span",{className:u?"board__gameOver-caption":"board__gameOver-caption--none"}),r.a.createElement("span",{className:c?"board__winGame-caption":"board__winGame-caption--none"}),this.renderBoard())),r.a.createElement("div",{className:"game__button-box game__button-box--board"},r.a.createElement("button",{className:t?"game__button game__button--disabled":"game__button",disabled:t,onClick:this.handleStart},a),r.a.createElement("button",{className:f?"game__button game__button--disabled":"game__button",onClick:this.handleChangeLevel,disabled:f},"Change level"))))}}]),t}(r.a.Component);a(21);var C=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(B,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.9a89d863.chunk.js.map