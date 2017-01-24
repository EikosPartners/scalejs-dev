module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "comma-dangle": ["error", "never"],
        "linebreak-style": "off",
        "func-names": ["error", "never"],
        "object-shorthand": [2, "properties"],
        "import/no-extraneous-dependencies": "off",
        "import/no-duplicates": "off",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    },
    "globals": {
        "window": true,
        "document": true,
        "localStorage": true
    },
    "settings": {
        "import/resolver": "webpack"
    }
};