import Modal from '@/components/Modal'
import CreateProduction from '@/modals/CreateProduction'

import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { t } = useTranslation()

    return (
        <div className='flex-1 flex max-[576px]:flex-col'>
            <div className='min-[576px]:flex-[1_3_auto]'>
                <Modal
                    className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 mb-6 flex justify-center items-center gap-2'
                    text={
                        <>
                            <PlusIcon
                                size={14}
                                strokeWidth={2}
                            />{' '}
                            {t('addShift')}
                        </>
                    }
                >
                    {({ close }) => <CreateProduction closeModal={close} />}
                </Modal>
            </div>
        </div>
    )
}

export default Header
