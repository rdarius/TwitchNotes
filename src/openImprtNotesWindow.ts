import NoteStorage from "./NoteStorage";
import {getCloseButtonSVG} from "./HTMLTemplates";
import importNotesResult from "./importNotesResult";
import HTMLBuilder from "./HTMLBuilder";

// export default function openImportNotesWindow() {
//     const blurredBackground = new HTMLBuilder({
//         element: 'div',
//         class: 'twitch-notes-blurred-background'
//     });
//     const container = new HTMLBuilder({
//         element: 'div',
//         class: 'twitch-notes-center-floating-container',
//         style: {
//             padding: '1rem',
//         },
//         content: [
//             '<strong>WARNING!</strong> <em>This action might override existing data!</em><br /><br />',
//             {
//                 element: 'button',
//                 class: 'twitch-notes-settings-close-button',
//                 content: [getCloseButtonSVG()],
//                 style: {
//                     position: 'absolute',
//                     top: '1rem',
//                     right: '1rem',
//                 },
//                 mouseClickEvent:() => {
//                     blurredBackground.remove();
//                 }
//             }
//         ]
//     });
//     const input = new HTMLBuilder({
//         element: 'input',
//         class: 'twitch-notes-file-input',
//         attributes: {
//             type: 'file',
//             accept: 'json'
//         }
//     });
//     const inputBlock = new HTMLBuilder({
//         element: 'div',
//         content: ['Select exported twitch notes file<br /><br />', input.getElement()]
//     });
//
//     input.setChangeListener(() => {
//         if (!(input?.getElement() as HTMLInputElement)?.files) return;
//         // @ts-ignore
//         let file = input.getElement().files.item(0);
//         if (!file) {
//             return;
//         }
//         let reader = new FileReader();
//         reader.readAsText(file, "UTF-8");
//         reader.onload = function (evt) {
//             if (!evt?.target?.result) return;
//
//             NoteStorage.inputData = JSON.parse(evt.target.result.toString());
//             if (NoteStorage.inputData) {
//                 inputBlock.setStyles({display: 'none'});
//                 importNotesResult(container, blurredBackground);
//             }
//         }
//         reader.onerror = function () {
//             console.error("error reading file");
//         }
//     });
//
//     container.addContent(inputBlock.getElement());
//     blurredBackground.addContent(container.getElement());
//     document.body.appendChild(blurredBackground.getElement());
// }