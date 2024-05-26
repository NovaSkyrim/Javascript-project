module.exports = {
    space: 2,
    prettier: true,
    rules: {
      "unicorn/no-fn-reference-in-iterator": 0,
      "unicorn/no-array-callback-reference": 0,
      "unicorn/no-array-method-this-argument": 0,
      "unicorn/no-array-reduce": 0,
      "unicorn/no-array-for-each": 0,
      "n/prefer-global/process": "off",
      "unicorn/prefer-top-level-await": "off"
    },
    envs: ["mocha"]
};
