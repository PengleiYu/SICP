import {append, display_list, display, head, is_null, is_pair, list, map, pair, tail} from "sicp";

// 打印包含字符串的列表
(function () {
    function member(item, x) {
        return is_null(x)
            ? null
            : item === head(x)
                ? x
                : member(item, tail(x));
    }

    // 练习2.53 对下面各表达式求值的结果是什么？请分别用盒子记法和表记法说明。
    const arr = [
        list("a", "b", "c"),
        list(list("george")),
        tail(list(list("x1", "x2"), list("y1", "y2"))),
        tail(head(list(list("x1", "x2"), list("y1", "y2")))),
        member("red", list("blue", "shoes", "yellow", "socks")),
        member("red", list("red", "shoes", "blue", "socks")),
    ];
    arr.forEach(value => {
        display(value);
        display_list(value);
    })
})()
