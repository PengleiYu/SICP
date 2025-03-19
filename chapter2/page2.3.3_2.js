import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {intersection_set, is_element_of_set} from "./set_of_order.js";

(function () {
    // 集合作为排序的表
    const set1 = list(1, 2, 4, 5);
    display_list(is_element_of_set(2, set1));
    display_list(intersection_set(set1, list(2, 4, 6)));
})();
