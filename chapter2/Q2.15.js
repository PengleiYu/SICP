import {
    add_interval,
    display_interval,
    div_interval,
    make_center_percent,
    make_interval,
    mul_interval, percent
} from "./interval.js";

// 确认电阻两种不同计算方式为何误差范围不同
(function () {
    function par1(r1, r2) {
        return div_interval(
            mul_interval(r1, r2), add_interval(r1, r2)
        );
    }

    function par2(r1, r2) {
        const one = make_interval(1, 1);
        return div_interval(one,
            add_interval(
                div_interval(one, r1), div_interval(one, r2)));
    }

    // 练习2.15 另一用户Eva Lu Ator也注意到了根据等价的不同代数表达式算出的区间的差异。
    // 她说，如果把公式写成一种形式，其中表示具有非精确值的名字不重复出现，那么Alyssa的系统产生出的区间的界限会更紧一些。
    // 她还说，正因为此，在计算并联电阻时，par2是比par1“更好的”程序。她说得对吗？


    // 原因是误差会在乘法和除法中累积，所以区间出现的次数越多，误差累积得越多
    (function () {
        const R1 = make_center_percent(1000, 0.01)
        const R2 = make_center_percent(2000, 0.02);

        const result1 = par1(R1, R2);
        const result2 = par2(R1, R2);
        display_interval(result1);
        display_interval(result2);

        // result1误差约0.03，因为乘法导致误差累积0.01+0.01=0.02，加法误差不变还是0.01，然后除法导致误差累积0.02+0.01=0.03；
        // result2误差为0.01，因为one的误差为0，除法导致的误差累积为0.01+0=0.01，加法误差不变还是0.01，然后除法累计误差为0+0.01=0.01
        // 验证了题目中的说法
        console.log(`误差：par1=${percent(result1)}, par2=${percent(result2)}`);
    })();
})()
