import { setDarkMode } from '@/store/actions/theme'
import { useDarkMode } from '@/store/hooks/theme'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { SunIcon, MoonIcon } from 'lucide-react'

const Switcher = () => {
    const darkMode = useDarkMode()

    return (
        <div className='flex justify-center items-center h-full px-[15px] max-[428px]:px-3 cursor-pointer'>
            <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={classNames(
                    'relative inline-flex h-[21px] w-12 shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
                    {
                        'bg-topsearch-dark border-input-border-dark text-topsearch-light ': darkMode,
                        'bg-topsearch-light border-body-fg-light text-topsearch-dark ': !darkMode
                    }
                )}
            >
                <span
                    aria-hidden='true'
                    className={classNames(
                        'pointer-events-none h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out flex justify-center items-center',
                        {
                            'translate-x-6 bg-body-fg-light': darkMode,
                            'translate-x-0 bg-body-fg-dark': !darkMode
                        }
                    )}
                >
                    {darkMode ? (
                        <MoonIcon
                            size={14}
                            strokeWidth={2}
                        />
                    ) : (
                        <SunIcon
                            size={14}
                            strokeWidth={2}
                        />
                    )}
                </span>
            </Switch>
        </div>
    )
}

export default Switcher
