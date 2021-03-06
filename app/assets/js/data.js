// var headerTableCell = [];
var COLORS = ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba'];
function renderData() {
	chartTitle ="";

	headerTableCell = [];
	if (dataRender.length > 0) {
		$.each(dataRender[0], function (i, val) {
			headerTableCell.push(val);
		});	
		dataRender.shift();	
		gridView(headerTableCell, dataRender);
	} else {
		$('#gridView .errorGrid').removeClass('noData');
	}
}
function gridView(headerData, innerData) {
	
	xAxisUi = "";
	htmlHeader = "<tr>";
	headerClass=[];
	$.each(headerData, function (key, val) {
		val=val+ "";
		b=md5(val);
		headerClass.push(b);
		if (b != undefined) {
			xAxisUi += "<option value='" + b + "' data-ref='" + val + "'>" + val + "</option>";
			colorInput = "<input type='color' class='pull-right clr" + removeSpecials(b) + "'  name='clr" + removeSpecials(b) + "' id='colorval' value='"+COLORS[key]+"'>";
			checkbox = "<input type='checkbox' class='cb" + removeSpecials(b) + "' value='" + removeSpecials(b) + "' name='yaxis'>";
			//colorInput = "<input type='color' class='clr" + removeSpecials(b) + "'  name='clr" + removeSpecials(b) + "'>";
			htmlHeader += "<th data-value='" + removeSpecials(b) + "' data-ref='" + val + "' class='" + removeSpecials(b) + "' ><label>" + checkbox + val + " " + colorInput + "</label></td>";
		}
	});
	htmlHeader += "</tr>";
	$("#gridView > table > thead").html(htmlHeader);
	$("#xaxis").html(xAxisUi);
	htmlInner = "";
	$.each(innerData, function (a, b) {
		htmlInner += "<tr>";
		$.each(b, function (a1, b1) {
			htmlInner += "<td data-value='" + b1 + "' contenteditable='true' class='" + removeSpecials(headerClass[a1]) + "  edittext'>" + b1 + "</td>";
		});
		htmlInner += "</tr>";
	});
	$("#gridView > table > tbody").html(htmlInner);
	$("#zoom").css({"display": "block"});
	$("#addrow").css({"display": "block"});
	$('#fileUpload').val("");
}
function removeSpecials(str) {
	string = String(str).replace(/[^a-zA-Z0-9]/g, "");
	return string;
}