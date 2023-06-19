(function(){"use strict";var x={6099:function(x,e,t){var i=t(9242),a=t(3396),s=t(7139);const n={class:"main"},o={class:"topArea"},l={class:"left"},r={class:"right"},h={class:"bottomArea"};function d(x,e,t,i,d,c){const p=(0,a.up)("LifePanel"),u=(0,a.up)("ScoreBoard"),f=(0,a.up)("GameField"),g=(0,a.up)("Popup");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",n,[(0,a._)("div",o,[(0,a._)("div",l,[(0,a.Wm)(p,{ref:"lifePanel"},null,512),(0,a.Wm)(u,{ref:"scoreBoard"},null,512)]),(0,a._)("div",r,[(0,a._)("div",{class:(0,s.C_)({sound:!0,mute:d.mute}),title:"Sound setting",onClick:e[0]||(e[0]=(...x)=>c.toggleSound&&c.toggleSound(...x))},null,2),(0,a._)("div",{class:"gameConfig",title:"Game settings",onClick:e[1]||(e[1]=(...x)=>c.showGameSettingPopup&&c.showGameSettingPopup(...x))},"⚙️")])]),(0,a._)("div",h,[(0,a.Wm)(f,{ref:"GameField",width:d.fieldWidth,height:d.fieldHeight},null,8,["width","height"])])]),(0,a.Wm)(g,{ref:"popupLayer1",callbacks:x.popupCallbacks,closeCallback:x.popupCloseCallback,otherCallback:x.popupOtherCallback},null,8,["callbacks","closeCallback","otherCallback"]),(0,a.Wm)(g,{ref:"popupLayer2",callbacks:x.popupCallbacks,closeCallback:x.popupCloseCallback,otherCallback:null},null,8,["callbacks","closeCallback"])],64)}const c={ref:"tmpGameField",class:"gameField"},p=["color-scheme"],u=["row-number"];function f(x,e,t,n,o,l){const r=(0,a.up)("Brick"),h=(0,a.up)("Ball"),d=(0,a.up)("Paddle");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.wy)((0,a._)("div",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.words,((x,e)=>((0,a.wg)(),(0,a.iD)("span",{class:"tmpBrick",key:e},(0,s.zw)(x),1)))),128))],512),[[i.F8,!o.reArranged]]),(0,a.wy)((0,a._)("div",{ref:"gameField",class:(0,s.C_)({gameField:!0,hideContent:o.hideBrickContent}),"color-scheme":o.colorScheme,onMousemove:e[0]||(e[0]=x=>this.$refs.paddle.move(x)),onClick:e[1]||(e[1]=x=>l.shotBalls(x))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.wordsArranged,((x,e)=>((0,a.wg)(),(0,a.iD)("div",{class:"brickRow",key:e,"row-number":e,style:(0,s.j5)({height:x.prop.height+"px"})},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(x.children,(x=>((0,a.wg)(),(0,a.j4)(r,{ref_for:!0,ref:"brick",key:x.index,healthPoint:x.hp,content:x.content,wStyle:x.style},null,8,["healthPoint","content","wStyle"])))),128))],12,u)))),128)),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.balls.children,((x,e)=>((0,a.wg)(),(0,a.j4)(h,{key:e,ref_for:!0,ref:"balls"})))),128)),(0,a.Wm)(d,{ref:"paddle",fieldWidth:t.width},null,8,["fieldWidth"])],42,p),[[i.F8,o.reArranged]])],64)}t(7658);const g=["health-point"];function y(x,e,t,n,o,l){return(0,a.wy)(((0,a.wg)(),(0,a.iD)("span",{class:"blick","health-point":t.healthPoint,style:(0,s.j5)({left:t.wStyle.left+"px"})},(0,s.zw)(t.content),13,g)),[[i.F8,t.healthPoint>0]])}var m={props:["x","y","content","healthPoint","wStyle"],data(){return{width:0,height:0,top:0}}},b=t(89);const w=(0,b.Z)(m,[["render",y],["__scopeId","data-v-04bf821e"]]);var C=w;function k(x,e,t,i,n,o){return(0,a.wg)(),(0,a.iD)("span",{class:"paddle",style:(0,s.j5)({left:n.style.left+"px",width:n.style.width+"px"})},null,4)}let v=null;var P={props:["fieldWidth"],data(){return{style:{left:0,width:66},fps:200,maxSpeed:600,timeoutPointer:null,speed:0,physicalCoefficient:.3}},methods:{move(x){clearTimeout(this.timeoutPointer);let e=v.getBoundingClientRect().x,t=x.clientX-e,i=this.style.width/2,a=t-i,s=this.fieldWidth-i,n=this.maxSpeed/this.fps;a<0?a=0:t>s&&(a=s-i);let o=this.style.left,l=this;if(Math.abs(a-this.style.left)<n){this.style.left=a;let x=a+i;this.$parent.$refs.balls.forEach((function(e){e.updateAttachedPosition(x,l.paddleY)})),this.speed=(a-o)/this.frameDuration,this.timeoutPointer=setTimeout((function(){l.speed=0}),l.frameDuration)}else{a<this.style.left?(this.style.left-=n,this.speed=-this.maxSpeed):(this.style.left+=n,this.speed=this.maxSpeed);let e=this.style.left+i;this.$parent.$refs.balls.forEach((function(x){x.updateAttachedPosition(e,l.paddleY)})),this.timeoutPointer=setTimeout((function(){l.move(x)}),l.frameDuration)}},getStyle(){return{left:this.style.left,width:this.style.width}},getCenterPosition(){return{left:this.style.left+this.style.width/2,top:this.paddleY}},getSpeed(){return this.physicalCoefficient*this.speed},updatePhysicalCoefficient(x){this.physicalCoefficient=x}},created(){this.frameDuration=1e3/this.fps,this.style.left=this.fieldWidth/2-this.style.width/2,this.paddleY=this.$parent.height-15},mounted(){let x=this,e=this.style.left+this.style.width/2;this.$parent.$refs.balls.forEach((function(t){t.updateAttachedPosition(e,x.paddleY)})),v=this.$parent.$refs.gameField}};const _=(0,b.Z)(P,[["render",k]]);var T=_;function S(x,e,t,n,o,l){return(0,a.wy)(((0,a.wg)(),(0,a.iD)("span",{class:"ball",style:(0,s.j5)({left:o.style.left+"px",top:o.style.top+"px"})},null,4)),[[i.F8,!o.dead]])}const B={LEFT:0,RIGHT:1,TOP:2,BOTTOM:3,TOP_LEFT:4,TOP_RIGHT:5,BOTTOM_LEFT:6,BOTTOM_RIGHT:7},O={EDGE:0,CORNER:1};let F=0,G=0,E=null,A=null,$=null;var D={name:"Ball",data(){return{style:{left:0,top:0},speed:{x:0,y:0},originalSpeed:{x:150,y:-250},fps:200,timeoutPointer:null,attached:!0,radius:8,dead:!1}},methods:{move(){clearTimeout(this.timeoutPointer);let x=this.speed.x/this.fps,e=this.speed.y/this.fps,t=this.style.left+x,i=this.style.top+e,a=this.detectCollisionWithPaddle(t,i,$);if(a.rebound){let x=$.getSpeed();if(this.speed.x+=x,a.type===O.EDGE)switch(a.location){case B.TOP:i=$.paddleY-this.width-(i+this.width-$.paddleY),this.speed.y=-this.speed.y;break;case B.LEFT:t-=2*(t+this.width-$.style.left),this.speed.x=-this.speed.x;break;case B.RIGHT:t+=2*($.style.left+$.style.width-t),this.speed.x=-this.speed.x;break}else{let x=0;a.collisionTime>0&&(t=this.style.left+this.speed.x*a.collisionTime,i=this.style.top+this.speed.y*a.collisionTime,x=1/this.fps-a.collisionTime),a.location===B.TOP_LEFT?this.cornerCollision(this.style.left+this.radius-$.style.left,this.style.top+this.radius-$.paddleY):this.cornerCollision(this.style.left+this.radius-$.style.left-$.style.width,this.style.top+this.radius-$.paddleY),x>0&&(t+=this.speed.x*x,i+=this.speed.y*x)}E.playSound("paddle")}else{let x=this,e=99,a=E.wordsArranged.some((function(a,s,n){let o=a.prop.top;if(i+x.width>=o&&i<=o+a.prop.height)return a.children.some((function(a,l){if(a.hp>0){let r=x.detectCollisionWithBrick(t,i,o,a);if(r.rebound){if(r.type===O.EDGE)switch(r.location){case B.TOP:i-=2*(o-i-x.width),x.speed.y=-x.speed.y;break;case B.BOTTOM:i+=2*(o+a.height-i),x.speed.y=-x.speed.y;break;case B.LEFT:t-=2*(t+x.width-a.style.left),x.speed.x=-x.speed.x;break;case B.RIGHT:t+=2*(a.style.left+a.width-t),x.speed.x=-x.speed.x;break}else{let e=0;switch(r.collisionTime>0&&(t=x.style.left+x.speed.x*r.collisionTime,i=x.style.top+x.speed.y*r.collisionTime,e=1/x.fps-r.collisionTime),r.location){case B.TOP_LEFT:x.cornerCollision(x.style.left+x.radius-a.style.left,x.style.top+x.radius-o);break;case B.TOP_RIGHT:x.cornerCollision(x.style.left+x.radius-a.style.left-a.width,x.style.top+x.radius-o);break;case B.BOTTOM_LEFT:x.cornerCollision(x.style.left+x.radius-a.style.left,x.style.top+x.radius-o-a.height);break;case B.BOTTOM_RIGHT:x.cornerCollision(x.style.left+x.radius-a.style.left-a.width,x.style.top+x.radius-o-a.height);break}e>0&&(t+=x.speed.x*e,i+=x.speed.y*e)}return e=--n[s].children[l].hp,!0}}}))}));if(a)if(this.$root.$refs.scoreBoard.addScore(10),e<1){E.playSound("brick2");let x=E.clearOneBrick();if(x)return void E.gameFinished(!0)}else E.playSound("brick1")}if(t<0?(t=Math.abs(t),this.speed.x=-this.speed.x,E.playSound("wall")):t>F-this.width&&(t-=t+this.width-F,this.speed.x=-this.speed.x,E.playSound("wall")),i<0)i=Math.abs(i),this.speed.y=-this.speed.y,E.playSound("wall");else if(i>G-this.width)return this.dead=!0,clearTimeout(this.timeoutPointer),E.playSound("lose"),void(A.decrease()?this.relocate():E.gameFinished());this.style.left=t,this.style.top=i,this.timeoutPointer=setTimeout(this.move,this.frameDuration)},stop(){clearTimeout(this.timeoutPointer)},shot(){if(this.attached){this.attached=!1;let x=$.getSpeed();this.speed.x=this.originalSpeed.x+x;let e=$.getCenterPosition();e.left<F/2&&(this.speed.x=-this.originalSpeed.x+x),this.speed.y=this.originalSpeed.y,this.move()}},updateAttachedPosition(x,e){this.attached&&(this.style.left=x-8,this.style.top=e-16-1)},detectCollisionWithPaddle(x,e,t){let i=t.getStyle(),a=x+this.width>=i.left&&x<=i.left+i.width,s=!1,n=O.EDGE,o=0,l=-1;if(e+this.width>=t.paddleY&&a)if(s=!0,x+this.radius>i.left&&x+this.radius<i.left+i.width)l=B.TOP;else if(e+this.radius>t.paddleY&&e+this.radius<G)l=x<i.left?B.LEFT:B.RIGHT;else{n=O.CORNER;let a=(t.paddleY-(e+this.radius))**2,s=(t.paddleY-(this.style.top+this.radius))**2,r=(x+this.radius-(i.left+i.width))**2+a,h=(this.style.left+this.radius-(i.left+i.width))**2+s;l=B.TOP_RIGHT,x<i.left&&(l=B.TOP_LEFT,r=(i.left-(x+this.radius))**2+a,h=(this.style.left+this.radius-i.left)**2+s),r<this.radius**2&&(o=(Math.sqrt(h)-this.radius)/Math.sqrt(this.speed.x**2+this.speed.y**2))}let r={rebound:s,type:n,location:l};return o>0&&(r.collisionTime=o),r},detectCollisionWithBrick(x,e,t,i){let a=i.style,s=x+this.width>=a.left&&x<=a.left+i.width,n=e>=t-this.width&&e<=t+i.height,o=!1,l="",r=0,h="";if(n&&s){o=!0;let s=x+this.radius>a.left&&x+this.radius<a.left+i.width,n=e+this.radius>t&&e+this.radius<t+i.height;if(s||n)l=O.EDGE,s?h=e<t?B.TOP:B.BOTTOM:n&&(h=x<a.left?B.LEFT:B.RIGHT);else{l=O.CORNER;let s=(t-(e+this.radius))**2,n=(t+i.height-(e+this.radius))**2,o=(a.left-(x+this.radius))**2,d=(x+this.radius-(a.left+i.width))**2,c=(t-(this.style.top+this.radius))**2,p=(t+i.height-(this.style.top+this.radius))**2,u=(a.left-(this.style.left+this.radius))**2,f=(this.style.left+this.radius-(a.left+i.width))**2,g=0,y=0;x<a.left?e<t?(h=B.TOP_LEFT,g=o+s,y=u+c):(h=B.BOTTOM_LEFT,g=o+n,y=u+p):e<t?(h=B.TOP_RIGHT,g=d+s,y=f+c):(h=B.BOTTOM_RIGHT,g=d+n,y=f+p),g<this.radius**2&&(r=(Math.sqrt(y)-this.radius)/Math.sqrt(this.speed.x**2+this.speed.y**2))}}let d={rebound:o,type:l,location:h};return r>0&&(d.collisionTime=r),d},cornerCollision(x,e){let t=-(2*this.speed.x*x+2*this.speed.y*e)/(x**2+e**2);this.speed.x+=t*x,this.speed.y+=t*e},init(x,e){this.attached=!0,this.updateAttachedPosition(x,e),this.dead=!1},relocate(){clearTimeout(this.timeoutPointer);let x=$.getCenterPosition();this.attached=!0,this.updateAttachedPosition(x.left,x.top),this.dead=!1}},created(){this.frameDuration=1e3/this.fps,this.width=2*this.radius},mounted(){E=this.$parent,F=E.width,G=E.height,A=this.$root.$refs.lifePanel,$=E.$refs.paddle}};const M=(0,b.Z)(D,[["render",S]]);var I=M,H={default:{content:'\n        Sing, O goddess, the anger of Achilles son of Peleus, that brought\ncountless ills upon the Achaeans. Many a brave soul did it send\nhurrying down to Hades, and many a hero did it yield a prey to dogs\nand vultures, for so were the counsels of Jove fulfilled from the\nday on which the son of Atreus, king of men, and great Achilles, first\nfell out with one another.\nAnd which of the gods was it that set them on to quarrel? It was the\nson of Jove and Leto; for he was angry with the king and sent a\npestilence upon the host to plague the people, because the son of\nAtreus had dishonoured Chryses his priest. Now Chryses had come to the\nships of the Achaeans to free his daughter, and had brought with him a\ngreat ransom: moreover he bore in his hand the sceptre of Apollo\nwreathed with a suppliant\'s wreath and he besought the Achaeans, but\nmost of all the two sons of Atreus, who were their chiefs.\n"Sons of Atreus," he cried, "and all other Achaeans, may the gods\nwho dwell in Olympus grant you to sack the city of Priam, and to reach\nyour homes in safety; but free my daughter, and accept a ransom for\nher, in reverence to Apollo, son of Jove."\n        ',src:"THE ILIAD: BOOK 1 by HOMER"},pattern0:{content:"\n        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx \n        ",src:""},pattern1:{content:"\n        xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx\n        xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx\n        xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxx xxxxxx xxxxxx \n        xxxxxx xxxxxx xxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxx xxxxxx xxxxxx\n        ",src:""}};const L=H;var W=L,j=t(9568),R=t.p+"media/gameSfx.2f1a6d86.wav";let Y=null;const z={setup(){const{play:x}=(0,j.c)(R,{sprite:{wall:[0,362],paddle:[363,154],brick1:[518,281],brick2:[800,360],lose:[1161,655]}});return{play:x}},components:{Brick:C,Paddle:T,Ball:I},props:["width","height"],data(){return{words:[],offsetX:0,wordMargin:3,colorScheme:"0",reArranged:!1,wordsArranged:[],balls:{index:1,children:{ball0:1}},paragraph:{content:W["default"].content,src:W["default"].src},hideBrickContent:!1,mute:!1}},methods:{getWords(){this.words=this.paragraph.content.trim().replace(/\n+/g," ").replace(/\s+/g," ").split(" "),this.paragraph.src&&this.words.push("Source: "+this.paragraph.src.trim().replace(/(\n+|\s+)/g,"_"))},reArrangeBricks(){let x={prop:{itemOffsetX:0,style:{},top:2},children:[]},e=-1,t=this,i=0,a=0,s=[],n=2;Array.from(this.$refs.tmpGameField.children).forEach((function(o){let l=o.getBoundingClientRect();if(l.top>.8*t.height)return;if(e<0||e!==l.top){let i=!1;e>0&&e!==l.top&&(x.prop.totalWidth=a,x.prop.itemOffsetX=parseFloat(((t.width-a-2*t.wordMargin)/(x.children.length-1)).toFixed(2)),s.push(x),x={prop:{},children:[]},i=!0),e=l.top,x.prop.height=parseFloat((l.height+2*t.wordMargin).toFixed(2)),i&&(n+=2+x.prop.height,x.prop.top=n),a=parseFloat(l.width.toFixed(2))}else a+=parseFloat(l.width.toFixed(2));let r={content:o.innerText,hp:parseInt(100*Math.random())%4+1,width:l.width,index:i++,height:l.height};x.children.push(r)})),x.prop.itemOffsetX=parseFloat(((t.width-a-2*t.wordMargin)/(x.children.length-1)).toFixed(2)),x.prop.totalWidth=a,s.push(x),s.forEach((function(x,e){let i=s[e],a=t.wordMargin;x.children.forEach((function(e,t){let s=i.children[t];s.style={left:a},a+=e.width+x.prop.itemOffsetX}))})),this.wordsArranged=s},updateParagraph(x){x.content&&x.content.trim().replace(/\n+/g," ").replace(/\s+/g," ").length>0&&(this.paragraph.content=x.content,this.paragraph.src=x.src),this.reArranged=!1,this.getWords(),this.restart()},resotreParagraph(){this.paragraph.content=W["default"].content,this.paragraph.src=W["default"].src,this.reArranged=!1,this.getWords(),this.restart()},useParagraphPattern(x){this.paragraph.content=W["pattern"+x].content,this.paragraph.src=W["pattern"+x].src,this.reArranged=!1,this.getWords(),this.restart()},addBall(){let x=this.balls.index++;this.balls.children["ball"+x]=1},shotBalls(){this.$refs.balls.forEach((function(x){x.attached&&x.shot()}))},stopBalls(){this.$refs.balls.forEach((function(x){x.stop()}))},gameFinished(x=!1){x?(this.$root.showWinPopup(),this.$root.gameClear()):this.$root.showLosePopup()},restart(){this.$refs.balls.forEach((function(x){x.relocate()})),Y.restore(),this.$root.$refs.scoreBoard.clear()},clearOneBrick(){return this.brickCleared++,this.brickCleared==this.words.length},updateTheme(x){this.colorScheme=x},updatePaddlePhyCoef(x){this.$refs.paddle.updatePhysicalCoefficient(x)},updateBrickContentVisibility(x){this.hideBrickContent=x},playSound(x){this.$root.mute||this.play({id:x})}},mounted(){this.getWords();let x=this.$refs.gameField.getBoundingClientRect();this.offsetX=x.x,this.offsetY=x.y,Y=this.$root.$refs.lifePanel},updated(){this.$nextTick((()=>{this.reArranged||(this.reArrangeBricks(),this.reArranged=!0,this.brickCleared=0)}))}},N=()=>{(0,i.sj)((x=>({"2d2aeb43":.6*x.width+"px",65077736:x.width+"px","2c94a4e8":x.height+"px"})))},V=z.setup;z.setup=V?(x,e)=>(N(),V(x,e)):N;var q=z;const K=(0,b.Z)(q,[["render",f],["__scopeId","data-v-3ca81244"]]);var Z=K;const U={class:"scoreBoard"},X=(0,a._)("span",null,"Score: ",-1);function J(x,e,t,i,n,o){return(0,a.wg)(),(0,a.iD)("div",U,[X,(0,a._)("span",null,(0,s.zw)(n.currentScore),1)])}var Q={data(){return{currentScore:0}},methods:{addScore(x){this.currentScore+=x},clear(){this.currentScore=0}}};const xx=(0,b.Z)(Q,[["render",J]]);var ex=xx;const tx={class:"lifePanel"},ix=(0,a._)("span",null,"Player Lives: ",-1);function ax(x,e,t,i,n,o){return(0,a.wg)(),(0,a.iD)("div",tx,[ix,(0,a._)("span",null,(0,s.zw)(n.lives),1)])}var sx={data(){return{lives:3}},methods:{decrease(){return this.lives--,this.lives>0},increase(){this.lives++},restore(){this.lives=3}}};const nx=(0,b.Z)(sx,[["render",ax]]);var ox=nx;const lx=x=>((0,a.dD)("data-v-18118bd3"),x=x(),(0,a.Cn)(),x),rx={class:"head"},hx={class:"right"},dx={key:0,class:"body paragraphConfig"},cx=lx((()=>(0,a._)("div",null,"Content: ",-1))),px=lx((()=>(0,a._)("div",null,"Source: ",-1))),ux={key:1,class:"body gameSetting"},fx={class:"toggle"},gx=["value"],yx=["value"],mx=["disabled"],bx=["disabled"],wx=["disabled"],Cx={value:"0"},kx={value:"1"},vx={key:2,class:"body lose"},Px=["innerHTML"],_x={key:3,class:"body win"},Tx=["innerHTML"],Sx={class:"foot"},Bx={class:"buttonPanel"},Ox=["onClick"];function Fx(x,e,t,n,o,l){return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.wy)((0,a._)("div",{class:"popupBackground",onClick:e[0]||(e[0]=x=>l.hide(!0))},null,512),[[i.F8,o.visible]]),(0,a.wy)((0,a._)("div",{class:(0,s.C_)(o.popupClasses)},[(0,a._)("div",rx,[(0,a.wy)((0,a._)("div",{class:"title"},(0,s.zw)(x.config.content.title[o.lang]),513),[[i.F8,x.config.setting.title]]),(0,a._)("div",hx,[(0,a.wy)((0,a._)("span",{class:"closeBtn",onClick:e[1]||(e[1]=x=>l.hide())},"❌",512),[[i.F8,x.config.setting.close]])])]),"paragraphConfig"===o.type?(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",dx,[cx,"paragraphConfig"===o.type?(0,a.wy)(((0,a.wg)(),(0,a.iD)("textarea",{key:0,class:"paragraphInput","onUpdate:modelValue":e[2]||(e[2]=x=>o.gameSetting.paragraphInput=x)},null,512)),[[i.nr,o.gameSetting.paragraphInput]]):(0,a.kq)("",!0),px,(0,a.wy)((0,a._)("input",{class:"srcInput",type:"text","onUpdate:modelValue":e[3]||(e[3]=x=>o.gameSetting.srcInput=x)},null,512),[[i.nr,o.gameSetting.srcInput]])],512)),[[i.F8,x.config.setting.body]]):"gameSetting"===o.type?(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",ux,[(0,a._)("div",fx,[(0,a._)("span",null,(0,s.zw)(x.config.content.paddlePhyCoef[o.lang]),1),(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[4]||(e[4]=x=>o.gameSetting.coef=x),onChange:e[5]||(e[5]=x=>t.otherCallback[o.type].updatePaddlePhyCoef(parseFloat(x.target.value)))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.gameSetting.coefs,((x,e)=>((0,a.wg)(),(0,a.iD)("option",{key:e,value:x},(0,s.zw)(x),9,gx)))),128))],544),[[i.bM,o.gameSetting.coef]])]),(0,a._)("div",null,[(0,a._)("span",null,(0,s.zw)(x.config.content.theme[o.lang]),1),(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[6]||(e[6]=x=>o.gameSetting.theme=x),onChange:e[7]||(e[7]=x=>t.otherCallback[o.type].updateTheme(parseInt(x.target.value)))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.gameSetting.themes,(({name:x,val:e})=>((0,a.wg)(),(0,a.iD)("option",{key:e,value:e},(0,s.zw)(x),9,yx)))),128))],544),[[i.bM,o.gameSetting.theme]])]),(0,a._)("div",{class:(0,s.C_)({lock:!o.gameSetting.enableExtra})},[(0,a._)("span",null,(0,s.zw)(x.config.content.paraConfig[o.lang]),1),(0,a._)("button",{class:"configBtn",onClick:e[8]||(e[8]=(...x)=>t.otherCallback[o.type].openParaConfig&&t.otherCallback[o.type].openParaConfig(...x))},(0,s.zw)(x.config.content.paraConfigChange[o.lang]),1),(0,a._)("button",{class:"configBtn",onClick:e[9]||(e[9]=(...x)=>t.otherCallback[o.type].restoreParaConfig&&t.otherCallback[o.type].restoreParaConfig(...x))},(0,s.zw)(x.config.content.paraConfigRestore[o.lang]),1),(0,a._)("button",{class:"configBtn",disabled:!o.gameSetting.enableExtra,onClick:e[10]||(e[10]=x=>t.otherCallback[o.type].useParaPat(0))},(0,s.zw)(x.config.content.paraConfigPat1[o.lang]),9,mx),(0,a._)("button",{class:"configBtn",disabled:!o.gameSetting.enableExtra,onClick:e[11]||(e[11]=x=>t.otherCallback[o.type].useParaPat(1))},(0,s.zw)(x.config.content.paraConfigPat2[o.lang]),9,bx)],2),(0,a._)("div",{class:(0,s.C_)({lock:!o.gameSetting.enableExtra})},[(0,a._)("span",null,(0,s.zw)(x.config.content.blickContent[o.lang]),1),(0,a.wy)((0,a._)("select",{disabled:!o.gameSetting.enableExtra,"onUpdate:modelValue":e[12]||(e[12]=x=>o.gameSetting.blickContVisibility=x),onChange:e[13]||(e[13]=x=>t.otherCallback[o.type].toggleBrickCont(parseInt(x.target.value)))},[(0,a._)("option",Cx,(0,s.zw)(x.config.content.show[o.lang]),1),(0,a._)("option",kx,(0,s.zw)(x.config.content.hide[o.lang]),1)],40,wx),[[i.bM,o.gameSetting.blickContVisibility]])],2)],512)),[[i.F8,x.config.setting.body]]):"lose"===o.type?(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",vx,[(0,a._)("div",{innerHTML:x.config.content.remark[o.lang]},null,8,Px)],512)),[[i.F8,x.config.setting.body]]):"win"===o.type?(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",_x,[(0,a._)("div",{innerHTML:x.config.content.remark[o.lang]},null,8,Tx)],512)),[[i.F8,x.config.setting.body]]):(0,a.kq)("",!0),(0,a.wy)((0,a._)("div",Sx,[(0,a._)("div",Bx,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(x.config.content.buttons,((x,e)=>((0,a.wg)(),(0,a.iD)("div",{class:"button",key:e,onClick:t.callbacks[o.type][e]},(0,s.zw)(x[o.lang]),9,Ox)))),128))])],512),[[i.F8,x.config.setting.buttonsNum>0]])],2),[[i.F8,o.visible]])],64)}var Gx={lose:{setting:{title:!0,buttonsNum:1,body:!0,close:!1,width:500},content:{title:{en_GB:"You Lose"},remark:{en_GB:"Too difficult?<br> Don't worry! You can change the paragraph content to a shorter one, or lower the paddle physical coefficient in the game setting."},buttons:[{en_GB:"Restart"}]}},win:{setting:{title:!0,buttonsNum:1,body:!0,close:!1,width:300},content:{title:{en_GB:"You Win"},remark:{en_GB:"Thanks for playing! New functions unlock in the game setting."},buttons:[{en_GB:"Play again"}]}},gameSetting:{setting:{title:!0,buttonsNum:0,body:!0,close:!0,width:600},content:{title:{en_GB:"Game Setting"},paddlePhyCoef:{en_GB:"Paddle physical coefficient:"},paraConfig:{en_GB:"Paragraph content config:"},theme:{en_GB:"Use theme:"},paraConfigChange:{en_GB:"Change"},paraConfigRestore:{en_GB:"Restore"},paraConfigPat1:{en_GB:"Pattern 1"},paraConfigPat2:{en_GB:"Pattern 2"},blickContent:{en_GB:"Brick content:"},show:{en_GB:"Show"},hide:{en_GB:"Hide"}}},paragraphConfig:{setting:{title:!0,buttonsNum:1,body:!0,close:!0,width:800},content:{title:{en_GB:"Change Paragraph"},buttons:[{en_GB:"Update"}]}}};const Ex=Gx;var Ax=Ex;const $x={props:["callbacks","closeCallback","otherCallback"],data(){return{lang:"en_GB",visible:!1,type:"win",popupClasses:{popup:!0},popupWidth:800,gameSetting:{enableExtra:!1,theme:"0",themes:[{name:"1",val:"0"},{name:"2",val:"1"}],coef:.3,coefs:[0,.1,.2,.3,.4,.5,.6,.7,.8],blickContVisibility:"0",paragraphInput:"",srcInput:""}}},created(){this.config=Ax[this.type]},methods:{show(){this.visible=!0},hide(x=!1){x&&!this.config.setting.close||(this.visible=!1,this.popupCloseCallback&&this.popupCloseCallback[this.type]&&this.popupCloseCallback[this.type]())},updateType(x){return this.type=x,this.config=Ax[this.type],this.config.setting.width&&(this.popupWidth=this.config.setting.width),this},getNewParagraph(){return this.gameSetting.paragraphInput=this.gameSetting.paragraphInput.trim(),this.gameSetting.srcInput=this.gameSetting.srcInput.trim(),{content:this.gameSetting.paragraphInput,src:this.gameSetting.srcInput}},unlockExtraSetting(){this.gameSetting.enableExtra=!0}},mount(){}},Dx=()=>{(0,i.sj)((x=>({"025cf39d":x.popupWidth+"px"})))},Mx=$x.setup;$x.setup=Mx?(x,e)=>(Dx(),Mx(x,e)):Dx;var Ix=$x;const Hx=(0,b.Z)(Ix,[["render",Fx],["__scopeId","data-v-18118bd3"]]);var Lx=Hx;let Wx=null,jx=null;const Rx={components:{GameField:Z,ScoreBoard:ex,LifePanel:ox,Popup:Lx},data(){return{fieldWidth:600,fieldHeight:750,gameCleared:!1,mute:!1}},mounted(){Wx=this.$refs.popupLayer1,jx=this.$refs.popupLayer2},methods:{showLosePopup(){Wx.updateType("lose").show()},restartBtnCallback(){this.$refs.GameField.updateParagraph({}),Wx.hide(),this.$refs.GameField.restart()},showWinPopup(){Wx.updateType("win").show()},showConfigPopup(){jx.updateType("paragraphConfig").show()},updateParagrapConfigCallback(){this.$refs.GameField.updateParagraph(jx.getNewParagraph()),jx.hide()},restoreParagrapConfigCallback(){this.$refs.GameField.resotreParagraph(),jx.hide()},useParaPatCallback(x){this.gameCleared&&this.$refs.GameField.useParagraphPattern(x)},updateThemeCallback(x){this.$refs.GameField.updateTheme(x)},updatePaddlePhyCoefCallback(x){this.$refs.GameField.updatePaddlePhyCoef(x)},showGameSettingPopup(){Wx.updateType("gameSetting").show()},gameClear(){this.gameCleared=!0,Wx.unlockExtraSetting(),jx.unlockExtraSetting()},toggleBrickContCallback(x){this.gameCleared&&this.$refs.GameField.updateBrickContentVisibility(!!x)},toggleSound(){this.mute=!this.mute}},created(){this.popupCallbacks={lose:[this.restartBtnCallback],win:[this.restartBtnCallback],paragraphConfig:[this.updateParagrapConfigCallback]},this.popupCloseCallback={paragraphConfig:null},this.popupOtherCallback={gameSetting:{openParaConfig:this.showConfigPopup,updateTheme:this.updateThemeCallback,restoreParaConfig:this.restoreParagrapConfigCallback,updatePaddlePhyCoef:this.updatePaddlePhyCoefCallback,useParaPat:this.useParaPatCallback,toggleBrickCont:this.toggleBrickContCallback}}}},Yx=()=>{(0,i.sj)((x=>({c9b58eba:x.fieldWidth+10+"px"})))},zx=Rx.setup;Rx.setup=zx?(x,e)=>(Yx(),zx(x,e)):Yx;var Nx=Rx;const Vx=(0,b.Z)(Nx,[["render",d]]);var qx=Vx;(0,i.ri)(qx).mount("#app")}},e={};function t(i){var a=e[i];if(void 0!==a)return a.exports;var s=e[i]={exports:{}};return x[i].call(s.exports,s,s.exports,t),s.exports}t.m=x,function(){var x=[];t.O=function(e,i,a,s){if(!i){var n=1/0;for(h=0;h<x.length;h++){i=x[h][0],a=x[h][1],s=x[h][2];for(var o=!0,l=0;l<i.length;l++)(!1&s||n>=s)&&Object.keys(t.O).every((function(x){return t.O[x](i[l])}))?i.splice(l--,1):(o=!1,s<n&&(n=s));if(o){x.splice(h--,1);var r=a();void 0!==r&&(e=r)}}return e}s=s||0;for(var h=x.length;h>0&&x[h-1][2]>s;h--)x[h]=x[h-1];x[h]=[i,a,s]}}(),function(){t.n=function(x){var e=x&&x.__esModule?function(){return x["default"]}:function(){return x};return t.d(e,{a:e}),e}}(),function(){var x,e=Object.getPrototypeOf?function(x){return Object.getPrototypeOf(x)}:function(x){return x.__proto__};t.t=function(i,a){if(1&a&&(i=this(i)),8&a)return i;if("object"===typeof i&&i){if(4&a&&i.__esModule)return i;if(16&a&&"function"===typeof i.then)return i}var s=Object.create(null);t.r(s);var n={};x=x||[null,e({}),e([]),e(e)];for(var o=2&a&&i;"object"==typeof o&&!~x.indexOf(o);o=e(o))Object.getOwnPropertyNames(o).forEach((function(x){n[x]=function(){return i[x]}}));return n["default"]=function(){return i},t.d(s,n),s}}(),function(){t.d=function(x,e){for(var i in e)t.o(e,i)&&!t.o(x,i)&&Object.defineProperty(x,i,{enumerable:!0,get:e[i]})}}(),function(){t.f={},t.e=function(x){return Promise.all(Object.keys(t.f).reduce((function(e,i){return t.f[i](x,e),e}),[]))}}(),function(){t.u=function(x){return"js/"+x+".c2ebbd57.js"}}(),function(){t.miniCssF=function(x){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(x){if("object"===typeof window)return window}}()}(),function(){t.o=function(x,e){return Object.prototype.hasOwnProperty.call(x,e)}}(),function(){var x={},e="game-breakout:";t.l=function(i,a,s,n){if(x[i])x[i].push(a);else{var o,l;if(void 0!==s)for(var r=document.getElementsByTagName("script"),h=0;h<r.length;h++){var d=r[h];if(d.getAttribute("src")==i||d.getAttribute("data-webpack")==e+s){o=d;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,t.nc&&o.setAttribute("nonce",t.nc),o.setAttribute("data-webpack",e+s),o.src=i),x[i]=[a];var c=function(e,t){o.onerror=o.onload=null,clearTimeout(p);var a=x[i];if(delete x[i],o.parentNode&&o.parentNode.removeChild(o),a&&a.forEach((function(x){return x(t)})),e)return e(t)},p=setTimeout(c.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=c.bind(null,o.onerror),o.onload=c.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){t.r=function(x){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(x,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(x,"__esModule",{value:!0})}}(),function(){t.p=""}(),function(){var x={143:0};t.f.j=function(e,i){var a=t.o(x,e)?x[e]:void 0;if(0!==a)if(a)i.push(a[2]);else{var s=new Promise((function(t,i){a=x[e]=[t,i]}));i.push(a[2]=s);var n=t.p+t.u(e),o=new Error,l=function(i){if(t.o(x,e)&&(a=x[e],0!==a&&(x[e]=void 0),a)){var s=i&&("load"===i.type?"missing":i.type),n=i&&i.target&&i.target.src;o.message="Loading chunk "+e+" failed.\n("+s+": "+n+")",o.name="ChunkLoadError",o.type=s,o.request=n,a[1](o)}};t.l(n,l,"chunk-"+e,e)}},t.O.j=function(e){return 0===x[e]};var e=function(e,i){var a,s,n=i[0],o=i[1],l=i[2],r=0;if(n.some((function(e){return 0!==x[e]}))){for(a in o)t.o(o,a)&&(t.m[a]=o[a]);if(l)var h=l(t)}for(e&&e(i);r<n.length;r++)s=n[r],t.o(x,s)&&x[s]&&x[s][0](),x[s]=0;return t.O(h)},i=self["webpackChunkgame_breakout"]=self["webpackChunkgame_breakout"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=t.O(void 0,[998],(function(){return t(6099)}));i=t.O(i)})();
//# sourceMappingURL=app.eff60ea2.js.map