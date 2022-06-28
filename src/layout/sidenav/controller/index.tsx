export interface ISideNavProps {
    title?: string;
    content?: JSX.Element | string;
}

class SidenavController {

    hooks: Map<string, ISideNavProps> = new Map<string, ISideNavProps>([
        [
            "use-outside-click", {
                title: "useOutsideClick()",
                content: `<>
                
                </>`
            }
        ],
        [
            "use-fetch", {
                title: "useFetch()",
                content: `<></>`
            }
        ],
        [
            "use-close-tab", {
                title: "useCloseTab()",
                content: `<></>`
            }
        ],
        [
            "use-window-dimensions", {
                title: "useWindowDimensions()",
                content: `<></>`
            }
        ],
        [
            "use-has-mounted", {
                title: "useHasMounted()",
                content: `<></>`
            }
        ],
    ])

}

export default new SidenavController();
