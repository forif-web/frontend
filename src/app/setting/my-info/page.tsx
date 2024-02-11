import MyInfoForm from '@/containers/setting/my-info-form'
import { Text } from '@radix-ui/themes'
import React from 'react'

const SettingPage = () => {

  return (
    <>
      <div className='bg-slate-950 flex flex-col align-middle justify-start px-6 py-5 border-b-2 border-gray-200'>
        <Text size='6' weight='bold' className='text-gray-50'>내 정보</Text>
        <Text size='2' weight='medium' className='text-gray-400'>회원님의 정보를 확인할 수 있습니다.</Text>
      </div>
      <div className='flex flex-col justify-start p-6 md:w-8/12'>
        <MyInfoForm />
      </div>  
    </>
  )
}

export default SettingPage