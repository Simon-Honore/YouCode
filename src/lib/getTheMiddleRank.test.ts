import { describe } from "node:test";
import { expect, test } from "vitest";
import { getTheMiddleRank } from "./getTheMiddleRank";

describe("getTheMiddleRank", () => {
  const testItemRankAbove = (itemRankAbove: string, rank: string) =>
    expect(itemRankAbove < rank).toBeTruthy();

  const testItemRankBelow = (itemRankBelow: string, rank: string) =>
    expect(itemRankBelow > rank).toBeTruthy();

  test("update rank simple", () => {
    const itemRankAbove = "aaaaa";
    const itemRankBelow = "baaaa";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("abaaa");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("updateRank with no space beetwen, add a at rank", () => {
    const itemRankAbove = "aaaaa";
    const itemRankBelow = "aaaab";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("aaaaaa");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("updateRank with a space beetwen", () => {
    const itemRankAbove = "aaaaa";
    const itemRankBelow = "aacaa";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("aabaa");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("updateRank with a space beetwen 2", () => {
    const itemRankAbove = "zyhhk";
    const itemRankBelow = "zyhhm";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("zyhhl");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("updateRank with a space beetwen 3", () => {
    const itemRankAbove = "aaaba";
    const itemRankBelow = "zyhhl";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("baaaa");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("updateRank with a space beetwen 4", () => {
    const itemRankAbove = "aa%aba";
    const itemRankBelow = "aa+aba";

    const rank = getTheMiddleRank(itemRankAbove, itemRankBelow);

    expect(rank).toBe("aa&aaa");
    testItemRankAbove(itemRankAbove, rank);
    testItemRankBelow(itemRankBelow, rank);
  });

  test("getTheMiddleRank with no value", () => {
    const rank = getTheMiddleRank();

    expect(rank).toBe("aaabaaa");
  });

  test("first rank if itemRankBelow is aaabaaa", () => {
    const itemRankBelow = "aaabaaa";

    const rank = getTheMiddleRank(undefined, itemRankBelow);

    expect(rank).toBe("`aabaaa");
    testItemRankBelow(itemRankBelow, rank);
  });

  test("last rank if itemRankAbove is aaabaaa", () => {
    const itemRankAbove = "aaabaaa";

    const rank = getTheMiddleRank(itemRankAbove, undefined);

    expect(rank).toBe("baabaaa");
    testItemRankAbove(itemRankAbove, rank);
  });
});
