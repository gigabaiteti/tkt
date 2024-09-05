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
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#2E3235",
                },
            },
            components: {
                MuiTabs: {
                  styleOverrides: {
                    indicator: {
                      backgroundColor: '#2E3235',
                      height: 3,
                    },
                  },
                },
              },            
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#2E3235" : "#F3F3F3" },
                textPrimary: mode === "light" ? "#2E3235" : "#F3F3F3",
                borderPrimary: mode === "light" ? "#2E3235" : "#F3F3F3",
                dark: { main: mode === "light" ? "#2E3235" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#2E3235" },
                tabHeaderBackground: mode === "light" ? "#EEEEEE" : "#2E3235",
                optionsBackground: mode === "light" ? "#FAFAFA" : "#2E3235",
				options: mode === "light" ? "#FAFAFA" : "#666666",
				fontecor: mode === "light" ? "#2E3235" : "#F3F3F3",
                fancyBackground: mode === "light" ? "#FAFAFA" : "#2E3235",
				bordabox: mode === "light" ? "#EEEEEE" : "#2E3235",
				newmessagebox: mode === "light" ? "#EEEEEE" : "#2E3235",
				inputdigita: mode === "light" ? "#F3F3F3" : "#2E3235",
				contactdrawer: mode === "light" ? "#F3F3F3" : "#2E3235",
				announcements: mode === "light" ? "#EDEDED" : "#2E3235",
				login: mode === "light" ? "#F3F3F3" : "#2E3235",
				announcementspopover: mode === "light" ? "#F3F3F3" : "#2E3235",
				chatlist: mode === "light" ? "#EEEEEE" : "#2E3235",
				boxlist: mode === "light" ? "#EDEDED" : "#2E3235",
				boxchatlist: mode === "light" ? "#EDEDED" : "#2E3235",
                total: mode === "light" ? "#F3F3F3" : "#2E3235",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#F3F3F3" : "#2E3235",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #2E3235, #585B5D)" : "#666666",
				boxticket: mode === "light" ? "#EEEEEE" : "#2E3235",
				campaigntab: mode === "light" ? "#EDEDED" : "#2E3235"
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
