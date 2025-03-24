import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {decode, make_code_tree, make_leaf} from "./huffman_tree.js";

// 验证huffman树解码函数
(function () {
    // 练习2.67 声明了下面的编码树和样例消息：
    const sample_tree = make_code_tree(make_leaf('A', 4),
        make_code_tree(make_leaf('B', 2),
            make_code_tree(
                make_leaf('D', 1),
                make_leaf('C', 1))));
    const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);
    // 请用函数decode完成该消息的编码，并给出编码的结果。
    display_list(sample_tree);
    display_list(sample_message);
    display_list(decode(sample_message, sample_tree));

})();
