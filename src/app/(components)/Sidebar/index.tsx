"use client"

import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-purple-500 hover:bg-purple-300 gap-3 transition-colors ${isActive ? "bg-purple-400 text-white" : ""}`}>
                <Icon className='w-6 h-6 !text-gray-700'/>
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebardCollapsed)
    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }
    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
        <div className={sidebarClassNames}>
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
                <div>Logo</div>
                <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>Guru Stock</h1>

            <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-purple-700" onClick={toggleSidebar}>
                <Menu className='w-4 h-4' />
            </button>
            </div>

            <div className="flex-grow mt-8">
                <SidebarLink  
                    href='/dashboard' 
                    icon={Layout} 
                    label='Dashboard' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/finances' 
                    icon={CircleDollarSign} 
                    label='Finanzas' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/inventory' 
                    icon={Archive} 
                    label='Inventario' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/products' 
                    icon={Clipboard} 
                    label='Productos' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/clients' 
                    icon={User} 
                    label='Clients' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/users' 
                    icon={User} 
                    label='Users' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/settings' 
                    icon={SlidersHorizontal} 
                    label='Configuracion' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/supplier' 
                    icon={SlidersHorizontal} 
                    label='Suppliers' 
                    isCollapsed={isSidebarCollapsed} 
                />
                <SidebarLink  
                    href='/category' 
                    icon={SlidersHorizontal} 
                    label='Category' 
                    isCollapsed={isSidebarCollapsed} 
                />
                
            </div>

            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                {/* Footer */}
                <p className='text-center text-xs text-gray-500'>&copy; 2025 Guru Stock</p>
            </div>

        </div>
    )
}

export default Sidebar