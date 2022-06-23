const previewChecker = setInterval(initPreviewModule, 1500);

function initPreviewModule() {
    const editorEl = document.querySelector('.lp-editor-container');
    if (!editorEl) return;

    const previewEl = document.querySelector(".lp-device-preview-container");
    if (!previewEl) return;

    clearInterval(previewChecker);

    observePreviewEl(previewEl, editorEl);

    const iframe = previewEl.querySelector("iframe");
    if (iframe) iframePreviewInit(editorEl, iframe);
    iframe.onload = () => iframePreviewInit(editorEl, iframe);
}

function observePreviewEl(previewEl, editorEl) {
    const config = { childList: true };
    const callback = (mutationsList) => {
        if (mutationsList.length && mutationsList[0].addedNodes.length) {
            const iframeEl = mutationsList[0].addedNodes[0];
            iframeEl.onload = () => iframePreviewInit(editorEl, iframeEl);
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(previewEl, config);
}

function iframePreviewInit(editorEl, iframe) {
    const editBlocksQuery = ".matrix.matrix-field#fields-blocksBuilder .blocks div.matrixblock:not([data-type='rowContainer']):not(.disabled):not(.superTableMatrix)";
    const editorBlocks = editorEl.querySelectorAll(editBlocksQuery);
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

        previewBlock.addEventListener("mouseenter", function () {
            previewBlock.classList.add("is-hovering");
            editorBlocks[i].style.border = "2px solid #9ba3b5";
        });

        previewBlock.addEventListener("mouseleave", function () {
            previewBlock.classList.remove("is-hovering");
            editorBlocks[i].style.border = "2px solid transparent";
        });
    }
}