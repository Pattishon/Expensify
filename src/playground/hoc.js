import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Informacje</h1>
    {props.isAdmin && <p>tajemnica</p>}
    <p>dzisiaj jestem zmęczona {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>Informacja od admina</p>}

      <WrappedComponent {...props} />
    </div>
  );
};

const withAuth = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Proszę się zalogować</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = withAuth(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="informacja" />,
  document.getElementById("root")
);
// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="informacja" />,
//   document.getElementById("root")
// );
