import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSanctuary = () => {
  return (
    <div className="sanctuary-page">
      <div className="">
        <h1 className="sanctuary-name">
          <Skeleton width={250} />
        </h1>

        <p className="sanctuary-detail">
          <Skeleton width={300} />
        </p>

        <p className="sanctuary-detail">
          <Skeleton width={200} />
        </p>

        <p className="sanctuary-detail">
          <Skeleton width={250} />
        </p>

        <p className="sanctuary-detail">
          <Skeleton width={120} />
        </p>
        
      </div>
    </div>
  );
};

export default SkeletonSanctuary
