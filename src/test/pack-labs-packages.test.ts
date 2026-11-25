import { describe, expect, it } from "vitest";

import { packageTiers } from "@/lib/pack-labs-packages";

describe("Pack Labs package details", () => {
  it("preserves the four delivery timelines from the supplied brief", () => {
    expect(packageTiers.map(({ name, timeline }) => [name, timeline])).toEqual([
      ["Brand Start", "2–3 weeks"],
      ["Brand Launch", "4 weeks"],
      ["Brand Grow", "6 weeks"],
      ["Brand Scale", "8–10 weeks"],
    ]);
  });

  it("keeps portfolio packaging scoped to five SKUs", () => {
    const growPackage = packageTiers.find(({ id }) => id === "grow");

    expect(growPackage?.deliverables).toContain("Portfolio packaging (up to 5 SKUs)");
  });
});