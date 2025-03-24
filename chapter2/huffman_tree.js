import {head, is_null, length, list, math_floor, pair, tail, append, error, display_list, member} from "sicp";

function make_leaf(symbol, weight) {
    return list("leaf", symbol, weight);
}

function is_leaf(object) {
    return head(object) === "leaf";
}

function symbol_leaf(x) {
    return head(tail(x));
}

function weight_leaf(x) {
    return head(tail(tail(x)));
}

function make_code_tree(left, right) {
    return list("code_tree", left, right,
        append(symbols(left), symbols(right)),
        weight(left) + weight(right));
}

function left_branch(tree) {
    return head(tail(tree));
}

function right_branch(tree) {
    return head(tail(tail(tree)));
}

function symbols(tree) {
    return is_leaf(tree)
        ? list(symbol_leaf(tree))
        : head(tail(tail(tail(tree))));
}

function weight(tree) {
    return is_leaf(tree)
        ? weight_leaf(tree)
        : head(tail(tail(tail(tail(tree)))));
}

// 将叶子或树加入集合
function adjoin_set(x, set) {
    return is_null(set)
        ? list(x)
        : weight(x) < weight(head(set))
            ? pair(x, set)
            : pair(head(set), adjoin_set(x, tail(set)));
}

// 把输入对转换为叶子节点集合
function make_leaf_set(pairs) {
    if (is_null(pairs)) {
        return null;
    } else {
        const first_pair = head(pairs);
        return adjoin_set(
            make_leaf(head(first_pair), head(tail(first_pair))),
            make_leaf_set(tail(pairs)));
    }
}

// 将pair列表转换为huffman树
function create_huffman(pairs) {
    function impl(set) {
        return is_null(set)
            ? null
            : is_null(tail(set))
                ? head(set)
                : impl(adjoin_set(
                    make_code_tree(
                        head(set),
                        head(tail(set))
                    ),
                    tail(tail(set))
                ));
    }

    const leafSet = make_leaf_set(pairs);
    return impl(leafSet);
}

function decode(bits, tree) {
    function decode_1(bits, current_branch) {
        if (is_null(bits)) return null;
        let next_branch = choose_branch(head(bits), current_branch);
        return is_leaf(next_branch)
            ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
            : decode_1(tail(bits), next_branch);
    }

    return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
    return bit === 0
        ? left_branch(branch)
        : bit === 1
            ? right_branch(branch)
            : error(bit, "bad bit -- choose_branch");
}

function encode(message, tree) {
    return is_null(message)
        ? null
        : append(
            encode_symbol(head(message), tree),
            encode(tail(message), tree));
}

function encode_symbol(symbol, tree) {
    return is_null(symbol)
        ? null
        : is_leaf(tree)
            ? null // 叶子节点终止即可，0和1在父节点已经给出了
            : member(symbol, symbols(left_branch(tree)))
                ? pair(0, encode_symbol(symbol, left_branch(tree)))
                : member(symbol, symbols(right_branch(tree)))
                    ? pair(1, encode_symbol(symbol, right_branch(tree)))
                    : error(symbol, "bad symbol -- encode_symbol");
}

export {
    make_leaf,
    make_code_tree,
    create_huffman,
    decode,
    encode,
}
