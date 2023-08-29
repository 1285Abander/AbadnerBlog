import { ref } from 'vue'

const useMode = () => {
    let mode = ref(localStorage.getItem("mode") ? localStorage.getItem("mode") : 'dark')
    if (!localStorage.getItem("mode")) {
        localStorage.setItem("mode", "dark")
    }

    const darkMode = {
        theme_index_bg_color: '#293756',
        theme_bg_color: '#121212',
        theme_bg_active_color: 'rgb(73, 73, 73)',
        theme_border_color: '#363636',
        theme_main_color: '#c9d1d9',
        theme_active_color: 'white',
        theme_color: 'rgb(122, 237, 244)',
        theme_op_bg_color: 'rgba(122, 237, 244, 0.6)',
        theme_sbox_title_color: 'lightgray',
    }

    const lightMode = {
        theme_index_bg_color: '#CFD1D9',
        theme_bg_color: 'rgb(247,247,247)',
        theme_bg_active_color: 'rgb(230,230,230)',
        theme_border_color: 'lightgray',
        theme_main_color: '#121212',
        theme_active_color: 'black',
        theme_color: 'rgb(3,169,143)',
        theme_op_bg_color: 'rgb(167,230,206,0.6)',
        theme_sbox_title_color: 'gary',
    }

    const changeMode = () => {
        mode.value = mode.value === "dark" ? "light" : "dark"
        localStorage.setItem("mode", mode.value)
        return {
            cssMode: mode.value === "dark" ? darkMode : lightMode
        }
    }

    const changeCss = (cssMode: changeModeType.cssModeType) => {
        document.documentElement.style.setProperty("--theme_index_bg_color", cssMode.theme_index_bg_color)
        document.documentElement.style.setProperty("--theme_bg_color", cssMode.theme_bg_color)
        document.documentElement.style.setProperty("--theme_border_color", cssMode.theme_border_color)
        document.documentElement.style.setProperty("--theme_main_color", cssMode.theme_main_color)
        document.documentElement.style.setProperty("--theme_active_color", cssMode.theme_active_color)
        document.documentElement.style.setProperty("--theme_bg_active_color", cssMode.theme_bg_active_color)
        document.documentElement.style.setProperty("--theme_color", cssMode.theme_color)
        document.documentElement.style.setProperty("--theme_op_bg_color", cssMode.theme_op_bg_color)
        document.documentElement.style.setProperty("--theme_sbox_title_color", cssMode.theme_sbox_title_color)
    }

    return {
        mode,
        changeMode,
        cssMode: mode.value === "dark" ? darkMode : lightMode,
        changeCss
    }
}

export default useMode