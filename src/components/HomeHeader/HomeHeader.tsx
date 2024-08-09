import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "src/assets/images/cosmos.svg"
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContent'
import { GoPerson } from 'react-icons/go'
import { darkMoodAtom, hideSidebarAtom } from 'src/store/jotai'
import { useAtom } from 'jotai'
import { SlNotebook } from "react-icons/sl";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: 'Pricing', href: '/pricing' },
]

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const user = useAuth()
  const [hidden, setHidden] = useAtom(hideSidebarAtom)
  const [darkMode, setDarkMode] = useAtom(darkMoodAtom)
  // console.log('darkMode', darkMode)
  return (
    <header className="pe-4 ">
      <nav className="text-gray-700 dark:text-gray-200 mx-auto flex max-w-7xl items-center justify-between py-4" aria-label="Global">
        <a href="#" className="ms-4 py-1.5" onClick={() => navigate('')}>
          <span className="sr-only">Cosmos AI</span>
          <img className="h-8 w-auto rounded-full" src={logo} alt="logo" />
        </a>

        <div className="flex md:hidden gap-3 items-center">
          {
            hidden && <button
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
              onClick={() => setHidden(false)}
            >
              <SlNotebook className='' />
            </button>
          }

          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12 items-center">
          {navigation.map((item) => (
            <p key={item.name} onClick={() => navigate(item.href)} className="cursor-pointer text-sm font-semibold leading-6">
              {item.name}
            </p>
          ))}
          {
            hidden && <p
              className="cursor-pointer text-sm font-semibold leading-6"
              onClick={() => setHidden(false)}
            >
              History
            </p>
          }
          <div className="flex flex-col justify-center items-center ml-3">
            <input
              type="checkbox" name="light-switch" className="light-switch sr-only"
              onClick={() => {
                setDarkMode(!darkMode)
              }}
            />
            <label className="relative flex items-center justify-center">
              {
                darkMode ? <svg
                  onClick={() => {
                    setDarkMode(!darkMode)
                  }}
                  className='cursor-pointer'
                  width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
                  <path className="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                </svg> :
                  <svg
                    onClick={() => {
                      setDarkMode(!darkMode)
                    }}
                    className='cursor-pointer'
                    width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                    <path className="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
                  </svg>
              }

              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
          {/* login button */}
          {
            user?.isLoggedin === true ?
              <p
                className="cursor-pointer border-2 p-[6px] rounded-lg dark:border-gray-400 hover:bg-slate-200 dark:hover:bg-gray-300 transition dark:text-white text-black hover:text-black"
                onClick={() => navigate('settings')}
              >
                <GoPerson />
              </p> : <p onClick={() => navigate('login')} className="cursor-pointer text-sm font-semibold leading-6">
                Log in <span aria-hidden="true">&rarr;</span>
              </p>
          }

        </div>
      </nav>
      <Dialog as="div" className="lg:hidden bg-gray-600" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-neutral-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                navigate('');
                setMobileMenuOpen(false);
              }}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">CosmosAI</span>
              <img className="h-8 w-auto" src={logo} alt="logo" />
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 me-3" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-mt-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <p
                    key={item.name}
                    onClick={() => {
                      navigate(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-neutral-600"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
              {user?.isLoggedin === true ? (
                <p
                  onClick={() => {
                    user.logout()
                  }}
                  className="cursor-pointer text-md font-semibold leading-6 py-4"
                >
                  Log out
                </p>
              ) : (
                <p
                  onClick={() => navigate('login')}
                  className="cursor-pointer text-md font-semibold leading-6 py-4"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </p>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}