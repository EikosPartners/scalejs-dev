import { observable } from 'knockout';
import { merge } from 'scalejs';

export default function editorViewModel(node) {
    const metadata = observable(node.initialValue || {});

    return merge(node, {
        metadata
    });
}