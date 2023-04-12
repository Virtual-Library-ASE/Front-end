import "./BasicAvatar.scoped.css";
const Avatar1 = () => {
  return (
    <>
      <div className="avatar avatar--green">
        <div className="avatar-body body--green">
          <div className="avatar-eye eye--left">
            <div className="avatar-eye-pupil pupil--purple">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-eye eye--right">
            <div className="avatar-eye-pupil pupil--purple">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-smile"></div>
          <div className="avatar-tooth tooth--left"></div>
          <div className="avatar-tooth tooth--right"></div>
        </div>
      </div>
    </>
  );
};

const Avatar2 = () => {
  return (
    <>
      <div className="avatar avatar--orange">
        <div className="avatar-body avatar-body--round body--pink">
          <div className="avatar-horn horn--right"></div>
          <div className="avatar-horn horn--left"></div>
          <div className="avatar-eye avatar-eye--orange eye--center">
            <div className="avatar-eye-pupil pupil--orange">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-smile">
            <span className="avatar-tongue"></span>
          </div>
        </div>
      </div>
    </>
  );
};

const Avatar3 = () => {
  return (
    <>
      <div className="avatar avatar--pinkish">
        <div className="avatar-body body--violet">
          <div className="avatar-eye avatar-eye--magenta eye--left">
            <div className="avatar-eye-pupil pupil--purple">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-eye avatar-eye--magenta eye--right">
            <div className="avatar-eye-pupil pupil--purple">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-smile"></div>
        </div>
      </div>
    </>
  );
};

const Avatar4 = () => {
  return (
    <>
      <div className="avatar avatar--blue">
        <div className="avatar-body body--darkPink">
          <div className="avatar-eye avatar-eye--green eye--left">
            <div className="avatar-eye-pupil pupil--green">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-eye avatar-eye--violet eye--right">
            <div className="avatar-eye-pupil pupil--pink">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-tooth tooth--right"></div>
          <div className="avatar-smile"></div>
        </div>
      </div>
    </>
  );
};

const Avatar5 = () => {
  return (
    <>
      <div className="avatar avatar--magenta">
        <div className="avatar-body body--pinkishViolet">
          <div className="avatar-eye eye--center">
            <div className="avatar-eye-pupil pupil--purple">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-smile"></div>
        </div>
      </div>
    </>
  );
};

const Avatar6 = () => {
  return (
    <>
      <div className="avatar avatar--skyBlue">
        <div className="avatar-body body--limeGreen">
          <div className="avatar-ear ear--left">
            <span className="avatar-signal"></span>
          </div>
          <div className="avatar-ear ear--right">
            <span className="avatar-signal"></span>
          </div>
          <div className="avatar-eye avatar-eye--green eye--center-top">
            <div className="avatar-eye-pupil pupil--limeGreen">
              <span className="avatar-eye-pupil-blackThing">
                <span className="avatar-eye-pupil-lightReflection"></span>
              </span>
            </div>
          </div>
          <div className="avatar-smile"></div>
        </div>
      </div>
    </>
  );
};

const BasicAvatar = (params) => {
  const avatarList = [
    <Avatar1 />,
    <Avatar2 />,
    <Avatar3 />,
    <Avatar4 />,
    <Avatar5 />,
    <Avatar6 />,
  ];

  let index = params.index || 0;
  return (
    <>
      <div className="basic-avatar">{avatarList[index]}</div>
    </>
  );
};

export default BasicAvatar;
