import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/github-dark-dimmed.css'
import 'github-markdown-css/github-markdown-dark.css'

import { Cascader } from "ant-design-vue"

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

const pinia = createPinia()

createApp(App).use(Cascader).use(pinia).use(router).use(VMdEditor).mount('#app')
