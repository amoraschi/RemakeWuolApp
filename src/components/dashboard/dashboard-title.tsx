import { User } from '@/types/User'

interface DashboardTitleProps {
  userInfo: User
}

export default function DashboardTitle ({
  userInfo
}: DashboardTitleProps) {
  return (
    <div>
      <span
        className='text-2xl font-semibold'
      >
        {userInfo.defaultCommunity.community.segmentations.study.item?.name ?? 'Sin estudios'}
      </span>
      <br />
      <span
        className='text-md'
      >
        {userInfo.defaultCommunity.community.segmentations.center.item?.name ?? 'Sin centro'} - {userInfo.defaultCommunity.community.segmentations.university.item?.name ?? 'Sin universidad'}
      </span>
    </div>
  )
}
