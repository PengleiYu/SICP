import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair, length} from "sicp";
import {encode, generate_huffman_tree} from "./huffman_tree.js";
// 根据给定频度字母表生成Huffman树并编码
(function () {
    // 练习2.70 下面带有相对频度的8个符号的字母表，是为了有效编码20世纪50年代的摇滚歌曲中的词语而设计的。（注意，“字母表”中的“符号”不必是单个字母。）
    // A    2       NA  16
    // BOOM 1       SHA 3
    // GET 2        YIP 9
    // JOB 2        WAH 1
    // 请用（练习2.69的）generate_huffman_tree函数生成对应的Huffman树，用（练习2.68的）encode编码下面这个消息：
    // Get a job
    // Sha na na na na na na
    // Get a job
    // Sha na na na na na na
    // Wah yip yip yip yip yip yip yip yip yip
    // Sha boom
    // 这一编码需要多少个二进制位？如果对这8个符号的字母表采用定长编码，完成这个歌曲的编码最少需要多少个二进制位？

    const pairs = list(list('A', 2), list('BOOM', 1), list('GET', 2), list('JOB', 2), list('NA', 16), list('SHA', 3), list('YIP', 9), list('WAH', 1));
    const huffman = generate_huffman_tree(pairs);
    display_list(pairs);
    display_list(huffman);

    const song = `
    Get a job
    Sha na na na na na na na na
    Get a job
    Sha na na na na na na na na
    Wah yip yip yip yip yip yip yip yip yip
    Sha boom
    `;
    const words = song.trim().split(/\s+/).map(word => word.toUpperCase());
    display_list(list(...words));
    const encoded = encode(list(...words), huffman);
    display_list(encoded);
    // list("len_words", 36, "定长编码长度", 108, "len_encoded", 84)
    // huffman编码长度是定长编码长度的77.7%，节省空间不多，主要原因是字母表长度很短，字母表越长，节省空间越多
    display_list(list("len_words", words.length, "定长编码长度", words.length * 3, "huffman编码长度", length(encoded)));
})();
