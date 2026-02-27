import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const GroupsContext = createContext();

let groupCounter = 4;
let expenseCounter = 4;

function generateGroupId() {
  return `G${groupCounter++}`;
}

function generateMemberId(username) {
  return `user-${username.toLowerCase()}`;
}

function generateExpenseId() {
  return `E${expenseCounter++}`;
}

// ✅ Dummy data (UPDATED with consistent userId format)
const dummyGroups = [
  {
    _id: "G1",
    groupName: "Flat Rent - Jan 2026",
    groupType: "flat",
    splitType: "timely",
    timeUnit: "days",
    createdAt: "2026-01-10T10:00:00.000Z",
    members: [
      { userId: "user-ajay", name: "Ajay", timeUsed: 30 },
      { userId: "user-amar", name: "Amar", timeUsed: 20 },
      { userId: "user-raj", name: "Raj", timeUsed: 10 }
    ],
    expenses: [
      {
        expenseId: "E1",
        description: "January Rent",
        totalAmount: 9000,
        paidBy: "Amar",
        expenseDate: "2026-01-01T00:00:00.000Z"
      }
    ]
  },
  {
    _id: "G2",
    groupName: "Airport Cab Trip",
    groupType: "cab",
    splitType: "timely",
    timeUnit: "minutes",
    createdAt: "2026-01-15T14:30:00.000Z",
    members: [
      { userId: "user-aarti", name: "Aarti", timeUsed: 30 },
      { userId: "user-amar", name: "Amar", timeUsed: 20 },
      { userId: "user-riya", name: "Riya", timeUsed: 10 },
      { userId: "user-jay", name: "Jay", timeUsed: 20 }
    ],
    expenses: [
      {
        expenseId: "E2",
        description: "Cab Fare to Airport",
        totalAmount: 1200,
        paidBy: "Aarti",
        expenseDate: "2026-01-15T00:00:00.000Z"
      }
    ]
  },
  {
    _id: "G3",
    groupName: "Office Lunch",
    groupType: "workspace",
    splitType: "equal",
    timeUnit: "hours",
    createdAt: "2026-01-16T12:00:00.000Z",
    members: [
      { userId: "user-neha", name: "Neha", timeUsed: null },
      { userId: "user-rahul", name: "Rahul", timeUsed: null },
      { userId: "user-priya", name: "Priya", timeUsed: null },
      { userId: "user-vikram", name: "Vikram", timeUsed: null }
    ],
    expenses: [
      {
        expenseId: "E3",
        description: "Team Lunch",
        totalAmount: 2400,
        paidBy: "Rahul",
        expenseDate: "2026-01-16T00:00:00.000Z"
      }
    ]
  }
];

export function GroupsProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const { user } = useAuth();

  function fetchUserGroups(userId) {
    try {
      const userGroups = dummyGroups.filter(group =>
        group.members.some(member => member.userId === userId)
      );

      setGroups(userGroups);
    } catch (err) {
      console.log(err);
      setGroups([]);
    }
  }

  useEffect(() => {
    if (user?.userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUserGroups(user.userId);
    } else {
      setGroups([]);
    }
  }, [user]);

  

  function addGroup(group) {
    setGroups(prev => [...prev, group]);
  }

  function getGroupById(id) {
    return groups.find(g => g._id === id);
  }

  return (
    <GroupsContext.Provider
      value={{
        groups,
        addGroup,
        getGroupById,
        generateGroupId,
        generateMemberId,
        generateExpenseId
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGroups() {
  return useContext(GroupsContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { generateGroupId, generateMemberId, generateExpenseId };