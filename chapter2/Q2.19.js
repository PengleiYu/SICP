import {display, pair, head, tail, list, is_null} from "sicp";

// 使用序列数据类型优化换硬币函数
(function () {
    // 练习2.19 现在重新考虑1.2.2节的兑换零钱方式的计数程序。如果很容易改变程序里用的兑换币种，那当然就更好了。
    // 譬如说，我们就也能计算一英镑的不同兑换方式数。在写前面的程序时，有关币种的知识散布在不同地方：一部分出现在函数first_denomination里，
    // 另一部分出现在函数count_change里（它知道有5种美元硬币）。如果我们能用一个表来提供可用于兑换的硬币，那就更好了。
    // 我们希望重写函数cc，令其第二个参数是一个可用硬币的币值表，而不是一个表示可用硬币种类的整数。然后我们就可以针对每种货币定义一个表：
    const us_coins = list(50, 25, 10, 5, 1);
    const uk_coins = list(100, 50, 20, 10, 5, 2, 1);
    // 这样，我们就可以用如下的方式调用cc：
    display(cc(100, us_coins));
    display(cc(100, uk_coins));
    // 为了做到这些，我们需要对程序cc做一些修改。它仍然具有同样的形式，但将以不同的方式访问自己的第二个参数，如下面所示：
    function cc(amount, coin_values) {
        return amount === 0
            ? 1
            : amount < 0 || no_more(coin_values)
                ? 0
                : cc(amount, except_first_denomination(coin_values)) +
                cc(amount - first_denomination(coin_values), coin_values);
    }

    // 请基于表结构的基本操作声明函数first_denomination、except_first_denomination和no_more。
    // 表coin_values的排列顺序会影响cc给出的回答吗？为什么会或不会？

    // 不会，因为组合数仅取决于硬币面值的集合，而非它们在列表中的顺序。不同顺序仅改变递归路径，不影响总数。

    function first_denomination(icons) {
        return head(icons);
    }

    function except_first_denomination(icons) {
        return tail(icons);
    }

    function no_more(icons) {
        return is_null(icons);
    }
})()
