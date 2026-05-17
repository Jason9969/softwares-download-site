<script setup lang="ts">
/**
 * SoftwareNav.vue - 软件导航组件
 * 
 * 功能说明：
 * - 提供软件分类导航和搜索功能
 * - 支持深色/浅色主题切换
 * - 响应式设计，适配桌面端和移动端
 * - 软件数据展示，支持复制下载链接
 * 
 * 技术实现：
 * - Vue 3 Composition API
 * - TypeScript 类型定义
 * - CSS Variables 主题切换
 * - Scoped CSS 样式隔离
 * - 数据与逻辑分离（数据在 ./data.ts）
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { apps, type AppItem, type Category } from './SoftwareNav/data'

/**
 * 软件数据 - 从外部文件导入
 */
const Apps: Category[] = apps

// ========== 响应式状态 ==========

/**
 * 搜索关键词
 */
const searchQuery = ref('')

/**
 * 选中的分类标签（单选）
 */
const selectedTags = ref<string>('全部')

/**
 * 当前主题模式（dark/light）
 */
const theme = ref('dark')

/**
 * 是否显示Toast提示
 */
const showToast = ref(false)

/**
 * Toast提示消息内容
 */
const toastMessage = ref('')

/**
 * Toast定时器ID
 */
const toastTimeout = ref<number | null>(null)

/**
 * 当前高亮的导航项ID
 */
const currentActiveNav = ref<string | null>(null)

/**
 * 滚动高亮禁用的定时器ID
 */
let scrollDisableTimeout: number | null = null

/**
 * 是否显示返回顶部按钮
 */
const showBackToTop = ref(false)

/**
 * 返回顶部按钮的requestAnimationFrame ID
 */
const backToTopRaf = ref<number | null>(null)

/**
 * 描述文本是否溢出的Map
 */
const descOverflowMap = ref<Map<string, boolean>>(new Map())

/**
 * 检测描述文本是否溢出
 */
const checkDescOverflow = () => {
    nextTick(() => {
        Apps.forEach(category => {
            category.items.forEach(item => {
                const key = `${category.category}-${item.name}`
                const el = document.querySelector(`[data-desc-key="${key}"]`)
                if (el) {
                    const isOverflow = el.scrollHeight > el.clientHeight
                    descOverflowMap.value.set(key, isOverflow)
                }
            })
        })
    })
}

// ========== 计算属性 ==========

/**
 * 获取所有分类标签（自动从Apps数据提取）
 */
const Tags = computed(() => ['全部', ...Apps.map(cat => cat.category)])

/**
 * 侧边导航是否可见：只在选中"全部"标签且屏幕宽度足够时显示
 */
const sideNavVisible = computed(() => {
    const isAllSelected = selectedTags.value === '全部'
    const isWideScreen = window.innerWidth > 1200
    return isAllSelected && isWideScreen
})

/**
 * 监听侧边导航栏的显示状态，当重新显示时重置高亮
 */
let previousSideNavVisible = false
watch(sideNavVisible, (newVal) => {
    if (newVal && !previousSideNavVisible) {
        // 当侧边导航栏从隐藏变为显示时，重置高亮状态
        currentActiveNav.value = null
    }
    previousSideNavVisible = newVal
})

/**
 * 计算软件总数
 */
const totalCount = computed(() => {
    return Apps.reduce((sum, cat) => sum + cat.items.length, 0)
})

/**
 * 计算当前可见的软件数量（考虑搜索和标签筛选）
 */
const visibleCount = computed(() => {
    let count = 0
    Apps.forEach(cat => {
        const tagMatch = selectedTags.value === '全部' || selectedTags.value === cat.category
        if (!tagMatch) return

        cat.items.forEach(item => {
            const searchText = `${item.name} ${item.desc}`.toLowerCase()
            const q = searchQuery.value.trim().toLowerCase()
            if (!q || searchText.includes(q)) {
                count++
            }
        })
    })
    return count
})

/**
 * 判断是否无搜索结果
 */
const isNoResults = computed(() => {
    return visibleCount.value === 0 && (searchQuery.value.trim().length > 0 || selectedTags.value !== '全部')
})

/**
 * 监听选中标签变化，重新检测文本溢出
 */
watch(selectedTags, () => {
    checkDescOverflow()
})

/**
 * 监听搜索关键词变化，重新检测文本溢出
 */
watch(searchQuery, () => {
    checkDescOverflow()
})

// ========== 工具函数 ==========

/**
 * 根据软件名称生成稳定的图标颜色类名
 * @param name 软件名称
 * @returns 颜色类名
 */
const getIconColor = (name: string): string => {
    const colors = ['ic-green', 'ic-blue', 'ic-red', 'ic-orange', 'ic-purple', 'ic-teal', 'ic-gray', 'ic-pink', 'ic-yellow']
    let colorIndex = 0
    for (let i = 0; i < name.length; i++) {
        colorIndex += name.charCodeAt(i)
    }
    return colors[colorIndex % colors.length]
}

/**
 * 获取软件名称的第一个字符（支持中英文）
 * @param name 软件名称
 * @returns 第一个字符
 */
const getFirstChar = (name: string): string => {
    return name.charAt(0)
}

/**
 * 判断软件卡片是否应该显示（考虑搜索和标签筛选）
 * @param item 软件项目
 * @param categoryName 分类名称
 * @returns 是否显示
 */
const isCardVisible = (item: AppItem, categoryName: string): boolean => {
    const tagMatch = selectedTags.value === '全部' || selectedTags.value === categoryName
    if (!tagMatch) return false

    const searchText = `${item.name} ${item.desc}`.toLowerCase()
    const q = searchQuery.value.trim().toLowerCase()
    return !q || searchText.includes(q)
}

/**
 * 判断分类是否应该显示
 * @param categoryName 分类名称
 * @returns 是否显示
 */
const isCategoryVisible = (categoryName: string): boolean => {
    const cat = Apps.find(c => c.category === categoryName)
    if (!cat) return false

    const tagMatch = selectedTags.value === '全部' || selectedTags.value === categoryName
    if (!tagMatch) return false

    return cat.items.some(item => isCardVisible(item, categoryName))
}

// ========== 事件处理函数 ==========

/**
 * 处理标签点击事件
 * @param tag 点击的标签名称
 */
const handleTagClick = (tag: string) => {
    selectedTags.value = tag

    // 如果不是"全部"，滚动到对应分类区域
    if (tag !== '全部') {
        const index = Apps.findIndex(cat => cat.category === tag)
        if (index !== -1) {
            const element = document.getElementById('cat-' + index)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    } else {
        // 如果是"全部"，滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

/**
 * 判断标签是否处于选中状态
 * @param tag 标签名称
 * @returns 是否选中
 */
const isTagActive = (tag: string): boolean => {
    return selectedTags.value === tag
}

/**
 * 复制软件链接到剪贴板
 * @param url 要复制的链接
 * @param btn 触发复制的按钮元素
 */
const copyLink = (url: string, btn: HTMLButtonElement) => {
    navigator.clipboard.writeText(url).then(() => {
        btn.textContent = '已复制'
        btn.classList.add('copied')
        showToastMessage('链接已复制到剪贴板')
        setTimeout(() => {
            btn.textContent = '复制下载链接'
            btn.classList.remove('copied')
        }, 2000)
    })
}

/**
 * 显示Toast提示消息
 * @param message 提示消息内容
 */
const showToastMessage = (message: string) => {
    toastMessage.value = message
    showToast.value = true
    if (toastTimeout.value) {
        clearTimeout(toastTimeout.value)
    }
    toastTimeout.value = window.setTimeout(() => {
        showToast.value = false
    }, 2000)
}

/**
 * 平滑滚动到指定分类区域
 * @param catId 分类ID
 */
const scrollToCategory = (catId: string) => {
    const element = document.getElementById(catId)
    if (element) {
        // 移除导航高亮滚动监听器，防止滚动时高亮被覆盖
        window.removeEventListener('scroll', handleNavScroll)

        // 清除之前的定时器
        if (scrollDisableTimeout) {
            clearTimeout(scrollDisableTimeout)
            scrollDisableTimeout = null
        }

        // 设置当前高亮
        currentActiveNav.value = catId

        // 滚动到目标位置
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // 1000ms 后重新添加导航高亮滚动监听器
        scrollDisableTimeout = window.setTimeout(() => {
            window.addEventListener('scroll', handleNavScroll, { passive: true })
            scrollDisableTimeout = null
        }, 1000)
    }
}

/**
 * 更新侧边导航高亮状态（根据滚动位置）
 */
const updateActiveNav = () => {
    if (!sideNavVisible.value) return // 导航栏隐藏时不更新高亮

    const categories = Array.from(document.querySelectorAll('.category')) as HTMLElement[]
    const scrollPosition = window.scrollY + 200

    let activeCategory: string | null = null

    for (const cat of categories) {
        const offsetTop = cat.offsetTop
        const offsetBottom = offsetTop + cat.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            activeCategory = cat.id
            break
        }
    }

    if (!activeCategory && categories.length > 0) {
        const lastVisibleCat = categories.filter(cat => cat.offsetTop <= scrollPosition).pop()
        if (lastVisibleCat) {
            activeCategory = lastVisibleCat.id
        }
    }

    currentActiveNav.value = activeCategory
}

/**
 * 切换返回顶部按钮可见性（使用requestAnimationFrame优化性能）
 */
const toggleBackToTop = () => {
    if (backToTopRaf.value) return
    backToTopRaf.value = requestAnimationFrame(() => {
        showBackToTop.value = window.scrollY > 400
        backToTopRaf.value = null
    })
}

/**
 * 平滑滚动到页面顶部
 */
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * 清空搜索框内容
 */
const clearSearch = () => {
    searchQuery.value = ''
}

/**
 * 处理页面滚动事件
 */
const handleScroll = () => {
    // 只更新返回顶部按钮的可见性，不更新导航高亮
    toggleBackToTop()
}

/**
 * 专门用于更新导航高亮的滚动处理
 */
const handleNavScroll = () => {
    updateActiveNav()
    toggleBackToTop()
}



// ========== 生命周期钩子 ==========

/**
 * 组件挂载时执行
 */
onMounted(() => {
    // 读取保存的主题设置，若无则跟随系统主题
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        theme.value = savedTheme
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
    }
    document.documentElement.setAttribute('data-theme', theme.value)

    // 初始化返回顶部按钮状态
    toggleBackToTop()

    // 添加事件监听
    window.addEventListener('scroll', handleNavScroll, { passive: true })

    // 检测文本溢出
    checkDescOverflow()

    // 监听窗口大小变化，重新检测
    window.addEventListener('resize', checkDescOverflow)
})

/**
 * 组件卸载时执行
 */
onUnmounted(() => {
    // 移除事件监听
    window.removeEventListener('scroll', handleNavScroll)
    window.removeEventListener('resize', checkDescOverflow)

    // 清理定时器
    if (toastTimeout.value) clearTimeout(toastTimeout.value)
    if (backToTopRaf.value) cancelAnimationFrame(backToTopRaf.value)
    if (scrollDisableTimeout) clearTimeout(scrollDisableTimeout)
})

/**
 * 切换主题模式（深色/浅色）
 */
const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
}
</script>

<template>
    <div class="software-nav">
        <nav class="side-nav" :class="{ visible: sideNavVisible }">
            <div class="side-nav-header">📂 分类</div>
            <div class="side-nav-list">
                <a v-for="(cat, index) in Apps" :key="cat.category" :href="'#cat-' + index" class="side-nav-item"
                    :class="{ active: currentActiveNav === 'cat-' + index }" :data-target="'cat-' + index"
                    @click.prevent="scrollToCategory('cat-' + index)">
                    {{ cat.category }}
                </a>
            </div>
        </nav>

        <button class="theme-toggle" @click="toggleTheme" title="切换主题">
            <svg v-if="theme === 'dark'" class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg v-else class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>

        <div class="container">
            <header>
                <h1>🛠️ 常用【软件 · 应用】<span>纯净导航站</span></h1>
                <p class="header-desc">✨ 100% 官方原版直达 | 告别第三方网站流氓捆绑</p>
                <p class="header-tip">
                    💡 小贴士：点击卡片直达官网。安装软件时，留意并取消勾选不需要的"附加软件"即可。
                </p>
            </header>

            <div class="search-bar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" v-model="searchQuery" placeholder="搜索软件名称…" aria-label="搜索软件" />
                <button class="clear-btn" :class="{ visible: searchQuery.length > 0 }" @click="clearSearch"
                    aria-label="清除搜索">
                    ×
                </button>
            </div>

            <div class="tag-filter">
                <button v-for="tag in Tags" :key="tag" class="tag-btn" :class="{ active: isTagActive(tag) }"
                    @click="handleTagClick(tag)">
                    {{ tag }}
                </button>
            </div>

            <div id="appList">
                <div v-for="(cat, ci) in Apps" :key="cat.category" class="category"
                    :class="{ hidden: !isCategoryVisible(cat.category) }" :id="'cat-' + ci"
                    :data-category="cat.category">
                    <div class="category-header">
                        <div class="category-title">{{ cat.category }}</div>
                    </div>
                    <div class="grid">
                        <a v-for="item in cat.items" :key="item.name" class="app-card" :class="[
                            item.recommend === 1 ? 'recommended' : '',
                            { hidden: !isCardVisible(item, cat.category) }
                        ]" :href="item.url" target="_blank" rel="noopener"
                            :data-search="`${item.name} ${item.desc}`.toLowerCase()" :data-category="cat.category">
                            <div v-if="item.recommend === 1" class="recommend-badge">
                                <svg t="1778695064546" class="icon" viewBox="0 0 1138 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1728" width="200" height="200">
                                    <path
                                        d="M186.997713 866.592817L96.433117 325.992722l245.184301 204.225439 224.932418-358.162496 200.641538 358.219383 275.334574-204.282326-83.965668 540.600095H186.997713zM60.821662 269.503625a59.902336 59.902336 0 1 1 0-119.747785 59.902336 59.902336 0 0 1 0 119.747785zM569.8493 119.776228A59.902336 59.902336 0 1 1 569.8493 0.028444a59.902336 59.902336 0 0 1 0 119.747784z m508.970751 149.727397a59.902336 59.902336 0 1 1 0-119.747785 59.902336 59.902336 0 0 1 0 119.747785zM213.279649 1001.984612a28.443654 28.443654 0 1 1 0-56.887309h720.193328a28.443654 28.443654 0 0 1 0 56.887309H213.222762z"
                                        fill="#BD983D" p-id="1729"
                                        data-spm-anchor-id="a313x.search_index.0.i1.27863a81pz6ZmD" class="selected">
                                    </path>
                                </svg>
                            </div>
                            <img v-if="item.favicon" class="app-icon-img" :src="item.favicon" :alt="item.name"
                                @error="(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', ''); }" />
                            <div v-if="item.favicon" class="app-icon app-icon-fallback" :class="getIconColor(item.name)"
                                style="display:none">
                                {{ getFirstChar(item.name) }}
                            </div>
                            <div v-else class="app-icon" :class="getIconColor(item.name)">
                                {{ getFirstChar(item.name) }}
                            </div>
                            <div class="app-info">
                                <div class="app-name" :title="item.name">{{ item.name }}</div>
                                <div class="app-desc" :data-desc-key="`${cat.category}-${item.name}`"
                                    :title="descOverflowMap.get(`${cat.category}-${item.name}`) ? item.desc : ''">
                                    {{ item.desc }}
                                    <div class="app-desc-tooltip"
                                        v-show="descOverflowMap.get(`${cat.category}-${item.name}`)">
                                        {{ item.desc }}
                                    </div>
                                </div>
                            </div>
                            <button v-if="item.isDownloadable !== false" class="copy-btn"
                                @click.prevent.stop="copyLink(item.url, $event.target as HTMLButtonElement)">
                                复制下载链接
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div class="no-results" :class="{ visible: isNoResults }">
                <div class="no-results-icon">∅</div>
                <div>没有找到匹配的软件</div>
            </div>

            <footer v-if="selectedTags === '全部'">
                <p class="footer-info">
                    共收录 <span id="totalCount">{{ visibleCount || totalCount }}</span> 款精选软件与在线工具
                </p>
                <p class="footer-note">所有链接均指向官方网站，请放心食用💗</p>
            </footer>
        </div>

        <div class="toast" :class="{ show: showToast }" ref="toastRef">
            {{ toastMessage }}
        </div>

        <button v-if="selectedTags === '全部'" class="back-to-top" :class="{ visible: showBackToTop }"
            @click="scrollToTop" aria-label="返回顶部" ref="backToTopRef">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

.software-nav {
    font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    line-height: 1.7;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    transition: background 0.3s, color 0.3s;
    text-align: left;
}

.software-nav::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
        radial-gradient(ellipse at 15% 20%, rgba(212, 168, 83, 0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 80%, rgba(91, 155, 212, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

[data-theme="light"] .software-nav::before {
    background:
        radial-gradient(ellipse at 15% 20%, rgba(196, 148, 31, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 80%, rgba(43, 87, 151, 0.06) 0%, transparent 50%);
}

.container {
    position: relative;
    z-index: 1;
    max-width: 75%;
    margin: 0 auto;
    padding: 60px 32px 80px;
    padding-left: 200px;
}

@media (max-width: 1200px) {
    .container {
        padding-left: 32px;
        max-width: 100%;
    }
}

.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-muted);
}

.theme-toggle:hover {
    border-color: var(--accent);
}

.theme-toggle svg {
    width: 18px;
    height: 18px;
    transition: color 0.2s;
}

.theme-toggle:hover svg {
    color: var(--accent);
}

.side-nav {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 12px;
    min-width: 160px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.side-nav.visible {
    opacity: 1;
    visibility: visible;
}

.side-nav-header {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.side-nav-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.side-nav-item {
    display: block;
    padding: 8px 12px;
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.side-nav-item:hover {
    background: var(--surface-hover);
    color: var(--text);
}

.side-nav-item.active {
    background: var(--accent);
    color: #fff;
    font-weight: 500;
}

@media (max-width: 1200px) {
    .side-nav {
        display: none;
    }
}

header {
    margin-bottom: 40px;
    padding: 32px 28px;
    background: linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(212, 168, 83, 0.03) 50%, rgba(91, 155, 212, 0.03) 100%);
    border-radius: 16px;
    border: 1px solid rgba(212, 168, 83, 0.2);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(212, 168, 83, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
}

header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(212, 168, 83, 0.08) 0%, transparent 70%);
    animation: pulseGlow 4s ease-in-out infinite;
}

@keyframes pulseGlow {

    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.1);
    }
}

header h1 {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.8px;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text);
}

header h1 span {
    color: var(--accent);
    position: relative;
}

header h1 span::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), rgba(212, 168, 83, 0.3));
    border-radius: 2px;
}

.header-desc {
    font-size: 16px;
    color: var(--text-muted);
    font-weight: 300;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
}

.header-tip {
    font-size: 14px;
    color: var(--accent);
    margin-top: 12px;
    padding: 12px 16px;
    background: rgba(212, 168, 83, 0.1);
    border-radius: 10px;
    border-left: 4px solid var(--accent);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.search-bar {
    position: relative;
    margin-bottom: 24px;
}

.search-bar svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-dim);
    pointer-events: none;
    transition: color 0.2s;
}

.search-bar input:focus~svg {
    color: var(--accent);
}

.search-bar input {
    width: 100%;
    padding: 14px 44px 14px 46px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: inherit;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s;
}

.search-bar input::placeholder {
    color: var(--text-dim);
}

.search-bar input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(212, 168, 83, 0.1);
}

.clear-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 20px;
    cursor: pointer;
    padding: 2px 6px;
    line-height: 1;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, color 0.2s;
}

.clear-btn.visible {
    opacity: 1;
    pointer-events: auto;
}

.clear-btn:hover {
    color: var(--accent);
}

.tag-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
}

.tag-btn {
    padding: 7px 15px;
    font-size: 13px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
}

.tag-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.tag-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

.category {
    margin-bottom: 40px;
    transition: opacity 0.15s;
}

.category.hidden {
    display: none;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.category-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    position: relative;
    padding: 10px 16px 10px 18px;
    background: linear-gradient(135deg, rgba(212, 168, 83, 0.08) 0%, transparent 60%);
    border-radius: 10px;
    border: 1px solid rgba(212, 168, 83, 0.1);
}

.category-header::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 70%;
    background: linear-gradient(180deg, var(--accent), var(--accent-dim));
    border-radius: 2px;
}

.category-header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(212, 168, 83, 0.25), transparent);
    margin-left: 4px;
}

.category-title {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--text);
    display: flex;
    align-items: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
}

.app-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text);
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    height: 87px;
    min-height: 87px;
    box-sizing: border-box;
}

.app-card.hidden {
    display: none;
}

.app-card:hover {
    border-color: rgba(212, 168, 83, 0.35);
    background: var(--surface-hover);
    transform: translateY(-1px);
}

.app-card:active {
    transform: scale(0.98);
    background: var(--surface-hover);
}

.app-card.recommended {
    background: linear-gradient(135deg, rgba(255, 248, 230, 0.05) 0%, rgba(212, 168, 83, 0.1) 100%);
    box-shadow: 0 0 0 1px rgba(212, 168, 83, 0.1), 0 4px 12px rgba(212, 168, 83, 0.15);
}

.app-card.recommended:hover {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(212, 168, 83, 0.3), 0 6px 20px rgba(212, 168, 83, 0.25);
    transform: translateY(-2px) scale(1.02);
}

.app-card:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

.recommend-badge {
    position: absolute;
    top: -14px;
    left: -12px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    z-index: 2;
}

.app-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin-top: 2px;
}

.app-icon-img {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 8px;
}

.app-info {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.app-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
    flex-shrink: 0;
}

.app-card:hover .app-name {
    color: var(--accent);
}

.app-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 2px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    position: relative;
}

.app-desc-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    color: var(--text);
    line-height: 1.5;
    white-space: normal;
    word-break: break-word;
    max-width: 280px;
    min-width: 150px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    margin-bottom: 8px;
}

.app-desc-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--border);
}

.app-desc-tooltip::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--surface);
    z-index: 1;
}

.app-desc:hover .app-desc-tooltip {
    opacity: 1;
}

.copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    background: var(--surface-hover);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 10px;
    color: var(--text-dim);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s;
    font-family: inherit;
}

.app-card:hover .copy-btn {
    opacity: 1;
}

.copy-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
}

.copy-btn.copied {
    color: #4ade80;
    border-color: #4ade80;
}

.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--surface);
    border: 1px solid var(--accent);
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    color: var(--accent);
    opacity: 0;
    transition: all 0.3s;
    z-index: 100000;
    pointer-events: none;
}

.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 24px;
    z-index: 9999;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.3s, border-color 0.2s, color 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.back-to-top.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.back-to-top:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.ic-green {
    background: #2d6a4f;
}

.ic-blue {
    background: #2b5797;
}

.ic-red {
    background: #a33a3a;
}

.ic-orange {
    background: #b86e2a;
}

.ic-purple {
    background: #5b3a8c;
}

.ic-teal {
    background: #2a6b6b;
}

.ic-gray {
    background: #4a4a4a;
}

.ic-grey {
    background: #4a4a4a;
}

.ic-pink {
    background: #8c3a5b;
}

.ic-yellow {
    background: #8c7a3a;
}

.no-results {
    display: none;
    text-align: center;
    padding: 60px 20px;
    color: var(--text-dim);
    font-size: 15px;
}

.no-results.visible {
    display: block;
}

.no-results-icon {
    font-size: 32px;
    margin-bottom: 10px;
    opacity: 0.4;
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-top: 64px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-dim);
    font-weight: 300;
    text-align: center;
    transition: border-color 0.3s;
}

.footer-info {
    font-size: 13px;
    color: var(--text-dim);
    font-weight: 400;
    letter-spacing: 0.5px;
}

.footer-info span {
    color: var(--accent);
    font-family: 'JetBrains Mono', ui-monospace, Consolas, monospace;
    font-weight: 600;
}

.footer-note {
    font-size: 12px;
    color: var(--text-dim);
    font-weight: 300;
    opacity: 0.6;
}

@media (max-width: 600px) {
    .container {
        padding: 32px 16px 60px;
    }

    header h1 {
        font-size: 24px;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    .theme-toggle {
        top: 12px;
        right: 12px;
        padding: 4px 10px;
    }
}
</style>
