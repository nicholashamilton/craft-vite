/**
 * Site Module module for Craft CMS
 *
 * Site Module JS
 *
 * @author    Nicholas Hamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 * @link      github.com/nicholashamilton
 * @package   SiteModule
 * @since     1.0.0
 */

const previewChecker = setInterval(initPreviewModule, 1500);

function initPreviewModule() {
    const previewEl = document.querySelector('div[aria-labelledby="lp-preview-heading"');
    if (!previewEl) return;

    const previewContainer = previewEl.querySelector(".lp-device-preview-container");
    if (!previewContainer) return;

    clearInterval(previewChecker);

    observePreviewContainer(previewContainer, previewEl);

    const iframe = previewEl.querySelector("iframe");
    if (iframe) iframePreviewInit(previewEl, iframe);
    iframe.onload = () => {
        iframePreviewInit(previewEl, iframe);
    };
}

function observePreviewContainer(previewContainer, previewEl) {
    const config = { childList: true };
    const callback = (mutationsList) => {
        if (mutationsList.length && mutationsList[0].addedNodes.length) {
            const iframeEl = mutationsList[0].addedNodes[0];
            iframeEl.onload = () => iframePreviewInit(previewEl, iframeEl);
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(previewContainer, config);
}

function iframePreviewInit(previewEl, iframe) {
    const editorBlocks = previewEl.querySelectorAll(".blocks div.matrixblock");
    const previewBlocks = iframe.contentWindow.document.body.querySelectorAll("[preview-block]");

    if (!editorBlocks.length || !previewBlocks.length) return;

    for (let i = 0; i < previewBlocks.length; i++) {
        const previewBlock = previewBlocks[i];

        previewBlock.addEventListener("click", function () {
            editorBlocks[i].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });

        previewBlock.addEventListener("mouseenter", function() {
            previewBlock.classList.add("preview-block-hover");
            editorBlocks[i].style.border = "2px solid #9ba3b5";
        });

        previewBlock.addEventListener("mouseleave", function() {
            previewBlock.classList.remove("preview-block-hover");
            editorBlocks[i].style.border = "2px solid transparent";
        });
    }
}