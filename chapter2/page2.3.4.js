import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {generate_huffman_tree} from "./huffman_tree.js";

(function () {
    // 2.3.4 实例：Huffman编码树
    const input = list(list('A', 8), list('B', 3), list('C', 1), list('D', 1), list('E', 1), list('F', 1), list('G', 1), list('H', 1));
    display_list(input);
    const huffman = generate_huffman_tree(input);
    display_list(huffman);
})();
