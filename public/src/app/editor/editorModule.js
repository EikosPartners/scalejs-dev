import { registerBindings, registerTemplates, root, template } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import editorViewModel from './editorViewModel';
import editorBindings from './editorBindings';
import editorTemplate from './editor.html';
import './editor.scss';

registerBindings(editorBindings);
registerTemplates(editorTemplate);

registerViewModels({
    editor: editorViewModel
});

