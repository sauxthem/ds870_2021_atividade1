var DB = {
    teams: [
        {
            id: 1,
            name: "Sociedade Esportiva Palmeiras",
            city: "São Paulo",
            state: "SP",
            series: "A",
            titles: [
                {
                    state: 22
                },
                {
                    national: 11
                },
                {
                    international: 3
                }
            ],
            paycheck: 12500000,
        },
        {
            id: 2,
            name: "Associação Chapecoense de Futebol",
            city: "Chapecó",
            state: "SC",
            series: "A",
            titles: [
                {
                    state: 3
                },
                {
                    national: 1
                },
                {
                    international: 1
                }
            ],
            paycheck: 875000,
        },
        {
            id: 3,
            name: "Ceará Sporting Club",
            city: "Fortaleza",
            state: "CE",
            series: "B",
            titles: [
                {
                    state: 47
                },
                {
                    national: 0
                },
                {
                    international: 0
                }
            ],
            paycheck: 625000
        },
        {
            id: 4,
            name: "Bangu Atlético Clube",
            city: "Rio de Janeiro",
            state: "RJ",
            titles: [
                {
                    state: 11
                },
                {
                    national: 0
                },
                {
                    international: 0
                }
            ],
            paycheck: 50000
        }
    ]
}

module.exports = DB;