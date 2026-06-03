const validateEmail = require("../utils/validateEmail");

test("email correcto", () => {
  expect(validateEmail("grupo@ejemplo.com")).toBe(true);
});

test("email incorrecto", () => {
  expect(validateEmail("grupoejemplo.com")).toBe(false);
});
