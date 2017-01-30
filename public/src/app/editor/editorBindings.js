// function click (val, id) {
//     if (val === 'editor') {
//         document.querySelector("#" + id + "-output").classList.add('hidden');
//         document.querySelector("#" + id).classList.remove('hidden');
//     } else if (val === 'output') {
//         document.querySelector("#" + id).classList.add('hidden');
//         document.querySelector("#" + id + "-output").classList.remove('hidden');
//     } else {
//         document.querySelector("#" + id).classList.remove('hidden');
//         document.querySelector("#" + id + "-output").classList.remove('hidden');
//     }
// }
//
// function resize(id) {
//     if (window.innerWidth <= 768) {
//         click('editor', id);
//     } else {
//         click('', id);
//     }
// }

export default {
    'split-action': function (ctx, args) {
        const val = args[1];

        return {
            click: () => {
                if (val === 'editor') {
                    this.editorVisible(true);
                    this.outputVisible(false);
                } else if (val === 'output') {
                    this.outputVisible(true);
                    this.editorVisible(false);
                } else {
                    this.editorVisible(true);
                    this.outputVisible(true);
                }
            }
        };
    }
};