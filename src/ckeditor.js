// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/base64uploadadapter';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    Base64UploadAdapter,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
    plugins: [ Base64UploadAdapter ],
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'blockQuote',
            'undo',
            'redo'
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};