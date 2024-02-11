
import SettingMenuSelect from '@/components/pages/setting/setting-menu-select'
import SettingMenuSidebar from '@/components/pages/setting/setting-menu-sidebar'


export default function SettingPageLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className='flex flex-col pb-16 pt-16 px-6 bg-gray-100 min-h-full items-center max-h-fit'>
    <div className='md:hidden w-full mb-2'>
      <SettingMenuSelect />
    </div>
    <div className='flex flex-1 gap-2 w-10/12 max-md:w-full'>
        <div className='bg-white p-0 shadow-sm rounded-md border-2 border-gray-200 overflow-hidden w-3/12 max-md:hidden'>
          <SettingMenuSidebar />
        </div>
      <div className='flex-1 bg-white p-0 shadow-sm rounded-md border-2 border-gray-200 overflow-hidden h-fit'>
        {children}
      </div>
      </div>
    </div>
  )
}