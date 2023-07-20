import React from "react";
import arrowDown from "../../assets/arrow-down.svg";

const DetailsShowsAdmin = () => {
  return (
    <div className="schedules-cinemas">
      <div className="schedule">
        <p>Agosto</p>
        <div>
          <div>
            <span>14</span>
            <p>Lun</p>
          </div>
          <div>
            <span>15</span>
            <p>Mar</p>
          </div>
          <div>
            <span>16</span>
            <p>Mie</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="shows"></div>
      <div>
        <p>Funciones por multiplex</p>
        <button>
          Nuevo Multiplex
          <span>+</span>
        </button>
      </div>
      <div>
        <p>Los Molinos</p>
        <span>
          <img src={arrowDown} alt="Icon for arrow" />
        </span>
      </div>
      <div>
        <p>Santa Fe</p>
        <span>
          <img src={arrowDown} alt="Icon for arrow" />
        </span>
      </div>
    </div>
  );
};

export default DetailsShowsAdmin;
