"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'

function SettingMenuSelect() {
  const router = useRouter()
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const selectedMenu = window.location.pathname === '/setting/my-info' ? 'my-info' : 'account'
    setPath(selectedMenu)
  })

  return (
    <Select
      defaultValue={path}
      onValueChange={(value) => {
        if (value === 'my-info') {
          router.push('/setting/my-info')
        } else if (value === 'account') {
          router.push('/setting/account')
        }
      }}
    >
      <SelectTrigger className='w-10/12 max-md:w-full'>
        <SelectValue placeholder={
          path === 'account' ? '계정 설정' : '내 정보'
        }/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='my-info' className='text-gray-900'>내 정보</SelectItem>
        <SelectItem value='account' className='text-gray-900'>계정 설정</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SettingMenuSelect