// Run with: node MenuModel.test.js
var assert = require("assert")
var MenuModel = require("./MenuModel.js")

var items = MenuModel.mergeMenuSources(MenuModel.parseMenuJsonc(JSON.stringify({
  "system": {},
  "setup": {},
  "setup.power": {},
  "setup.power.profile": { action: "true" },
  "loop.a": { parent: "loop.b" },
  "loop.b": { parent: "loop.a" }
}))).items

assert.strictEqual(MenuModel.topLevelOf(items, "system"), "system")
assert.strictEqual(MenuModel.topLevelOf(items, "setup.power.profile"), "setup")
assert.strictEqual(MenuModel.topLevelOf(items, "root"), "root")
assert.strictEqual(MenuModel.topLevelOf(items, "missing"), "")
// A parent cycle stops at the guard instead of hanging.
assert.ok(["loop.a", "loop.b"].indexOf(MenuModel.topLevelOf(items, "loop.a")) >= 0)

console.log("ok")
