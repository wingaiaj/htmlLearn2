window.onload = function () {
    updateSumPrice();
    //获取表元素
    var fruitTbl = document.getElementById("tbl_fruit");
    //获取所有行
    var allRows = fruitTbl.rows;
    for (var i = 1; i < allRows.length - 1; i++) {
        //取出行元素
        var tr = allRows[i];
        updateDate(tr);
    }

    var button1 = document.getElementById("bt1");
    button1.onclick = addRow;

    var button2 = document.getElementById("bt2");
    button2.onclick = reset;

}
//重置
function reset() {
    document.getElementById("name").value = null;
    document.getElementById("price").value = null;
    document.getElementById("count").value = null;
}

function updateDate(tr) {
    //鼠标悬浮
    tr.onmouseover = showBGColor;
    tr.onmouseout = clearBGColor;
    //获取所有单元格
    var allCells = tr.cells;
    //单价单元格
    var TDPrice = allCells[1];
    //鼠标悬浮改变光标
    TDPrice.onmouseover = showHand;
    //鼠标点击修改单价
    TDPrice.onclick = alterPrice;
    //删除图标获取 获取第一个节点
    var del = allCells[4].firstChild;
    //删除行
    del.onclick = delRow;
}


//添加行
function addRow() {
    var name = document.getElementById("name").value;
    var price = parseInt(document.getElementById("price").value);
    var count = parseInt(document.getElementById("count").value);
    var litSum = price * count;

    var fruitTbl = document.getElementById("tbl_fruit");
    var newTr = fruitTbl.insertRow(fruitTbl.rows.length - 1);

    var nameTd = newTr.insertCell()
    nameTd.innerText = name;

    var priceTD = newTr.insertCell()
    priceTD.innerText = price;

    var countTD = newTr.insertCell()
    countTD.innerText = count;

    var litSumTD = newTr.insertCell()
    litSumTD.innerText = litSum;

    var imgTD = newTr.insertCell()
    imgTD.innerHTML = "<img src ='image/Delete.png'/>";

    updateDate(newTr);

    updateSumPrice();
}

//限制键盘输入
function ckInput() {
    //96 0-9 105   48 0-9 57  enter 13  backspace 8
    var kc = event.keyCode;
    // console.log(kc);
    if (!((kc >= 96 && kc <= 105) || kc == 8 || kc == 13)) {
        event.returnValue = false;
    }
    if (kc == 13) {
        event.srcElement.blur;
    }
}

//单击del图标时删除一行
function delRow() {
    if (event && event.srcElement && event.srcElement.tagName == "IMG") {
        if (window.confirm("是否确认删除当前库存记录")) {
            var img = event.srcElement;
            var tr = img.parentElement.parentElement;
            var fruitTbl = document.getElementById("tbl_fruit");
            fruitTbl.deleteRow(tr.rowIndex);

            updateSumPrice();
        }
    }
}

//当鼠标悬浮时，显示背景颜色
function showBGColor() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        //获取列元素
        var td = event.srcElement;
        //获取父节点行元素
        var tr = td.parentElement;
        //设置行背景颜色
        tr.style.backgroundColor = "dimgray";
        //设置行字体颜色
        var allCell = tr.cells;
        for (var i = 0; i < allCell.length; i++) {
            allCell[i].style.color = "white";
        }
    }
}

//当鼠标离开时，恢复颜色
function clearBGColor() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        //获取列元素
        var td = event.srcElement;
        //获取父节点行元素
        var tr = td.parentElement;
        //设置行背景颜色
        tr.style.backgroundColor = "transparent";
        //设置行字体颜色
        var allCell = tr.cells;
        for (var i = 0; i < allCell.length; i++) {
            allCell[i].style.color = "threeddarkshadow";
        }
    }
}

//修改单价
function alterPrice() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        //td标签
        var priceTD = event.srcElement;
        //td标签的子节点存在 并且为文本类型
        if (priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            var oldPrice = priceTD.innerText;
            //写入html
            priceTD.innerHTML = "<input type='text' size = 4/>";
            //获取当前节点子节点
            var input = priceTD.firstChild;
            //字节点为INPUT
            if (input.tagName == "INPUT") {
                //选中的值为原值
                input.value = oldPrice;
                input.select();
                //失去焦点 更新数据
                input.onblur = updatePrice;
                //键盘输入的值
                input.onkeydown = ckInput;
            }
        }
    }
}

//更新总价
function updateSumPrice() {
    var fruitTbl = document.getElementById("tbl_fruit");
    var allRows = fruitTbl.rows;
    var sum = 0;
    for (var i = 1; i < allRows.length - 1; i++) {
        var cont = allRows[i].cells[3].innerText;
        sum = sum + parseInt(cont);
    }
    allRows[allRows.length - 1].cells[1].innerText = sum;
}

//更新小计
function updateLitSum(tr) {
    if (tr && tr.tagName == "TR") {
        var allCells = tr.cells;
        var price = allCells[1].innerText;
        var count = allCells[2].innerText;
        var sum = parseInt(price) * parseInt(count);
        allCells[3].innerText = sum;
    }
}

//在单价处显示鼠标图标
function showHand() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        td.style.cursor = "pointer"
    }
}


//更新单价数据
function updatePrice() {
    var fruit_tbl = document.getElementById("tbl_fruit");
    var allRows = fruit_tbl.rows;
    for (var i = 1; i < allRows.length - 1; i++) {
        //获取文本框输入
        var priceTD = allRows[i].cells[1];
        var input = priceTD.firstChild;
        if (input && input.tagName == "INPUT") {
            priceTD.innerText = input.value;
            var tr = priceTD.parentElement;
            updateLitSum(tr);
        }
    }
    updateSumPrice();
}

