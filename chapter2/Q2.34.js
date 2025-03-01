import {list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// 使用accumulate实现多项式horner规则求值公式
(function () {
    // 练习2.34 对一个给定的x的多项式，求出其在某个x处的值也可以形式化为一种累积。假设需要求下面多项式的值：
    // anxn+an-1xn-1+…+a1x+a0
    // 采用著名的Horner规则的计算过程具有如下的结构：
    // (…(anx+an-1)x+…+a1)x+a0
    // 换句话说，我们从an开始，将其乘以x，再加上an-1，再乘以x，如此下去，直到处理完a0[1]。
    // 请填充下面的程序模板，做出一个使用Horner规则求多项式的值的函数。假定多项式的系数安排在一个序列里，从a0直至an。
    function horner_eval(x, coefficient_sequence) {
        return accumulate(
            (this_coeff, higher_terms) => higher_terms * x + this_coeff,
            0,
            coefficient_sequence);
    }

    // 例如，为了计算1+3x+5x3+x5在x=2的值，你需要求值：
    display_list(horner_eval(2, list(1, 3, 0, 5, 0, 1)));
})();
