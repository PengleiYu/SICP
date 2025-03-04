import {append, display_list, display, head, is_null, is_pair, list, map, pair, tail} from "sicp";

// 实现列表equals函数
(function () {
    // 练习2.54 两个表equal，如果它们包含同样元素，而且这些元素按同样顺序排列。例如：
    display(equal(list("this", "is", "a", "list"), list("this", "is", "a", "list")));
    // 是真，而
    display(equal(list("this", "is", "a", "list"), list("this", list("is", "a"), "list")));
    // 是假。说得更准确些，我们可以从数和串的基本等词===出发，以递归的方式定义equal：a和b是equal的，如果它们都是数或者都是串，而且它们满足===；
    // 或者它们都是序对，而且head(a)与head(b)是equal的，tail(a)和tail(b)也是equal的。请利用这一思想，把equal实现为一个函数。

    function equal(list1, list2) {
        return is_null(list1) && is_null(list2)
            ? true
            : is_null(list1) || is_null(list2)
                ? false
                : is_pair(list1) && is_pair(list2)
                    ? equal(head(list1), head(list2)) && equal(tail(list1), tail(list2))
                    : is_pair(list1) || is_pair(list2)
                        ? false
                        : list1 === list2;
    }
})()
