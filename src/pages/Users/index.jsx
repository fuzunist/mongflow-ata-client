import Row from '@/components/Row'
import User from './User'
import { useSearch, useUsers } from '@/store/hooks/apps'
import { useMemo } from 'react'
import Header from './Header'
import { useEffect } from 'react'
import { setSearch } from '@/store/actions/apps'

const Users = () => {
    const users = useUsers()
    const search = useSearch()

    const searchedUsers = useMemo(() => {
        if (!search) return users
        return users.filter((user) =>
            user.username
                .toLocaleLowerCase('tr')
                .startsWith(search.toLocaleLowerCase('tr') || user.fullname.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr')))
        )
    }, [users, search])

    useEffect(() => {
        setSearch('')

        return () => {
            setSearch('')
        }
    }, [])

    return (
        <>
            <Header />
            <Row>
                {searchedUsers.length === 0 && (
                    <div className='py-2 text-center rounded bg-red-400 text-white w-full text-lg font-semibold'>Kullanıcı bulunamadı.</div>
                )}
                {searchedUsers.map((user, index) => (
                    <User
                        key={index}
                        user={user}
                    />
                ))}
            </Row>
        </>
    )
}

export default Users
