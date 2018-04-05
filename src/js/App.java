import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oData: '',
            activeExperiments: '',
            mCnt: '',
            mExp: '',
            curTest: '',
            curVar: '',
            curVarID: '',
            tCount: 0,
        };
    }
    optimizelyDetails(){
        if (this.activeExperiments && this.activeExperiments.length) {
            for (var i=0;i<(this.mCnt);i++) {
                // assuming this.state = { value: 0 }
                this.setState({
                    oData: window.optimizely.data,
                    activeExperiments: this.oData.state.activeExperiments,
                    mCnt: this.activeExperiments.length,
                    mExp: this.activeExperiments[i],
                    curTest: this.oData.experiments[mExp].name,
                    curVar:this.oData.state.variationNamesMap[mExp],
                    curVarID:this.oData.state.variationIdsMap[mExp],
                    tCount: this.tCount + 1
                });
            }
        }
    };
    render() {
        var myJavaScript = "("+this.optimizelyDetails+")()";
        var scriptTag = document.createElement("script");
        scriptTag.innerHTML = myJavaScript;
        document.head.appendChild(scriptTag);
        console.log(this.mExp, this.curTest);
        return (
            <div>
                Your App injected to DOM correct
                <Button/>
            </div>
        )
    }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
    // If message is injectApp
    if (request.injectApp) {
        // Inject our app to DOM and send response
        injectApp();
        response({
            startedExtension: true,
        });
    }
});

function injectApp() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "chromeExtensionReactApp");
    document.body.prepend(newDiv);
    ReactDOM.render(<App/>, newDiv);
}