import {display, display_list, head, is_null, list, tail,} from "sicp";

// 实现序列的last_pair函数
(function () {
    // 练习2.17 请声明一个函数last_pair，对给定的（非空）表，它返回只包含表中最后一个元素的表：

    function last_pair(items) {
        let tail_items = tail(items);
        return is_null(tail_items)
            ? items
            : last_pair(tail_items);
    }

    const l = list(23, 72, 149, 34);
    display_list(last_pair(l));

    function last_element(items) {
        let tail_items = tail(items);
        return is_null(tail_items)
            ? head(items)
            : last_element(tail_items);
    }

    display(last_element(l));
})()
