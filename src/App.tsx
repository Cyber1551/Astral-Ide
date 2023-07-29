import AppBar from "./components/AppBar/AppBar";
import ContentArea from "./components/ContentArea/ContentArea";
import SideBar from "./components/SideBar/SideBar";

function App() {

  return (
      <div>
        <AppBar />
        <div id="editor" className="pt-8 h-screen flex items-start overflow-hidden bg-primary">
            {/*<ContextWrapper>*/}
            {/*    <SideBar />*/}
            {/*    <ContentArea />*/}
            {/*</ContextWrapper>*/}
            <SideBar />
            <ContentArea />
        </div>
    </div>
  );
}

export default App;
