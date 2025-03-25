import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair, length} from "sicp";
import {encode, generate_huffman_tree} from "./huffman_tree.js";

// 频度按2的幂增长的字母表构成的Huffman树
(function () {
    // 练习2.71 假定我们有一棵n个符号的字母表的Huffman树，其中各个符号的相对频度分别是1, 2, 4,…,2^(n-1)。请对n=5和n=10勾勒出树的形式。
    // 对这样的树（对一般的n），编码出现最频繁的符号用了多少个二进制位？最不频繁的符号呢？

    // 树的形式应该是一条斜线，树高为n
    // 出现最频繁的符号是第2层右叶子，用了1个二进制位，最不频繁的符号是第n层左叶子，用了n-1个二进制位

    (function () {
        // n=5
        display_list("n=5")
        const alphabet = list(list('A', 1), list('B', 2), list('C', 4), list('D', 8), list('E', 16));
        display_list(alphabet);
        const huffman = generate_huffman_tree(alphabet);
        display_list(huffman);
        let encode1 = encode(list('A'), huffman);
        display_list(encode1);
        let encode5 = encode(list('E'), huffman);
        display_list(encode5);
    })();

    (function () {
        // n=10
        display_list("n=10")
        const alphabet = list(list('A', 1), list('B', 2), list('C', 4), list('D', 8), list('E', 16), list('F', 32), list('G', 64), list('H', 128), list('I', 256), list('J', 512));
        display_list(alphabet);
        const huffman = generate_huffman_tree(alphabet);
        display_list(huffman);
        let encode1 = encode(list('A'), huffman);
        display_list(encode1);
        let encode10 = encode(list('J'), huffman);
        display_list(encode10);
    })();
})();
