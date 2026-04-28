import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonAnimals = () => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <div key={index} className="animal-card">
                    <Skeleton height={180} className="animal-card-img" />

                    <div className="animal-card-info">
                        <Skeleton height={24} width="60%" />
                        <Skeleton height={18} width="45%" />
                        <Skeleton height={18} width="35%" />
                        <Skeleton height={40} width="50%" />
                        <Skeleton height={18} width="65%" />

                        <div className="animal-card-tags">
                            <Skeleton height={28} width={80} />
                            <Skeleton height={28} width={100} />
                        </div>
                    </div>

                    <div className="animal-card-warnings">
                        <Skeleton height={20} width="70%" />
                        <Skeleton height={20} width="60%" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default SkeletonAnimals
