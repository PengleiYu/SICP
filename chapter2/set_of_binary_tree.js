import {head, is_null, length, list, math_floor, pair, tail} from "sicp";
import {union_set as union_order_list, intersection_set as intersection_order_list} from "./set_of_order.js";


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

function tree_to_list(tree) {
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


function list_to_tree(elements) {
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

    return head(partial_tree(elements, length(elements)));
}

// 交集和并集：先将二叉树转有序列表，再对有序列表求交集和并集，最后再转回二叉树
// 效率比较低，如果直接在二叉树上做操作，效率会高很多，但是实现起来比较复杂
function union_set(set1, set2) {
    return is_null(set1)
        ? set2
        : is_null(set2)
            ? set1
            : list_to_tree(
                union_order_list(
                    tree_to_list(set1),
                    tree_to_list(set2)));
}

function intersection_set(set1, set2) {
    return is_null(set1) || is_null(set2)
        ? null
        : list_to_tree(
            intersection_order_list(
                tree_to_list(set1),
                tree_to_list(set2)));
}

function lookup(x, set) {
    return is_null(set)
        ? false
        : x === entry(set)
            ? true
            : x < entry(set)
                ? lookup(x, left_branch(set))
                : lookup(x, right_branch(set));
}

function make_leaf(value) {
    return make_tree(value, null, null);
}

export {
    is_element_of_set,
    adjoin_set,
    make_tree,
    entry,
    left_branch,
    right_branch,
    union_set,
    intersection_set,
    make_leaf,
    tree_to_list,
    list_to_tree,
    lookup,
}
