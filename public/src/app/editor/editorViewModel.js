import { observable } from 'knockout';
import { merge } from 'scalejs';

export default function editorViewModel(node) {
    const metadata = observable(node.value || {});

    return merge(node, {
        metadata
    });
}
