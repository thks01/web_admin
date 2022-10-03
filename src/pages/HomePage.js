import Login from "../components/Login";

function HomePage({ setLoginStatus }) {
  return (
    <div>
      <Login setLoginStatus={setLoginStatus} />
    </div>
  );
}

export default HomePage;
