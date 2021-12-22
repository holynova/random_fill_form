// IIFE 立即执行函数
(function () {
  const log = console.log.bind(console);
  const $ = document.querySelectorAll.bind(document);
  // import * as random from "./utils/random";

  function between(min = 0, max = 100) {
    // return min + Math.random() * (max - min)
    return min + Math.floor(Math.random() * (max - min));
  }

  function choose(arr = []) {
    let index = between(0, arr.length);
    return arr[index];
  }

  class FormFiller {
    // https://www.apesk.com/mbti/dati.asp
    // https://www.apesk.com/mmpi/
    constructor() {}

    handleRadio({ isSinglePage = false, chooseType = "RANDOM" }) {
      if (isSinglePage) {
        // 逐个点击法, 这样每次都是选最后一个选项
        if (chooseType === "LAST") {
          $("input[type=radio]").forEach((ele) => {
            ele.click();
          });
          return;
        }
        if (chooseType === "FIRST") {
          return;
        }

        if (chooseType === "RANDOM") {
          let groupDict = {};
          // 分组处理法, 根据name分组
          $("input[type=radio]").forEach((ele) => {
            let key = ele?.name || "no_name";
            if (key in groupDict) {
              groupDict[key] = [...groupDict[key], ele];
            } else {
              groupDict[key] = [ele];
            }
          });

          Object.entries(groupDict).forEach(([key, value]) => {
            let ele = choose(value);
            ele.click();
          });
          return;
        }
      }
    }

    handleInput() {
      $("input[type=text]").forEach((ele) => {
        ele.setAttribute("value", "foo@bar.com");
      });
    }

    handleCheckbox() {
      $("input[type=checkbox]").forEach((ele) => ele.click());
    }

    go({ isSinglePage = false, chooseType = "RANDOM" }) {
      this.handleInput();
      this.handleCheckbox();
      this.handleRadio({ isSinglePage, chooseType });
    }
  }

  function main() {
    console.time();
    log("start");
    let f = new FormFiller();
    f.go({ isSinglePage: true, chooseType: "RANDOM" });
    log("done");
    console.timeEnd();
  }

  main();
})();
