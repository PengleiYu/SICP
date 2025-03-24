import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {generate_huffman_tree} from "./huffman_tree.js";

// 实现huffman树创建函数
(function () {
    // 练习2.69 下面的函数以一个符号-频度对偶的表为参数（其中任何符号都不会出现在多于一个对偶中），并根据Huffman算法生成出Huffman编码树。
    // [插图]
    // make_leaf_set是前面定义的函数，它把对偶表变换为叶的有序集合，successive_merge是需要你写的函数，
    // 它用make_code_tree反复归并集合中权重最小的两个元素，直至集合里只剩下一个元素为止。这个元素就是我们需要的Huffman树。
    // （这一函数稍微有点技巧性，但并不复杂。如果你发现自己设计了一个很复杂的函数，那么几乎可以肯定是在什么地方搞错了。你应该尽可能地利用有序的集合表示这一事实。）

    // 已经实现过了
    const input = list(list('A', 8), list('B', 3), list('C', 1), list('D', 1), list('E', 1), list('F', 1), list('G', 1), list('H', 1));
    display_list(input);
    const huffman = generate_huffman_tree(input);
    display_list(huffman);
})();
