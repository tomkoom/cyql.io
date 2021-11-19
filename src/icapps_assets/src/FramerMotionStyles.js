export const FramerMotionStyles = {
    buttons: {
        whileHover: {
            scale: 1.1,
        },
        transition: {
            type: "spring",
            bounce: 0.75,
        },
    },
    cards: {
        whileHover: {
            y: "-6px",
        },
        transition: {
            type: "spring",
            bounce: 0.5,
        },
    },
    navMenuItems: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
    },
    navMenu: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
    }
};
