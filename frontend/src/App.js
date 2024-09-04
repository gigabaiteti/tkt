import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#2E3235",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
                },
            },
            palette: {
                type: mode,
                primary: { main: "#2E3235" },
                textPrimary: mode === "light" ? "#2E3235" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#2E3235" : "#FFFFFF",
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
                tabHeaderBackground: mode === "light" ? "#EEEEEE" : "#333333",
                optionsBackground: mode === "light" ? "#FAFAFA" : "#333333",
				options: mode === "light" ? "#FAFAFA" : "#666666",
				fontecor: mode === "light" ? "#2E3235" : "#FFFFFF",
                fancyBackground: mode === "light" ? "#FAFAFA" : "#333333",
				bordabox: mode === "light" ? "#EEEEEE" : "#333333",
				newmessagebox: mode === "light" ? "#EEEEEE" : "#333333",
				inputdigita: mode === "light" ? "#FFFFFF" : "#333333",
				contactdrawer: mode === "light" ? "#FFFFFF" : "#333333",
				announcements: mode === "light" ? "#EDEDED" : "#333333",
				login: mode === "light" ? "#FFFFFF" : "#333333",
				announcementspopover: mode === "light" ? "#FFFFFF" : "#333333",
				chatlist: mode === "light" ? "#EEEEEE" : "#333333",
				boxlist: mode === "light" ? "#EDEDED" : "#333333",
				boxchatlist: mode === "light" ? "#EDEDED" : "#333333",
                total: mode === "light" ? "#FFFFFF" : "#333333",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#333333",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #2E3235, #585B5D)" : "#666666",
				boxticket: mode === "light" ? "#EEEEEE" : "#333333",
				campaigntab: mode === "light" ? "#EDEDED" : "#333333",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Routes />
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
