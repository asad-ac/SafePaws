import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonSponsors = () => {
    return (
      <>
        {[...Array(12)].map((_, index) => (
          <div key={index} className='sponsor-card'>
            <div className='sponsor-info'>
              <Skeleton height={22} width="50%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={18} width="70%" />
              <Skeleton height={18} width="50%" />
              <Skeleton height={18} width="65%" />
  
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Skeleton height={32} width={80} />
                <Skeleton height={32} width={90} />
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

export default SkeletonSponsors
