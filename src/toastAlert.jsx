import React from "react";

const ToastAlert = (props) => {
  React.useEffect(() => {
    setTimeout(() => {});
  });

  return (
    <div className={fastestTime ? "toastAlert" : "timeDiv"}>
      {fastestTime !== null && (
        <>
          {isNewRecord && (
            <div>{`New Record!!  Fastest Time: ${fastestTime} seconds`}</div>
          )}
        </>
      )}
    </div>
  );
};
export default ToastAlert;
