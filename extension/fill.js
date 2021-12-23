// IIFE 立即执行函数
const fill = function () {
  const log = console.log.bind(console);
  const $ = document.querySelectorAll.bind(document);

  function between(min = 0, max = 100) {
    return min + Math.floor(Math.random() * (max - min));
  }

  function choose(arr = []) {
    let index = between(0, arr.length);
    return arr[index];
  }

  function delay(ms = 30) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  class FormFiller {
    // https://www.apesk.com/mbti/dati.asp
    // https://www.apesk.com/mmpi/
    // https://www.zixin66.com/zx-list-test.php

    constructor() {}

    handleRadio({ chooseType = "RANDOM" }) {
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
        if (chooseType === "FIRST") {
          ele = value[0];
        } else if (chooseType === "LAST") {
          ele = value[value.length - 1];
        }
        ele.click();
      });
    }

    handleInput() {
      $("input[type=text]").forEach((ele) => {
        ele.setAttribute("value", "foo@bar.com");
      });
    }

    handleCheckbox() {
      $("input[type=checkbox]").forEach((ele) => ele.click());
    }

    submit() {
      $("input[type=submit]").forEach((ele) => ele.click());
    }

    async go({ isSinglePage = false, chooseType = "RANDOM", max = 300 }) {
      const handleOnePage = () => {
        this.handleInput();
        this.handleCheckbox();
        this.handleRadio({ chooseType });
        this.submit();
      };

      if (isSinglePage) {
        handleOnePage();
        return "完成单页测试";
      }

      for (let i = 0; i < max; i++) {
        // log("========cnt = ", i);
        handleOnePage();
        await delay();
      }
      return "完成多页测试";
    }
  }

  function main() {
    log("开始测试");
    console.time("完成测试");
    let f = new FormFiller();
    f.go({ isSinglePage: false, chooseType: "RANDOM", max: 100 }).then(
      (res) => {
        log(res);
        console.timeEnd("完成测试");
      }
    );
  }
  main();
};
