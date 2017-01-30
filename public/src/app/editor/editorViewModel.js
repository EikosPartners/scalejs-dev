import { observable } from 'knockout';
import { merge } from 'scalejs';

export default function editorViewModel(node) {
    const metadata = observable(node.value || {});

    const initialSize = window.innerWidth;

    let previouslySplit = false;

    const editorVisible = observable(true),
          outputVisible = observable(true);

    if (initialSize <= 768) {
        outputVisible(false);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (outputVisible() && editorVisible()) {
                // We were in split mode, now show only editor.
                outputVisible(false);

                // Save that we were in split mode so we can return to it if resized.
                previouslySplit = true;
            }
        } else {
            if (previouslySplit) {
                outputVisible(true);
                editorVisible(true);

                previouslySplit = false;
            }
        }
    });

    return merge(node, {
        metadata,
        editorVisible,
        outputVisible
    });
}
