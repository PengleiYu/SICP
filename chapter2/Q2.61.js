import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair, append} from "sicp";
import {adjoin_set} from "./set_of_order.js";


// 排序表实现adjoin_set
(function () {
    // 练习2.61 请给出排序表示时adjoin_set的实现。通过类似is_element_of_set的方法，说明如何利用排序的优势得到一个函数，其所需平均步数可能是未排序表示时的一半。
    const set = list(3, 4, 5, 8);
    display_list(adjoin_set(1, set));
    display_list(adjoin_set(5, set));
    display_list(adjoin_set(7, set));
    display_list(adjoin_set(10, set));
    display_list(adjoin_set(11, null));
})();
