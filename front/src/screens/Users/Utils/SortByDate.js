// sortUserByDate.js
export default function sortUsersByDate(users, setUsers, sortOrder) {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Adjust the comparison based on the sort order
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  setUsers(sortedUsers);

  // Toggle the sort order for the next click
  return sortOrder === "asc" ? "desc" : "asc";
}
