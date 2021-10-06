import { useDispatch, useSelector } from "react-redux";

function Calendar() {
  const dispatch = useDispatch();
  const numbers = useSelector((numbers) => numbers);

  return (
    <>
      <h2>Kalenteri</h2>
      <div>
        <div>{numbers}</div>
        <button onClick={(e) => dispatch({ type: "FIN" })}>Suomi</button>
        <button onClick={(e) => dispatch({ type: "ENG" })}>English</button>
        <button onClick={(e) => dispatch({ type: "SWE" })}>Svenska</button>
      </div>
    </>
  );
}

export default Calendar;
