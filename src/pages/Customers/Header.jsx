import Modal from '@/components/Modal'
import Search from '@/components/Search'
import CreateCustomer from '@/modals/CreateCustomer'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Header = ({ authenticate }) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='flex max-[576px]:flex-col justify-between gap-y-4 mb-6'>
                {authenticate ? (
                    <Modal
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
                        {({ close }) => <CreateCustomer closeModal={close} />}
                    </Modal>
                ) : (
                    <div className='block' />
                )}

                <Search />
            </div>
            <div className='flex justify-between items-center max-md:hidden select-none px-6 py-2 border-b-2 border-solid border-border-light dark:border-border-dark mb-6'>
                {[t('customername'), t('emailAddress'), t('companyname'), t('phone'), t('address')].map((val, index) => (
                    <div
                        key={index}
                        className='w-1/5 px-2 text-text-dark-light dark:text-text-dark-dark'
                    >
                        {val}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Header
