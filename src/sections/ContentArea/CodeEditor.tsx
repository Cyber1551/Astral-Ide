import ReactCodeMirror from "@uiw/react-codemirror";
import {createTheme} from '@uiw/codemirror-themes'
import {vscodeDark, materialDark} from "@uiw/codemirror-themes-all";
import {csharp} from "@replit/codemirror-lang-csharp";
import {tags} from '@lezer/highlight';
import {Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate} from "@codemirror/view";
import {syntaxTree} from "@codemirror/language"
import CheckboxWidget from "../../widgets/CheckboxWidget";
import {javascript} from "@codemirror/lang-javascript";

const CodeEditor = () => {

    const myTheme = createTheme({
        dark: 'dark',
        settings: {
            background: '#181818',
            foreground: '#d1d1d1',
            caret: '#AEAFAD',
            selection: '#D6D6D6',
            selectionMatch: '#D6D6D6',
            gutterBackground: '#181818',
            gutterForeground: '#4D4D4C',
            gutterBorder: '#dddddd',
            gutterActiveForeground: '#A9B7C6',
            lineHighlight: '#282828',
        },
        styles: [
            { tag: tags.comment, color: '#808080' },
            { tag: tags.string, color: '#6A8759' },
            { tag: tags.number, color: '#6897BB' },
            { tag: tags.keyword, color: '#CC7832' },
            { tag: tags.variableName, color: '#A9B7C6' },
            { tag: tags.definitionKeyword, color: '#E8BF6A' },
            { tag: tags.propertyName, color: '#A9B7C6' },
            { tag: tags.operator, color: '#CC7832' },
            { tag: tags.typeName, color: '#BBB529' },
            { tag: tags.labelName, color: '#A9B7C6' },
            { tag: tags.className, color: '#BBB529' },
            { tag: tags.special(tags.variableName), color: '#A9B7C6' },
            { tag: tags.atom, color: '#A9B7C6' },
            { tag: tags.literal, color: '#A9B7C6' },
            { tag: tags.invalid, color: '#BC3F3C' },
        ],
    });


    const checkboxPlugin = ViewPlugin.fromClass(class {
        decorations: DecorationSet

        constructor(view: EditorView) {
            this.decorations = checkboxes(view);
        }

        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = checkboxes(update.view);
            }
        }
    }, {
        decorations: v => v.decorations,
        eventHandlers: {
            mousedown: (e, view) => {
                let target = e.target as HTMLElement;
                if (target.nodeName == "INPUT" && target.parentElement!.className.includes("cm-boolean-toggle")) {
                    return toggleBoolean(view, view.posAtDOM(target));
                }
            }
        }
    });


    function checkboxes(view: EditorView) {
        let widgets = []
        for (let {from, to} of view.visibleRanges) {
            syntaxTree(view.state).iterate({
                from, to,
                enter: (node) => {
                    if (node.name == "BooleanLiteral") {
                        let isTrue = view.state.doc.sliceString(node.from, node.to) == "true"
                        let deco = Decoration.widget({
                            widget: new CheckboxWidget(isTrue),
                            side: 1
                        })
                        widgets.push(deco.range(node.to))
                    }
                }
            })
        }
        return Decoration.set(widgets)
    }

    function toggleBoolean(view: EditorView, pos: number) {
        let before = view.state.doc.sliceString(Math.max(0, pos - 5), pos)
        let change
        if (before == "false")
            change = {from: pos - 5, to: pos, insert: "true"}
        else if (before.endsWith("true"))
            change = {from: pos - 4, to: pos, insert: "false"}
        else
            return false
        view.dispatch({changes: change})
        return true
    }


    return <div className={'h-full'}>
        <ReactCodeMirror height={"calc(100vh - 32px)"} theme={materialDark} extensions={[
            javascript(),
            checkboxPlugin
        ]} />
    </div>
}

export default CodeEditor;
