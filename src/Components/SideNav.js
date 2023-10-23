import React from 'react'

export default function SideNav(props) {
    
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("closebtn").style.display = "none";
    }
    return (
        <>
            <div id="mySidenav" className="sidenav">
                <a href={'#'} className="closebtn" id="closebtn" onClick={closeNav}>&times;</a>
                <ul>
                    {props.list}
                </ul>
            </div>

        </>
    )
}
