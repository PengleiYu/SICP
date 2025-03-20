import {display_list, head, length, list, math_floor, pair, tail} from "sicp";
import {intersection_set, list_to_tree, make_tree, union_set} from "./set_of_binary_tree.js";

// 二叉树借助有序表实现交集并集操作
(function () {
    // 练习2.65 利用练习2.63和练习2.64的结果，给出对采用（平衡）二叉树方式实现的集合的union_set和intersection_set操作的Θ(n)实现

    (function () {
        const set1 = list_to_tree(list(1, 3, 4, 6, 8, 9));
        const set2 = list_to_tree(list(2, 3, 5));
        display_list(list("set1", set1));
        display_list(list("set2", set2));
        display_list(intersection_set(set1, set2));
        display_list(intersection_set(set2, set1));
        display_list(union_set(set1, set2));
        display_list(union_set(set2, set1));
    })();
})();
