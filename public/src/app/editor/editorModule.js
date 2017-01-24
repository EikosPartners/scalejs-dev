import { registerTemplates, root, template } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import editorViewModel from './editorViewModel';
import editorTemplate from './editor.html';

registerTemplates(editorTemplate);
registerViewModels({
    editor: editorViewModel
});
