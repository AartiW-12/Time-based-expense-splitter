import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const GroupsContext = createContext();
let groupCounter = 4; // Start from 4 since we have 3 dummy groups
let expenseCounter = 4;

function generateGroupId() {
  return `G${groupCounter++}`;
}

function generateMemberId(index) {
  return `U${index + 1}`;
}

function generateExpenseId() {
  return `E${expenseCounter++}`;
}

// ✅ Dummy data for testing
const dummyGroups = [
  {
    _id: "G1",
    groupName: "Flat Rent - Jan 2026",
    groupType: "flat",
    splitType: "timely",
    timeUnit: "days",
    createdAt: "2026-01-10T10:00:00.000Z",
    members: [
      { userId: "U1", name: "Ajay", timeUsed: 30 },
      { userId: "U2", name: "Amar", timeUsed: 20 },
      { userId: "U3", name: "Raj", timeUsed: 10 }
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
      { userId: "U1", name: "Aarti", timeUsed: 30 },
      { userId: "U2", name: "Amar", timeUsed: 20 },
      { userId: "U3", name: "Riya", timeUsed: 10 },
      { userId: "U4", name: "Jay", timeUsed: 20 }
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
      { userId: "U1", name: "Neha", timeUsed: null },
      { userId: "U2", name: "Rahul", timeUsed: null },
      { userId: "U3", name: "Priya", timeUsed: null },
      { userId: "U4", name: "Vikram", timeUsed: null }
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

// useEffect(() => {
//   // fetch groups

// }, [])

export function GroupsProvider({ children }) {
  const [groups, setGroups] = useState(dummyGroups); //  Initialize with dummy data

  const { user } = useAuth();

  useEffect(() => {
    if (user?.userId) {
      // eslint-disable-next-line react-hooks/immutability
      fetchUSerGroups(user?.userId)
    }
    else{
      setGroups([])
    }
  }, [user?.userId])

  function fetchUSerGroups(userId) {

    try {
      // API call goes gere
      // for now use dummy data
      const dummyGroups = [
        {
          _id: "G1",
          groupName: "Flat Rent - Jan 2026",
          groupType: "flat",
          splitType: "timely",
          timeUnit: "days",
          createdAt: "2026-01-10T10:00:00.000Z",
          members: [
            { userId: "U1", name: "Ajay", timeUsed: 30 },
            { userId: "U2", name: "Amar", timeUsed: 20 },
            { userId: "U3", name: "Raj", timeUsed: 10 }
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
            { userId: "user-Aarti", name: "Aarti", timeUsed: 30 },
            { userId: "U2", name: "Amar", timeUsed: 20 },
            { userId: "U3", name: "Riya", timeUsed: 10 },
            { userId: "U4", name: "Jay", timeUsed: 20 }
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
            { userId: "U1", name: "Neha", timeUsed: null },
            { userId: "U2", name: "Rahul", timeUsed: null },
            { userId: "U3", name: "Priya", timeUsed: null },
            { userId: "U4", name: "Vikram", timeUsed: null }
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

      const userGroups = dummyGroups.filter(group => group.members.some(member => member.userId === userId))

      setGroups(userGroups)

    } catch (err) {
      console.log(err)
      setGroups([])
    }
  }

  function addGroup(group) {
    setGroups(prev => [...prev, group]);
  }

  function getGroupById(id) {
    return groups.find(g => g._id === id);
  }

  return (
    <GroupsContext.Provider value={{ groups, addGroup, getGroupById }}>
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