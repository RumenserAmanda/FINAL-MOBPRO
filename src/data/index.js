const data = [
    {
        _id: 1,
        phone: "1234",
        country: {
            name: "Indonesia",
            code :"62",
        },
        name: "Alpha",
        about: "alpha lima papa hotel alpha",
        picture: null,
        lastSeen: null,
        contacts: [
            {
                _id: 2,
                chats: [
                    {
                        type: 'send',
                        date: null,
                        read: null,
                        msg: 'hello b',
                    },
                    {
                        type: 'receive',
                        date: null,
                        read: null,
                        msg: 'hello a',
                    },
                    {
                        type: 'send',
                        date: null,
                        read: null,
                        msg: `'sup`,
                    },
                ],
            },
            {
                _id: 3,
                chats: null,
            },
        ],
    },
    {
        _id: 2,
        phone: "5678",
        country: {
            name: "Indonesia",
            code :"62",
        },
        name: "Bravo",
        about: "bravo romeo alpha victor oscar",
        picture: null,
        lastSeen: null,
        contacts: [
            {
                _id: 1,
                chats: [
                    {
                        type: 'receive',
                        date: null,
                        read: null,
                        msg: 'hello b',
                    },
                    {
                        type: 'send',
                        date: null,
                        read: null,
                        msg: "hello a",
                    },
                    {
                        type: 'receive',
                        date: null,
                        read: null,
                        msg: "'sup",
                    },
                ],
            },
        ],
    },
    {
        _id: 3,
        phone: "9012",
        country: {
            name: "Indonesia",
            code :"62",
        },
        name: "Charlie",
        about: "charlie hotel alpha romeo lima india echo",
        picture: null,
        lastSeen: null,
        contacts: null,
    },
];

export default data;