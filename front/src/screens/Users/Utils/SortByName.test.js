import React from "react";

import sortUsersByName from "./SortByName";

describe("sortUsersByName", () => {
  test("should sort users by name in ascending order", () => {
    const mockSetState = jest.fn();
    const mockState = [{ name: "John" }, { name: "Alice" }];

    jest.spyOn(React, "useState").mockReturnValue([mockState, mockSetState]);

    // Act
    const result = sortUsersByName(mockState, mockSetState, "asc");

    // Assert
    expect(result).toBe("desc");
    expect(mockSetState).toHaveBeenCalledWith([
      { name: "Alice" },
      { name: "John" },
    ]);

    jest.restoreAllMocks();
  });

  test("should sort users by name in descending order", () => {
    const mockSetState = jest.fn();
    const mockState = [{ name: "Alice" }, { name: "John" }];

    const result = sortUsersByName(mockState, mockSetState, "desc");

    expect(result).toBe("asc");
    expect(mockSetState).toHaveBeenCalledWith([
      { name: "John" },
      { name: "Alice" },
    ]);

    jest.restoreAllMocks();
  });
});
