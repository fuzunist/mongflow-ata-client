import Card from '@/components/Card'
import Col from '@/components/Col'
import UserTypes from '@/constants/UserTypes'

import { changeUserTypeFromDB } from '@/services/auth'
import { useUser } from '@/store/hooks/user'
import { useTranslation } from 'react-i18next'
import { changeUserType } from '@/store/actions/apps'
const User = ({ user }) => {
    const me = useUser()
    const { t } = useTranslation()

    const onChange = async (usertype) => {
        const response = await changeUserTypeFromDB(me.tokens.access_token, user.userid, usertype)
        if (response?.error) console.log(response.error)
        changeUserType(user.userid, usertype)
    }

    return (
        <Col variant='full'>
            <Card>
                <Card.Body>
                    <div className='flex justify-between items-center gap-16 max-[1024px]:gap-12 max-[728px]:gap-8 max-[600px]:gap-4'>
                        <span className='flex-1 text-text-dark-light dark:text-text-dark-dark overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold'>
                            {user.username} <span className='italic text-sm font-medium ml-2'>{user.fullname}</span>
                        </span>
                        <a
                            className='flex-1 text-link-fg-light hover:text-link-hover-light cursor-pointer select-none overflow-hidden text-ellipsis whitespace-nowrap'
                            href={`mailto:${user.email}`}
                        >
                            {user.email}
                        </a>
                        <select
                            value={user.usertype ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                            className='flex-1 py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                        >
                            {['', ...UserTypes].map((usertype, index) => (
                                <option
                                    value={usertype}
                                    key={index}
                                >
                                    {t(usertype || 'choose')}
                                </option>
                            ))}
                        </select>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default User
