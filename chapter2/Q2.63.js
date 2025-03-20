import {append, display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {adjoin_set, entry, left_branch, make_leaf, make_tree, right_branch} from "./set_of_binary_tree.js";

// 二叉树转换为列表
(function () {
    // 练习2.63 下面两个函数都能把树变换为表：
    // [插图]
    function tree_to_list_1(tree) {
        return is_null(tree)
            ? null
            : append(tree_to_list_1(left_branch(tree)),
                pair(entry(tree), tree_to_list_1(right_branch(tree))));
    }

    function tree_to_list_2(tree) {
        function copy_to_list(tree, result_list) {
            return is_null(tree)
                ? result_list
                : copy_to_list(left_branch(tree),
                    pair(entry(tree),
                        copy_to_list(right_branch(tree),
                            result_list)));
        }

        return copy_to_list(tree, null);
    }

    // a.这两个函数对所有的树都生成同样的结果吗？如果不是，它们生成的结果有什么不同？它们对图2.16中的那些树生成怎样的表？
    // 这两个函数遍历顺序不同，tree_to_list_1先遍历左子树，再遍历右子树，而tree_to_list_2先遍历右子树，再遍历左子树。
    // 但二者生成的结果是一样的。

    // 表示集合{1, 3, 5, 7, 9, 11}的几棵树
    const set1 = make_tree(7,
        make_tree(3,
            make_leaf(1),
            make_leaf(5)),
        make_tree(9, null, make_leaf(11)));
    const set2 = make_tree(3,
        make_leaf(1),
        make_tree(7,
            make_leaf(5),
            make_tree(9, null, make_leaf(11))));
    const set3 = make_tree(5,
        make_tree(3, make_leaf(1), null),
        make_tree(9,
            make_leaf(7),
            make_leaf(11)));
    // 完全不平衡的树
    const set4 = make_tree(1, null,
        make_tree(3, null,
            make_tree(5, null,
                make_tree(7, null,
                    make_tree(9, null,
                        make_tree(11, null, null))))));
    [set1, set2, set3, set4,].forEach(value => {
        display_list(value);
        display_list(tree_to_list_1(value));
        display_list(tree_to_list_2(value));
    })


    // b.把n个结点的平衡树变换为表时，这两个函数所需的步数具有同样量级的增长速度吗？如果不一样，哪个增长得慢些？
    // tree_to_list_1的右子树遍历次数n/2,左子树遍历次数n/2,但二者合并时还会再遍历左列表一次，每层共n步，层级为log(n)，所以应该为O(nlog(n))
    // tree_to_list_2只涉及当前节点和结果列表的合并，所以应该为O(n)
})();
