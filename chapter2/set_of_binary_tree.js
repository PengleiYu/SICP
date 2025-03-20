import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";

//集合作为二叉树
function make_tree(entry, left, right) {
    return list(entry, left, right);
}

function entry(tree) {
    return head(tree);
}

function left_branch(tree) {
    return head(tail(tree));
}

function right_branch(tree) {
    return head(tail(tail(tree)));
}

// 对比当前节点元素，若相等则找到，若小于则递归左子树，若大于则递归右子树
function is_element_of_set(x, set) {
    return is_null(set)
        ? false
        : x === entry(set)
            ? true
            : x < entry(set)
                ? is_element_of_set(x, left_branch(set))
                : is_element_of_set(x, right_branch(set));
}

function adjoin_set(x, set) {
    return is_null(set)
        ? make_tree(x, null, null)
        : x === entry(set)
            ? set
            : x < entry(set)
                ? make_tree(entry(set), adjoin_set(x, left_branch(set)), right_branch(set))
                : make_tree(entry(set), left_branch(set), adjoin_set(x, right_branch(set)));
}

export {
    is_element_of_set,
    make_tree,
    adjoin_set,
}
