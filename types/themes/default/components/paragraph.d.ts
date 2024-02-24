declare namespace _default {
    export { baseStyle };
    export { appearances };
    export { sizes };
}
export default _default;
declare namespace baseStyle {
    function fontFamily(theme: any, { fontFamily }: {
        fontFamily?: string | undefined;
    }): string;
    function color(theme: any, { color }: {
        color?: string | undefined;
    }): string;
    const marginTop: number;
    const marginBottom: number;
}
declare const appearances: {};
declare const sizes: {
    small: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    medium: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    large: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    300: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    400: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    500: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
    600: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
    };
};
