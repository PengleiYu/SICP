import {display_list, list} from "sicp";
import {union_set} from "./set_of_unorder.js";


// 用无序表实现union_set
(function () {
// 练习2.59 请为用不排序的表表示的集合实现union_set操作。
    const set1 = list(3, 2, 1);
    const set2 = list(3, 4, 5);
    display_list(union_set(set1, set2));
})();
