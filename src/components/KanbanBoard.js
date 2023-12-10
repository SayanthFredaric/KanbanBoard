import React, { useEffect, useState } from "react";
import "./Kanban.css";
import Card from "./Card";
import {
  groupByOptions,
  groupByPriority,
  groupByStatus,
  groupByUser,
} from "./utility";

export default function KanbanBoard() {
  // Loading state
  const [loading, setLoading] = useState(true);
  // Ticket Data and group by data state
  const [ticketsData, setTicketsData] = useState(null);
  const [groupedByTickets, setGroupByTickets] = useState(null);

  // Dropdown state
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(groupByOptions);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  useEffect(() => {
    // Use effect to fetch the data from the api and store into the ticketData State variable
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setTicketsData(result);
        setSelectedItem(0);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (ticketsData == null) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    //  Use Effect to Groupby the dropdown value when the dropdown values are changed
    if (selectedItem == 0) {
      let data = groupByStatus(ticketsData);
      setGroupByTickets(data);
    }
    if (selectedItem == 1) {
      let data = groupByUser(ticketsData, ticketsData.users);
      setGroupByTickets(data);
    }
    if (selectedItem == 2) {
      let data = groupByPriority(ticketsData);
      setGroupByTickets(data);
    }
  }, [selectedItem]);

  if (loading) {
    return <div>Loading Data...</div>;
  }

  const sortColumn = (columnName, byElement) => {
    const sortedGroupedTickets = {};

    for (const [status, tickets] of Object.entries(groupedByTickets)) {
      // Sorting logic based on the specified column name and sorting element
      const sortedTickets = tickets.slice().sort((a, b) => {
        if (byElement === "priority") {
          return a.priority - b.priority;
        } else if (byElement === "title") {
          return a.title.localeCompare(b.title);
        }
      });

      // Update the sorted tickets for the current status
      sortedGroupedTickets[status] = sortedTickets;
    }
    setGroupByTickets(sortedGroupedTickets);
    // console.log(sortedGroupedTickets);
    // debugger;
  };
  return (
    <div>
      {/* <span className="sortby">
        Sort By Options are by Title and by Priority
      </span> */}
      <div>
        <div className="dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem
              ? items.find((item) => item.id == selectedItem).label
              : "📁 Group By"}

            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
          </div>
          <div className={`dropdown-body ${isOpen && "open"}`}>
            {items.map((item) => (
              <div
                className="dropdown-item"
                onClick={(e) => handleItemClick(e.target.id)}
                id={item.id}
              >
                <span
                  className={`dropdown-item-dot ${
                    item.id == selectedItem && "selected"
                  }`}
                >
                  •{" "}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="kanban">
        <div class="kanban-container">
          {groupedByTickets &&
            Object.entries(groupedByTickets).map(([groupName, tickets]) => {
              return (
                <div class="kanban-column">
                  <div class="kanban-column-header">
                    {groupName}{" "}
                    <span className="countOfTickets"> - {tickets.length}</span>
                    <span
                      className="sort-by-priority"
                      onClick={() => {
                        sortColumn(groupName, "priority");
                      }}
                    >
                      &#8593; Priority
                    </span>
                    <span
                      className="sort-by-title"
                      onClick={() => {
                        sortColumn(groupName, "title");
                      }}
                    >
                      &#8593; Title
                    </span>
                  </div>
                  <ul class="kanban-column-list">
                    {tickets.map((element) => {
                      return (
                        <li>
                          <Card data={element} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
