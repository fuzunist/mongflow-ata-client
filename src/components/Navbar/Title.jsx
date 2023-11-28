import { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useWindowSize } from 'react-use'

const Title = () => {
    const location = useLocation()
    const { t } = useTranslation()
    const { width } = useWindowSize()

    const numberRegex = new RegExp(/[0-9]+/, 'gi')

    const title = useMemo(() => {
        return location.pathname
            .split('/')
            .filter((item) => !!item)
            .map((item) => {
                if (item.match(numberRegex)) item = 'editing'
                return item
            })
            .join('-')
    }, [location])

    if (width < 992) return null
    return (
        <>
            <Helmet>
                <title>Adminto - {t(title)}</title>
            </Helmet>
            <h4 className='px-7 h-full flex justify-center items-center w-fit text-lg font-semibold text-pagetitle-light dark:text-pagetitle-dark'>
                {t(title)}
            </h4>
        </>
    )
}

export default Title
