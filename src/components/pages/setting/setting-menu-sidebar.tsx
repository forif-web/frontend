"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FiUser, FiSettings } from 'react-icons/fi'
import { cn } from '@/lib/utils'

function SettingMenuSidebar() {
  const [active, setActive] = useState<'my-info' | 'account'>('my-info')
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    setPath(window.location.pathname)
    setActive(path === '/setting/my-info' ? 'my-info' : 'account')
  }, [path])
  
  return (
    <div className='flex flex-col justify-center items-center p-4'>
      <Button
        variant='ghost'
        className={cn(
          'w-full justify-start font-semibold gap-2',
          active === 'my-info' && 'text-gray-900 bg-gray-100',
        )}
        asChild
        onClick={() => {
          setActive('my-info')
        }}
      >
      <Link href='/setting/my-info'
      >
        <FiUser size={16}/>
        내 정보
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          'w-full justify-start font-semibold gap-2',
          active === 'account' && 'text-gray-900 bg-gray-100',
        )}
        asChild
        onClick={() => {
          setActive('account')
        }}
      >
        <Link href='/setting/account'>
        <FiSettings size={16} />
          계정 설정</Link>
      </Button>
    </div>
  )
}

export default SettingMenuSidebar