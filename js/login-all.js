Ext.BLANK_IMAGE_URL="js/ExtJs/resources/images/default/s.gif";String.prototype.ucFirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1,this.length)};Ext.override(Ext.grid.CheckboxSelectionModel,{handleMouseDown:function(d,h,f){if(f.button!==0||this.isLocked()){return}var a=this.grid.getView();if(f.shiftKey&&this.last!==false){var c=this.last;this.selectRange(c,h,f.ctrlKey);this.last=c;a.focusRow(h)}else{var b=this.isSelected(h);if(b){this.deselectRow(h)}else{if(!b){this.selectRow(h,!this.singleSelect);a.focusRow(h)}}}}});function log(){if(console){console.log.apply(this,arguments)}}function _(a){try{var c=i18n[a];if(c===undefined){c=a;log("FIX ME : i18n not found for the string: "+a)}return c}catch(b){return a}}function XHR(c){var b=c.success,d=c.failure,a=c.callback;c.url="./do/"+c.params.task;delete c.params.task;c.params=Ext.applyIf({csrfToken:csrfToken},c.params);c.failure=c.success=Ext.emptyFn;c.callback=function(g,j,f){var i=null;try{i=Ext.decode(f.responseText)}catch(h){log("Invalid XHR JSON Response:"+f.responseText)}if(j&&i&&i.success){if(b!==undefined){Ext.callback(b,c.scope,[f,g])}}else{if(d!==undefined){Ext.callback(d,c.scope,[f,g])}}if(a!==undefined){Ext.callback(a,c.scope,[g,j,f])}};Ext.Ajax.request(c)}Ext.override(Ext.form.Field,{afterRender:function(){var b=function(e){var d=null;var c=null;d=e.getEl().up("div.x-form-item");if(d){c=d.child("label")}if(c){return c}};if(this.tooltipText){var a=b(this);if(a){a.addClass(this.tooltipClass||"x-textfield-tooltip");new Ext.ToolTip({target:a,html:this.tooltipText,trackMouse:true})}}Ext.form.Field.superclass.afterRender.call(this);this.initEvents();this.initValue()}});Ext.namespace("Ext.ux.plugins");Ext.ux.IconCombo=Ext.extend(Ext.form.ComboBox,{initComponent:function(){Ext.apply(this,{tpl:'<tpl for="."><div class="x-combo-list-item ux-icon-combo-item"><div class="{'+this.iconClsField+'}" style="position:absolute"></div><div class="ux-icon-combo-value">{'+this.displayField+"}</div></div></tpl>"});Ext.ux.IconCombo.superclass.initComponent.call(this)},onRender:function(b,a){Ext.ux.IconCombo.superclass.onRender.call(this,b,a);this.wrap.applyStyles({position:"relative"});this.el.addClass("ux-icon-combo-input");this.icon=Ext.DomHelper.append(this.el.up("div.x-form-field-wrap"),{tag:"div",style:"position:absolute"})},setIconCls:function(){var a=this.store.query(this.valueField,this.getValue()).itemAt(0);if(a){this.icon.className=a.get(this.iconClsField)}},setValue:function(a){Ext.ux.IconCombo.superclass.setValue.call(this,a);this.setIconCls()}});Ext.reg("iconcombo",Ext.ux.IconCombo);Ext.override(Ext.Window.DD,{startDrag:function(){var a=this.win,c,b;a.fireEvent("ghost",[]);this.proxy=a.ghost();if(a.constrain!==false){c=a.el.shadowOffset;this.constrainTo(a.container,{right:c,left:c,bottom:c})}else{if(a.constrainHeader!==false){b=this.proxy.getSize();this.constrainTo(a.container,{right:-(b.width-this.headerOffsets[0]),bottom:-(b.height-this.headerOffsets[1])})}}}});Ext.override(Ext.Window,{setZIndex:function(b){var a=++b;if(this.modal){this.mask.setStyle("z-index",b)}this.el.setZIndex(a);b+=5;if(this.resizer){this.resizer.proxy.setStyle("z-index",++b)}if(a>this.lastZIndex){this.fireEvent("tofront",this)}else{this.fireEvent("toback",this)}this.lastZIndex=b}});Ext.namespace("Ext.ux","Ext.ux.plugins");Ext.ux.plugins.WindowDrawer=Ext.extend(Ext.Window,{closable:false,resizable:false,show:function(c,a,b){if(this.hidden&&this.fireEvent("beforeshow",this)!==false){this.hidden=false;this.onBeforeShow();this.afterShow(!!c,a,b)}},hide:function(c,a,b){if(this.hidden){return}if(this.animate===true&&!c){if(this.el.shadow){this.el.disableShadow()}this.el.slideOut(this.alignToParams.slideDirection,{scope:this,duration:this.animDuration||0.25,callback:function(){this.el.removeClass("x-panel-animated");if(typeof a=="function"){a.call(b||this)}}})}else{Ext.ux.plugins.WindowDrawer.superclass.hide.call(this,null,a,b)}this.hidden=true},init:function(a){this.win=a;this.resizeHandles=this.side;this.shim=a.shim;a.drawers=a.drawers||{};a.drawers[this.side]=this;a.on({scope:this,tofront:this.onBeforeShow,toback:this.onBeforeShow,ghost:this.onBeforeResize,move:this.alignAndShow,resize:this.alignAndShow,destroy:this.destroy,render:function(b){this.render(b.el.parent())},beforecollapse:function(){if(!this.hidden){this.wasVisible=true;this.hide(true)}},expand:function(){if(this.showAgain===this.wasVisible){this.alignAndShow()}},beforehide:function(){this.wasVisible=!this.hidden;this.hide(true)}})},initComponent:function(){Ext.apply(this,{frame:true,draggable:false,modal:false,closeAction:"hide",alignToParams:{}});this.on({scope:this,beforeshow:this.onBeforeShow,beforehide:this.onBeforeHide});if(this.size){if(this.side=="e"||this.side=="w"){this.width=this.size}else{this.height=this.size}}Ext.ux.plugins.WindowDrawer.superclass.initComponent.call(this)},onBeforeResize:function(){if(!this.hidden){this.showAgain=true}this.hide(true)},onBeforeHide:function(){if(this.animate){this.getEl().addClass("x-panel-animated")}},onBeforeShow:function(){if(this.animate){this.el.addClass("x-panel-animated")}this.setAlignment();this.setZIndex(this.win.el.getZIndex()-3)},afterShow:function(c,a,b){if(this.animate&&!c){this.el.slideIn(this.alignToParams.slideDirection,{scope:this,duration:this.animDuration||0.25,callback:function(){this.el.removeClass("x-panel-animated");if(this.el.shadow){this.el.enableShadow(true)}this.el.show();if(typeof a=="function"){a.call(b||this)}}})}else{Ext.ux.plugins.WindowDrawer.superclass.afterShow.call(this);if(typeof a=="function"){a.call(b||this)}}this.wasVisible=true},alignAndShow:function(){this.setAlignment();if(this.showAgain){this.show(true)}this.showAgain=false},setAlignment:function(){switch(this.side){case"n":this.setWidth(this.win.el.getWidth()-10);Ext.apply(this.alignToParams,{alignTo:"tl",alignToXY:[5,(this.el.getComputedHeight()*-1)+5],slideDirection:"b"});break;case"s":this.setWidth(this.win.el.getWidth()-10);Ext.apply(this.alignToParams,{alignTo:"bl",alignToXY:[5,(Ext.isIE6)?-2:-7],slideDirection:"t"});break;case"e":this.setHeight(this.win.el.getHeight()-10);Ext.apply(this.alignToParams,{alignTo:"tr",alignToXY:[-5,5],slideDirection:"l"});break;case"w":this.setHeight(this.win.el.getHeight()-10);Ext.apply(this.alignToParams,{alignTo:"tl",alignToXY:[(this.el.getComputedWidth()*-1)+5,5],slideDirection:"r"});break}if(!this.hidden){this.el.alignTo(this.win.el,this.alignToParams.alignTo,this.alignToParams.alignToXY);if(Ext.isIE){this.bwrap.hide();this.bwrap.show()}}this.doLayout()},toFront:function(){this.win.toFront();return this}});Ext.reg("windowdrawer",Ext.ux.plugins.WindowDrawer);var PhDOE_loginPage=function(){Ext.QuickTips.init();Ext.BLANK_IMAGE_URL="js/ExtJs/resources/images/default/s.gif";return{storeLang:"",storeProject:"",email:Ext.util.Cookies.get("email"),authService:"VCS",authServiceID:"",init:function(){this.storeLang=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"./do/getAvailableLanguage"}),reader:new Ext.data.JsonReader({root:"Items",totalProperty:"nbItems",idProperty:"code",fields:[{name:"code"},{name:"iconCls"},{name:"name"}]})});this.storeLang.load({scope:this,callback:function(){this.storeProject.load()}});this.storeProject=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"./do/getAvailableProject"}),reader:new Ext.data.JsonReader({root:"Items",totalProperty:"nbItems",idProperty:"code",fields:[{name:"code"},{name:"iconCls"},{name:"name"},{name:"request_account_uri"}]})});this.storeProject.on("load",function(){this.drawForm()},this)},externalCredentials:function(a,c,d,b){this.authService=a;this.authServiceID=d;Ext.getCmp("login-form-vcsLogin").setValue(c);Ext.getCmp("login-form-vcsLogin").disable();Ext.getCmp("login-form-vcsPasswd").disable();if(b){Ext.getCmp("login-form-email").setValue(b)}Ext.getCmp("login-btn").setText("Anonymous login")},drawForm:function(){var a;if(!a){a=new Ext.Window({layout:"border",width:380,height:270,closable:false,closeAction:"hide",resizable:false,plain:true,title:"Control Access",iconCls:"iconKey",listeners:{show:function(b){a.drawers.e.show();a.drawers.e.setHeight(240)}},plugins:[new Ext.ux.plugins.WindowDrawer({html:'To request a VCS account please read :<div style="text-align: center; margin-top: 20px;"><span id="request-account"></span></div>',side:"s",bodyStyle:"margin: 10px;",animate:true,resizable:false,height:80}),new Ext.ux.plugins.WindowDrawer({title:"&nbsp;&nbsp;Sign in with...",side:"e",animate:true,resizable:false,width:270,height:250,items:[{xtype:"panel",layout:"accordion",border:false,autoHeight:true,defaults:{bodyStyle:"padding:15px;"},layoutConfig:{animate:true,border:false,height:100},items:[{title:"Facebook",id:"accordion-fb",layout:"fit",disabled:(!FB),collapsed:true,iconCls:"iconFacebook",html:'<div id="facebook-box"><div id="fb-root"></div><div id="fb-info"><img style="margin-right:5px" align="left" id="fb-image"> <span id="fb-name"></span><br> <span id="fb-use-credentials">Use this credentials</span><br><br> <a href="#" onclick="FB.logout(); return false;">Sign out</a><br></div><div id="fb-login"><fb:login-button perms="email">Login with Facebook</fb:login-button></div></div>',listeners:{resize:function(b){b.setHeight(100)},afterrender:function(d){if(!FB){new Ext.ToolTip({target:Ext.getCmp("accordion-fb").id,anchor:"bottom",autoShow:true,autoHide:false,closable:true,title:"Error",html:"Error while loading Facebook API"});return}FB.init({appId:"128417830579090",cookie:true,status:true,xfbml:true});Ext.get("fb-info").setVisibilityMode(Ext.Element.DISPLAY);Ext.get("fb-login").setVisibilityMode(Ext.Element.DISPLAY);function b(c){Ext.get("fb-info").setVisible(true);var f=Ext.get("fb-image").dom,e=Ext.get("fb-name").dom;f.src="https://graph.facebook.com/"+c.id+"/picture";e.innerHTML=c.name;Ext.get("fb-use-credentials").on("click",function(){PhDOE_loginPage.externalCredentials("facebook",c.username,c.id,c.email)});Ext.get("fb-login").setVisible(false)}FB.api("/me",function(c){if(!c.error){b(c)}else{Ext.get("fb-info").setVisible(false)}});FB.Event.subscribe("auth.login",function(c){FB.api("/me",function(e){if(!e.error){b(e)}})});FB.Event.subscribe("auth.logout",function(c){Ext.get("fb-login").setVisible(true);Ext.get("fb-info").setVisible(false)})}}},{title:"Google Friend Connect",iconCls:"iconGoogle",id:"accordion-google",disabled:(!google||!google.friendconnect||!google.friendconnect.container),collapsed:true,html:'<div id="google-box"></div>',listeners:{resize:function(b){b.setHeight(100)},afterrender:function(b){if(!google||!google.friendconnect||!google.friendconnect.container){new Ext.ToolTip({target:Ext.getCmp("accordion-google").id,anchor:"left",autoHide:false,closable:true,title:"Error",html:"Error while loading Google Connect API"});return}google.friendconnect.container.loadOpenSocialApi({site:"05056619882644935463",onload:function(){c();b.doLayout()}});function c(){var f={},e=opensocial.newDataRequest();f[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS]=[opensocial.Person.Field.ID,opensocial.Person.Field.NAME,opensocial.Person.Field.THUMBNAIL_URL];e.add(e.newFetchPersonRequest("VIEWER",f),"viewer");e.send(d)}function d(e){var f=e.get("viewer").getData();if(f){document.getElementById("google-box").innerHTML='<img style="margin-right:5px" align="left" src="'+f.getField("thumbnailUrl")+'">'+f.getField("displayName")+"<br><a href=\"#\" onclick=\"PhDOE_loginPage.externalCredentials('google', '"+f.getField("displayName")+"', '"+f.getField("id")+'\' ); return false;">Use this credentials</a><br><br><a href="#" onclick="google.friendconnect.requestSignOut(); return false;">Sign out</a><br>'}else{google.friendconnect.renderSignInButton({id:"google-box",style:"long"})}}}}}]}]})],items:[{xtype:"panel",baseCls:"x-plain",id:"login-logo",region:"center",bodyStyle:"margin:4px 4px 4px 8px",html:'<div id="app-logo"><img src="themes/img/php.png"></div><div id="app-title">PhD O.E.</div><div id="app-description">Php Docbook Online Editor</div>'},{xtype:"form",region:"south",id:"login-form",url:"./do/login",bodyStyle:"padding:5px 5px 0",border:false,height:140,width:350,labelWidth:110,defaults:{width:217},defaultType:"textfield",items:[{xtype:"iconcombo",width:235,fieldLabel:"Project",store:this.storeProject,triggerAction:"all",allowBlank:false,valueField:"code",displayField:"name",iconClsField:"iconCls",iconClsBase:"project",mode:"local",listWidth:235,maxHeight:150,editable:true,id:"login-form-project",name:"projectDisplay",listeners:{afterrender:function(d){if(directAccess){d.focus();d.onLoad();d.setValue(directAccess.project);d.collapse();d.disable()}else{d.setValue("php");var b=d.store.getById("php").data.request_account_uri;Ext.get("request-account").dom.innerHTML='<a href="'+b+'" target="_blank">'+b+"</a>"}},select:function(e,b){var d=b.data.request_account_uri;Ext.get("request-account").dom.innerHTML='<a href="'+d+'" target="_blank">'+d+"</a>"}}},{fieldLabel:"VCS login",name:"vcsLogin",value:(Ext.util.Cookies.get("loginApp"))?Ext.util.Cookies.get("loginApp"):"anonymous",id:"login-form-vcsLogin",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-form-vcsPasswd").focus()}},keyup:function(d,g){var c=this.getValue(),b=Ext.getCmp("login-btn").getText();if(c=="anonymous"||c==""){if(b!="Anonymous login"){Ext.getCmp("login-btn").setText("Anonymous login")}}else{if(b=="Anonymous login"){Ext.getCmp("login-btn").setText("Login")}}},focus:function(c){var b=this.getValue();if(b=="anonymous"){this.setValue("");Ext.getCmp("login-btn").setText("Login")}},blur:function(c){var b=this.getValue();if(b=="anonymous"||b==""){this.setValue("");Ext.getCmp("login-btn").setText("Anonymous login")}}}},{fieldLabel:"VCS password",name:"vcsPassword",id:"login-form-vcsPasswd",inputType:"password",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-form-email").focus()}}}},{fieldLabel:"Email",name:"email",id:"login-form-email",vtype:"email",value:this.email,enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-form-lang").focus()}}}},{xtype:"iconcombo",width:235,fieldLabel:"Language module",store:this.storeLang,triggerAction:"all",allowBlank:false,valueField:"code",displayField:"name",iconClsField:"iconCls",iconClsBase:"flags",mode:"local",value:(Ext.util.Cookies.get("lang"))?Ext.util.Cookies.get("lang"):"en",listWidth:235,maxHeight:150,editable:true,id:"login-form-lang",name:"langDisplay",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-btn").fireEvent("click")}},afterrender:function(b){if(directAccess){b.focus();b.onLoad();b.setValue(directAccess.lang);b.collapse();b.disable()}}}}]}],buttonAlign:"left",buttons:[{text:"Request an account",iconCls:"iconHelp",tabIndex:-1,handler:function(){if(a.drawers.s.hidden){a.drawers.s.show()}else{a.drawers.s.hide()}}},"->",{text:(Ext.util.Cookies.get("loginApp")&&Ext.util.Cookies.get("loginApp")!="anonymous")?"Login":"Anonymous login",id:"login-btn",disabled:false,listeners:{click:function(){if(Ext.getCmp("login-form").getForm().isValid()){Ext.getCmp("login-form").getForm().submit({method:"POST",params:{vcsLogin:Ext.getCmp("login-form-vcsLogin").getValue(),vcsPassword:Ext.getCmp("login-form-vcsPasswd").getValue(),lang:Ext.getCmp("login-form-lang").getValue(),project:Ext.getCmp("login-form-project").getValue(),authService:PhDOE_loginPage.authService,authServiceID:PhDOE_loginPage.authServiceID},waitTitle:"Connecting",waitMsg:"Sending data...",success:function(){window.location.reload()},failure:function(b,c){if(c.response){var d=Ext.util.JSON.decode(c.response.responseText);Ext.Msg.show({title:"Error",msg:d.msg,buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR,fn:function(){Ext.getCmp("login-form-vcsPasswd").focus()}})}}})}}}},{scope:this,text:"Reset",handler:function(){Ext.getCmp("login-form-vcsLogin").enable();Ext.getCmp("login-form-vcsPasswd").enable();Ext.getCmp("login-form-vcsPasswd").setValue("");this.authService="VCS";this.authServiceID="";if(Ext.util.Cookies.get("loginApp")){Ext.getCmp("login-form-vcsLogin").setValue(Ext.util.Cookies.get("loginApp"));Ext.getCmp("login-btn").setText("Login");Ext.getCmp("login-form-email").setValue(Ext.util.Cookies.get("email"))}else{Ext.getCmp("login-form-vcsLogin").setValue("anonymous");Ext.getCmp("login-btn").setText("Anonymous login");Ext.getCmp("login-form-email").setValue("")}}}]})}a.show();Ext.get("loading").remove();Ext.fly("loading-mask").fadeOut({remove:true})}}}();Ext.EventManager.onDocumentReady(PhDOE_loginPage.init,PhDOE_loginPage,true);