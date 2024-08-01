import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    textColor: 'black',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
    activeEditorTab: '',
    decalScale: 0.15,
    textScale: 0.04,
    textInput: null,
    textMaxWidth: 6,
    textLineHeight: 1.2
})

export default state;