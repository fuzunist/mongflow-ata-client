import Modal from '@/components/Modal'
import Search from '@/components/Search'
import CreateEditCustomer from '@/modals/CreateEditCustomer'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Navigation from './Navigation'
import { useState } from 'react'

const Header = ({ authenticate, page, setPage }) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='flex max-[576px]:flex-col justify-between gap-y-4 mb-6'>
               
                    <Modal
                    width='xl'
                        className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2'
                        text={
                            <>
                                <PlusIcon
                                    size={14}
                                    strokeWidth={2}
                                />{' '}
                                {t('addCustomer')}
                            </>
                        }
                    >
                        {({ close }) => <CreateEditCustomer editing={false} closeModal={close} />}
                    </Modal>
            

                <Search />
            </div>
            <div>
                <Navigation page={page} setPage={setPage} />
            </div>
          
        </>
    )
}

export default Header
