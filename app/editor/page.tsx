import ProtectedRoute from "../components/protectRoute";

const EditorDashboard = () => {
  return (
    <ProtectedRoute roles={['editor']}>
      <div>Editor Dashboard</div>
    </ProtectedRoute>
  );
};

export default EditorDashboard;
