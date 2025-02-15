// 无穷连分式求e
(function () {
    function cont_frac(n, d, k) {
        function iter(n, d, i, result) {
            console.log(`i=${i},result=${result}`)
            return i === 0
                ? result
                : iter(n, d, i - 1, n(i) / (d(i) + result))
        }

        return iter(n, d, k, 0);
    }

    // 练习1.38 1737年瑞士数学家莱昂哈·德欧拉发表了论文De Fractionibus Continuis，文中给出了e-2的一个连分式展开，其中e是自然对数的底。
    // 在这一连分式中，Ni全都是1，而Di顺序的是1, 2, 1, 1, 4,1, 1, 6, 1, 1, 8,…。
    // 请写一个程序，其中使用你在练习1.37中做的cont_frac函数，该程序基于欧拉的展开计算e的近似值。

    const expect = Math.exp(1);
    const result = cont_frac(i => 1,
        i => {
            let newVar = i % 3 === 2 ? Math.ceil(i / 3) * 2 : 1;
            console.log(`i=${i},d(i)=${newVar}`);
            return newVar
        },
        10,) + 2
    console.log(`expect=${expect}, result=${result}`)

    let r;
    let i = 0;
    do {
        r = cont_frac(i => 1,
            i => {
                let newVar = i % 3 === 2 ? Math.ceil(i / 3) * 2 : 1;
                console.log(`i=${i},d(i)=${newVar}`);
                return newVar
            },
            ++i,)
    } while (Math.abs(r + 2 - expect) > 0.00005)
    r += 2;
    console.log(`迭代${i}次后，精度可达四位小数=${r},精确值=${expect},差值=${Math.abs(r - expect)}`)
})()
