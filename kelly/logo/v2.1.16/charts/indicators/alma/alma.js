define(["jquery","jquery-ui","color-picker","lodash","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,e){require(["css!charts/indicators/alma/alma.css"]),require(["text!charts/indicators/alma/alma.html","text!charts/indicators/indicators.json"],function(f,g){var h="#cd0a0a";f=a(f),f.appendTo("body"),g=JSON.parse(g);var i=g.alma;f.attr("title",i.long_display_name),f.find(".alma-description").html(i.description),f.find("input[type='button']").button(),f.find("#alma_stroke").colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#alma_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted},ok:function(b,c){a("#alma_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted}});var j="Solid";a("#alma_dashStyle").ddslick({imagePosition:"left",width:155,background:"white",onSelected:function(b){a("#alma_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","120px"),j=b.selectedData.value}}),a("#alma_dashStyle .dd-option-image").css("max-height","5px").css("max-width","120px"),f.dialog({autoOpen:!1,resizable:!1,modal:!0,width:350,height:400,my:"center",at:"center",of:window,dialogClass:"alma-ui-dialog",buttons:[{text:"OK",click:function(){var c=!0;if(a("#alma_period,#alma_sigma").each(function(){var b=a(this);return _.isInteger(_.toNumber(b.val()))&&_.inRange(b.val(),parseInt(b.attr("min")),parseInt(b.attr("max"))+1)?void 0:(require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),c=!1,void b.val(b.prop("defaultValue")))}),c){var e=f.find("#alma_offset");if(!_.inRange(e.val(),parseInt(e.attr("min")),parseInt(e.attr("max"))+.01))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+e.attr("min")+" to "+e.attr("max")+" is allowed for "+e.closest("tr").find("td:first").text()+"!"})}),void e.val(e.prop("defaultValue"));var g={period:parseInt(f.find("#alma_period").val()),sigma:parseInt(f.find("#alma_sigma").val()),offset:parseFloat(f.find("#alma_offset").val()),stroke:h,strokeWidth:parseInt(f.find("#alma_strokeWidth").val()),dashStyle:j,appliedTo:parseInt(f.find("#alma_appliedTo").val())};d&&d(),a(a(".alma").data("refererChartID")).highcharts().series[0].addIndicator("alma",g),b.call(f)}}},{text:"Cancel",click:function(){b.call(this)}}]}),f.find("select").each(function(b,c){a(c).selectmenu({width:155}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof e&&e(c)})}var d=null;return{open:function(b,e){d=e||d;var f=function(){a(".alma").data("refererChartID",b).dialog("open")};0==a(".alma").length?c(b,this.open):f()}}});