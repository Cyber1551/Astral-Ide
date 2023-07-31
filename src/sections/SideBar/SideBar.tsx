import { useState } from "react";
import { IFile } from "../types/file";

const SideBar = () => {
    const [projectName, setProjectName] = useState("");
    const [files, setFiles] = useState<IFile[]>([]);


    return <aside className="w-60 shrink-0 h-full bg-primary">
        <div className="flex justify-center float-right w-2 h-full cursor-e-resize group">
            <div className="bg-border-primary w-0.5 h-full group-hover:bg-sky-500 cursor-col-resize"></div>
        </div>
        <div className="sidebar-header flex items-center justify-between p-4 py-2.5 text-primary-text">

        </div>
        <div className="code-structure">

        </div>
    </aside>
}

export default SideBar;
