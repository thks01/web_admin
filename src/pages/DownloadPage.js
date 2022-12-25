import Download from "../components/Download";

function DownloadPage({ setLoginStatus }) {
  return (
    <div>
      <Download setLoginStatus={setLoginStatus} />
    </div>
  );
}

export default DownloadPage;
