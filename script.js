// установка границы, ее толщины и вида
let tableStyle = document.getElementById("tableStyle");
let tableBorder = document.createElement("div");
let inputBorder = document.createElement("input");
inputBorder.type = "text";
inputBorder.maxLength = 3;
inputBorder.size = 20;
let selectBorder = document.createElement("select");
let borderBtn = document.createElement("button");

let set = new Set;
set.add("none");
set.add("dotted");
set.add("dashed");
set.add("solid");
set.add("double");
set.add("groove");
set.add("ridge");
set.add("inset");
set.add("outset");
for (let item of set) {
	borderStyle = document.createElement("option");
	borderStyle.value = String(item);
	borderStyle.innerHTML = String(item);
	selectBorder.appendChild(borderStyle);
}

borderBtn.innerHTML = "Применить 0px none";
inputBorder.oninput = function() {
	borderBtn.innerHTML = "Применить " + (inputBorder.value == "" ? 0 : inputBorder.value) + "px " + selectBorder.value;
};
selectBorder.oninput = function() {
	borderBtn.innerHTML = "Применить " + (inputBorder.value == "" ? 0 : inputBorder.value) + "px " + selectBorder.value;
};
borderBtn.onclick = function() {
	createTable.tableBorder(inputBorder.value, selectBorder.options[selectBorder.selectedIndex].value);
};

tableBorder.appendChild(inputBorder);
tableBorder.appendChild(selectBorder);
tableBorder.appendChild(borderBtn);
tableStyle.appendChild(tableBorder);

// добавление заголовка
let tableCaption = document.createElement("div");
let inputCaption = document.createElement("input");
let captionBtn = document.createElement("button");
captionBtn.innerHTML = "Добавить заголовок";
captionBtn.onclick = function() {
	createTable.tableCaption(inputCaption.value);
};

tableCaption.appendChild(inputCaption);
tableCaption.appendChild(captionBtn);
tableStyle.appendChild(tableCaption);

// удаление строки
let deleteTableRow = document.createElement("div");
let inputDeleteRow = document.createElement("input");
let deleteRowBtn = document.createElement("button");
deleteRowBtn.innerHTML = "Удалить строку";
deleteRowBtn.onclick = function() {
	createTable.deleteRow(inputDeleteRow.value);
};

deleteTableRow.appendChild(inputDeleteRow);
deleteTableRow.appendChild(deleteRowBtn);
tableStyle.appendChild(deleteTableRow);

// Удаление столбца
let inputDeleteColumn = document.createElement("select");
let deleteTableColumn = document.createElement("div");
let deleteColumnBtn = document.createElement("button");
deleteColumnBtn.innerHTML = "Удалить столбец";
deleteColumnBtn.onclick = function() {
	createTable.deleteColumn(inputDeleteColumn.value);
};

deleteTableColumn.appendChild(inputDeleteColumn);
deleteTableColumn.appendChild(deleteColumnBtn);
tableStyle.appendChild(deleteTableColumn);

// заполняет ячейку (нужна лишь что бы не реюзать код)
function createCell(td){
	let formDiv = document.createElement("span");
	let form = document.createElement("form");
	let textArea = document.createElement("textarea");
	let br = document.createElement("br")
	let button = document.createElement("button");
	let text = document.createElement("span");
	button.classList.add("button-full")
	button.innerHTML = "Save";
	button.type = "button";
	button.onclick = function() {
		text.innerHTML = textArea.value;
		formDiv.hidden = true;
	}
	text.onclick = function() {
		text.innerHTML = "";
		formDiv.hidden = false;
	}
	td.appendChild(text);
	td.appendChild(formDiv);
	formDiv.appendChild(form);
	form.appendChild(textArea);
	form.appendChild(br);
	form.appendChild(button);
}

// кнопка Magic
let rand = document.createElement("div");
let randomBtn = document.createElement("button");
randomBtn.innerHTML = "Magic";
randomBtn.onclick = function() {
	cells = document.getElementsByTagName("td");
	index = Math.floor(Math.random() * cells.length);
	cells[index].style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
	cells[index].style.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
	let font = Math.floor(Math.random() * 13 + 15);
	if (font > 25) {
		cells[index].innerHTML = null;
		createCell(cells[index]);
	} else {
		cells[index].style.fontSize = font + "px";
	}
}
rand.appendChild(randomBtn);
tableStyle.appendChild(rand);

// удаление таблицы
let deleteTable = document.createElement("div");
let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "Удалить таблицу";
deleteBtn.id = "deleteButton"
deleteBtn.onclick = function() {
	createTable.deleteTable();
}

deleteTable.appendChild(deleteBtn);
tableStyle.appendChild(deleteTable);

function createTable(tableStyle) {
	// создание таблицы
	document.getElementById("form").style.display = "none";
	tableStyle.style.display = "flex";
	tableStyle.style.flexFlow = "row wrap";
	tableStyle.style.justifyContent = "center";
	document.getElementById("table").style.display = "flex";
	document.getElementById("table").style.flexFlow = "row wrap";
	document.getElementById("table").style.justifyContent = "center";
	// тут обрезание по размеру (исправил)
	tableWidth = (document.getElementById("width").value > 10 ? 10 : document.getElementById("width").value);
	tableHeight = (document.getElementById("height").value > 10 ? 10 : document.getElementById("height").value);

	let table = document.createElement("table");
	// заполнение таблицы
  	for (i = 0; i < tableHeight; i++) {
  		let tr = table.insertRow(i);
  		for (j = 0; j < tableWidth; j++) {
			let td = tr.insertCell(j);
			td.style.textAlign = "center";
			td.style.verticalAlign = "middle";
			td.classList.add("border");
  			createCell(td);
  		}
  	}
  	let caption = document.createElement("caption");
	table.appendChild(caption);
	document.getElementById("table").appendChild(table);
	updateDeleter(table.rows[0].cells.length);

	// функция изменения границ
	function tableBorder(width, style) { 
		table.style.border = width + "px " + style + " #aaaaaa";
	}
	createTable.tableBorder = tableBorder;

	// функция изменения заголовка
	function tableCaption(value) {
		caption.innerHTML = value;
	}
	createTable.tableCaption = tableCaption;

	// функция удаления строки
	function deleteRow(value) {
		if ((!Number.isInteger(+value)) || (+value > table.rows.length) || (+value <= 0)) {
			alert(value + ": неверное значение. Должно находиться в диапазоне [1;" + table.rows.length + "]");
		}
		else {
			table.deleteRow(value - 1);
		}
	}
	createTable.deleteRow = deleteRow;

	// удаление колонки
	function deleteColumn(value) {
		if ((!Number.isInteger(+value)) || (+value > table.rows[0].cells.length) || (+value <= 0)) {
			alert(value + ": неверное значение. Должно находиться в диапазоне [1;" + table.rows[0].cells.length + "]");
		}
		else {
			row = table.rows;
			for (var j = 0; j < row.length; j++) { 
                row[j].deleteCell(value - 1); 
			}
			updateDeleter(table.rows[0].cells.length);
		} 
	}
	createTable.deleteColumn = deleteColumn;

	// функция удаления таблицы
	function deleteTable() {
		table.remove();
		tableStyle.style.display = "none";
		document.getElementById("table").style.display = "none";
		document.getElementsByTagName("form")[0].reset();
		document.getElementById("form").style.display = "flex";
		document.getElementById("form").style.flexFlow = "row wrap";
		document.getElementById("form").style.justifyContent = "center";
	}
	createTable.deleteTable = deleteTable;

	// обновлять выпадающий список в удалении колонок
	function updateDeleter(value){
		inputDeleteColumn.innerHTML = '';
		for (var i = 1; i < value + 1; i++) {
			option = document.createElement("option");
			option.value = String(i);
			option.innerHTML = String(i);
			inputDeleteColumn.appendChild(option);
		}
	}
}