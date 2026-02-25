import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useGroups } from "../group/group-context/GroupContext";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { groups } = useGroups();
  const { user } = useAuth();
  const navigate = useNavigate();

  const loggedInUserId = user?.userId;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Groups</h1>
        <button
          className="create-group-btn"
          onClick={() => navigate("/create-group")}
        >
          Create Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="empty-groups">
          <p>No groups yet. Create your first group!</p>
        </div>
      ) : (
        <div className="group-list">
          {groups.map((group) => {
            const totalExpense = group.expenses.reduce(
              (sum, e) => sum + e.totalAmount,
              0
            );

            const userMember = group.members.find(
              (m) => m.userId === loggedInUserId
            );

            const calculateUserShare = () => {
              let userShare = 0;

              group.expenses.forEach((expense) => {
                const totalTime =
                  group.splitType === "timely"
                    ? group.members.reduce(
                        (sum, m) => sum + (m.timeUsed || 0),
                        0
                      )
                    : group.members.length;

                if (group.splitType === "equal") {
                  userShare +=
                    expense.totalAmount / group.members.length;
                } else if (userMember?.timeUsed) {
                  userShare +=
                    (userMember.timeUsed / totalTime) *
                    expense.totalAmount;
                }
              });

              return userShare;
            };

            const userShare = calculateUserShare();

            return (
              <div
                key={group._id}
                className="group-card"
                onClick={() => navigate(`/group/${group._id}`)}
              >
                <h3>{group.groupName}</h3>

                <div className="group-details">
                  <p>
                    <strong>Type:</strong> {group.groupType}
                  </p>

                  <p>
                    <strong>Members:</strong> {group.members.length}
                  </p>

                  <p>
                    <strong>Total Expense:</strong> ₹
                    {totalExpense.toFixed(2)}
                  </p>

                  <p className="user-share">
                    Your Share: ₹{userShare.toFixed(2)}
                  </p>

                  <span className="created-date">
                    Created:{" "}
                    {new Date(group.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {groups.length > 0 && (
        <div className="summary-card">
          <h3>Summary</h3>

          <p>
            <strong>Total Groups:</strong> {groups.length}
          </p>

          <p>
            <strong>Total Expenses Across Groups:</strong> ₹
            {groups
              .reduce((sum, group) => {
                return (
                  sum +
                  group.expenses.reduce(
                    (expSum, exp) => expSum + exp.totalAmount,
                    0
                  )
                );
              }, 0)
              .toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}