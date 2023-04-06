import "./DancingDog.scoped.css";
const DancingDog = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="container--center h-full text-center">
          <div className="dancing-pug relative m-auto block">
            <ul className="relative block m-auto">
              <li className="ear"></li>
              <li className="ear"></li>
              <li className="eye"></li>
              <li className="eye"></li>
              <li></li>
            </ul>
          </div>
          <h2 className="text-2xl font-bold mt-4">GOT YOU</h2>
          <h2 className="text-xl mt-4">Nothing in Agreement!</h2>
        </div>
      </div>
    </>
  );
};

export default DancingDog;
