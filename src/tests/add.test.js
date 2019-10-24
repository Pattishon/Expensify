const add = (a, b) => a + b;

test("should add numbers", () => {
  expect(add(1, 2)).toBe(3);
});
