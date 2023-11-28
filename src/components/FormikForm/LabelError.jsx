import { useTranslation } from 'react-i18next'

const LabelError = ({ value, touched, errors }) => {
    const { t } = useTranslation()
    return errors?.[value] && touched?.[value] && <span className='text-danger mt-1 text-xs ml-1'>{t(errors[value])}</span>
}

export default LabelError
