import mailDisplay from "../layouts/mailDisplayer.template";

export default function Received() {
    let data = <div> Hi </div>;
    return (
      <>
        {mailDisplay()}
      </>  
    );
};