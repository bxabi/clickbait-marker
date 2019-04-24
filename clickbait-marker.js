var rules = getRules_english();
for (var i = 0; i < rules.length; i++) {
    rules[i] = new RegExp(rules[i], "i", "u");
}

function mark(node) {
    for (let link of node.querySelectorAll("a")) {
        console.log(link.text);
        for (var i = 0; i < rules.length; i++) {
            applyRule(link, rules[i]);
        }
    }

    function applyRule(link, pattern) {
        if (pattern.test(link.text)) {
            //link.style.backgroundColor = "white";
            //link.style.color = "gray";            
            link.innerHTML = "Clickbait detected: <strike>" + link.innerHTML + "</strike>";
            //link.parentNode.insertBefore(node,link); 
        }
    }
}

mark(document.body);

// Select the node that will be observed for mutations
var targetNode = document.body;
// Options for the observer (which mutations to observe)
var config = { childList: true, subtree: true }; //attributes: true
// Callback function to execute when mutations are observed

var callback = function (mutations) {
    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            mark(mutation.addedNodes[i]);
        }
    });
    //    observer.disconnect();
    //    setTimeout(function () {
    //        mark();
    //        observer.observe(targetNode, config);
    //    }, 1000);
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(targetNode, config);
