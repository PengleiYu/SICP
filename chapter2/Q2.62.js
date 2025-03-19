import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair, append} from "sicp";
import {union_set} from "./set_of_order.js";

// 排序表实现union_set
(function () {
    // 练习2.62 请给出在集合的排序表示上union_set的一个Θ(n)实现。
    const set1 = list(4, 8, 9);
    display_list(union_set(set1, list(1, 2)));
    display_list(union_set(set1, list(7, 8, 9)));
    display_list(union_set(set1, list(1, 5, 7)));
})();
