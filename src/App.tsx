import React, {FC} from "react";

import {Home} from "pages/Home";

import {HeaderBar} from "components/common/HeaderBar";

const App: FC = () => {

    fetch('https://www.producthunt.com/frontend')
    return (
        <>
            <HeaderBar/>
            <Home/>
        </>
    );
};

export default App;
