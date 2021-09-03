export default [
    // 登陆
    {
        url: "/login",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    token: '1234567890',
                }
            };
        },
    },
    // 退出
    {
        url: "/logout",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                }
            };
        },
    },
    // 获取用户信息
    {
        url: "/userinfo",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    roles: ['admin'],
                    userinfo: {
                        name: 'wa',
                        age: 27,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F24%2F20161224094529_a4tEj.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632639481&t=f86854d7b7449e89b1195169176bd644'
                    }
                }
            };
        },
    },
];