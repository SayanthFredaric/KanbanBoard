// Function to group tickets by status
export function groupByStatus(ticketsData) {
  const result = {};
  ticketsData.tickets.forEach((ticket) => {
    let id = "ℹ️ " + ticket.status;
    if (!result[id]) {
      result[id] = [];
    }
    result[id].push(ticket);
  });
  return result;
}

// Function to group tickets by user
export function groupByUser(ticketsData) {
  const result = {};
  ticketsData.tickets.forEach((ticket) => {
    let user = ticketsData.users.find((user) => {
      if (user.id == ticket.userId) {
        return user;
      }
    });

    let id = "👨‍💻 " + user.name;
    debugger;
    if (!result[id]) {
      result[id] = [];
    }
    result[id].push(ticket);
  });
  return result;
}

let priorityDict = [
  "⚪ No Priority",
  "🔵 Low",
  "🟠 Medium",
  "🔴 High",
  "🚨 Urgent",
];
// Function to group tickets by priority
export function groupByPriority(ticketsData) {
  const result = {};
  ticketsData.tickets.forEach((ticket) => {
    // let id = ticketsData.users[ticket.userId].name;
    let id = priorityDict[ticket.priority] + " " + ticket.priority;
    if (!result[id]) {
      result[id] = [];
    }
    result[id].push(ticket);
  });
  return result;
}

// Function to sort tickets by priority (descending order)
export function sortByPriority(ticketsData) {
  return [...ticketsData.tickets].sort((a, b) => b.priority - a.priority);
}

// Function to sort tickets by title (ascending order)
export function sortByTitle(ticketsData) {
  return [...ticketsData.tickets].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

export const groupByOptions = [
  { id: 0, label: "🔄 Status" },
  { id: 1, label: "👨‍💻 User" },
  { id: 2, label: "⚠️ Priority" },
];
