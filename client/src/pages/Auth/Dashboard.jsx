import React from 'react';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import BSCard from '../../components/common/BSCard';
import BSButton from '../../components/common/BSButton';

const Dashboard = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user, logout } = useAuth();

  // CONDITIONAL LOAD: USER ERROR [POSSIBLY REPLACE WITH LOADING STATE]
  if (!user) {
    return (
      <BSCard title="Profile">
        <div className="text-center mb-4">
          Cannot Retrieve User
        </div>
      </BSCard>
    )
  }

  return (
    <BSCard title="Profile" authform>
      <div className="text-center mb-4">
        <h4>Welcome {user.username}!</h4>
      </div>
      <p><strong>Email: </strong>{user.email}</p>
      { user.isAdmin && <p><strong>Secret: </strong> Hello Admin - nice to see you here</p>}

      {/* Log Out & Forces a Redirect */}
      { user &&
        <div className="mt-5">
          <BSButton onClick={() => { logout() }}>
            Log Out
          </BSButton>
        </div>
      }
    </BSCard>
  )
}

export default Dashboard