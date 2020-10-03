// 自用显示基金详情
// 接口使用 https://www.doctorxiong.club/
/**
 * Author: Luck89757
 * Github: https://github.com/Luck89757
 */

// 引用
async function getinfo(jcode) {
    const $ = importModule("Env");
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
        Script.complete()
        return 0
    }
    data = res["data"][0]
    let widget = new ListWidget()
    
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")];
    bgColor.locations = [0.0, 1.0];
    widget.backgroundGradient = bgColor;
    widget.addSpacer();
    widget.spacing = 5;
    
    
    let jijin = widget.addText('👀 基金详情')
    jijin.font = new Font('SF Mono', 12);
    jijin.textColor = new Color("#F8F8FF")
    
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

    Script.setWidget(widget)
    Script.complete()
    return 1
}
jcode = args.widgetParameter
if(jcode === null ) jcode = '161725';
getinfo(jcode)
