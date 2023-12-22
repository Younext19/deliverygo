import React from "react";

import sortUsersByDate from "./SortByDate";

describe("sortUsersByDate", () => {
  test("should sort users in ascending order by date", () => {
    // Créez une fonction mock pour simuler useState
    const mockSetState = jest.fn();
    const mockState = [
      {
        _id: "1",
        name: "merounae",
        isAvailable: true,
        carType: "benz",
        date: "2023-12-10T14:31:32.111Z",
        __v: 0,
      },
      {
        _id: "2",
        name: "john",
        isAvailable: true,
        carType: "audi",
        date: "2023-12-10T15:30:00.000Z",
        __v: 0,
      },
      // Add more user objects as needed
    ];

    // Espionnez useState pour renvoyer votre état et votre fonction mock
    jest.spyOn(React, "useState").mockReturnValue([mockState, mockSetState]);

    // Act
    const result = sortUsersByDate(mockState, mockSetState, "asc");

    // Assert
    expect(result).toBe("desc"); // L'ordre de tri suivant devrait être 'desc'
    expect(mockSetState).toHaveBeenCalledWith([
      {
        _id: "1",
        name: "merounae",
        isAvailable: true,
        carType: "benz",
        date: "2023-12-10T14:31:32.111Z",
        __v: 0,
      },
      {
        _id: "2",
        name: "john",
        isAvailable: true,
        carType: "audi",
        date: "2023-12-10T15:30:00.000Z",
        __v: 0,
      },
      // Verify the order of other user objects
    ]);

    // Assurez-vous de réinitialiser le mock après le test
    jest.restoreAllMocks();
  });

  test("should sort users in descending order by date", () => {
    // Créez une fonction mock pour simuler useState
    const mockSetState = jest.fn();
    const mockState = [
      {
        _id: "1",
        name: "merounae",
        isAvailable: true,
        carType: "benz",
        date: "2023-12-10T14:31:32.111Z",
        __v: 0,
      },
      {
        _id: "2",
        name: "john",
        isAvailable: true,
        carType: "audi",
        date: "2023-12-10T15:30:00.000Z",
        __v: 0,
      },
      // Add more user objects as needed
    ];

    // Espionnez useState pour renvoyer votre état et votre fonction mock
    jest.spyOn(React, "useState").mockReturnValue([mockState, mockSetState]);

    // Act
    const result = sortUsersByDate(mockState, mockSetState, "desc");

    // Assert
    expect(result).toBe("asc"); // L'ordre de tri suivant devrait être 'asc'
    expect(mockSetState).toHaveBeenCalledWith([
      {
        _id: "2",
        name: "john",
        isAvailable: true,
        carType: "audi",
        date: "2023-12-10T15:30:00.000Z",
        __v: 0,
      },
      {
        _id: "1",
        name: "merounae",
        isAvailable: true,
        carType: "benz",
        date: "2023-12-10T14:31:32.111Z",
        __v: 0,
      },
      // Verify the order of other user objects
    ]);

    // Assurez-vous de réinitialiser le mock après le test
    jest.restoreAllMocks();
  });

  // Ajoutez d'autres cas de test si nécessaire
});
