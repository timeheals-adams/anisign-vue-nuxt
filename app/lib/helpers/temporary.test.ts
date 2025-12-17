// @vitest-environment node
import { expect, test } from "vitest";
import { temporary } from "./temporary";

test("Temporary", () => {
  expect(temporary()).toBe("huh");
});