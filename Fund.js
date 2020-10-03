// 自用显示基金详情
// 选择组件时候填写对应基金代码即可
// 接口使用 https://www.doctorxiong.club/
/**
 * Author: Luck89757
 * Github: https://github.com/Luck89757
 */
const goupdate = true;  //更新开关
const $ = importModule("Env");

async function getinfo(jcode) {
    
    const url = {
        url: `https://api.doctorxiong.club/v1/fund?code=` + jcode,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.44"
        }
    }
    log($)
    const res = await $.get(url)
    if (res["code"] != 200) {
        let widget = new ListWidget()
        let expectWorthDate = widget.addText("接口错误")
        expectWorthDate.font = Font.boldSystemFont(25)
        Script.setWidget(widget)
        widget.presentSmall()
        return widget
    }
    data = res["data"][0]
    let widget = new ListWidget()
    
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")];
    bgColor.locations = [0.0, 1.0];
    widget.backgroundGradient = bgColor;
    widget.addSpacer();
    widget.spacing = 4;
    
    let jijin = widget.addText('📈 基金详情')
    jijin.font = new Font('SF Mono', 15);
    jijin.textColor = new Color("#F8F8FF")
    jijin.textOpacity = 0.7
    
    let expectWorthDate = widget.addText(data["expectWorthDate"])
    expectWorthDate.font = new Font('SF Mono', 12);
    expectWorthDate.textColor = new Color("#808080")

    let name = widget.addText(data["name"])
    name.font = new Font('SF Mono', 12);
    name.textColor = new Color("#F8F8FF")

    let lastWeekGrowth = widget.addText("周涨幅：" + data["lastWeekGrowth"])
    lastWeekGrowth.font = new Font('SF Mono', 12);
    lastWeekGrowth.textColor = new Color("#7FFF00")
    if (data["lastWeekGrowth"].indexOf("-") == -1) {
        lastWeekGrowth.textColor = new Color("#FF4500")
    }
    
    let lastMonthGrowth = widget.addText("月涨幅：" + data["lastMonthGrowth"])
    lastMonthGrowth.font = new Font('SF Mono', 12);
    lastMonthGrowth.textColor = new Color("#7FFF00")
    if (data["lastMonthGrowth"].indexOf("-") == -1) {
        lastMonthGrowth.textColor = new Color("#FF4500")
    }
    
    let netWorth = widget.addText("净值：" + data["netWorth"])
    netWorth.textColor = new Color("#7dbbae")
    netWorth.font = new Font('SF Mono', 12)
    
    let expectGrowth = widget.addText("涨幅：" + data["expectGrowth"])
    expectGrowth.font = new Font('SF Mono', 13)
    expectGrowth.textColor = new Color("#7FFF00") // 跌

    if (data["expectGrowth"].indexOf("-") == -1) {
        expectGrowth.textColor = new Color("#FF4500")
    }
    widget.addSpacer();
    widget.spacing = 4;
    
    Script.setWidget(widget)
    widget.presentSmall()
    return widget
}
jcode = args.widgetParameter
if(jcode === null ) jcode = '161725';
getinfo(jcode)

//更新代码
function update() {
  log("🔔更新脚本开始!");
  scripts.forEach(async (script) => {
    await $.getFile(script);
  });
  log("🔔更新脚本结束!");
}

const scripts = [
  {
    moduleName: "Fund",
    url:
      "https://raw.githubusercontent.com/Luck89757/scriptable/main/Fund.js",
  },
];
if (goupdate == true) update();
