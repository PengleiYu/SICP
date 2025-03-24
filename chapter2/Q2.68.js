import {display_list, list} from "sicp";
import {decode, encode, make_code_tree, make_leaf} from "./huffman_tree.js";

// 实现huffman树编码函数
(function () {
    // 练习2.68 函数encode以一个消息和一棵树为参数，生成被编码消息对应的二进制位的表：
    // 见huffman_tree.js

    // 其中的函数encode_symbol需要你写，它根据给定的树产生给定符号的二进制位表。如果遇到未出现在树中的符号，你设计的encode_symbol应该报告错误。
    // 用你在练习2.67中得到的结果检查你的函数，工作中使用同样的树，看看得到的结果是不是原来的消息。

    (function () {
        const sample_tree = make_code_tree(make_leaf('A', 4),
            make_code_tree(make_leaf('B', 2),
                make_code_tree(
                    make_leaf('D', 1),
                    make_leaf('C', 1))));
        const message = list("A", "D", "A", "B", "B", "C", "A");
        const bits = encode(message, sample_tree);
        const result = decode(bits, sample_tree);

        display_list(sample_tree);
        display_list(message);
        display_list(bits);
        display_list(result);

        // 应当报错
        encode(list('F'), sample_tree);
    })();
})();
