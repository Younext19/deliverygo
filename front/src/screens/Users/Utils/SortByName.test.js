import React from "react";
import { useState } from "react"; // Assurez-vous d'importer useState depuis React

import sortUsersByName from "./SortByName";

describe("sortUsersByName", () => {
  test("should sort users by name in ascending order", () => {
    // Créez une fonction mock pour simuler useState
    const mockSetState = jest.fn();
    const mockState = [
      { name: "John" },
      { name: "Alice" },
      // Add more user objects as needed
    ];

    // Espionnez useState pour renvoyer votre état et votre fonction mock
    jest.spyOn(React, "useState").mockReturnValue([mockState, mockSetState]);

    // Act
    const result = sortUsersByName(mockState, mockSetState, "asc");

    // Assert
    expect(result).toBe("desc"); // L'ordre de tri suivant devrait être 'desc'
    expect(mockSetState).toHaveBeenCalledWith([
      { name: "Alice" },
      { name: "John" },
      // Verify the order of other user objects
    ]);

    // Assurez-vous de réinitialiser le mock après le test
    jest.restoreAllMocks();
  });

  test("should sort users by name in descending order", () => {
    // Arrange
    const mockSetState = jest.fn();
    const mockState = [
      { name: "Alice" },
      { name: "John" },
      // Add more user objects as needed
    ];

    // Act
    const result = sortUsersByName(mockState, mockSetState, "desc");

    // Assert
    expect(result).toBe("asc"); // L'ordre de tri suivant devrait être 'asc'
    expect(mockSetState).toHaveBeenCalledWith([
      { name: "John" },
      { name: "Alice" },
      // Verify the order of other user objects
    ]);

    // Assurez-vous de réinitialiser le mock après le test
    jest.restoreAllMocks();
  });

  // Ajoutez d'autres cas de test si nécessaire
});
