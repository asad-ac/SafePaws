import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonAnimalDetail = () => {
    return (
        <>
            <div className="detail-card">
                <Skeleton height={300} className="detail-image" />

                <div className="detail-info">
                    <Skeleton height={28} width="50%" />
                    <Skeleton height={22} width="90%" />
                    <Skeleton height={22} width="70%" />
                    <Skeleton height={22} width="60%" />
                    <Skeleton height={22} width="65%" />
                    <Skeleton height={22} width="55%" />
                    <Skeleton height={22} width="75%" />

                    <div className="detail-status">
                        <Skeleton height={34} width={150} />
                        <Skeleton height={34} width={150} />
                        <Skeleton height={34} width={150} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <Skeleton height={32} width={70} />
                <Skeleton height={32} width={90} />
                <Skeleton height={32} width={80} />
            </div>
    </>
    )
}

export default SkeletonAnimalDetail