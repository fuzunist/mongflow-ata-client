import { ChevronLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            <div className='flex max-[576px]:flex-col justify-between gap-y-4 mb-6'>
                <button
                    onClick={() => navigate('/apps/products')}
                    className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2'
                >
                    <ChevronLeftIcon
                        size={14}
                        strokeWidth={2}
                    />{' '}
                    {t('turnBack')}
                </button>
            </div>
        </>
    )
}

export default Header
