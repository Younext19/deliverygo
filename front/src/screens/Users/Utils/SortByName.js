// sortUserByName.js
export default function sortUsersByName(users, setUsers, sortOrderName) {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    // Adjust the comparison based on the name sort order
    if (sortOrderName === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  setUsers(sortedUsers);

  // Toggle the name sort order for the next click
  return sortOrderName === "asc" ? "desc" : "asc";
}
