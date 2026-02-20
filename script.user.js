// ==UserScript==
// @name         DeepSeek 极速CSS优化 (自动底部)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  使用content-visibility优化滚动性能，并在页面加载后自动跳转到底部
// @match        https://chat.deepseek.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const MSG_SCROLL_AREA_ID = 'ca1ef5b2';

    // 你之前提供的精确选择器
    const SCROLL_AREA_SELECTOR = `div.${MSG_SCROLL_AREA_ID}.ds-scroll-area`;
    const MESSAGE_ITEM_SELECTOR = SCROLL_AREA_SELECTOR + ' > div:first-child > div';

    // 注入CSS优化
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 对每条消息启用content-visibility，跳过视口外渲染 */
            ${MESSAGE_ITEM_SELECTOR} {
                content-visibility: auto !important;
                contain-intrinsic-size: 0 200px; /* 预估高度，可根据实际调整 */
            }
            /* 针对包含代码块的消息，增加预估高度 */
            ${MESSAGE_ITEM_SELECTOR}:has(pre) {
                contain-intrinsic-size: 0 500px !important;
            }
            /* 滚动容器优化 */
            .ds-scroll-area {
                contain: layout style paint !important;
                transform: translateZ(0);
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ CSS优化已注入');
    }

    // 滚动到底部（最新消息）
    function scrollToBottom() {
        const scrollArea = document.querySelector(SCROLL_AREA_SELECTOR);
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
            console.log('📍 已滚动到底部');
        }
    }

    // 等待消息加载完成后滚动到底部
    function waitForMessagesAndScroll() {
        const scrollArea = document.querySelector(SCROLL_AREA_SELECTOR);
        // 检查滚动容器内是否有消息（消息容器存在且子元素数量>0）
        if (scrollArea && scrollArea.children.length > 0 && scrollArea.firstChild.children.length > 0) {
            scrollToBottom();
        } else {
            // 否则继续等待
            setTimeout(waitForMessagesAndScroll, 200);
        }
    }

    // 注入CSS
    injectStyles();

    // 在页面加载完成后开始等待消息并滚动
    window.addEventListener('load', () => {
        // 稍等片刻让页面进一步渲染
        setTimeout(waitForMessagesAndScroll, 300);
    });
})();
