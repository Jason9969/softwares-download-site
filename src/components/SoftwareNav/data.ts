/**
 * SoftwareNav 组件专属数据模块
 *
 * 功能说明：
 * - 包含软件导航组件所需的所有软件分类和软件信息
 * - 数据结构：13个分类，80+款软件
 *
 * 维护说明：
 * - 添加新软件：在对应分类的 items 数组中添加新对象
 * - 添加新分类：在 apps 数组中添加新对象
 * - 每个软件包含：名称、描述、是否推荐、是否可下载、官网链接、图标地址
 */
import wnwbIcon from '/wnwb.ico'
import jpwbIcon from '/jpwb.png'

export interface AppItem {
    name: string
    desc: string
    recommend: number
    isDownloadable?: boolean
    url: string
    favicon?: string
}

export interface Category {
    category: string
    items: AppItem[]
}

export const apps: Category[] = [
    {
        category: "教学教研",
        items: [
            { name: "希沃白板5", desc: "专为教师设计的互动课件工具，内置学科素材与课堂活动", recommend: 0, isDownloadable: true, url: "https://easinote.seewo.com/", favicon: "https://easinote.seewo.com/favicon.ico" },
            { name: "希沃视频展台", desc: "实物投影展示，放大标注讲解，直观教学演示", recommend: 0, isDownloadable: true, url: "https://e.seewo.com/product/EasiCamera", favicon: "https://imlizhi-store-https.seewo.com/183b569618cc4ff8bfa26f1c5fa72a6a" },
            { name: "班级优化大师", desc: "课堂行为管理，学生积分评价，家校互通统计", recommend: 0, isDownloadable: true, url: "https://care.seewo.com/app/activity/download", favicon: "https://care.seewo.com/favicon.ico" },
            { name: "101教育PPT", desc: "海量学科课件模板，一键备课，课堂互动工具齐全", recommend: 0, isDownloadable: true, url: "https://ppt.101.com/", favicon: "https://ppt.101.com/images/code/pop-pc.png" },
            { name: "国家中小学智慧教育平台", desc: "教育部官方平台，全科课程资源齐全，完全免费", recommend: 0, isDownloadable: true, url: "https://basic.smartedu.cn/download_app", favicon: "https://basic.smartedu.cn/img/qrcode.25523d25.png?x-eos-process=image/format,webp" },
            { name: "八桂教学通", desc: "广西本地化教学平台，对接地方教材与数字资源", recommend: 0, isDownloadable: false, url: "https://rj.gxjyzy.com/rj/bgjxt", favicon: "https://rj.gxjyzy.com/assets/img/favicon.ico" }
        ]
    },
    {
        category: "日常办公",
        items: [
            { name: "WPS Office", desc: "国产办公套件，支持云端协作，提供个人免费版", recommend: 0, isDownloadable: true, url: "https://www.wps.cn/", favicon: "https://ee.wpscdn.cn/wpscn/favicon.ico" },
            { name: "腾讯会议", desc: "在线视频会议，支持300人同时参会，屏幕共享与录制", recommend: 0, isDownloadable: true, url: "https://meeting.tencent.com/download/", favicon: "https://meeting.tencent.com/favicon.ico" },
            { name: "腾讯文档", desc: "腾讯旗下在线文档，支持微信直接分享与多人实时协作", recommend: 0, isDownloadable: true, url: "https://docs.qq.com/home#download", favicon: "https://docs.idqqimg.com/tim/docs/desktop/favicon.ico" },
            { name: "金山文档", desc: "WPS旗下在线协作平台，与WPS深度互通，支持多人同时编辑", recommend: 0, isDownloadable: true, url: "https://www.kdocs.cn/welcome", favicon: "https://volcengine-kdocs-cache.wpscdn.cn/s1/static/images/d42a7af3100b01a49b8c.svg" }
        ]
    },
    {
        category: "社交通讯",
        items: [
            { name: "微信", desc: "国民级通讯工具，聊天支付小程序一站式体验", recommend: 0, isDownloadable: true, url: "https://pc.weixin.qq.com/", favicon: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico" },
            { name: "QQ", desc: "文件传输便捷，群组管理强大，支持远程协助", recommend: 0, isDownloadable: true, url: "https://im.qq.com/index/#/", favicon: "https://static-res.qq.com/static-res/imqq/qq-logo.png" },
            { name: "钉钉", desc: "企业考勤打卡，审批流程管理，视频会议一体化", recommend: 0, isDownloadable: true, url: "https://www.dingtalk.com/download", favicon: "https://gw.alicdn.com/imgextra/i3/O1CN01eMicSg1GVD4uXMWGv_!!6000000000627-73-tps-32-32.ico" },
            { name: "飞书", desc: "即时沟通与在线文档深度融合，项目协作高效流畅", recommend: 0, isDownloadable: true, url: "https://www.feishu.cn/download", favicon: "https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/84a9f036fe2b44f99b899fff4beeb963~tplv-jbbdkfciu3-image:0:0.image" }
        ]
    },
    {
        category: "浏览器",
        items: [
            { name: "Microsoft Edge", desc: "Windows系统自带，兼容性强，支持Chrome插件", recommend: 0, isDownloadable: true, url: "https://www.microsoft.com/zh-cn/edge/download", favicon: "https://edgecdn-embza6g8cacagcbn.z01.azurefd.net/welcome/static/favicon.png" },
            { name: "Google Chrome", desc: "网页加载速度快，插件生态丰富，前端开发者首选", recommend: 0, isDownloadable: true, url: "https://www.google.cn/intl/zh-CN/chrome/", favicon: "https://www.google.cn/chrome/static/images/favicons/android-icon-192x192.png" },
            { name: "360安全浏览器", desc: "网址安全检测，广告拦截，适配国内银行政务网站", recommend: 0, isDownloadable: true, url: "https://browser.360.cn/", favicon: "https://p4.ssl.qhimg.com/t110b9a93016f838be146a5b14d.png" },
            { name: "360极速浏览器X", desc: "Chromium内核双核切换，轻量流畅，启动快速", recommend: 0, isDownloadable: true, url: "https://chromex.360.cn/", favicon: "https://bs1.360sres.com/static/26b7ed8e98672fce.ico" },
            { name: "夸克", desc: "阿里旗下AI浏览器，集AI搜索、网盘、扫描于一体", recommend: 0, isDownloadable: true, url: "https://www.quark.cn/", favicon: "https://gw.alicdn.com/imgextra/i3/O1CN018r2tKf28YP7ev0fPF_!!6000000007944-2-tps-48-48.png" },
            { name: "QQ浏览器", desc: "文档在线预览，网页翻译便捷，账号一键登录", recommend: 0, isDownloadable: true, url: "https://browser.qq.com/", favicon: "https://browser.qq.com/favicon.ico" },
            { name: "搜狗浏览器", desc: "双核加速浏览，翻译取词便捷，适合国内日常使用", recommend: 0, isDownloadable: true, url: "https://sogou.browser.qq.com/", favicon: "https://sogou.browser.qq.com/favicon.ico" },
            { name: "Firefox火狐浏览器", desc: "开源注重隐私保护，插件丰富，可定制程度高", recommend: 0, isDownloadable: true, url: "https://www.firefox.com/zh-CN/download/all/", favicon: "https://www.firefox.com/media/img/favicons/firefox/browser/favicon.f093404c0135.ico" },
            { name: "UC浏览器", desc: "阿里旗下浏览器，网页加载快，内置UC网盘与智能搜索功能", recommend: 0, isDownloadable: true, url: "https://www.uc.cn/", favicon: "https://image.uc.cn/s/uae/g/61/uc-logo-v2.png" },
            { name: "联想浏览器", desc: "联想电脑内置浏览器，轻量流畅，适配联想设备", recommend: 0, isDownloadable: true, url: "https://browser.lenovo.com.cn/", favicon: "https://browser.lenovo.com.cn/favicon.ico?v=3" },
            { name: "星愿浏览器", desc: "基于 Chromium 的国产浏览器，支持鼠标手势、超级拖拽等增强功能，小众但口碑不错", recommend: 0, isDownloadable: true, url: "https://www.twinkstar.com/", favicon: "https://image.twinkstar.cn/20180703icon.png" },
            { name: "Vivaldi", desc: "Opera联合创始人打造，高度可定制，支持标签分组与笔记功能", recommend: 0, isDownloadable: true, url: "https://vivaldi.com/zh-hans/download/", favicon: "https://vivaldi.com/wp-content/uploads/cropped-favicon-32x32.png" },
        ]
    },
    {
        category: "输入法",
        items: [
            { name: "搜狗输入法", desc: "词库量大，皮肤主题多样，智能纠错与云联想", recommend: 0, isDownloadable: true, url: "https://shurufa.sogou.com/windows", favicon: "https://ife.gtimg.com/build/client/fromcc/official-website/assets/favicon_8dbb2ea.ico" },
            { name: "微信输入法", desc: "无广告弹窗，跨设备剪贴板同步，注重隐私保护", recommend: 0, isDownloadable: true, url: "https://z.weixin.qq.com/", favicon: "https://cdn.weread.qq.com/web/wetype/static/media/logo.d637ee9d9641555392dd.png" },
            { name: "讯飞输入法", desc: "语音转文字准确率高，支持多种方言语音输入", recommend: 0, isDownloadable: true, url: "https://srf.xunfei.cn/index.html#/", favicon: "https://srf.xunfei.cn/favicon.ico" },
            { name: "百度输入法", desc: "百度旗下输入法，支持语音、手手写、拼音等多种输入方式", recommend: 0, isDownloadable: true, url: "https://shurufa.baidu.com/default", favicon: "https://shurufa.baidu.com/default/favicon.ico" },
            { name: "手心输入法", desc: "纯净无广告的拼音输入法，体积小巧，主打简洁流畅体验", recommend: 0, isDownloadable: true, url: "https://www.xinshuru.com/", favicon: "https://www.xinshuru.com/img/favicon.ico" },
            { name: "搜狗五笔输入法", desc: "搜狗旗下五笔输入方案，支持五笔拼音混输入", recommend: 0, isDownloadable: true, url: "https://wubi.sogou.com/", favicon: "https://wubi.sogou.com/static/i/headlogo.png" },
            { name: "万能五笔输入法", desc: "较早推出的五笔输入法，支持五笔拼音混合输入", recommend: 0, isDownloadable: true, url: "https://www.wnwb.com/index.html", favicon: wnwbIcon },
            { name: "极品五笔输入法", desc: "国产五笔输入法，支持中文五笔编码输入", recommend: 0, isDownloadable: true, url: "http://www.jpwb.net/", favicon: jpwbIcon },
            { name: "QQ五笔输入法", desc: "腾讯旗下五笔输入法，支持五笔拼音混合输入", recommend: 0, isDownloadable: true, url: "https://qq.pinyin.cn/wubi/", favicon: "http://dl.qqpy.sogou.com/qq.pinyin.cn/icons/qq.pinyin.cn.ico" },
        ]
    },
    {
        category: "影音娱乐",
        items: [
            { name: "抖音", desc: "短视频社区，直播互动，算法个性化推荐", recommend: 0, isDownloadable: true, url: "https://www.douyin.com/downloadpage/pc", favicon: "https://p3-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/pwa_v3/192_192.png" },
            { name: "快手", desc: "短视频与直播社区，内容涵盖生活、娱乐、知识等多元领域", recommend: 0, isDownloadable: false, url: "https://www.kuaishou.com/", favicon: "https://p5-plat.wskwai.com/kos/nlav111422/ks-web/web-app-logo.png" },
            { name: "小红书", desc: "生活方式分享社区，发现好物与生活灵感", recommend: 0, isDownloadable: false, url: "https://www.xiaohongshu.com/", favicon: "https://picasso-static.xiaohongshu.com/fe-platform/0014d22afee72e538cadbe0be76e06bd1ebe55ec.png" },
            { name: "网易云音乐", desc: "个性化歌单推荐，音乐评论社区，独立音乐人聚集地", recommend: 0, isDownloadable: true, url: "https://music.163.com/#/download", favicon: "https://s1.music.126.net/style/favicon.ico?v20180823" },
            { name: "QQ音乐", desc: "正版曲库覆盖广，无损音质可选，歌词海报分享", recommend: 0, isDownloadable: true, url: "https://y.qq.com/download/index.html", favicon: "https://y.qq.com/favicon.ico" },
            { name: "酷狗音乐", desc: "曲库齐全，蝰蛇音效增强，内置K歌互动功能", recommend: 0, isDownloadable: true, url: "https://download.kugou.com/", favicon: "https://www.kugou.com/yy/static/images/play/logo.png" },
            { name: "汽水音乐", desc: "算法推荐精准，沉浸式播放体验，与抖音曲库互通", recommend: 0, isDownloadable: true, url: "https://music.douyin.com/qishui", favicon: "https://lf-luna.qishui.com/obj/music-luna-fe/luna/home/1.0.0.263/favicon.png" },
            { name: "酷我音乐", desc: "无损音质曲库丰富，支持在线听歌与本地下载，车载端体验好", recommend: 0, isDownloadable: true, url: "https://kuwo.cn/down", favicon: "https://www.kuwo.cn/favicon.ico?v=1" },
            { name: "喜马拉雅", desc: "国内领先的音频分享平台，涵盖有声书、播客、知识课程等丰富内容", recommend: 0, isDownloadable: true, url: "https://www.ximalaya.com/download/", favicon: "https://www.ximalaya.com/favicon.ico" },
            { name: "腾讯视频", desc: "热播剧集同步更新，4K画质支持，弹幕互动", recommend: 0, isDownloadable: true, url: "https://v.qq.com/download.html", favicon: "https://v.qq.com/favicon.ico" },
            { name: "爱奇艺", desc: "独家自制综艺与剧集，院线新片同步，杜比音效", recommend: 0, isDownloadable: true, url: "https://www.iqiyi.com/appstore.html", favicon: "https://www.iqiyi.com/logo.png" },
            { name: "优酷视频", desc: "经典影视片库深厚，综艺节目版权多，多端进度同步", recommend: 0, isDownloadable: true, url: "https://www.youku.com/ku/product/index", favicon: "https://img.alicdn.com/imgextra/i2/O1CN01BeAcgL1ywY0G5nSn8_!!6000000006643-2-tps-195-195.png" },
            { name: "哔哩哔哩", desc: "弹幕视频社区，涵盖动画、知识、科技等多元内容", recommend: 0, isDownloadable: true, url: "https://app.bilibili.com/", favicon: "https://static.hdslb.com/images/favicon.ico" },
            { name: "芒果TV", desc: "湖南广电旗下视频平台，热门综艺与剧集同步更新", recommend: 0, isDownloadable: true, url: "https://www.mgtv.com/app/", favicon: "https://static.hitv.com/icons/icon_144x144.1b7ca7.png" },
            { name: "剪映", desc: "视频剪辑工具，支持多平台使用", recommend: 0, isDownloadable: true, url: "https://www.capcut.cn/", favicon: "https://lf3-s.vlabstatic.com/obj/vilab-static/ies/ulike/web/resource/fe_official/assets/imgs/lv/favicon.ico" }
        ]
    },
    {
        category: "本地视频播放器",
        items: [
            { name: "PotPlayer", desc: "解码能力强大，格式兼容广泛，内存占用低", recommend: 0, isDownloadable: true, url: "https://potplayer.tv/?lang=zh_CN", favicon: "https://t1.daumcdn.net/potplayer/main/img/favicon.ico" },
            { name: "K-Lite Codec Pack", desc: "系统级解码器扩展包，通吃各种视频编码格式", recommend: 0, isDownloadable: true, url: "https://www.codecguide.com/download_kl.htm", favicon: "https://www.codecguide.com/mpc_logo.png" },
            { name: "VLC", desc: "开源跨平台播放器，免安装额外解码器，兼容性极强", recommend: 0, isDownloadable: true, url: "https://www.videolan.org/vlc/index.zh_CN.html", favicon: "https://images.videolan.org/images/icons-VLC/vlc.mini.svg" }
        ]
    },
    {
        category: "网盘传输",
        items: [
            { name: "百度网盘", desc: "用户基数大，分享链接广泛，存储空间充足", recommend: 0, isDownloadable: true, url: "https://pan.baidu.com/download", favicon: "https://nd-static.bdstatic.com/m-static/wp-brand/favicon.ico" },
            { name: "阿里云盘", desc: "上传下载不限速，大容量存储，数据加密安全", recommend: 0, isDownloadable: true, url: "https://www.aliyundrive.com/download", favicon: "https://img.alicdn.com/imgextra/i1/O1CN01JDQCi21Dc8EfbRwvF_!!6000000000236-73-tps-64-64.ico" },
            { name: "夸克网盘", desc: "在线播放流畅，搭配夸克浏览器使用便捷", recommend: 0, isDownloadable: true, url: "https://pan.quark.cn/list#/list/all", favicon: "https://pan.quark.cn/favicon.ico" }
        ]
    },

    {
        category: "压缩解压",
        items: [
            { name: "360压缩", desc: "操作简单易上手，支持主流压缩格式，完全免费", recommend: 0, isDownloadable: true, url: "https://www.360.cn/zip/", favicon: "https://s5.ssl.qhres2.com/static/ac191608d6304d0b.ico" },
            { name: "7-Zip", desc: "开源免费，压缩率表现出色，支持格式种类最多", recommend: 0, isDownloadable: true, url: "https://www.7-zip.org/download.html", favicon: "https://www.7-zip.org/favicon.ico" },
            { name: "WinRAR", desc: "经典老牌压缩工具，RAR格式原生支持，兼容性好", recommend: 0, isDownloadable: true, url: "https://www.rarlab.com/download.htm", favicon: "https://www.rarlab.com/favicon.ico" },
            { name: "Bandizip", desc: "多线程快速解压，自动检测编码，界面清爽无广告", recommend: 0, isDownloadable: true, url: "https://www.bandisoft.com/bandizip/", favicon: "https://www.bandisoft.com/favicon.ico" },
            { name: "PeaZip", desc: "开源免费的跨平台压缩工具，支持200多种压缩格式，界面清爽", recommend: 0, isDownloadable: true, url: "https://peazip.github.io/index.html", favicon: "https://peazip.github.io/peazip_ico24.png" },
            { name: "NanaZip", desc: "基于7-Zip的现代分支，适配Windows 11界面风格，开源免费", recommend: 0, isDownloadable: true, url: "https://github.com/M2Team/NanaZip", favicon: "https://nanazip.org/NanaZip.ico" },
        ]
    },
    {
        category: "系统工具",
        items: [
            { name: "驱动总裁", desc: "一键检测安装硬件驱动，离线驱动包齐全，适配主流品牌机型", recommend: 0, isDownloadable: true, url: "https://www.sysceo.com/software-softwarei-id-258.html", favicon: "https://www.sysceo.com/Public/images/favicon.ico" },
            { name: "DiskGenius", desc: "国产磁盘分区管理与数据恢复工具，支持分区调整、文件恢复与备份还原", recommend: 0, isDownloadable: true, url: "https://www.diskgenius.cn/download.php", favicon: "https://www.diskgenius.cn/favicon.ico" },
            { name: "傲梅分区助手", desc: "国产磁盘分区管理工具，支持无损分区调整、系统迁移与磁盘克隆", recommend: 0, isDownloadable: true, url: "https://www.disktool.cn/feature.html", favicon: "https://www.disktool.cn/favicon.ico" },
            { name: "Glary Disk Cleaner", desc: "磁盘垃圾清理工具，扫描清理临时文件与浏览器缓存，释放磁盘空间", recommend: 0, isDownloadable: true, url: "https://www.glarysoft.com/disk-cleaner/", favicon: "https://www.glarysoft.com/favicon.ico" },
            { name: "360系统急救箱", desc: "系统修复工具，修复系统错误,系统无法正常使用时的应急修复方案", recommend: 0, isDownloadable: true, url: "https://weishi.360.cn/jijiuxiang/index.html", favicon: "https://p0.ssl.qhimg.com//d/_open360/logo72nb/221_72.png" },
            { name: "Everything", desc: "基于NTFS索引的文件秒搜工具，启动快速，体积小", recommend: 0, isDownloadable: true, url: "https://www.voidtools.com/zh-cn/downloads/", favicon: "https://www.voidtools.com/favicon.ico" },
            { name: "Snipaste", desc: "截图后可贴到屏幕置顶，支持取色与标注，高效直观", recommend: 0, isDownloadable: true, url: "https://zh.snipaste.com/download.html", favicon: "https://zh.snipaste.com/img/logo.svg" },
            { name: "PixPin", desc: "截图、滚动长截图、屏幕录制、OCR文字识别多合一", recommend: 0, isDownloadable: true, url: "https://pixpin.cn/", favicon: "https://pixpin.cn/favicon.ico" },
            { name: "格式工厂", desc: "音视频图片格式批量转换，免费支持主流多媒体格式", recommend: 0, isDownloadable: true, url: "https://www.pcgeshi.com/download.html", favicon: "https://www.pcgeshi.com/favicon.ico" },
            { name: "Geek Uninstaller", desc: "彻底卸载软件，自动清理残留，免安装即开即用", recommend: 0, isDownloadable: true, url: "https://geekuninstaller.com/", favicon: "https://geekuninstaller.com/assets/images/icon_geek_32.png" },
            { name: "腾讯桌面整理", desc: "整理桌面图标，提升桌面整洁度", recommend: 0, isDownloadable: true, url: "https://guanjia.qq.com/product/zmzl/", favicon: "https://guanjia.qq.com/product/zmzl/images/icon_0_1.png" },
            { name: "OBS Studio", desc: "专业级屏幕录制与直播软件，支持多平台，免费开源", recommend: 0, isDownloadable: true, url: "https://obsproject.com/zh-cn/download", favicon: "https://obsproject.com/assets/images/new_icon_small-r.png" }
        ]
    },
    {
        category: "系统安全",
        items: [
            { name: "微软电脑管家", desc: "微软官方系统优化工具，病毒查杀与垃圾清理无捆绑", recommend: 0, isDownloadable: true, url: "https://pcmanager.microsoft.com/zh-cn", favicon: "https://pcmimage.officeplus.cn/images/logo2.webp" },
            { name: "360安全卫士极速版", desc: "安全防护功能精简版，去除冗余模块与弹窗广告", recommend: 0, isDownloadable: true, url: "https://weishi.360.cn/jisu/", favicon: "https://s1.ssl.qhres2.com/static/91edee8827634ff4.ico" },
            { name: "火绒安全", desc: "安静无弹窗打扰，系统占用低，支持自定义防护规则", recommend: 0, isDownloadable: true, url: "https://www.huorong.cn/", favicon: "https://www.huorong.cn/favicon.png" },
            { name: "联想电脑管家", desc: "联想设备专属，驱动自动更新，硬件状态监测", recommend: 0, isDownloadable: true, url: "https://guanjia.lenovo.com.cn/#page1", favicon: "https://guanjia.lenovo.com.cn/static/imgs/LPCM_appicon_uninstall_64@1x.png" },
            { name: "腾讯电脑管家", desc: "腾讯官方系统优化工具，病毒查杀与垃圾清理无捆绑", recommend: 0, isDownloadable: true, url: "https://guanjia.qq.com/main.html", favicon: "https://guanjia.qq.com/assets/images/v15/favicon.ico?_t=20230209" },
            { name: "火绒应用商店", desc: "火绒安全出品，纯净无广告弹窗，软件经过安全检测", recommend: 0, isDownloadable: true, url: "https://www.huorong.cn/app_store.html", favicon: "https://cdn-www.huorong.cn/Public/Uploads/uploadfile/images/20240226/d1icon01.svg" },
            { name: "联想应用商店", desc: "联想电脑官方预装，软件经过安全验证，适配联想设备", recommend: 0, isDownloadable: true, url: "https://lestore.lenovo.com/", favicon: "https://lestore.lenovo.com/favicon.ico" },
            { name: "腾讯应用宝", desc: "联想电脑官方预装，软件经过安全验证，适配联想设备", recommend: 0, isDownloadable: true, url: "https://sj.qq.com/", favicon: "https://sj.qq.com/favicon.ico" }
        ]
    },
    {
        category: "AI工具",
        items: [
            { name: "讯飞星火", desc: "科大讯飞推出的AI大模型，语音交互能力突出，支持多种行业场景", recommend: 0, isDownloadable: true, url: "https://xinghuo.xfyun.cn/desktop-app-download", favicon: "https://xinghuo.xfyun.cn/spark-icon.ico" },
            { name: "Kimi", desc: "月之暗面推出的AI助手，擅长长文本处理与深度推理，上下文窗口大", recommend: 0, isDownloadable: false, url: "https://www.kimi.com/", favicon: "https://statics.moonshot.cn/kimi-web-seo/favicon.ico" },
            { name: "腾讯元宝", desc: "腾讯出品的AI助手，基于混元大模型，支持文档总结、图片理解与日常问答", recommend: 0, isDownloadable: true, url: "https://yuanbao.tencent.com/", favicon: "https://static.yuanbao.tencent.com/m/yuanbao-web/favicon_new@32.png" },
            { name: "豆包", desc: "教案生成，文本润色，多轮对话，日常办公好帮手", recommend: 0, isDownloadable: true, url: "https://www.doubao.com/", favicon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/chat/favicon.png" },
            { name: "千问", desc: "长文档摘要，多语言翻译，图文理解能力突出", recommend: 0, isDownloadable: true, url: "https://www.qianwen.com/", favicon: "https://img.alicdn.com/imgextra/i4/O1CN01uar8u91DHWktnF2fl_!!6000000000191-2-tps-110-110.png" },
            { name: "Xiaomi MIMO", desc: "小米自研大模型，界面简洁易用，支持日常问答", recommend: 0, isDownloadable: false, url: "https://aistudio.xiaomimimo.com/#/c", favicon: "https://aistudio.xiaomimimo.com/favicon.0619b0d2.png" },
            { name: "DeepSeek", desc: "数学推理与逻辑分析能力强，代码生成与深度解析", recommend: 0, isDownloadable: false, url: "https://chat.deepseek.com/", favicon: "https://fe-static.deepseek.com/chat/favicon.svg" },
            { name: "智谱清言", desc: "多模态理解，知识问答全面，中文场景深度优化", recommend: 0, isDownloadable: false, url: "https://chatglm.cn/main/alltoolsdetail?redirect=/main/alltoolsdetail&lang=zh", favicon: "https://chatglm.cn/favicon.ico" },
            { name: "即梦AI", desc: "字节跳动旗下AI创作平台，支持文生图、文生视频等多模态内容生成", recommend: 0, isDownloadable: false, url: "https://jimeng.jianying.com/", favicon: "https://lf3-lv-buz.vlabstatic.com/obj/image-lvweb-buz/common/images/dreamina-v5.ico" },
            { name: "可灵AI", desc: "快手旗下AI视频生成工具，支持文生视频、图生视频，视频生成质量较高", recommend: 0, isDownloadable: false, url: "https://klingai.com/app", favicon: "https://www.kling.ai/favicon.ico" }
        ]
    },
    {
        category: "设计工具",
        items: [
            { name: "canva", desc: "在线图形设计平台，海量模板覆盖海报、演示文稿、社交媒体图片等场景，拖拽操作易上手", recommend: 0, isDownloadable: true, url: "https://www.canva.cn/", favicon: "https://static.canva.cn/domain-assets/canva/static/images/favicon-1.ico" },
            { name: "美图秀秀", desc: "国民级图片编辑工具，支持美颜、滤镜、拼图与证件照制作", recommend: 0, isDownloadable: true, url: "https://pc.meitu.com/", favicon: "https://pc.meitudata.com/web-xiuxiu-offical/_next/static/media/favicon.87479806.ico" },
            { name: "稿定设计", desc: "在线图片编辑平台，海量模板覆盖海报、公众号封面等场景", recommend: 0, isDownloadable: false, url: "https://www.gaoding.com/", favicon: "https://www.gaoding.com/logo.svg" },
            { name: "创客贴", desc: "在线平面设计工具，拖拽操作，模板丰富，适合零基础用户", recommend: 0, isDownloadable: false, url: "https://www.chuangkit.com/", favicon: "https://www.chuangkit.com/favicon.ico" },
        ]
    },
    {
        category: "远程控制",
        items: [
            { name: "向日葵", desc: "支持远程开机，跨平台控制，个人版免费使用", recommend: 0, isDownloadable: true, url: "https://sunlogin.oray.com/download", favicon: "https://sunlogin.oray.com/favicon.ico" },
            { name: "ToDesk", desc: "连接延迟低，画面清晰流畅，操作门槛低", recommend: 0, isDownloadable: true, url: "https://www.todesk.com/download.html", favicon: "https://todeskcdnspeed.todesk.com/20250619165127637e8d9e2be0fc.png" },
            { name: "AnyDesk", desc: "安装包小巧，连接速度快，跨国远程连接稳定", recommend: 0, isDownloadable: true, url: "https://anydesk.com.cn/zhs/downloads/windows", favicon: "https://anydesk.com.cn/favicon.ico" }
        ]
    },
]
