import { useNavigate, useParams } from "react-router-dom";
import "./GroupDetails.css";
import { useGroups } from "../group-context/GroupContext";

export default function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { getGroupById } = useGroups(); 

  const group = getGroupById(groupId);

  if (!group) {
    return <p className="error">Group Not Found</p>;
  }

  return (
    <div className="group-details-container">
      <h1>{group.groupName}</h1>
      <p><strong>Type:</strong> {group.groupType}</p>
      <p><strong>Split Type:</strong> {group.splitType}</p>

      <h3>Members</h3>
      <ul>
        {group.members.map((member) => (
          <li key={member.userId}>
            {member.name}
            {member.timeUsed && ` - ${member.timeUsed} ${group.timeUnit}`}
          </li>
        ))}
      </ul>

      <h3>Expenses</h3>
      {group.expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        group.expenses.map((exp) => {
          // Calculate total time based on split type
          const totalTime = group.splitType === "timely"
            ? group.members.reduce((sum, m) => sum + (m.timeUsed || 0), 0)
            : group.members.length;

          return (
            <div key={exp.expenseId} className="expense-card">
              <h4>{exp.description}</h4>
              <p><strong>Total:</strong> ₹{exp.totalAmount}</p>
              <p><strong>Paid By:</strong> {exp.paidBy}</p>

              <h5>Split Details:</h5>
              <ul>
                {group.members.map((member) => {
                  let share;
                  
                  if (group.splitType === "equal") {
                    // Equal split
                    share = (exp.totalAmount / group.members.length).toFixed(2);
                  } else {
                    // Time-based split
                    share = ((member.timeUsed / totalTime) * exp.totalAmount).toFixed(2);
                  }

                  return (
                    <li key={member.userId}>
                      {member.name}: ₹{share}
                      {member.timeUsed && ` (${member.timeUsed} ${group.timeUnit})`}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}