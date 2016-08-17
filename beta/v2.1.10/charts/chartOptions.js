define(["jquery","common/rivetsExtra","charts/chartWindow","charts/charts","moment","charts/chartingRequestMap","common/util"],function(a,b,c,d,e,f){function g(a){a.showTimePeriodSelector=!1,a.toggleLoadSaveSelector(null,a),a.toggleChartTypeSelector(null,a),a.toggleDrawingToolSelector(null,a),a.toggleExportSelector(null,a)}function h(b,c){"table"==c?(m[b.newTabId].showChartTypeSelector=!1,b.tableViewCallback&&b.tableViewCallback()):(m[b.newTabId].chartType=q.filter(function(a){return a.value==c})[0],m[b.newTabId].showChartTypeSelector=!1,d.refresh("#"+b.newTabId+"_chart",null,c),a("#"+b.newTabId).trigger("chart-type-changed",c)),g(b)}function i(b){var c=!1,d=a(b).highcharts();return d&&d.series.forEach(function(a){"percent"===a.options.compare&&(c=!0)}),c}function j(a,b){b?(m[a].chartTypes=q,m[a].chartTypes[1].showBorder=!0):m[a].chartTypes=q.filter(function(a){return"candlestick"!==a.value&&"ohlc"!==a.value})}function k(a,b){var c=b.find(".loadSaveOverlay"),d=b.find(".exportOverlay"),e=b.find(".timeperiod"),f=b.find(".chart_type"),g=b.find('[data-balloon="Share chart"]'),h=b.width()-(g.offset().left+g.outerWidth()-b.offset().left)-10,i=getParameterByName("affiliates")||"false";b.width()>420?(m[a].showChartTypeLabel=!0,m[a].timePeriod_name=m[a].timePeriod.name,e.css("width","87px"),f.css("width","97px")):(m[a].showChartTypeLabel=!1,m[a].timePeriod_name=m[a].timePeriod.value.toUpperCase(),e.css("width","50px"),f.css("width","45px")),h>0?"false"===i&&(c.css("right",h+35+"px"),d.css("right",h+"px")):"false"===i&&(c.css("right","60px"),d.css("right","25px"))}function l(){q.forEach(function(a){"table"!==a.value&&((new Image).src="images/"+a.value+"-w.svg")}),(new Image).src="images/share-w.svg",(new Image).src="images/drawing-w.svg",(new Image).src="images/load-save-icon-w.svg"}var m=[],n=[],o={},p=[{value:"1t",name:"1 Tick",type:"ticks"},{value:"1m",name:"1 Minute",type:"minutes"},{value:"2m",name:"2 Minutes",type:"minutes"},{value:"3m",name:"3 Minutes",type:"minutes"},{value:"5m",name:"5 Minutes",type:"minutes"},{value:"10m",name:"10 Minutes",type:"minutes"},{value:"15m",name:"15 Minutes",type:"minutes"},{value:"30m",name:"30 Minutes",type:"minutes"},{value:"1h",name:"1 Hour",type:"hours"},{value:"2h",name:"2 Hours",type:"hours"},{value:"4h",name:"4 Hours",type:"hours"},{value:"8h",name:"8 Hours",type:"hours"},{value:"1d",name:"1 Day",type:"days"}],q=[{value:"candlestick",name:"Candles"},{value:"ohlc",name:"OHLC"},{value:"line",name:"Line"},{value:"dot",name:"Dot"},{value:"linedot",name:"Line Dot"},{value:"spline",name:"Spline"},{value:"table",name:"Table"}];return i18n_name=(local_storage.get("i18n")||{value:"en"}).value,urlShareTemplate="https://webtrader.binary.com?affiliates=true&instrument={0}&timePeriod={1}&lang="+i18n_name,iframeShareTemplate='<iframe src="'+urlShareTemplate+'" width="350" height="400" style="overflow-y : hidden;" scrolling="no" />',twitterShareTemplate="https://twitter.com/share?url={0}&text={1}",fbShareTemplate="https://facebook.com/sharer/sharer.php?u={0}",gPlusShareTemplate="https://plus.google.com/share?url={0}",bloggerShareTemplate="https://www.blogger.com/blog-this.g?u={0}&n={1}",vkShareTemplate="http://vk.com/share.php?url={0}&title={1}",{init:function(e,r,s,t,u,v){require(["text!charts/chartOptions.html","css!charts/chartOptions.css"],function(w){n[e]&&n[e].unbind(),m[e]={newTabId:e,timePeriod:p.filter(function(a){return r==a.value})[0],chartType:q.filter(function(a){return a.value==s})[0],tableViewCallback:t,instrumentName:u,instrumentCode:v,indicatorsCount:0,overlayCount:0,showTimePeriodSelector:!1,showChartTypeSelector:!1,showTableOption:!0,enableCrosshair:!0,showDrawingToolSelector:!1,showExportSelector:!1,showLoadSaveSelector:!1,exportChartURLShare:urlShareTemplate.format(v,r),exportChartIframeShare:iframeShareTemplate.format(v,r),fbShareLink:fbShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),twitterShareLink:twitterShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),gPlusShareLink:gPlusShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),bloggerShareLink:bloggerShareTemplate.format(urlShareTemplate.format(v,r),u+"("+r+")"),vkShareLink:vkShareTemplate.format(urlShareTemplate.format(v,r),u+"("+r+")")},n[e]=null,m[e].toggleTimerPeriodSelector=function(a,b){var c=!b.showTimePeriodSelector;g(b),b.showTimePeriodSelector=c},m[e].toggleChartTypeSelector=function(b,c){var d=!c.showChartTypeSelector,e=a("#"+c.newTabId+" .chart_type .img img")[0];1==d&&b?(g(c),c.showChartTypeSelector=d,e.src=e.src.replace(".svg","-w.svg")):(c.showChartTypeSelector=!1,e.src=e.src.replace("-w",""))},m[e].addRemoveIndicator=function(a,b){require(["charts/indicators/indicatorManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod.value+")";a.openDialog("#"+b.newTabId+"_chart",c)}),g(b)},m[e].addRemoveOverlay=function(a,b){require(["charts/overlay/overlayManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod.value+")";a.openDialog("#"+b.newTabId+"_chart",c)}),g(b)},m[e].changeChartType=function(b,c){var d=a(b.target).attr("data-charttype");d&&h(c,d)},m[e].changeTimePeriod=function(b,l){var m=b.target.dataset.timeperiod;if(m){f.unregister(f.keyFor(l.instrumentCode,l.timePeriod.value),"#"+l.newTabId+"_chart"),l.timePeriod=p.filter(function(a){return m==a.value})[0],k(l.newTabId,a("#"+l.newTabId));var n=isTick(m);!n||"candlestick"!==l.chartType.value&&"ohlc"!==l.chartType.value||h(l,"line"),j(l.newTabId,!n&&!i("#"+e+"_chart")),d.refresh("#"+l.newTabId+"_chart",m,l.chartType.value),"true"===getParameterByName("affiliates")?d.changeTitle("#"+l.newTabId+"_chart",l.instrumentName+" ("+m+")"):c.changeChartWindowTitle(l.newTabId,l.instrumentName,m),g(l),l.exportChartURLShare=urlShareTemplate.format(l.instrumentCode,m),l.exportChartIframeShare=iframeShareTemplate.format(l.instrumentCode,m),l.fbShareLink=fbShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),l.twitterShareLink=twitterShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),l.gPlusShareLink=gPlusShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),l.bloggerShareLink=bloggerShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),l.vkShareLink=vkShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),a("#"+l.newTabId).trigger("chart-time-period-changed",m)}},j(e,!isTick(r)&&!i("#"+e+"_chart")),t||(m[e].showTableOption=!1),m[e].toggleCrosshair=function(a,b){b.enableCrosshair=!b.enableCrosshair,require(["charts/crosshair"],function(a){a.toggleCrossHair("#"+b.newTabId+"_chart")}),g(b)},m[e].toggleDrawingToolSelector=function(b,c){var d=!c.showDrawingToolSelector,e=a("#"+c.newTabId+' [data-balloon="Drawing tools"] .img img')[0];1==d&&b?(g(c),c.showDrawingToolSelector=d,e.src=e.src.replace(".svg","-w.svg")):(c.showDrawingToolSelector=!1,e.src=e.src.replace("-w",""))},m[e].addDrawingTool=function(b,c){var d=b.target.dataset.drawingtool;d&&(require(["charts/draw/highcharts_custom/"+d],function(b){var d="#"+c.newTabId+"_chart";a(d).highcharts().annotate=!0,b.init(d)}),g(c))},m[e].toggleExportSelector=function(b,c){var d=!c.showExportSelector,e=a("#"+c.newTabId+' [data-balloon="Share chart"] .img img')[0];1==d&&b?(g(c),c.showExportSelector=d,e.src=e.src.replace(".svg","-w.svg")):(c.showExportSelector=!1,e.src=e.src.replace("-w",""))},m[e].toggleLoadSaveSelector=function(b,c){var d=!c.showLoadSaveSelector,e=a("#"+c.newTabId+' [data-balloon="Chart template"] .img img')[0];1==d&&b?(g(c),c.showLoadSaveSelector=d,e.src=e.src.replace(".svg","-w.svg")):(c.showLoadSaveSelector=!1,e.src=e.src.replace("-w",""))},m[e]["export"]=function(b,c){var e=b.target.dataset.exporttype;if(e){var f="#"+c.newTabId+"_chart",h=a(f).highcharts();switch(e){case"png":h.exportChartLocal();break;case"pdf":h.exportChart({type:"application/pdf"});break;case"csv":d.generate_csv(h,a(f).data());break;case"svg":h.exportChartLocal({type:"image/svg+xml"})}g(c)}},a("#"+e).on("chart-indicators-changed",function(a,b){m[e].indicatorsCount=b.get_indicators().length}),m[e].overlayCount=a("#"+e+"_chart").data("overlayCount"),a("#"+e).on("chart-overlay-add",function(){var b=a("#"+e+"_chart").highcharts();m[e].overlayCount=b.get_overlay_count()}),a("#"+e).on("chart-overlay-remove",function(){var b=a("#"+e+"_chart").highcharts();m[e].overlayCount=b.get_overlay_count()}),a("#"+e).on("resize-event",function(){k(e,a(this))}),l();var x=a(w);a("#"+e+"_header").prepend(x),k(e,a("#"+e)),n[e]=b.bind(x[0],m[e]),require(["charts/chartTemplateManager"],function(a){var b=x.find(".chart-template-manager-root");o[e]=a.init(b,e)})})},updateOptions:function(b,e,f,g,h){var i=m[b];i&&(i.chartType=q.filter(function(a){return a.value==e})[0],i.timePeriod=p.filter(function(a){return f==a.value})[0],i.indicatorsCount=g,i.overlayCount=h,j(b,!isTick(f)&&h>0),k(b,a("#"+b)),"true"===getParameterByName("affiliates")?d.changeTitle("#"+b+"_chart",m[b].instrumentName+" ("+f+")"):c.changeChartWindowTitle(b,m[b].instrumentName,f))},disableEnableCandlestickAndOHLC:function(a,b){m[a]&&j(a,b)},selectChartType:function(a,b,c){c?m[a].changeChartType(m[a],b):m[a].chartType=q.filter(function(a){return a.value==b})[0]},cleanBinding:function(a){n[a]&&(n[a].unbind(),o[a]&&o[a].unbind(),delete o[a],delete n[a],delete m[a])},setIndicatorsCount:function(a,b){m[b].indicatorsCount=a}}});