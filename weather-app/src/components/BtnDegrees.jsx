import Proptypes from "prop-types";

const BtnDegrees = ({ active, activar, texto }) => {
  return (
    <>
      {" "}
      <button onClick={activar} className={active === texto ? "active" : ""}>
        {" "}
        {texto}{" "}
      </button>
    </>
  );
};

export default BtnDegrees;

BtnDegrees.propTypes = {
  active: Proptypes.string.isRequired,
  activar: Proptypes.func.isRequired,
  texto: Proptypes.string.isRequired,
};
