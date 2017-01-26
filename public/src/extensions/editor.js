import ko from 'knockout';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

/**
 * editor binding ex:
 * {
 *    storeValues: observable.
 *    initialValue: var or observable
 * }
 */
ko.bindingHandlers.editor = {
    init: (element, valueAccessor) => {
        const options = valueAccessor();
        const id = element.id;
        const editor = ace.edit(id);
        const storeValue = options.value;
        const mode = options.mode || 'json';
        let editorValue = options.value && ko.unwrap(options.value);

        if (mode !== 'json' && options.output) {
            console.warn("Output will only be displayed if the mode is set to json");
            options.output = false;
        }

        if (!ko.isObservable(storeValue)) { // storevalue must be an observable if not error
            console.error('You provided a storeValue property but it is not an observable');
        }

        editor.getSession().setMode('ace/mode/' + mode);
        editor.setTheme('ace/theme/monokai');

        // if we have an initial value set it in editor and then update the storevalue
        if (editorValue) {
            if (Array.isArray(editorValue) && mode === 'javascript') {
                // Insert the js as an array.
                editor.setValue(editorValue.join('\n'));
                editor.clearSelection();
            } else {
                // if it is already a string do not stringify
                if (typeof editorValue !== 'string') { editorValue = JSON.stringify(editorValue, null, 4); }
                editor.insert(editorValue);
            }
        }

        if (storeValue && mode === 'json') {
            editor.getSession().on('change', () => {
                try {
                    const json = JSON.parse(editor.getValue());
                    storeValue(json);
                } catch (e) {

                }
            });
        }
    }
};
