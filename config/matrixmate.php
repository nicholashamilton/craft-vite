<?php

return [
    'fields' => [
        'blocksBuilder' => [

            'groups' => [
                [
                    'label' => 'Blocks',
                    'types' => [
                        'richText',
                    ],
                ],
            ],

            'types' => [
                'richText' => [
                    'tabs' => [
                        [
                            'label' => 'Content',
                            'fields' => [
                                'heading',
                                'copy',
                                'textAlignment',
                            ],
                        ],
                        [
                            'label' => 'Settings',
                            'fields' => [
                                'blockWidth',
                            ],
                        ],
                    ]
                ],
            ],
        ],
    ],
];
