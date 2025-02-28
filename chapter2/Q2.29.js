import {pair, display, head, is_pair, list, tail} from "sicp";

// 复合数据结构活动二叉体
(function () {
    // 练习2.29 一个二叉活动体由两个分支组成，一个是左分支，另一个是右分支。每个分支是一根长度确定的杆，杆上或者吊一个重量，或者吊着另一个二叉活动体。
    // 我们可以用复合数据对象表示这种二叉活动体，或者基于两个分支构造它们（例如用list）​：
    // function make_mobile(left, right) {
    //     return list(left, right);
    // }

    // 一个分支可以基于一个length（它应该是一个数）加上一个structure构造出来，这个structure或者是一个数（表示一个简单重量）​，或者是另一个活动体：
    // function make_branch(length, structure) {
    //     return list(length, structure);
    // }

    const mobile1 = (function () {
        // 这个mobile的左力矩是210=20，右是45=20，所以平衡。总重量是10+5=15。
        return make_mobile(
            make_branch(2, 10),
            make_branch(4, 5)
        );
    })();
    const mobile2 = (function () {
        // 总重量：sub_mobile的总重量是4+6=10，主mobile的两个分支结构是8和sub_mobile（10），所以总重量是8+10=18。而力矩方面，左分支58=40，右分支410=40，所以平衡。
        const sub_mobile = make_mobile(
            make_branch(3, 4),
            make_branch(2, 6)
        )

        return make_mobile(
            make_branch(5, 8),
            make_branch(4, sub_mobile)
        );
    })();
    const mobile3 = (function () {
        // 这里，计算每个结构的重量：
        // sub_sub_mobile的重量是5+10=15。所以sub_mobile的左分支结构重量是15，右是7，总重量15+7=22。主mobile的左分支结构重量是22，右是5。总重量22+5=27。
        // 力矩方面：主mobile的左分支长度422=88；右分支65=30。不平衡，因为88≠30。
        const sub_sub_mobile = make_mobile(
            make_branch(2, 5),
            make_branch(1, 10)
        )

        const sub_mobile = make_mobile(
            make_branch(3, sub_sub_mobile),
            make_branch(2, 7)
        )

        return make_mobile(
            make_branch(4, sub_mobile),
            make_branch(6, 5)
        );
    })();

    // a.请写出相应的选择函数left_branch和right_branch，它们分别返回参数活动体的两个分支。还有branch_length和branch_structure，它们返回参数分支的两个成分。
    function left_branch(mobile) {
        return head(mobile);
    }

    function right_branch(mobile) {
        // return head(tail(mobile));
        return tail(mobile);
    }

    function branch_length(branch) {
        return head(branch);
    }

    function branch_structure(branch) {
        // return head(tail(branch));
        return tail(branch);
    }


    // b.基于你的选择函数声明一个函数total_weight，它返回参数活动体的总重量。

    function is_mobile(mobile) {
        return is_pair(mobile) && is_branch(left_branch(mobile)) && is_branch(right_branch(mobile));
    }

    function is_branch(branch) {
        return is_pair(branch) && !is_pair(branch_length((branch)));
    }


    function total_weight(x) {
        return is_mobile(x)
            ? total_weight(left_branch(x)) + total_weight(right_branch(x))
            : is_branch(x)
                ? total_weight(branch_structure(x))
                : x;
    }

    (function () {
        display('测试 is_branch');
        const branch1 = make_branch(1, 2);
        const branch2 = make_branch(1, 3);
        const mobile1 = make_mobile(branch1, branch2);

        const branch3 = make_branch(2, mobile1);

        display(is_branch(branch1));
        display(is_branch(branch2));
        display(is_branch(branch3));
        display(is_branch(mobile1));
        display(is_branch(2));
    })();
    (function () {
        display('测试 is_mobile');
        const branch1 = make_branch(1, 2);
        const branch2 = make_branch(1, 3);
        const mobile1 = make_mobile(branch1, branch2);
        const branch3 = make_branch(2, mobile1);

        display(is_mobile(branch1));
        display(is_mobile(branch2));
        display(is_mobile(branch3));
        display(is_mobile(mobile1));
        display(is_mobile(2));
    })();


    (function () {
        display('测试 total_weight')
        display(total_weight(mobile1));
        display(total_weight(mobile2));
        display(total_weight(mobile3));
    })();

    // c.一个活动体称为是平衡的，如果其左分支的力矩等于其右分支的力矩（也就是说，如果其左杆的长度乘以吊在杆上的重量，等于这个活动体右边的这种乘积）​，而且其每个分支上吊着的子活动体也都平衡。请设计一个函数，它检查一个二叉活动体是否平衡。


    function is_balance(mobile) {
        function moment(branch) {
            return total_weight(branch) * branch_length(branch);
        }

        function left_mobile(m) {
            const left_node = branch_structure(left_branch(m));
            return is_mobile(left_node) ? left_node : null;
        }

        function right_mobile(m) {
            const right_node = branch_structure((right_branch(m)));
            return is_mobile(right_node) ? right_node : null;
        }

        let left_moment = moment(left_branch(mobile));
        let right_moment = moment(right_branch(mobile));
        const weight_balance = left_moment === right_moment;
        display(`left_moment=${left_moment}, right_moment=${right_moment}`)
        if (!weight_balance) return false;
        let leftMobile = left_mobile(mobile);
        const rightMobile = right_mobile(mobile);
        return leftMobile != null && !is_balance(leftMobile)
            ? false
            : !(rightMobile != null && !is_balance(rightMobile));
    }

    (function () {
        display('测试 is_balance')
        display(is_balance(mobile1));
        display(is_balance(mobile2));
        display(is_balance(mobile3));
    })();

    // d.假定我们改变活动体的表示，采用下面的构造方式：
    function make_mobile(left, right) {
        return pair(left, right);
    }

    function make_branch(length, structure) {
        return pair(length, structure);
    }

    // 你需要对自己的程序做多少修改，才能把它改为使用这种新表示？
    // 只需要修改right_branch和branch_structure来适配pair数据结构即可
})()
