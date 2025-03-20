import {display_list, head, length, list, math_floor, pair, tail} from "sicp";
import {make_tree} from "./set_of_binary_tree.js";


// 有序表构造平衡二叉树
(function () {
    // 练习2.64 下面的函数list_to_tree把一个有序表变换为一棵平衡二叉树。其中辅助函数partial_tree以整数n和一个至少包含n个元素的表为参数，
    // 构造出一棵包含该表前n个元素的平衡树。由partial_tree返回的结果是一个序对（用pair构造）​，其head是构造出的树，
    // 其tail是没有包含在树里那些元素的表。
    function list_to_tree(elements) {
        return head(partial_tree(elements, length(elements)));
    }

    function partial_tree(elts, n) {
        if (n === 0) {
            return pair(null, elts);
        }
        const left_size = math_floor((n - 1) / 2);
        const left_result = partial_tree(elts, left_size);
        const left_tree = head(left_result);
        const non_left_elts = tail(left_result);
        const right_size = n - (left_size + 1);
        const this_entry = head(non_left_elts);
        const right_result = partial_tree(tail(non_left_elts), right_size);
        const right_tree = head(right_result);
        const remaining_elts = tail(right_result);
        return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
    }

    // a.请简要并尽可能清楚地解释为什么partial_tree能完成所需的工作。请画出把list_to_tree应用于表list(1, 3, 5, 7, 9, 11)生成的树。
    // 先取左一半元素用于构造左子树，右一半元素构造右子树，中间元素作为根节点；递归构造子树过程中都是保证左右平衡的。
    (function () {
        const list1 = list(1, 3, 5, 7, 9, 11,);
        display_list(list1);
        display_list(list_to_tree(list1));
    })();

    // b.list_to_tree转换n个元素的表，所需的步数以什么量级增长？
    // 每个元素都只遍历一次，没有重复遍历，所以是O(n)
})();
