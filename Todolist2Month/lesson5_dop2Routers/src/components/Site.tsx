import React from 'react';
import styles from './Site.module.css'
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {PageOne} from "./pages/PageOne";
import {PageTwo} from "./pages/PageTwo";
import {PageThree} from "./pages/PageThree";
import {Error404} from "./pages/Error404";
import {Page} from "./pages/Page";
import {dataState} from "./Data/dataState";


export const Site = () => {
    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    <div><NavLink to={"/page/0"}
                                  className= {({isActive}) => (isActive ? styles.active: styles.navLink)} >Page1</NavLink>
                    </div>
                    <div><NavLink to={"/page/1"}
                                  className={({isActive}) => isActive ? styles.active : styles.navLink}>Page2</NavLink>
                    </div>
                    <div><NavLink to={"/page/2"}
                                  className={({isActive}) => isActive ? styles.active : styles.navLink}>Page3</NavLink>
                    </div>
                    <div><a href="/page3">Page3 A HREF</a></div>
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"/page0"}/>}/>

                        {/*<Route path={"/page1"} element={<PageOne/>}/>*/}
                        <Route path={"/page/:id"} element={<Page pages={dataState.pages}/>} />

                        <Route path={"/*"} element={<Error404/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};
////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import styles from './Site.module.css'
// import {Navigate, NavLink, Route, Routes} from "react-router-dom";
// import {PageOne} from "./pages/PageOne";
// import {PageTwo} from "./pages/PageTwo";
// import {PageThree} from "./pages/PageThree";
// import {Error404} from "./pages/Error404";
//
//
// export const Site = () => {
//     return (
//         <div>
//             <div className={styles.header}><h1>HEADER</h1></div>
//             <div className={styles.body}>
//                 <div className={styles.nav}>
//                     <div><NavLink to={"/page1"}
//                                   className= {({isActive}) => (isActive ? styles.active: styles.navLink)} >Page1</NavLink>
//                     </div>
//                     <div><NavLink to={"/page2"}
//                                   className={({isActive}) => isActive ? styles.active : styles.navLink}>Page2</NavLink>
//                     </div>
//                     <div><NavLink to={"/page3"}
//                                   className={({isActive}) => isActive ? styles.active : styles.navLink}>Page3</NavLink>
//                     </div>
//                     <div><a href="/page3">Page3 A HREF</a></div>
//                 </div>
//                 <div className={styles.content}>
//                     <Routes>
//                         <Route path={"/"} element={<Navigate to={"/page1"}/>}/>
//
//                         <Route path={"/page1"} element={<PageOne/>}/>
//                         <Route path={"/page2"} element={<PageTwo/>}/>
//                         <Route path={"/page3"} element={<PageThree/>}/>
//
//                         <Route path={"/*"} element={<Error404/>}/>
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//     );
// };
