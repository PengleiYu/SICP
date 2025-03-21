import {display_list, head, length, list, math_floor, pair, tail} from "sicp";
import {intersection_set, list_to_tree, lookup, make_tree, union_set} from "./set_of_binary_tree.js";

// 二叉树实现lookup函数
(function () {
    // 练习2.66 假设用二叉树结构实现记录的集合，其中的记录按作为键值的数值排序。请实现相应的lookup函数。
    const set1 = list_to_tree(list(1, 3, 4, 6, 8, 9));
    display_list(lookup(2, set1));
    display_list(lookup(3, set1));
})();
