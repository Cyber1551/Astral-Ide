import {useState} from "react";
import {appWindow} from '@tauri-apps/api/window';
import "./AppBar.css";

const AppBar = () => {
    const [isScaleUp, setScaleUp] = useState(false);

    const onClose = () => appWindow.close();
    const onMinimize = () => appWindow.minimize();

    const onScaleUp = () => {
        appWindow.toggleMaximize();
        setScaleUp(true);
    }

    const onScaleDown = () => {
        appWindow.toggleMaximize();
        setScaleUp(false);
    }

    return <div data-tauri-drag-region className={"bg-secondary flex items-center justify-between pl-2 fixed top-0 left-0 right-0 h-8"}>
        <div className={"flex items-center gap-1 5 pl-2"}>
            {/*Image*/}
            <span className={"text-xs uppercase text-primary-text"}>ASTRAL</span>
        </div>
        <div className={"flex items-center h-full"}>
            <i className="action-icon ri-subtract-line" onClick={onMinimize}></i>
            {isScaleUp ? <i className="action-icon ri-file-copy-line" onClick={onScaleDown}></i> : <i onClick={onScaleUp} className="action-icon ri-stop-line"></i>}

            <i id="ttb-close" className="action-icon ri-close-fill" onClick={onClose}></i>
        </div>
    </div>
}

export default AppBar;