export default function decodeHtml(html) {
    let txt = document.createElement("textarea"),
        result;
    txt.innerHTML = html;
    result = txt.value;
    txt = null;
    return result;
}