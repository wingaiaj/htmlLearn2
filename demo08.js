window.onload = function () {
    updateZJ();
    //当页面加载完成时，我们需要绑定各种事件
    //根据id获取表格
    var fruitTbl = document.getElementById("tbl_fruit");
    //获取表格中所有的行
    var row = fruitTbl.rows;
    for (var i = 1; i < row.length - 1; i++) {
        var tr = row[i];
        //绑定鼠标悬浮以及离开时设置背景颜色事件
        tr.onmouseover = showBGColor;
        tr.onmouseout = clearBGColor;
        //获取tr这一行所有单元格
        var cell = tr.cells;
        var priceTD = cell[1];
        //绑定鼠标悬浮在单价单元格变手势的事件
        priceTD.onmouseover = showHand;
        //绑定鼠标点击单价单元格的事件
        priceTD.onclick = editPrice;
    }
}

//当鼠标点击单价单元格时进行价格编辑
function editPrice() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var priceTD = event.srcElement;
        //目的是判断当前priceTD有子节点 而且第一个子节点还是文本节点 TextNode对应的是3 ElementNode是1
        if (priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            //innerText 表示设置或者获取当前节点的内部文本
            var oldPrice = priceTD.innerText;
            //innerHTML 表示设置当前节点的内部HTML
            priceTD.innerHTML = "<input type='text' size = 4/>";
            //<td><input type = 'text' size = '4'/></td>
            //获取当前标签的第一个子节点
            var input = priceTD.firstChild;
            //名称相同
            if (input.tagName == "INPUT") {
                //input标签值等于设置标签
                input.value = oldPrice;
                //选中输入的文本框
                input.select();
                //绑定输入框失去焦点事件，失去焦点，更新单价
                input.onblur = updatePrice;
            }
        }
    }
}

function updatePrice() {
    if (event && event.srcElement && event.srcElement.tagName == "INPUT") {
        //获取input
        var input = event.srcElement;
        //获取文本框输入的值
        var newPrice = input.value;
        //获取父节点标签
        var priceTD = input.parentElement;
        //更新单价
        priceTD.innerText = newPrice;
    }

    //获取父类节点tr
    var tr = priceTD.parentElement;
    //更新小计单元格
    updateJX(tr);
}

function updateJX(tr) {
    //为行标签
    if (tr && tr.tagName == "TR") {
        //获取所有单元格
        var allCell = tr.cells;
        var Price = allCell[1].innerText;
        var count = allCell[2].innerText;
        //将获取的字符串类型转换为int
        var sum = parseInt(Price) * parseInt(count);
        //更新小计
        allCell[3].innerText = sum;
    }
    //更新总计
    updateZJ();
}

function updateZJ() {
    var fruitTbl = document.getElementById("tbl_fruit");
    var allRows = fruitTbl.rows;
    var sum = 0;
    for (var i = 1; i < allRows.length - 1; i++) {
        var tr = allRows[i];
        //获取的是内部的子节点  innerText调用内部文本进行强转
        var xj = parseInt(tr.cells[3].innerText);// NaN not a number 不是一个数字
        sum = sum + xj;
    }
    allRows[allRows.length - 1].cells[1].innerText = sum;
}

//当鼠标悬浮时，显示背景颜色
function showBGColor() {
    //event : 当前发生的事件
    //event.srcElement : 事件源
    //alert(event.srcElement);
    //alert(event.srcElement.tagName);	--> TD
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        //td.parentElement 表示获取td的父元素 -> TR
        var tr = td.parentElement;
        //如果想要通过js代码设置某节点的样式，则需要加上 .style
        tr.style.backgroundColor = "navy";

        //tr.cells表示获取这个tr中的所有的单元格
        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "white";
        }
    }
}

//当鼠标离开时，恢复原始样式
function clearBGColor() {

    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "transparent";
        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "threeddarkshadow";
        }
    }
}

//当鼠标悬浮在单价单元格时，显示手势
function showHand() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        td.style.cursor = "pointer";
    }

}
