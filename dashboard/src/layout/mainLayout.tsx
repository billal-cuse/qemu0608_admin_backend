import React, {useEffect, useState} from "react";
import {Menu} from "../components/menu";
import {Breadcrumb} from "../components/breadcrumb";
import {Outlet} from "react-router";
import Header from "../components/header";


const MainLayout: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setIsMobile(true);

            if (window.innerWidth > 768) setMenuOpen(true);
            else setMenuOpen(false);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main className="layout h-screen remove-scroll w-[100%]">
            <Menu isOpen={menuOpen} onClose={() => setMenuOpen(prev => isMobile ? !prev : false)}/>

            <div className="content bg-[#f6f6f6] h-full">
                <Header onChange={() => setMenuOpen(prev => !prev)}/>
                <Breadcrumb />
                <div className={"px-5"}>
                    <div className={"bg-white w-full remove-scroll overflow-y-auto rounded"}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainLayout;
