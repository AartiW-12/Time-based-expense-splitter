import { useEffect, useState } from "react";
import "./Profile.css";
import { useGroups } from "../group/group-context/GroupContext";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { groups = [] } = useGroups();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: user?.fullName || user?.username || "Guest",
    email: user?.email || "",
    profile_photo: null,
    phoneNo: ""
  });

  useEffect(() => {
    if (user) {
      setProfileInfo(prev => ({
        ...prev,
        name: user.fullName || user.username, 
        email: user.email
      }));
    }
  }, [user]);

  function editProfileInfo(e) {
    const { name, value } = e.target;
    setProfileInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleIsEditing() {
    setIsEditingProfile(!isEditingProfile);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileInfo(prev => ({
        ...prev,
        profile_photo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleLogout() {
    logout(); // clears user state + removes smartSplit-user from localStorage
    navigate("/login"); // redirect to login page
  }
  const calculateUserFinancials = () => {
    const userId = user?.userId;
    if (!userId) {
      return {
        userGroupsCount: 0,
        expenseBreakdown: [],
        netBalance: 0
      };
    }

    let userGroupsCount = 0;
    let expenseBreakdown = [];
    let totalOwed = 0;
    let totalReceivable = 0;

    groups.forEach(group => {
      const userMember = group.members?.find(m => m.userId === userId);
      if (!userMember) return;

      userGroupsCount++;

      group.expenses?.forEach(expense => {
        const totalMembers = group.members.length;
        const share = expense.totalAmount / totalMembers;

        const paidByMember = group.members.find(
          m => m.name === expense.paidBy
        );
        const isPaidByUser = paidByMember?.userId === userId;

        group.members.forEach(member => {
          const isCurrentUser = member.userId === userId;

          if (isCurrentUser && !isPaidByUser) {
            totalOwed += share;

            expenseBreakdown.push({
              type: "owes",
              group: group.groupName,
              description: expense.description,
              amount: share,
              person: expense.paidBy,
              total: expense.totalAmount
            });
          }

          if (!isCurrentUser && isPaidByUser) {
            totalReceivable += share;

            expenseBreakdown.push({
              type: "receives",
              group: group.groupName,
              description: expense.description,
              amount: share,
              person: member.name,
              total: expense.totalAmount
            });
          }
        });
      });
    });

    return {
      userGroupsCount,
      expenseBreakdown,
      netBalance: totalReceivable - totalOwed
    };
  };

  const { userGroupsCount, expenseBreakdown, netBalance } =
    calculateUserFinancials();

  return (
    <div className="profile-container">
      <div className="userinfo-card">
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-content">
          <div className="profile-left">
            <label className="profile-photo-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditingProfile}
              />
              <div
                className="profile-photo"
                style={{
                  backgroundImage: profileInfo.profile_photo
                    ? `url(${profileInfo.profile_photo})`
                    : "none"
                }}
              />
            </label>
          </div>

          <div className="profile-right">
            {!isEditingProfile ? (
              <>
                <div className="username">{profileInfo.name}</div>
                <div className="email">{profileInfo.email}</div>

                <div className="stats">
                  <p><strong>Total Groups:</strong> {userGroupsCount}</p>

                  <p className="net-status">
                    {netBalance > 0 && (
                      <span className="positive">
                        You will receive ₹{netBalance.toFixed(2)}
                      </span>
                    )}

                    {netBalance < 0 && (
                      <span className="negative">
                        You need to pay ₹{Math.abs(netBalance).toFixed(2)}
                      </span>
                    )}

                    {netBalance === 0 && (
                      <span className="neutral">
                        All settled up 🎉
                      </span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="edit-profile">
                <label>Name</label>
                <input
                  name="name"
                  value={profileInfo.name}
                  onChange={editProfileInfo}
                />

                <label>Email</label>
                <input
                  name="email"
                  value={profileInfo.email}
                  onChange={editProfileInfo}
                />

                <label>Phone</label>
                <input
                  name="phoneNo"
                  value={profileInfo.phoneNo}
                  onChange={editProfileInfo}
                />
              </div>
            )}

            <div className="buttons">
              <button className="edit-profile-btn" onClick={handleIsEditing}>
                {isEditingProfile ? "Save" : "Edit"}
              </button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {expenseBreakdown.length > 0 && (
        <div className="all-expenses-card">
          <h2 className="section-title">All Expenses</h2>

          {expenseBreakdown.map((exp, index) => (
            <div key={index} className="expense-item">
              <strong>{exp.group}</strong> - {exp.description}
              <p>Total: ₹{exp.total.toFixed(2)}</p>

              {exp.type === "owes" ? (
                <p className="expense-owe">
                  ₹{exp.amount.toFixed(2)} to {exp.person}
                </p>
              ) : (
                <p className="expense-receive">
                  ₹{exp.amount.toFixed(2)} from {exp.person}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}