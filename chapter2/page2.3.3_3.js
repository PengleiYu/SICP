import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {make_tree, is_element_of_set, adjoin_set} from "./set_of_binary_tree.js";

(function () {
    function make_leaf(value) {
        return make_tree(value, null, null);
    }

    // 集合作为二叉树
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
                    make_tree(9, null, null)))));

    [set1, set2, set3, set4].forEach(value => {
        display_list(value);
        display_list(list("is_element_of", 5, is_element_of_set(5, value)));
        display_list(list("is_element_of", 2, is_element_of_set(2, value)));
        display_list(list("adjoin_set", 5, adjoin_set(5, value)));
        display_list(list("adjoin_set", 2, adjoin_set(2, value)));
    });
})();
