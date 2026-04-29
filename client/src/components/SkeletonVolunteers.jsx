import Skeleton from 'react-loading-skeleton'
import {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonVolunteers = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
    <>
      {[...Array(30)].map((_, index) => (
        <div key={index} className=''>
          <div>
            <Skeleton height={24} width="60%" />
            <Skeleton height={18} width="80%" />
            <Skeleton height={18} width="50%" />
            <Skeleton height={18} width="70%" />
            <Skeleton height={18} width="65%" />

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <Skeleton height={32} width={80} />
              <Skeleton height={32} width={90} /> 
            </div>
          </div>
        </div>
      ))}
    </>
    </SkeletonTheme>
  )
}

export default SkeletonVolunteers