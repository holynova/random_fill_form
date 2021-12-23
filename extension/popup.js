const runFunc = (func) => {
  console.log("runFunc");
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func,
    });
  });
};

function init() {
  console.log("init");

  q(".btn-go").addEventListener("click", async () => {
    runFunc(fill);
  });
}

function main() {
  console.log("main");
  init();
}
main();
