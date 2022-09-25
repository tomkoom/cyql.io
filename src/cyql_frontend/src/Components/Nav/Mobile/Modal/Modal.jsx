import React from "react";
import css from "./Modal.module.css";

// icons
import { iCube, iRocket, iPlus, iChartArea, iBolt, iInfinity } from "../../../../Icons/Icons";
import CrossIcon from "../../../../Icons/CrossIcon/CrossIcon";

// components
import NavLink from "./NavLink/NavLink";
import SignInBtn from "./SignInBtn/SignInBtn";
import ProfileActions from "./ProfileActions/ProfileActions";
import { Theme, Price, Socials } from "../../../index";

// routes
import { toApps, toUpcoming, toSubmit, toNft, toJobs, toHome } from "../../../../Routes/routes";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../../State/modals";

// auth
import { useAuth } from "../../../../Context/AuthContext";

const Modal = () => {
  const dispatch = useDispatch();
  const { principalId } = useAuth();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div>
      {mobileMenuModal && (
        <div className={css.modal} onClick={() => dispatch(setMobileMenuModal(false))}>
          <div className={css.content} onClick={(e) => e.stopPropagation()}>
            <div className={css.nav}>
              <div className={css.navList}>
                <NavLink label="Home" to={toHome} icon={iInfinity} />
                <NavLink label="Projects" to={toApps} icon={iCube} />
                <NavLink label="Upcoming" to={toUpcoming} icon={iRocket} />
                <NavLink label="cyql NFT" to={toNft} icon={iChartArea} />
                <NavLink label="Jobs" to={toJobs} icon={iBolt} />
                <NavLink label="Submit" to={toSubmit} icon={iPlus} />
              </div>

              <hr className={css.div} />
              {!principalId ? <SignInBtn /> : <ProfileActions />}

              <hr className={css.div} />
              <div className={css.controls}>
                <Theme />
                <Price />
              </div>

              <Socials />
            </div>

            <div className={css.crossIcon}>
              <CrossIcon onClick={() => dispatch(setMobileMenuModal(false))} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
