import {createContainer} from '../../../../lib/easy-dom/core.js'

export const ScoreboardContainer = () => {
    return createContainer(
        {
            parent: {
                type: 'div',
                id: 'scoreboard-container',
                className: 'scoreboard-container',
            },
            children: [
                {
                    parent: {
                        type: 'h3',
                        textContent: 'Scoreboard',
                    },
                    children: [],
                },
                {
                    parent: {
                        type: 'div',
                    },
                    children: [
                        {
                            parent: {
                                type: 'div',
                            },
                            children: [
                                {
                                    parent: {
                                        type: 'table',
                                        id: 'scoreboard-table',
                                        className: 'scoreboard-table',
                                    },
                                    children: [
                                        {
                                            parent: {
                                                type: 'tr',
                                            },
                                            children: [
                                                {
                                                    parent: {
                                                        type: 'th',
                                                        innerHTML: 'Rank',
                                                    },
                                                    children: [],
                                                },
                                                {
                                                    parent: {
                                                        type: 'th',
                                                        innerHTML: 'Name',
                                                    },
                                                    children: [],
                                                },
                                                {
                                                    parent: {
                                                        type: 'th',
                                                        innerHTML: 'Score',
                                                    },
                                                    children: [],
                                                },
                                                {
                                                    parent: {
                                                        type: 'th',
                                                        innerHTML: 'Time',
                                                    },
                                                    children: [],
                                                }
                                            ]
                                        }
                                        // {
                                        //     parent: {
                                        //         type: 'tr',
                                        //     },
                                        //     children: [
                                        //         {
                                        //             parent: {
                                        //                 type: 'td',
                                        //                 innerHTML: '1',
                                        //             },
                                        //             children: [],
                                        //         },
                                        //         {
                                        //             parent: {
                                        //                 type: 'td',
                                        //                 innerHTML: 'enthusiast17',
                                        //             },
                                        //             children: [],
                                        //         },
                                        //         {
                                        //             parent: {
                                        //                 type: 'td',
                                        //                 innerHTML: '100000',
                                        //             },
                                        //             children: [],
                                        //         },
                                        //         {
                                        //             parent: {
                                        //                 type: 'td',
                                        //                 innerHTML: '05:00',
                                        //             },
                                        //             children: [],
                                        //         }
                                        //     ]
                                        // },
                                    ],
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    )
}