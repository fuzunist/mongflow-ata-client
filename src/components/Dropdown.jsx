import { Popover, Transition } from '@headlessui/react'
import { MoreVerticalIcon } from 'lucide-react'

const Dropdown = ({ children }) => {
    return (
        <Popover className='absolute top-0 right-0 m-6'>
            <Popover.Button className='flex justify-center items-center text-disabled-light'>
                <MoreVerticalIcon size={20} />
            </Popover.Button>
            <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                className='absolute top-full translate-y-2 w-[160px] right-0 rounded overflow-hidden shadow-box z-[100]'
            >
                <Popover.Panel className='bg-popover-light dark:bg-popover-dark py-4 px-2 rounded flex flex-col'>{children}</Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default Dropdown
