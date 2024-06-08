import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "src/assets/images/cosmos.svg"
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContent'
import { GoPerson } from 'react-icons/go'
import { hideSidebarAtom } from 'src/store/jotai'
import { useAtom } from 'jotai'
import { SlNotebook } from "react-icons/sl";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const user = useAuth()
  const [hidden, setHidden] = useAtom(hideSidebarAtom)


  return (
    <header className="bg-white pe-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4" aria-label="Global">
        <a href="#" className=" py-1.5" onClick={() => navigate('')}>
          <span className="sr-only">Cosmos AI</span>
          <img className="h-8 w-auto rounded-full" src={logo} alt="logo" />
        </a>

        <div className="flex md:hidden gap-3 items-center">
          {
            hidden && <button
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setHidden(false)}
            >
              <SlNotebook className='text-black' />
            </button>
          }

          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12 items-center">
          {navigation.map((item) => (
            <p key={item.name} onClick={() => navigate(item.href)} className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </p>
          ))}
          {
            hidden && <p
              className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
              onClick={() => setHidden(false)}
            >
              History
            </p>
          }
          {/* login button */}
          {
            user?.isLoggedin === true ?
              <p
                className="cursor-pointer border-2 p-2 rounded-lg hover:bg-slate-200"
                onClick={() => navigate('settings')}
              >
                <GoPerson />
              </p> : <p onClick={() => navigate('login')} className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </p>
          }

        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 me-3" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <p
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    // href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}