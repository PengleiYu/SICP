import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {adjoin_set, intersection_set, is_element_of_set} from "./set_of_unorder.js";

// 2.3.3 实例：集合的表示：集合作为不排序的表
(function () {
    const set1 = list(5, 3, 2, 4, 1);
    display_list(is_element_of_set(2, set1));
    display_list(adjoin_set(10, set1));
    display_list(intersection_set(set1, list(2, 4)));
})();
