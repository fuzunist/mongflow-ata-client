import Card from '@/components/Card'
import Col from '@/components/Col'
import { useUser } from '@/store/hooks/user'
import Photo from './Photo'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Informations from './Informations'
import PasswordChanger from './PasswordChanger'

const Profile = () => {
    const user = useUser()
    const { t } = useTranslation()

    return (
        <div className='flex min-h-[calc(100vh-152.6px)] w-full'>
            <Col variant='full'>
                <Card>
                    <Card.Body>
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-6 mb-6'>
                                <Photo
                                    photo={user.photo}
                                    t={t}
                                    user={user}
                                />
                                <div className='flex-1 flex flex-col justify-center'>
                                    <h5 className='uppercase text-text-dark-light dark:text-text-dark-dark text-lg font-semibold'>
                                        {user.fullname || user.username}
                                    </h5>
                                    <span className='italic text-footer-fg-light dark:text-footer-fg-dark'>{t(user.usertype)}</span>
                                    <Link
                                        to={`mailto:${user.email}`}
                                        className='text-link-fg-light hover:text-link-hover-light text-sm overflow-hidden text-ellipsis whitespace-nowrap'
                                    >
                                        {user.email}
                                    </Link>
                                </div>
                            </div>
                            <Informations
                                user={user}
                                t={t}
                            />
                            <PasswordChanger
                                user={user}
                                t={t}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default Profile
