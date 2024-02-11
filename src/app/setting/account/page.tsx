import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AccountForm from '@/containers/setting/account-form'
import { Text } from '@radix-ui/themes'
import React from 'react'

const SettingPage = () => {

  return (
    <>
      <div className='bg-slate-950 flex flex-col align-middle justify-start px-6 py-5 border-b-2 border-gray-200'>
        <Text size='6' weight='bold' className='text-gray-50'>계정 설정</Text>
        <Text size='2' weight='medium' className='text-gray-400'>아이디 및 비밀번호, 소셜 로그인 설정을 변경할 수 있습니다.</Text>
      </div>
      <div className='flex flex-col justify-start p-6'>
        <AccountForm />
        <Text size='4' weight='bold' className='text-gray-900 mt-8'>GitHub 계정 연결</Text>
        <Text size='2' weight='medium' className='text-gray-400'>GitHub OAuth를 통해 계정을 연결합니다.</Text>
        <Button variant='default' className='mt-4 w-24'>연결하기</Button>
        <div className='h-px bg-gray-200 my-4' />
        <Text size='4' weight='bold' className='text-gray-900 mt-8'>카카오 계정 연결</Text>
        <Text size='2' weight='medium' className='text-gray-400'>카카오톡 계정을 연결합니다.</Text>
        <Button variant='default' className='mt-4 w-24'>연결하기</Button>
        <div className='h-px bg-gray-200 my-4' />
        <Text size='4' weight='bold' className='text-red-600 mt-8'>계정 비활성화</Text>
        <Text size='2' weight='medium' className='text-gray-400'>계정을 비활성화 하면 30일 후 모든 정보가 삭제되며, 복구할 수 없습니다.</Text>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive' className='mt-4 w-24'>계정 비활성화</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 비활성화하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                계정을 비활성화하면 30일 후 모든 정보가 삭제되며, 복구할 수 없습니다.
                30일 이내에 로그인하면 계정을 활성화 할 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input type='password' placeholder='비밀번호' className='w-full' />
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <Button variant='destructive' disabled>계정 비활성화</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>  
    </>
  )
}

export default SettingPage