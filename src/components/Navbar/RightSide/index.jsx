import Switcher from './Switcher'
import Bell from './Bell'
import RightUserBox from './RightUserBox'
import LanguageSwitcher from './LanguageSwitcher'

const RightSide = () => {
    return (
        <div className='float-right flex h-full justify-end items-center'>
            <Bell />
            <RightUserBox />
            <Switcher />
            <LanguageSwitcher />
        </div>
    )
}

export default RightSide
