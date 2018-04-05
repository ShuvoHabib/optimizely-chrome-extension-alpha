import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
    optimizelyDetails(){
        var oData = window.optimizely.data;
        var activeExperiments = oData.state.activeExperiments;

        if (oData.state.activeExperiments && oData.state.activeExperiments.length) {
            activeExperiments = oData.state.activeExperiments;

            var mCnt = activeExperiments.length;
            var mExp = '';
            var tCount = 0;

            for (var i=0;i<(mCnt);i++) {
                mExp = activeExperiments[i];
                var curTest = oData.experiments[mExp].name;
                var curVar = oData.state.variationNamesMap[mExp];
                var curVarID = oData.state.variationIdsMap[mExp];

                tCount += 1;
                console.log('    Experiment #' + tCount + ': ID=' + mExp + ' Name="' + curTest + '" Variation: ID=' + curVarID + ' Name="' + curVar + '"');
            }
        }
    }
    render() {
        var myJavaScript = "("+this.optimizelyDetails+")()";
        var scriptTag = document.createElement("script");
        scriptTag.innerHTML = myJavaScript;
        document.head.appendChild(scriptTag);
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