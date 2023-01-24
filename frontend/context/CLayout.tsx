import { useRouter } from "next/router";
import { createContext, useState } from "react";
interface ICLayout {
    currentMenu: any,
    setCurrentMenu: any,
    redirect: any
}
export const CLayout = createContext<ICLayout>({
    currentMenu: '/admin/pelanggan',
    setCurrentMenu: () => {},
    redirect: () => {}
});
export const CLayoutProvider = (props) => {
    let {children} = props;
    const [menu, setMenu] = useState('/admin/dashboard');
    const route = useRouter();

    function setCurrentMenu(props: string){
        setMenu(props);
        route.push(props);
    }
    function redirect(props: string){
        route.push(props);
    }
    let currentMenu = menu;
    return (<>
        <CLayout.Provider value={{
            currentMenu, setCurrentMenu, redirect
        }}>
            {children}
        </CLayout.Provider>
    </>)

}