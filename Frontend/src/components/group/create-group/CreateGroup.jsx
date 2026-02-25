import { useEffect, useState } from "react";
import './CreateGroup.css'
import { useGroups, generateGroupId, generateMemberId,generateExpenseId } from "../group-context/GroupContext";
import { useAuth } from "../../auth/AuthContext";
//dummy data

export default function CreateGroup() {

    let [timelySplit, setTimelySplit] = useState("timely")
    let [groupType, setGroupType] = useState("flat")
    let [groupName, setGroupName] = useState("")
    let [members, setMembers] = useState([{ name: "", time: "" }])
    let [totalExpense, setTotalExpense] = useState(0);
    const [paidBy, setPaidBy] = useState("");
    let [isSaved, setIsSaved] = useState(false)


    const { user } = useAuth()

    function handleAddMembers() {
        setMembers([...members, { name: "", time: "" }])
    }

    function resetFields() {
        setIsSaved(false)
        setGroupName("")
        setPaidBy("")
        setMembers([{ name: '', time: "" }])
        setTotalExpense(0)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        resetFields();
    }, [timelySplit])

    const getTimeUnit = () => {
        if (groupType === "flat") return "days";
        if (groupType === "cab") return "minutes";
        if (groupType === "workspace") return "hours";
    };

    const handleMemberChange = (index, field, value) => {
        if (field === "time" && Number(value) < 0) return
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    // const handleSaveGroup = () => {
    //     if (!groupName) return;

    //     const newGroup = {
    //         group: groupType,
    //         groupName,
    //         timeUnit: getTimeUnit(),
    //         members: members.map((m) => ({
    //             name: m.name,
    //             expense: Number(m.expense),
    //             time: Number(m.time),
    //         })),
    //     };

    //     setExistingGroups([...existingGroups, newGroup]);

    //     // Reset form
    //     setGroupName("");
    //     setMembers([{ name: "", expense: "", time: "" }]);

    //     console.log("Saved Groups:", [...existingGroups, newGroup]);
    // };


    const { addGroup } = useGroups();

    // Add validation before saving
function handleSaveGroup() {
    if (!groupName) return alert("Group name required");
    if (!paidBy) return alert("Paid By required");
    if (totalExpense <= 0) return alert("Invalid expense");
    
    if (members.some(m => !m.name.trim())) {
      return alert("All members must have names");
    }
    
    if (timelySplit === "timely" && members.some(m => !m.time || m.time <= 0)) {
      return alert("All members must have time used");
    }

    // ✅ Check if current user is in the members list
    const currentUserInMembers = members.some(m => 
      m.name.toLowerCase().trim() === user?.name.toLowerCase().trim()
    );

    // ✅ Prepare members with proper userId
    const groupMembers = members.map((m) => {
      // If this member's name matches current user, use their real userId
      const isCurrentUser = m.name.toLowerCase().trim() === user?.name.toLowerCase().trim();
      
      return {
        userId: isCurrentUser ? user.userId : generateMemberId(Math.random()),  // Generate temp ID for others
        name: m.name.trim(),
        timeUsed: timelySplit === "timely" ? Number(m.time) : null
      };
    });

    // ✅ If current user not in members, add them automatically
    if (!currentUserInMembers && user) {
      const currentUserTime = timelySplit === "timely" 
        ? prompt(`Enter your time used in ${getTimeUnit()}:`) 
        : null;
      
      groupMembers.push({
        userId: user.userId,
        name: user.name,
        timeUsed: timelySplit === "timely" ? Number(currentUserTime) : null
      });
    }

    const newGroup = {
      _id: generateGroupId(),
      groupName,
      groupType,
      splitType: timelySplit,
      timeUnit: getTimeUnit(),
      createdAt: new Date().toISOString(),
      members: groupMembers,
      expenses: [
        {
          expenseId: generateExpenseId(),
          description: "Initial Expense",
          totalAmount: totalExpense,
          paidBy,
          expenseDate: new Date().toISOString()
        }
      ]
    };

    console.log("Creating group:", newGroup);
    addGroup(newGroup);
    setIsSaved(true);
    setTimeout(() => resetFields(), 2000);
  }


    return (
        <>
            <div className="splitBy">
                <h5 className="splitByTitle">Split Technique</h5>
                <div className="split-buttons">
                    <button onClick={() => setTimelySplit("timely")} >Timely Split</button>
                    <button onClick={() => setTimelySplit("equal")} >Equal Split</button>
                </div>
            </div>
            {timelySplit === "timely" &&
                <div className="create-group-form">
                    <h3>Create New Group</h3>
                    <div className="create-group-fields">
                        <label>Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            placeholder="Enter Group Name"
                            onChange={(e) => {
                                setGroupName(e.target.value)
                                setIsSaved(false)
                            }}
                        />
                        <label>Group Type</label>
                        <select
                            value={groupType}
                            onChange={(e) => {
                                setGroupType(e.target.value)
                                setIsSaved(false)
                            }
                            }
                        >
                            <option value="flat">🏠 Flat Rent</option>
                            <option value="cab">🚗 Cab Rent</option>
                            <option value="workspace">💻 Workspace</option>
                        </select>

                        <h3>Add Members</h3>
                        {members.map((member, index) => (
                            <div key={index} className="member-inputs">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={member.name}
                                    onChange={(e) => {
                                        handleMemberChange(index, "name", e.target.value)
                                        setIsSaved(false)
                                    }}
                                />


                                <input
                                    type="number"
                                    min={0}
                                    placeholder={`Time (${getTimeUnit()})`}
                                    value={member.time}
                                    onChange={(e) => {
                                        handleMemberChange(index, "time", e.target.value)
                                        setIsSaved(false)
                                    }}
                                />


                            </div>
                        ))}
                        <button onClick={() => {
                            handleAddMembers()
                            setIsSaved(false)
                        }}>Add Members</button>

                        <label>Enter Total Expense</label>
                        <input
                            type="number"
                            min={0}
                            placeholder=""
                            value={totalExpense}
                            onChange={(e) => {
                                setTotalExpense(Number(e.target.value))
                                setIsSaved(false)
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Paid By"
                            value={paidBy}
                            onChange={(e) => {
                                setPaidBy(e.target.value)
                                setIsSaved(false)
                            }}
                        />



                        <button onClick={() => {
                            handleSaveGroup()
                        }} style={{ marginTop: "10px" }}
                            disabled={totalExpense < 0}
                        >
                            Save Group
                        </button>
                    </div>
                </div>}
            {timelySplit === "equal" &&
                <div className="create-group-form">
                    <h3>Create New Group</h3>
                    <div className="create-group-fields">
                        <label>Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            placeholder="Enter Group Name"
                            onChange={(e) => {
                                setGroupName(e.target.value)
                                setIsSaved(false)
                            }}
                        />
                        <h3>Add Members</h3>
                        {members.map((member, index) => (
                            <div key={index} className="member-inputs">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={member.name}
                                    onChange={(e) => {
                                        handleMemberChange(index, "name", e.target.value)
                                        setIsSaved(false)
                                    }}
                                />


                            </div>
                        ))}
                        <button onClick={() => {
                            handleAddMembers()
                            setIsSaved(false)
                        }}>Add Members</button>

                        <label>Enter Total Expense</label>
                        <input
                            type="number"
                            value={totalExpense}
                            onChange={(e) => {
                                setTotalExpense(Number(e.target.value))
                                setIsSaved(false)
                            }}
                        />



                        <input
                            type="text"
                            placeholder="Paid By"
                            value={paidBy}
                            onChange={(e) => {
                                setPaidBy(e.target.value)
                                setIsSaved(false)
                            }}
                        />

                        <button onClick={() => {
                            handleSaveGroup()
                        }}
                            style={{ marginTop: "10px" }}
                        >
                            Save Group
                        </button>
                    </div>
                </div>
            }
            {isSaved && <p>Group Created Sucessfully</p>}
        </>
    )
}   