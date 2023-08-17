"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
}) => {
    const router = useRouter();

    const handleLogout = () => {
        //Handle logout
    }

    return ( 
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full flex justify-between items-center mb-4">
                <div className="hidden md:flex gap-x-2 items-center">
                    {/* <button className="text-white font-medium text-lg flex"> */}
                        <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                            <RxCaretLeft className="text-white" size={35}/>
                        </button>
                        <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                            <RxCaretRight className="text-white" size={35}/>
                        </button>
                    {/* </button> */}
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 flex transition">
                        <HiHome className="text-black" size={35}/>
                    </button>
                    <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 flex transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    <>
                    <div>
                        <Button 
                        className="
                            bg-transparent 
                            text-neutral-300 
                            font-medium
                        "
                        >
                        Sign up
                        </Button>
                    </div>
                    <div>
                        <Button 
                        className="bg-white px-6 py-2"
                        >
                        Log in
                        </Button>
                    </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    );
}
 

export default Header;